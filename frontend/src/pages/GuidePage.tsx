import { Box, Typography, Container, Paper, styled } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import InfoIcon from '@mui/icons-material/Info';
import { motion, Variants } from 'framer-motion';

// Interfaces
interface AudioFeature {
  name: string;
  description: string;
  range: string;
  examples: {
    high: string;
    low: string;
  };
  icon: string;
}

interface Step {
  title: string;
  description: string;
}

// Animation Variants
interface AnimationVariants extends Variants {
  hidden: {
    opacity: number;
    y?: number;
  };
  visible: {
    opacity: number;
    y?: number;
    transition?: {
      duration?: number;
      staggerChildren?: number;
    };
  };
}

// Styled Components
const PageContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  paddingTop: '64px',
  backgroundColor: theme.palette.background.default,
  marginTop: '30px',
  minHeight: '100vh',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
    paddingTop: '84px',
    marginTop: '40px',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#1DB954',
  borderRadius: '12px',
  padding: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
  width: 'fit-content',
  boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1.5),
  },
}));

const StepNumber = styled(Typography)({
  backgroundColor: '#1DB954',
  color: '#000',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  marginRight: '16px',
  boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
});

const StepContainer = styled(motion.div)({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '24px',
  padding: '16px',
  borderRadius: '12px',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
});

const FeatureCard = styled(Paper)({
  padding: '24px',
  borderRadius: '12px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  height: '100%',
  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
});

const FeatureIcon = styled(Box)({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  backgroundColor: '#1DB954',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
});

