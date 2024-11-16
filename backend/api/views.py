from django.shortcuts import render
import logging
from typing import Dict, Any, Optional, Tuple
from django.http import JsonResponse
from django.views import View
from django.conf import settings
import requests
from api.utils import get_spotify_access_token
from django.core.cache import cache
from requests.exceptions import RequestException, Timeout, ConnectionError
from urllib.parse import unquote
from django.utils.text import slugify
from typing import Dict, Any, Optional, Tuple
from django.http import JsonResponse
from django.views import View
import requests
from urllib.parse import unquote
import logging
import time



# Configure logging
logger = logging.getLogger(__name__)

class SpotifyAPIError(Exception):
    """Custom exception for Spotify API related errors."""
    def __init__(self, message: str, status_code: int = 500):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)






class SpotifyRecommendationView(View):
    """View to handle recommendation requests from frontend and fetch from Spotify API."""
    
    SPOTIFY_RECOMMENDATIONS_URL = "https://api.spotify.com/v1/recommendations"
    MAX_SEED_ARTISTS = 5
    MAX_SEED_TRACKS = 5
    REQUEST_TIMEOUT = 10  # seconds
    MAX_TOTAL_SEEDS = 5
    
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.access_token = None

    def get_authorization_header(self) -> Dict[str, str]:
        """Get the authorization header with access token."""
        if not self.access_token:
            raise SpotifyAPIError("No access token available", 401)
        return {
            "Authorization": f"Bearer {self.access_token}",
            "Content-Type": "application/json"
        }

    def validate_seed_format(self, seed_value: Optional[str], seed_type: str) -> None:
        """
        Validate the format of seed IDs.
        
        Args:
            seed_value: Comma-separated IDs or genres
            seed_type: Type of seed ('artists', 'tracks', or 'genres')
        """
        if not seed_value:
            return

        seeds = seed_value.split(',')
        
        # Check for empty strings
        if any(not seed.strip() for seed in seeds):
            raise SpotifyAPIError(
                f"Invalid {seed_type} format: empty value found",
                400
            )

        # Only validate ID format for artists and tracks, not genres
        if seed_type in ['artists', 'tracks']:
            if any(len(seed) != 22 or not seed.isalnum() for seed in seeds):
                raise SpotifyAPIError(
                    f"Invalid {seed_type} ID format: IDs must be 22 characters long and alphanumeric",
                    400
                )

    def balance_seeds(
        self,
        seed_artists: Optional[str],
        seed_tracks: Optional[str],
        seed_genres: Optional[str]
    ) -> Tuple[Optional[str], Optional[str], Optional[str]]:
        """
        Balance and trim seeds to meet Spotify's 5-seed limit across all three seed types.
        Returns tuple of (seed_artists, seed_tracks, seed_genres) after balancing.
        """
        if not any([seed_artists, seed_tracks, seed_genres]):
            return None, None, None

        # Split seeds into lists
        artist_seeds = seed_artists.split(',') if seed_artists else []
        track_seeds = seed_tracks.split(',') if seed_tracks else []
        genre_seeds = seed_genres.split(',') if seed_genres else []
        
        total_seeds = len(artist_seeds) + len(track_seeds) + len(genre_seeds)
        if total_seeds <= self.MAX_TOTAL_SEEDS:
            return seed_artists, seed_tracks, seed_genres

        # Calculate balanced allocation when multiple seed types are present
        active_seed_types = sum(bool(x) for x in [artist_seeds, track_seeds, genre_seeds])
        base_allocation = self.MAX_TOTAL_SEEDS // active_seed_types
        extra_slots = self.MAX_TOTAL_SEEDS % active_seed_types

        # Distribute seeds fairly
        def allocate_seeds(seeds: list, position: int) -> list:
            if not seeds:
                return []
            allocation = base_allocation + (1 if position < extra_slots else 0)
            return seeds[:allocation]

        # Allocate seeds in order of priority (you can adjust the order)
        allocated_artists = allocate_seeds(artist_seeds, 0)
        allocated_tracks = allocate_seeds(track_seeds, 1)
        allocated_genres = allocate_seeds(genre_seeds, 2)

        # Convert back to comma-separated strings
        return (
            ','.join(allocated_artists) if allocated_artists else None,
            ','.join(allocated_tracks) if allocated_tracks else None,
            ','.join(allocated_genres) if allocated_genres else None
        )

    def validate_seeds(self, seed_artists: Optional[str], seed_tracks: Optional[str], seed_genres: Optional[str]) -> None:
        """
        Validate seed quantities and format.
        """
        # Validate that at least one seed type is present
        if not seed_artists and not seed_tracks and not seed_genres:
            raise SpotifyAPIError(
                "At least one seed type (artists, tracks, or genres) must be provided",
                400
            )

        # Validate seed format
        self.validate_seed_format(seed_artists, "artists")
        self.validate_seed_format(seed_tracks, "tracks")
        self.validate_seed_format(seed_genres, "genres")

    def prepare_spotify_params(
        self,
        seed_artists: Optional[str],
        seed_tracks: Optional[str],
        seed_genres: Optional[str],
        **kwargs
    ) -> Dict[str, Any]:
        """Prepare parameters for Spotify API request."""
        # Base parameters
        params = {
            'limit': min(kwargs.get('limit', 20), 100),
            'market': 'IN',
            'timestamp': int(time.time()),
        }
        
        # Handle all possible target attributes
        spotify_attributes = [
            'target_popularity', 'min_popularity',
            'target_energy', 
            'target_danceability',
            'target_valence',
            'target_tempo',
            'target_acousticness',
            'target_instrumentalness',
        ]

        # Add attributes to params if they exist in kwargs
        for attr in spotify_attributes:
            if attr in kwargs and kwargs[attr] is not None:
                value = kwargs[attr]
                # Convert percentage-based values to 0-1 range
                if attr in ['target_energy', 'target_danceability', 'target_valence', 
                           'target_acousticness', 'target_instrumentalness']:
                    value = min(max(float(value), 0.0), 1.0)
                # Handle popularity which is 0-100
                elif 'popularity' in attr:
                    value = min(max(int(value), 0), 100)
                # Handle tempo separately (typically 40-200 BPM)
                elif attr == 'target_tempo':
                    value = min(max(float(value), 40), 200)
                    
                params[attr] = value
        
        # Add seeds only if they exist (after URL decoding)
        if seed_artists:
            params['seed_artists'] = unquote(seed_artists).replace('%2C', ',')
            
        if seed_tracks:
            params['seed_tracks'] = unquote(seed_tracks).replace('%2C', ',')
            
        if seed_genres:
            params['seed_genres'] = unquote(seed_genres).replace('%2C', ',')
        
        # Remove None values
        params = {k: v for k, v in params.items() if v is not None}
        
        logger.debug(f"Final params: {params}")
        return params

    def transform_recommendations(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Transform Spotify API response to desired format.
        
        Raises:
            SpotifyAPIError: If response format is invalid
        """
        try:
            tracks = data.get('tracks', [])
            return {
                'tracks': [{
                    'id': track['id'],
                    'name': track['name'],
                    'artists': [{'id': artist['id'], 'name': artist['name']} 
                              for artist in track['artists']],
                    'album': {
                        'name': track['album']['name'],
                        'images': track['album']['images']
                    },
                    'preview_url': track.get('preview_url'),
                    'explicit': track.get('explicit', False),
                    'duration_ms': track.get('duration_ms', 0),
                    'external_url': track.get('external_urls', {}).get('spotify')
                } for track in tracks]
            }
        except KeyError as e:
            raise SpotifyAPIError(f"Invalid response format from Spotify API: {str(e)}", 502)

    def handle_spotify_error(self, response: requests.Response) -> None:
        """Handle error responses from Spotify API."""
        error_data = response.json()
        error_message = error_data.get('error', {}).get('message', 'Unknown Spotify API error')
        
        status_code_mapping = {
            400: 400,  # Bad Request
            401: 401,  # Unauthorized
            403: 403,  # Forbidden
            404: 404,  # Not Found
            429: 429,  # Too Many Requests
        }
        
        status_code = status_code_mapping.get(response.status_code, 502)
        raise SpotifyAPIError(f"Spotify API error: {error_message}", status_code)

    def get(self, request, *args, **kwargs) -> JsonResponse:
        """Handle GET requests for Spotify recommendations."""
        try:
            # Get seed parameters
            seed_artists = request.GET.get('seed_artists', '')
            seed_tracks = request.GET.get('seed_tracks', '')
            seed_genres = request.GET.get('seed_genres', '')
            
            # Get all possible attributes from request.GET
            attributes = {
                'limit': request.GET.get('limit', 20),
                'target_popularity': request.GET.get('target_popularity'),
                'min_popularity': request.GET.get('min_popularity'),
                'target_energy': request.GET.get('target_energy'),
                'target_danceability': request.GET.get('target_danceability'),
                'target_valence': request.GET.get('target_valence'),
                'target_tempo': request.GET.get('target_tempo'),
                'target_acousticness': request.GET.get('target_acousticness'),
                'target_instrumentalness': request.GET.get('target_instrumentalness'),
            }
            
            # Convert values to appropriate types
            for key, value in attributes.items():
                if value is not None:
                    if key in ['limit', 'target_popularity', 'min_popularity']:
                        attributes[key] = int(value)
                    else:
                        attributes[key] = float(value)

            # Validate seeds
            self.validate_seeds(seed_artists, seed_tracks, seed_genres)
            
            # Balance seeds
            seed_artists, seed_tracks, seed_genres = self.balance_seeds(
                seed_artists, seed_tracks, seed_genres
            )
            
            # Get Spotify access token
            self.access_token = get_spotify_access_token()
            if not self.access_token:
                raise SpotifyAPIError("Failed to obtain Spotify access token", 401)
            
            # Prepare parameters with all attributes
            spotify_params = self.prepare_spotify_params(
                seed_artists=seed_artists,
                seed_tracks=seed_tracks,
                seed_genres=seed_genres,
                **attributes
            )
            
            # Log the API request before making it
            logger.info(f"Sending request to Spotify API: URL={self.SPOTIFY_RECOMMENDATIONS_URL}, params={spotify_params}")
            
            response = requests.get(
                self.SPOTIFY_RECOMMENDATIONS_URL,
                headers=self.get_authorization_header(),
                params=spotify_params,
                timeout=self.REQUEST_TIMEOUT
            )
            
            if response.status_code != 200:
                self.handle_spotify_error(response)
            
            # Transform response
            recommendations = self.transform_recommendations(response.json())
            
            logger.info(f"Successfully fetched {len(recommendations['tracks'])} recommendations")
            return JsonResponse(recommendations)
            
        except SpotifyAPIError as e:
            logger.error(f"Spotify API error: {str(e)}")
            return JsonResponse({"error": str(e)}, status=e.status_code)
            
        except Timeout:
            logger.error("Spotify API request timed out")
            return JsonResponse(
                {"error": "Request to Spotify API timed out"},
                status=504
            )
            
        except ConnectionError:
            logger.error("Failed to connect to Spotify API")
            return JsonResponse(
                {"error": "Failed to connect to Spotify API"},
                status=503
            )
            
        except RequestException as e:
            logger.error(f"Request to Spotify API failed: {str(e)}")
            return JsonResponse(
                {"error": "Failed to communicate with Spotify API"},
                status=502
            )
            
        except Exception as e:
            logger.exception("Unexpected error in SpotifyRecommendationView")
            return JsonResponse(
                {"error": "An unexpected error occurred"},
                status=500
            )
        


class SpotifySearchView(View):
    """Base class for Spotify search endpoints."""
    
    SPOTIFY_SEARCH_URL = 'https://api.spotify.com/v1/search'
    CACHE_TIMEOUT = 60 * 5  # 5 minutes cache
    
    def get_authorization_header(self):
        """Get the authorization header with the access token."""
        return {'Authorization': f'Bearer {self.access_token}'}
    
    def get_cache_key(self, search_type: str, query: str) -> str:
        """Generate a cache-safe key for search results."""
        # Replace spaces and special characters with underscores
        safe_query = slugify(query).replace('-', '_')
        return f"spotify_search_{search_type}_{safe_query}"
    
    def get(self, request, *args, **kwargs):
        """Handle GET requests for Spotify search."""
        try:
            # Get query parameter
            query = request.GET.get('q', '').strip()
            if not query:
                return JsonResponse({'items': []})
            
            # Get Spotify access token
            self.access_token = get_spotify_access_token()
            if not self.access_token:
                logger.error("Failed to obtain Spotify access token")
                return JsonResponse(
                    {"error": "Failed to authenticate with Spotify"},
                    status=500
                )
            
            # Use safe cache key
            cache_key = self.get_cache_key(self.search_type, query)
            cached_result = cache.get(cache_key)
            if cached_result:
                return JsonResponse(cached_result)
            
            # Make request to Spotify API
            params = {
                'q': query,
                'type': self.search_type,
                'limit': 10  # Adjust as needed
            }
            
            response = requests.get(
                self.SPOTIFY_SEARCH_URL,
                headers=self.get_authorization_header(),
                params=params
            )
            
            response.raise_for_status()
            data = response.json()
            
            # Process and format the response
            result = self.format_response(data)
            
            # Cache the result with safe key
            cache.set(cache_key, result, self.CACHE_TIMEOUT)
            
            return JsonResponse(result)
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Spotify API request failed: {str(e)}")
            return JsonResponse(
                {"error": "Failed to fetch results from Spotify"},
                status=500
            )
        except Exception as e:
            logger.exception(f"Error in {self.__class__.__name__}")
            return JsonResponse(
                {"error": "An unexpected error occurred"},
                status=500
            )

class ArtistSearchView(SpotifySearchView):
    """Handle artist search requests."""
    
    search_type = 'artist'
    
    def format_response(self, data):
        """Format the artist search response."""
        artists = data.get('artists', {}).get('items', [])
        return {
            'items': [
                {
                    'id': artist['id'],
                    'name': artist['name'],
                    'images': artist.get('images', []),
                    'popularity': artist.get('popularity', 0),
                    'genres': artist.get('genres', [])
                }
                for artist in artists
            ]
        }

class TrackSearchView(SpotifySearchView):
    """Handle track search requests."""
    
    search_type = 'track'
    
    def format_response(self, data):
        tracks = data.get('tracks', {}).get('items', [])
        return {
            'items': [
                {
                    'id': track['id'],
                    'name': track['name'],
                    'artists': [
                        {
                            'id': artist['id'],
                            'name': artist['name']
                        }
                        for artist in track.get('artists', [])
                    ],
                    'album': {
                        'id': track['album']['id'],
                        'name': track['album']['name'],
                        'images': track['album'].get('images', [])
                    },
                    'duration_ms': track.get('duration_ms', 0),
                    'preview_url': track.get('preview_url'),
                    'explicit': track.get('explicit', False)
                }
                for track in tracks
            ]
        }

class GenreSearchView(SpotifySearchView):
    """Handle genre search requests."""
    
    SPOTIFY_GENRES_URL = 'https://api.spotify.com/v1/recommendations/available-genre-seeds'
    search_type = 'genre'
    
    def get(self, request, *args, **kwargs):
        """Handle GET requests for genre search."""
        try:
            query = request.GET.get('q', '').strip().lower()
            
            # Try to get cached genres first
            cache_key = 'spotify_available_genres'
            available_genres = cache.get(cache_key)
            
            if not available_genres:
                # Get Spotify access token
                self.access_token = get_spotify_access_token()
                if not self.access_token:
                    logger.error("Failed to obtain Spotify access token")
                    return JsonResponse(
                        {"error": "Failed to authenticate with Spotify"},
                        status=500
                    )
                
                # Fetch available genres from Spotify
                response = requests.get(
                    self.SPOTIFY_GENRES_URL,
                    headers=self.get_authorization_header()
                )
                
                response.raise_for_status()
                available_genres = response.json().get('genres', [])
                
                # Sort genres alphabetically for better presentation
                available_genres.sort()
                
                # Cache the genres for future use
                cache.set(cache_key, available_genres, 60 * 60 * 24)  # Cache for 24 hours
            
            # Modified filtering logic: return all genres if no query, 
            # otherwise filter by query
            filtered_genres = (
                [genre for genre in available_genres if query in genre.lower()]
                if query
                else available_genres  # Return all genres instead of limiting
            )
            
            return JsonResponse({
                'items': [
                    {
                        'id': genre,
                        'name': genre.replace('-', ' ').title(),
                        'value': genre,  # Added for form handling
                        'label': genre.replace('-', ' ').title(),  # Added for dropdown display
                    }
                    for genre in filtered_genres
                ]
            })
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Spotify API request failed: {str(e)}")
            return JsonResponse(
                {"error": "Failed to fetch genres from Spotify"},
                status=500
            )
        except Exception as e:
            logger.exception("Error in GenreSearchView")
            return JsonResponse(
                {"error": "An unexpected error occurred"},
                status=500
            )

 