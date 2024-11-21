import { Artist, Track, Image } from '../types/spotify';

// Add SpotifyApi namespace
declare namespace SpotifyApi {
  interface ArtistObjectFull {
    id: string;
    name: string;
    images: Image[];
    followers: {
      total: number;
    };
  }
}

interface RecommendationAttributes {
  target_energy?: number;
  target_danceability?: number;
  target_valence?: number;
  target_popularity?: number;
  target_tempo?: number;
  target_acousticness?: number;
  target_instrumentalness?: number;
  target_loudness?: number;
  target_speechiness?: number;
  target_liveness?: number;
  min_popularity?: number;
  min_tempo?: number;
  max_tempo?: number;
  min_energy?: number;
  max_energy?: number;
  min_danceability?: number;
  max_danceability?: number;
  min_valence?: number;
  max_valence?: number;
  min_acousticness?: number;
  max_acousticness?: number;
  min_instrumentalness?: number;
  max_instrumentalness?: number;
  min_speechiness?: number;
  max_speechiness?: number;
  min_liveness?: number;
  max_liveness?: number;
  mode?: number;
  key?: number;
  limit?: number;
  [key: string]: number | undefined;
}

interface GenreResponse {
  id: string;
  value: string;
  label: string;
  type: 'genre';
}

const API_BASE_URL = '/api';

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API request failed');
    } catch (e) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
};

export const searchArtists = async (query: string): Promise<{ artists: { items: SpotifyApi.ArtistObjectFull[] } }> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/artists/?q=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await handleResponse<{ items: Artist[] }>(response);
    return {
      artists: {
        items: data.items as SpotifyApi.ArtistObjectFull[]
      }
    };
  } catch (error) {
    console.error('Artist search error:', error);
    throw error;
  }
};

export const searchTracks = async (query: string): Promise<{ items: Track[] }> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search/tracks/?q=${encodeURIComponent(query)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return handleResponse<{ items: Track[] }>(response);
  } catch (error) {
    console.error('Track search error:', error);
    throw error;
  }
};

export const getRecommendations = async (
  selectedArtists: Artist[],
  selectedTracks: Track[],
  selectedGenres: string[],
  attributes: RecommendationAttributes
): Promise<{ tracks: Track[] }> => {
  try {
    const seed_artists = selectedArtists.map(artist => artist.id).join(',');
    const seed_tracks = selectedTracks.map(track => track.id).join(',');
    const seed_genres = selectedGenres.join(',');
    
    const attributeParams = Object.entries(attributes)
      .filter(([_, value]) => value !== undefined)
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    const queryParams = new URLSearchParams({
      ...(seed_artists && { seed_artists }),
      ...(seed_tracks && { seed_tracks }),
      ...(seed_genres && { seed_genres }),
      ...attributeParams
    });

    const response = await fetch(
      `${API_BASE_URL}/recommendations/?${queryParams}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await handleResponse<{ tracks: Track[] }>(response);
    return data;
  } catch (error) {
    console.error('Recommendations error:', error);
    throw error;
  }
};

export const getAvailableGenres = async (): Promise<{ items: GenreResponse[], total: number }> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/available-genres/`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await handleResponse<{ items: GenreResponse[], total: number }>(response);
    return {
      items: data.items,
      total: data.total
    };
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    throw error;
  }
}; 