const GuidePage: React.FC = () => {
  const containerVariants: AnimationVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: AnimationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const audioFeatures: AudioFeature[] = [
    {
      name: 'Energy',
      description: 'Represents the intensity and activity level of the track. High energy tracks feel fast, loud, and noisy.',
      range: '0.0 to 1.0',
      examples: {
        high: 'Rock or EDM tracks',
        low: 'Slow ballads, ambient music'
      },
      icon: '⚡'
    },
    {
      name: 'Danceability',
      description: 'Describes how suitable a track is for dancing based on tempo, rhythm stability, beat strength, and regularity.',
      range: '0.0 to 1.0',
      examples: {
        high: 'Pop and dance music',
        low: 'Classical or ambient music'
      },
      icon: '💃'
    },
    {
      name: 'Valence',
      description: 'Musical positiveness conveyed by a track. High valence sounds more positive, while low valence sounds more negative.',
      range: '0.0 to 1.0',
      examples: {
        high: 'Happy, cheerful songs',
        low: 'Sad, angry songs'
      },
      icon: '😊'
    },
    {
      name: 'Acousticness',
      description: 'Confidence measure of whether the track is acoustic. Higher values represent more acoustic sounds.',
      range: '0.0 to 1.0',
      examples: {
        high: 'Unplugged versions, acoustic guitar',
        low: 'Electronic music, heavily produced tracks'
      },
      icon: '🎸'
    },
    {
      name: 'Instrumentalness',
      description: 'Predicts whether a track contains no vocals. Higher values represent instrumental music.',
      range: '0.0 to 1.0',
      examples: {
        high: 'Classical music, instrumental jazz',
        low: 'Pop songs with vocals'
      },
      icon: '🎹'
    },
    {
      name: 'Tempo',
      description: 'The overall estimated tempo of a track in beats per minute (BPM).',
      range: '0 to 250+ BPM',
      examples: {
        high: 'Fast dance music (180+ BPM)',
        low: 'Slow ballads (60-80 BPM)'
      },
      icon: '⏱️'
    }
  ];

  const steps: Step[] = [
    {
      title: "Select Your Seeds",
      description: "Choose up to 5 total seeds from your favorite artists, tracks, or genres. These seeds will be used as the foundation for your recommendations."
    },
    {
      title: "Choose Your Vibe",
      description: "Select from preset moods like Party, Chill, Focus, or Workout. Each mood adjusts various audio features like energy, danceability, and valence to match your desired atmosphere."
    },
    {
      title: "Fine-tune Parameters",
      description: "Adjust the intensity slider to control how strongly the mood attributes affect your recommendations. Choose how many tracks you want to discover."
    },
    {
      title: "Get Recommendations",
      description: "Our app uses Spotify's powerful recommendation engine to analyze your seeds and preferences, delivering a personalized playlist of tracks you might love."
    }
  ];

  return (
    <PageContainer>
      <Container 
        maxWidth="lg" 
        component={motion.div} 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible"
        sx={{ px: { xs: 1, sm: 2, md: 3 } }}
      >
        <Box component={motion.div} variants={itemVariants}>
          <IconWrapper>
            <InfoIcon sx={{ 
              color: '#000', 
              fontSize: { xs: 24, sm: 28, md: 32 } 
            }} />
          </IconWrapper>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(90deg, #fff, #1DB954)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
              fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
            }}
          >
            How It Works
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#b3b3b3', 
              mb: 4,
              fontSize: { xs: '0.95rem', sm: '1rem', md: '1.1rem' },
              lineHeight: 1.6,
            }}
          >
            Discover personalized music recommendations powered by Spotify's advanced algorithms
          </Typography>

          <Box sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
            {steps.map((step, index) => (
              <StepContainer 
                key={index}
                variants={itemVariants}
                sx={{
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  textAlign: { xs: 'center', sm: 'left' },
                  gap: { xs: 1.5, sm: 2 },
                }}
              >
                <StepNumber sx={{ 
                  width: { xs: 28, sm: 32 },
                  height: { xs: 28, sm: 32 },
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  marginRight: { xs: 0, sm: 2 },
                  marginBottom: { xs: 1, sm: 0 },
                }}>
                  {index + 1}
                </StepNumber>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#fff',
                      mb: 1,
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#b3b3b3',
                      lineHeight: 1.6,
                      fontSize: { xs: '0.9rem', sm: '0.95rem' },
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </StepContainer>
            ))}
          </Box>
        </Box>

        <Box>
          <IconWrapper>
            <TuneIcon sx={{
              color: '#000', 
              fontSize: { xs: 24, sm: 28, md: 32 } 
            }} />
          </IconWrapper>
          <Typography 
            variant="h5" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(90deg, #fff, #1DB954)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 3,
              fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            }}
          >
            Audio Features Explained
          </Typography>
          <Box 
            sx={{ 
              display: 'grid', 
              gap: { xs: '16px', sm: '20px', md: '24px' }, 
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              }
            }}
          >
            {audioFeatures.map((feature) => (
              <FeatureCard
                key={feature.name}
                elevation={0}
                sx={{
                  padding: { xs: '16px', sm: '20px', md: '24px' },
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  mb: { xs: 1.5, sm: 2 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: { xs: 1, sm: 2 },
                }}>
                  <FeatureIcon sx={{
                    width: { xs: 32, sm: 36, md: 40 },
                    height: { xs: 32, sm: 36, md: 40 },
                    marginBottom: { xs: 1, sm: 0 },
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontSize: { xs: '16px', sm: '18px', md: '20px' } 
                    }}>
                      {feature.icon}
                    </Typography>
                  </FeatureIcon>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: { xs: '1rem', sm: '1.1rem' },
                      textAlign: { xs: 'center', sm: 'left' },
                    }}
                  >
                    {feature.name}
                  </Typography>
                </Box>

                <Typography 
                  variant="body2" 
                  sx={{ 
                    color: '#b3b3b3',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                    mb: 2,
                    textAlign: { xs: 'center', sm: 'left' },
                  }}
                >
                  {feature.description}
                </Typography>

                <Box sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  p: { xs: 1.5, sm: 2 },
                  mt: { xs: 1.5, sm: 2 },
                }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#1DB954',
                      display: 'block',
                      mb: 1,
                      fontWeight: 500,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    }}
                  >
                    Range: {feature.range}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#fff',
                      display: 'block',
                      mb: 0.5,
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    }}
                  >
                    High: {feature.examples.high}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#fff',
                      display: 'block',
                      fontSize: { xs: '0.7rem', sm: '0.75rem' },
                    }}
                  >
                    Low: {feature.examples.low}
                  </Typography>
                </Box>
              </FeatureCard>
            ))}
          </Box>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default GuidePage; 