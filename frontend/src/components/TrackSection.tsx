import { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Snackbar, 
  Alert,
  styled,
  Theme
} from '@mui/material';
import ExplicitIcon from '@mui/icons-material/Explicit';
import { searchTracks } from '../services/api';
import debounce from 'lodash/debounce';
import { useSeedContext } from '../context/SeedContext';
import SearchDropdown from './shared/SearchDropdown';
import { showToast } from '../utils/toast';

// Interfaces
interface Image {
  url: string;
  height: number;
  width: number;
}

interface Artist {
  id: string;
  name: string;
  images?: Image[];
}

interface Album {
  id: string;
  name: string;
  images: Image[];
}

interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  explicit: boolean;
  duration_ms: number;
}

// Styled Components with proper Theme typing
const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
  '& .MuiTextField-root': {
    minWidth: '300px',
    width: '100%',
  },
});

const SearchWrapper = styled(Box)({
  width: '100%',
  '& .MuiAutocomplete-root': {
    width: '100%',
  },
  '& .MuiOutlinedInput-root': {
    width: '100%',
  },
});

const TracksList = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '16px',
  width: '100%',
  maxWidth: '1200px',
  margin: '0 auto',
  
  [theme.breakpoints.down('md')]: {
    gap: '12px',
  }
}));

const TrackItem = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: '#181818',
  gap: '20px',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
  
  [theme.breakpoints.down('md')]: {
    padding: '12px',
    gap: '16px',
  },

  '&:hover': {
    backgroundColor: '#282828',
    transform: 'translateX(4px)',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
  }
}));

const TrackInfo = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '4px',
  minWidth: 0,
  
  '& .MuiTypography-root': {
    fontSize: '14px',
    
    [theme.breakpoints.down('md')]: {
      fontSize: '13px',
    }
  },
  
  '& .MuiTypography-body2': {
    fontSize: '12px',
    
    [theme.breakpoints.down('md')]: {
      fontSize: '11px',
    }
  }
}));

const Duration = styled(Typography)({
  color: '#b3b3b3',
  fontSize: '0.85rem',
  marginLeft: 'auto',
  paddingLeft: '8px',
  whiteSpace: 'nowrap',
});

const TrackSection: React.FC = () => {
  const [trackOptions, setTrackOptions] = useState<Track[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [inputValue, setInputValue] = useState<string>('');
  
  const { 
    selectedTracks, 
    updateSeeds, 
    MAX_TOTAL_SEEDS
  } = useSeedContext();

  const formatDuration = (ms: number): string => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const handleError = (message: string): void => {
    setError(message);
  };

  const debouncedSearchTracks = useCallback(
    debounce(async (query: string): Promise<void> => {
      if (!query) {
        setTrackOptions([]);
        return;
      }
      
      setLoading(true);
      try {
        const response = await searchTracks(query);
        setTrackOptions(response.items);
      } catch (error) {
        console.error('Track search failed:', error);
        showToast.error('Failed to search tracks. Please try again.');
        setTrackOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleTrackChange = (_: React.SyntheticEvent, newValue: Track | null): void => {
    if (!newValue) return;
    
    const isAlreadySelected = selectedTracks.some(track => track.id === newValue.id);
    if (isAlreadySelected) {
      handleError('Track already selected');
      return;
    }

    const success = updateSeeds('tracks', newValue);
    if (!success) {
      handleError(`Maximum ${MAX_TOTAL_SEEDS} total seeds allowed`);
      return;
    }
    
    setInputValue('');
  };

  const handleRemoveTrack = useCallback((trackId: string): void => {
    const updatedTracks = selectedTracks.filter(track => track.id !== trackId);
    updateSeeds('tracks', updatedTracks);
  }, [selectedTracks, updateSeeds]);

  return (
    <Section>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
        Tracks
      </Typography>
      
      <SearchWrapper>
        <SearchDropdown<Track>
          options={trackOptions}
          loading={loading}
          onInputChange={(_, value) => {
            setInputValue(value);
            debouncedSearchTracks(value);
          }}
          onChange={handleTrackChange}
          value={null}
          inputValue={inputValue}
          placeholder="Search for tracks (max 5)"
          getOptionLabel={(option: Track) => option.name}
          isOptionEqualToValue={(option: Track, value: Track) => option.id === value.id}
          renderOption={(props, option: Track) => (
            <Box
              {...props}
              component="li"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: 1
              }}
            >
              <img
                src={option.album?.images?.[2]?.url || '/default-album.png'}
                alt={option.name}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '4px',
                  objectFit: 'cover',
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography sx={{ fontWeight: 500 }}>
                  {option.name}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 0.2,
                  color: 'text.secondary',
                  fontSize: '0.875rem' 
                }}>
                  {option.explicit && (
                    <ExplicitIcon 
                      sx={{ 
                        fontSize: '16px',
                        opacity: 0.7 
                      }} 
                    />
                  )}
                  <Typography 
                    noWrap
                    sx={{ 
                      fontSize: 'inherit',
                      color: 'inherit'
                    }}
                  >
                    {option.artists?.map(artist => artist.name).join(', ')}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        />
      </SearchWrapper>

      {selectedTracks?.length > 0 && (
        <TracksList>
          {selectedTracks.map((track) => (
            <TrackItem 
              key={track.id}
              onClick={() => handleRemoveTrack(track.id)}
            >
              <img
                src={track.album?.images?.[0]?.url || '/default-album.png'}
                alt={track.name}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '6px',
                  objectFit: 'cover',
                }}
              />
              <TrackInfo>
                <Typography 
                  sx={{ 
                    fontWeight: 600,
                    color: '#fff',
                    fontSize: '0.95rem'
                  }}
                >
                  {track.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.3}>
                  {track.explicit && (
                    <ExplicitIcon sx={{ fontSize: 20, color: '#b3b3b3' }} />
                  )}
                  <Typography 
                    sx={{ 
                      color: '#b3b3b3',
                      fontSize: '0.85rem'
                    }}
                  >
                    {track.artists?.map(artist => artist.name).join(', ')}
                  </Typography>
                </Box>
              </TrackInfo>
              <Duration>
                {formatDuration(track.duration_ms)}
              </Duration>
            </TrackItem>
          ))}
        </TracksList>
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

export default TrackSection; 