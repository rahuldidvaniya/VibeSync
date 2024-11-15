const API_BASE_URL = '/api';

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
    return handleResponse(response);
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
    
    const queryParams = new URLSearchParams({
      ...(seed_artists && { seed_artists }),
      ...(seed_tracks && { seed_tracks }),
      ...(seed_genres && { seed_genres }),
      ...(attributes?.limit && { limit: attributes.limit })
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
    return handleResponse(response);
  } catch (error) {
    console.error('Recommendations error:', error);
    throw error;
  }
}; 