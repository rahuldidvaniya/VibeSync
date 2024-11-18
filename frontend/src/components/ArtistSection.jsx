import { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  styled,
  Snackbar,
  Alert
} from '@mui/material';
import { searchArtists } from '../services/api';
import debounce from 'lodash/debounce';
import { useSeedContext } from '../context/SeedContext';
import SearchDropdown from './shared/SearchDropdown';
import { formatFollowers } from '../utils/formatters';

const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
});

const SearchWrapper = styled(Box)({
  width: '100%',
});

const SelectedArtistsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '16px',
  width: '100%',
});

const ArtistCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '16px',
  backgroundColor: '#181818',
  borderRadius: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#282828',
    transform: 'translateY(-2px)',
  }
});

const ArtistInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '4px',
});

const ArtistSection = () => {
  const [artistOptions, setArtistOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { 
    selectedArtists, 
    updateSeeds, 
    remainingSeeds,
    MAX_TOTAL_SEEDS 
  } = useSeedContext();

  const debouncedSearchArtists = useCallback(
    debounce(async (query) => {
      if (!query || query.length < 2) {
        setArtistOptions([]);
        return;
      }
      
      setLoading(true);
      try {
        const data = await searchArtists(query);
        if (!data?.artists?.items) {
          setArtistOptions([]);
          return;
        }
        setArtistOptions(data.artists.items);
      } catch (error) {
        console.error('Artist search failed:', error);
        setError('Failed to search artists. Please try again.');
        setArtistOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleArtistChange = useCallback((event, newValue) => {
    if (!newValue) return;
    
    const isAlreadySelected = selectedArtists.some(artist => artist.id === newValue.id);
    if (isAlreadySelected) {
      setError('Artist already selected');
      return;
    }

    try {
      const success = updateSeeds('artists', newValue);
      if (!success) {
        setError(`Maximum ${MAX_TOTAL_SEEDS} total seeds allowed`);
      }
    } catch (error) {
      console.error('Failed to update artists:', error);
      setError('Failed to update selection');
    }
  }, [selectedArtists, updateSeeds, MAX_TOTAL_SEEDS]);

  const handleRemoveArtist = useCallback((artistId) => {
    const updatedArtists = selectedArtists.filter(artist => artist.id !== artistId);
    updateSeeds('artists', updatedArtists);
  }, [selectedArtists, updateSeeds]);

  return (
    <Section>
      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
        Artists ({selectedArtists.length})
        {remainingSeeds > 0 && (
          <Typography 
            component="span" 
            sx={{ 
              color: '#b3b3b3',
              fontSize: '14px',
              marginLeft: '8px'
            }}
          >
            {remainingSeeds} more available
          </Typography>
        )}
      </Typography>

      <SearchWrapper>
        <SearchDropdown
          options={artistOptions}
          loading={loading}
          onInputChange={(_, value) => debouncedSearchArtists(value)}
          onChange={handleArtistChange}
          placeholder="Search for artists..."
          getOptionLabel={(option) => option?.name || ''}
          isOptionEqualToValue={(option, value) => option?.id === value?.id}
          renderOption={(props, option) => (
            <Box
              {...props}
              component="li"
            >
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 2,
                py: 1
              }}>
                <img
                  src={option.images?.[0]?.url || '/default-artist.png'}
                  alt={option.name}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    objectFit: 'cover',
                  }}
                />
                <Box>
                  <Typography sx={{ fontWeight: 500 }}>
                    {option.name}
                  </Typography>
                  <Typography 
                    sx={{ 
                      fontSize: '0.75rem',
                      color: '#b3b3b3'
                    }}
                  >
                    {formatFollowers(option.followers)}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        />
      </SearchWrapper>

      {selectedArtists?.length > 0 && (
        <SelectedArtistsGrid>
          {selectedArtists.map((artist) => (
            <ArtistCard 
              key={artist.id}
              onClick={() => handleRemoveArtist(artist.id)}
              sx={{ 
                cursor: 'pointer',
              }}
            >
              <img
                src={artist.images?.[0]?.url || '/default-artist.png'}
                alt={artist.name}
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <ArtistInfo>
                <Typography 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    color: '#fff',
                    lineHeight: 1.2
                  }}
                >
                  {artist.name}
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: '0.75rem',
                    color: '#b3b3b3',
                    fontWeight: 400
                  }}
                >
                  {formatFollowers(artist.followers)}
                </Typography>
              </ArtistInfo>
            </ArtistCard>
          ))}
        </SelectedArtistsGrid>
      )}

      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={() => setError('')}
      >
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      </Snackbar>
    </Section>
  );
};

export default ArtistSection;