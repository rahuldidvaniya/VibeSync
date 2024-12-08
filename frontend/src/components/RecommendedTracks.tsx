import { 
  Box, 
  Typography, 
  IconButton, 
  Card, 
  Grid,
  styled 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExplicitIcon from '@mui/icons-material/Explicit';
import { motion } from 'framer-motion';
import { showToast } from '../utils/toast';

// Interfaces
interface Artist {
  id: string;
  name: string;
}

interface Album {
  images: Array<{
    url: string;
  }>;
}

interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  explicit: boolean;
}

interface RecommendedTracksProps {
  tracks: Track[];
}

// Styled Components
const TrackCard = styled(Card)({
  backgroundColor: '#181818',
  padding: '16px',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  width: '100%',
  maxWidth: '200px',
  borderRadius: '8px',
  position: 'relative',
  '&:hover': {
    backgroundColor: '#282828',
    transform: 'translateY(-4px)',
  },
});

const PlayButton = styled(IconButton)({
  backgroundColor: '#1DB954',
  color: '#000',
  width: '45px',
  height: '45px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%) translateY(10px)',
  opacity: 0,
  visibility: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: '0 8px 16px rgba(0,0,0,0.3)',
  padding: '8px',
  '&:hover': {
    backgroundColor: '#1ed760',
    transform: 'translate(-50%, -50%) scale(1.1)',
    boxShadow: '0 8px 16px rgba(0,0,0,0.4)',
  },
  '& .MuiSvgIcon-root': {
    fontSize: '24px',
  },
});

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  marginBottom: '16px',
  borderRadius: '6px',
  overflow: 'hidden',
  '&:hover': {
    '& .play-button': {
      opacity: 1,
      visibility: 'visible',
      transform: 'translate(-50%, -50%)',
    },
    '& .track-image': {
      transform: 'scale(1.05)',
      filter: 'brightness(0.7)',
    }
  }
});

const TrackImage = styled('img')({
  width: '100%',
  aspectRatio: '1',
  objectFit: 'cover',
  transition: 'all 0.3s ease',
  borderRadius: '6px',
});

const TrackInfo = styled(Box)({
  padding: '4px 0',
});

const MobileTrackCard = styled(Card)({
  backgroundColor: 'transparent',
  padding: '8px',
  cursor: 'pointer',
  width: '100%',
  borderRadius: '4px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const MobileImageContainer = styled(Box)({
  position: 'relative',
  width: '48px',
  height: '48px',
  borderRadius: '4px',
  overflow: 'hidden',
  flexShrink: 0,
  '&:hover': {
    '& .play-button': {
      opacity: 1,
      visibility: 'visible',
      transform: 'translate(-50%, -50%)',
    },
    '& .track-image': {
      filter: 'brightness(0.7)',
    }
  }
});

const RecommendedTracks: React.FC<RecommendedTracksProps> = ({ tracks }) => {
  const handlePlayTrack = (trackId: string): void => {
    try {
      const spotifyAppUrl = `spotify:track:${trackId}`;
      const spotifyWebUrl = `https://open.spotify.com/track/${trackId}`;

      const openWebPlayer = (): void => {
        window.open(spotifyWebUrl, '_blank');
        showToast.success('Opening in Spotify');
      };

      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.src = spotifyAppUrl;

        setTimeout(() => {
          document.body.removeChild(iframe);
          openWebPlayer();
        }, 2000);
      } catch (error) {
        openWebPlayer();
      }
    } catch (error) {
      showToast.error('Failed to open track in Spotify');
    }
  };

  return (
    <Box sx={{ padding: { xs: '32px 16px', sm: '32px 24px' } }}>
      <Typography 
        variant="h5" 
        sx={{ 
          color: '#fff', 
          fontWeight: 700,
          marginBottom: { xs: '16px', sm: '24px' }
        }}
      >
        Recommended Tracks
      </Typography>

      {/* Desktop View */}
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <Grid 
          container 
          spacing={2}
          sx={{ 
            maxWidth: '1200px',
            margin: '0 auto'
          }}
        >
          {tracks.map((track, index) => (
            <Grid 
              item 
              sm={4} 
              md={3} 
              lg={2} 
              key={`desktop-${track.id}`}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut'
              }}
            >
              <TrackCard elevation={0}>
                <ImageContainer>
                  <TrackImage 
                    className="track-image"
                    src={track.album.images[0]?.url} 
                    alt={track.name}
                  />
                  <PlayButton 
                    className="play-button"
                    onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                      e.stopPropagation();
                      handlePlayTrack(track.id);
                    }}
                    size="medium"
                    aria-label="Play on Spotify"
                  >
                    <PlayArrowIcon />
                  </PlayButton>
                </ImageContainer>
                
                <TrackInfo>
                  <Typography 
                    noWrap
                    sx={{ 
                      color: '#fff',
                      fontSize: '14px',
                      fontWeight: 600,
                      marginBottom: '4px',
                      lineHeight: 1.2,
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
                        lineHeight: 1.2,
                      }}
                    >
                      {track.artists.map(a => a.name).join(', ')}
                    </Typography>
                  </Box>
                </TrackInfo>
              </TrackCard>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Mobile View */}
      <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
        {tracks.map((track, index) => (
          <Box
            key={`mobile-${track.id}`}
            component={motion.div}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 0.5,
              delay: index * 0.1,
              ease: 'easeOut'
            }}
            mb={1}
          >
            <MobileTrackCard 
              elevation={0}
              onClick={() => handlePlayTrack(track.id)}
            >
              <MobileImageContainer>
                <TrackImage 
                  className="track-image"
                  src={track.album.images[0]?.url} 
                  alt={track.name}
                />
              </MobileImageContainer>
              
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography 
                  noWrap
                  sx={{ 
                    color: '#fff',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginBottom: '5px',
                  }}
                >
                  {track.name}
                </Typography>
                <Box display="flex" alignItems="center" gap={0.25}>
                  {track.explicit && (
                    <ExplicitIcon 
                      sx={{ 
                        fontSize: 14, 
                        color: '#b3b3b3',
                        marginRight: '1px'
                      }} 
                    />
                  )}
                  <Typography 
                    noWrap
                    sx={{ 
                      color: '#b3b3b3',
                      fontSize: '12px',
                      lineHeight: 1.2,
                    }}
                  >
                    {track.artists.map(a => a.name).join(', ')}
                  </Typography>
                </Box>
              </Box>
            </MobileTrackCard>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RecommendedTracks; 