import { 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  Grid,
  styled 
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ExplicitIcon from '@mui/icons-material/Explicit';

const TrackCard = styled(Card)({
  backgroundColor: '#181818',
  padding: '16px',
  transition: 'background-color 0.3s ease',
  cursor: 'pointer',
  width: '100%',
  maxWidth: '200px',
  '&:hover': {
    backgroundColor: '#282828',
    '& .play-button': {
      opacity: 1,
      transform: 'translateY(0)',
      visibility: 'visible',
    }
  },
});

const PlayButton = styled(IconButton)({
  backgroundColor: '#1DB954',
  color: '#000',
  width: '48px',
  height: '48px',
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  opacity: 0,
  visibility: 'hidden',
  transform: 'translateY(8px)',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  '&:hover': {
    backgroundColor: '#1ed760',
    transform: 'translateY(0) scale(1.04)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '28px',
  },
});

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  marginBottom: '16px',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    transition: 'background-color 0.3s ease',
  },
  '&:hover::after': {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

const TrackImage = styled('img')({
  width: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
  borderRadius: '6px',
  boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
});

const RecommendedTracks = ({ tracks }) => {
  const handlePlayTrack = (spotifyUri) => {
    window.open(`spotify:track:${spotifyUri}`, '_blank');
  };

  return (
    <Box sx={{ padding: '32px 24px' }}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: '#fff', 
          fontWeight: 700,
          marginBottom: '24px'
        }}
      >
        Recommended Tracks
      </Typography>

      <Grid 
        container 
        spacing={2}
        sx={{ 
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {tracks.map((track) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={track.id}>
            <TrackCard elevation={0}>
              <ImageContainer>
                <TrackImage 
                  src={track.album.images[0]?.url} 
                  alt={track.name}
                />
                <PlayButton 
                  className="play-button"
                  onClick={() => handlePlayTrack(track.id)}
                  size="large"
                >
                  <PlayCircleIcon />
                </PlayButton>
              </ImageContainer>
              
              <Box>
                <Typography 
                  noWrap
                  sx={{ 
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 700,
                    marginBottom: '4px',
                  }}
                >
                  {track.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.5}>
                  {track.explicit && (
                    <ExplicitIcon 
                      sx={{ 
                        fontSize: 16, 
                        color: '#b3b3b3',
                        marginRight: '4px'
                      }} 
                    />
                  )}
                  <Typography 
                    noWrap
                    sx={{ 
                      color: '#b3b3b3',
                      fontSize: '12px',
                    }}
                  >
                    {track.artists.map(a => a.name).join(', ')}
                  </Typography>
                </Box>
              </Box>
            </TrackCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default RecommendedTracks; 