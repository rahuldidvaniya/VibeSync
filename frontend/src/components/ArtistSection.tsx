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
import { showToast } from '../utils/toast';

interface Artist {
  id: string;
  name: string;
  images?: { 
    url: string;
    height: number;
    width: number;
  }[];
  followers?: { 
    total: number;
  };
  explicit?: boolean;
}

const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
});

const SearchWrapper = styled(Box)({
  width: '100%',
});

const SelectedArtistsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '32px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
}));

const ArtistCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
  padding: '24px',
  backgroundColor: '#181818',
  borderRadius: '16px',
  transition: 'all 0.2s ease',
  height: '100%',
  
  [theme.breakpoints.down('md')]: {
    gap: '8px',
    padding: '16px',
  },

  '&:hover': {
    backgroundColor: '#282828',
    transform: 'translateY(-4px)',
    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)'
  }
}));

const ArtistInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: '4px',
});

const ArtistSection = () => {
  const [artistOptions, setArtistOptions] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  
  const { 
    selectedArtists, 
    updateSeeds, 
    remainingSeeds,
    MAX_TOTAL_SEEDS 
  } = useSeedContext();

  const debouncedSearchArtists = useCallback(
    debounce(async (query: string) => {
      if (!query || query.length < 2) {
        setArtistOptions([]);
        return;
      }
      
      setLoading(true);
      try {
        const response = await searchArtists(query);
        if (response && response.artists && Array.isArray(response.artists.items)) {
          setArtistOptions(response.artists.items);
        } else {
          setArtistOptions([]);
        }
      } catch (error) {
        console.error('Artist search failed:', error);
        showToast.error('Failed to search artists. Please try again.');
        setArtistOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleArtistChange = useCallback((_event: React.SyntheticEvent, newValue: Artist | null) => {
    if (!newValue) return;
    
    const isAlreadySelected = selectedArtists.some(artist => artist.id === newValue.id);
    if (isAlreadySelected) {
      setError('Artist already selected');
      return;
    }

    try {
      const success = updateSeeds('artists', newValue as any);
      if (!success) {
        setError(`Maximum ${MAX_TOTAL_SEEDS} total seeds allowed`);
      }
    } catch (error) {
      console.error('Failed to update artists:', error);
      setError('Failed to update selection');
    }
  }, [selectedArtists, updateSeeds, MAX_TOTAL_SEEDS]);

  const handleRemoveArtist = useCallback((artistId: string) => {
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
          onInputChange={(_event, value) => {
            debouncedSearchArtists(value);
          }}
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
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {option.explicit && (
                      <Typography
                        component="span"
                        sx={{
                          fontSize: '0.6rem',
                          backgroundColor: '#b3b3b3',
                          color: '#000',
                          padding: '2px 4px',
                          borderRadius: '2px',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                        }}
                      >
                        E
                      </Typography>
                    )}
                    <Typography sx={{ fontWeight: 500 }}>
                      {option.name}
                    </Typography>
                  </Box>
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
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <ArtistInfo>
                <Typography 
                  sx={{ 
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    color: '#fff',
                    lineHeight: 1.3
                  }}
                >
                  {artist.name}
                </Typography>
                <Typography 
                  sx={{ 
                    fontSize: '0.85rem',
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