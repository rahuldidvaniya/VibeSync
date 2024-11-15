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
  styled 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExplicitIcon from '@mui/icons-material/Explicit';
import { searchTracks } from '../services/api';
import debounce from 'lodash/debounce';
import { useSeedContext } from '../context/SeedContext';

const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '50%',
  '@media (max-width: 900px)': {
    width: '100%',
  },
});

const SearchWrapper = styled(Box)({
  width: '100%',
});

const TracksList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  width: '100%',
});

const TrackItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  padding: '8px',
  borderRadius: '4px',
  backgroundColor: '#181818',
  gap: '16px',
});

const PlayButton = styled(IconButton)({
  backgroundColor: '#1DB954',
  color: '#000',
  width: '32px',
  height: '32px',
  '&:hover': {
    backgroundColor: '#1ed760',
  },
});

const TrackInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0,
});

const DropdownOption = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 16px',
});

const TrackSection = ({ onError }) => {
  const [trackOptions, setTrackOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState(null);
  const { 
    selectedTracks, 
    updateSeeds, 
    remainingSeeds 
  } = useSeedContext();

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, '0')}`;
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
        onError('Failed to search tracks. Please try again.');
        setTrackOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [onError]
  );

  const handleTrackChange = (_, newValue) => {
    const success = updateSeeds('tracks', newValue);
    if (!success) {
      onError(`Maximum ${MAX_TOTAL_SEEDS} total seeds allowed`);
    }
  };

  const handlePlayTrack = (trackId) => {
    setPlayingTrackId(trackId === playingTrackId ? null : trackId);
  };

  return (
    <Section>
      <Typography variant="h5" sx={{ color: '#fff', fontWeight: 700 }}>
        Tracks
      </Typography>
      
      <SearchWrapper>
        <Autocomplete
          multiple
          options={trackOptions}
          loading={loading}
          getOptionLabel={(option) => option.name}
          onChange={handleTrackChange}
          onInputChange={(_, value) => debouncedSearchTracks(value)}
          noOptionsText={loading ? 'Loading...' : 'No tracks found'}
          disabled={selectedTracks.length >= 5}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for tracks (max 5)"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon sx={{ color: '#b3b3b3', ml: 1 }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Paper 
                key={option.id}
                component="li" 
                {...otherProps}
                elevation={0} 
                sx={{ backgroundColor: 'transparent' }}
              >
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
              </Paper>
            );
          }}
          PaperComponent={({ children, ...props }) => (
            <Paper 
              {...props} 
              sx={{ 
                backgroundColor: '#282828',
                borderRadius: '4px',
                marginTop: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              {children}
            </Paper>
          )}
        />
      </SearchWrapper>

      <TracksList>
        {selectedTracks.map((track) => (
          <TrackItem key={track.id}>
            <Box position="relative" width={40} height={40}>
              <Avatar 
                src={track.album?.images?.[0]?.url}
                variant="square"
                sx={{ width: 40, height: 40 }} 
              />
              {track.preview_url && (
                <PlayButton 
                  size="small"
                  onClick={() => handlePlayTrack(track.id)}
                  sx={{ 
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <PlayArrowIcon />
                </PlayButton>
              )}
            </Box>

            <TrackInfo>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography 
                  noWrap
                  sx={{ 
                    color: playingTrackId === track.id ? '#1DB954' : '#fff',
                    fontSize: '14px',
                    fontWeight: 500,
                  }}
                >
                  {track.name}
                </Typography>
                {track.explicit && (
                  <ExplicitIcon sx={{ fontSize: 16, color: '#b3b3b3' }} />
                )}
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
    </Section>
  );
};

export default TrackSection; 