import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecommendedTracks from '../components/RecommendedTracks';
import { motion, Variants } from 'framer-motion';

// Interfaces
interface LocationState {
  tracks: Track[];
}

interface Track {
  id: string;
  name: string;
  album: {
    images: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  artists: Array<{
    id: string;
    name: string;
  }>;
  explicit: boolean;
  duration_ms: number;
}

interface ContainerVariants extends Variants {
  hidden: {
    opacity: number;
    y: number;
  };
  visible: {
    opacity: number;
    y: number;
    transition: {
      duration: number;
      ease: string;
    };
  };
}

// Styled Components
const BackButton = styled(Button)({
  color: '#fff',
  marginBottom: '32px',
  padding: '8px 16px',
  borderRadius: '12px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateX(-4px)',
  },
  transition: 'all 0.3s ease',
});

const MotionBox = styled(motion.div)({
  width: '100%',
});

const RecommendationsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tracks } = (location.state as LocationState) || { tracks: [] };

  const containerVariants: ContainerVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const handleBackClick = (): void => {
    navigate('/');
  };

  return (
    <Box>
      <MotionBox
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <Box sx={{ padding: '32px 24px 0' }}>
          <BackButton 
            startIcon={<ArrowBackIcon />}
            onClick={handleBackClick}
          >
            Back to Search
          </BackButton>

          <Box sx={{ 
            textAlign: 'center',
            mb: 4,
            width: '100%'
          }}>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                mb: 2,
                background: 'linear-gradient(90deg, #fff, #1DB954)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Your Personalized Recommendations
            </Typography>
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.secondary',
                maxWidth: '600px',
                margin: '0 auto'
              }}
            >
              Based on your selected artists, tracks, and preferences, 
              we've curated the perfect playlist just for you.
            </Typography>
          </Box>
        </Box>

        <RecommendedTracks tracks={tracks} />
      </MotionBox>
    </Box>
  );
};

export default RecommendationsPage; 