import { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Autocomplete, 
  TextField, 
  Avatar, 
  Paper,
  CircularProgress,
  IconButton,
  styled,
  Snackbar,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExplicitIcon from '@mui/icons-material/Explicit';
import { searchTracks } from '../services/api';
import debounce from 'lodash/debounce';
import { useSeedContext } from '../context/SeedContext';
import SearchDropdown from './shared/SearchDropdown';

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

const TracksList = styled(Box)(({ theme }) => ({
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

const TrackItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '16px',
  borderRadius: '12px',
  backgroundColor: '#181818',
  gap: '20px',
  transition: 'all 0.2s ease',
  
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

const TrackInfo = styled(Box)(({ theme }) => ({
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

const DropdownOption = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 16px',
});

const TrackSection = () => {
  const [trackOptions, setTrackOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');
  const { 
    selectedTracks, 
    updateSeeds, 
    remainingSeeds,
    MAX_TOTAL_SEEDS
  } = useSeedContext();

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
  };

  const handleError = (message) => {
    setError(message);
  };

  const debouncedSearchTracks = useCallback(
    debounce(async (query) => {
      if (!query) {
        setTrackOptions([]);
        return;
      }
      
      setLoading(true);
      try {
        const data = await searchTracks(query);
        setTrackOptions(data.items);
      } catch (error) {
        console.error('Track search failed:', error);
        handleError('Failed to search tracks. Please try again.');
        setTrackOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    []
  );

  const handleTrackChange = (_, newValue) => {
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

  return (
    <Section>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
        Tracks
      </Typography>
      
      <SearchWrapper>
        <SearchDropdown
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
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          clearOnSelect={true}
          renderOption={(props, option) => (
            <li {...props}>
              <DropdownOption>
                <Avatar 
                  src={option.album?.images?.[0]?.url} 
                  variant="square"
                  sx={{ width: 40, height: 40 }} 
                />
                <Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography 
                      color="text.primary"
                      sx={{ fontSize: '14px', fontWeight: 500 }}
                    >
                      {option.name}
                    </Typography>
                    {option.explicit && (
                      <ExplicitIcon sx={{ fontSize: 16, color: '#b3b3b3' }} />
                    )}
                  </Box>
                  <Typography 
                    color="text.secondary" 
                    sx={{ fontSize: '12px' }}
                  >
                    {option.artists?.map(a => a.name).join(', ')}
                  </Typography>
                </Box>
              </DropdownOption>
            </li>
          )}
        />
      </SearchWrapper>

      <TracksList>
        {selectedTracks.map((track) => (
          <TrackItem key={track.id}>
            <Avatar 
              src={track.album?.images?.[0]?.url}
              variant="square"
              sx={{ width: 40, height: 40 }} 
            />

            <TrackInfo>
              <Box display="flex" alignItems="center" gap={1}>
                {track.explicit && (
                  <ExplicitIcon sx={{ fontSize: 16, color: '#b3b3b3' }} />
                )}
                <Typography 
                  noWrap
                  sx={{ 
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {track.name}
                </Typography>
              </Box>
              <Typography 
                noWrap
                sx={{ 
                  color: '#b3b3b3',
                  fontSize: '12px',
                }}
              >
                {track.artists?.map(a => a.name).join(', ')}
              </Typography>
            </TrackInfo>

            <Typography 
              sx={{ 
                color: '#b3b3b3',
                fontSize: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              {formatDuration(track.duration_ms)}
            </Typography>
          </TrackItem>
        ))}
      </TracksList>
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