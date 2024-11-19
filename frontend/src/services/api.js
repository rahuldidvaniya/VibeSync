const API_BASE_URL = 'https://vibesync-2f2a.onrender.com';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    // Try to get error message from response
    try {
      const errorData = await response.json();
      throw new Error(errorData.error || 'API request failed');
    } catch (e) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  return response.json();
};

export const searchArtists = async (query) => {
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
    const data = await handleResponse(response);
    // Ensure we have the expected data structure
    if (!data || !Array.isArray(data.items)) {
      throw new Error('Invalid response format');
    }
    return {
      artists: {
        items: data.items
      }
    };
  } catch (error) {
    console.error('Artist search error:', error);
    throw error;
  }
};

export const searchTracks = async (query) => {
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
    return handleResponse(response);
  } catch (error) {
    console.error('Track search error:', error);
    throw error;
  }
};

export const getRecommendations = async (selectedArtists, selectedTracks, selectedGenres, attributes) => {
  try {
    const seed_artists = selectedArtists.map(artist => artist.id).join(',');
    const seed_tracks = selectedTracks.map(track => track.id).join(',');
    const seed_genres = selectedGenres.join(',');
    
    // Create an array of all possible attribute parameters
    const attributeParams = [
      'target_energy', 'target_danceability', 'target_valence',
      'target_popularity', 'target_tempo', 'target_acousticness',
      'target_instrumentalness', 'target_loudness', 'target_speechiness',
      'target_liveness', 'min_popularity', 'min_tempo', 'max_tempo',
      'max_instrumentalness', 'max_acousticness', 'max_speechiness',
      'max_loudness', 'limit', 'min_energy', 'max_energy',
      'min_danceability', 'max_danceability',
      'min_valence', 'max_valence',
      'min_tempo', 'max_tempo',
      'min_acousticness', 'max_acousticness',
      'min_instrumentalness', 'max_instrumentalness',
      'min_speechiness', 'max_speechiness',
      'min_liveness', 'max_liveness', 'mode', 'key',
    ];

    const songAttributeParams = Object.fromEntries(attributeParams.filter(param => attributes?.[param] !== undefined).map(param=>[param, attributes[param]]));
    console.log(songAttributeParams);

    // Build query parameters object
    const queryParams = new URLSearchParams({
      ...(seed_artists && { seed_artists }),
      ...(seed_tracks && { seed_tracks }),
      ...(seed_genres && { seed_genres }),
      ...Object.fromEntries(
        attributeParams
          .filter(param => attributes?.[param] !== undefined)
          .map(param => [param, attributes[param]])
      )
    });
    console.log(queryParams.toString()); 
   

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
    return handleResponse(response);
  } catch (error) {
    console.error('Recommendations error:', error);
    throw error;
  }
};

export const getAvailableGenres = async () => {
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
    const data = await handleResponse(response);
    return {
      items: data.items.map(genre => ({
        id: genre.id,
        value: genre.value,
        label: genre.label,
        type: 'genre'
      })),
      total: data.total
    };
  } catch (error) {
    console.error('Failed to fetch genres:', error);
    throw error;
  }
}; 