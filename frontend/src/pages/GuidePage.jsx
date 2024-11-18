import { Box, Typography, Container, Paper, styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TuneIcon from '@mui/icons-material/Tune';
import InfoIcon from '@mui/icons-material/Info';
import { motion } from 'framer-motion';

const PageContainer = styled(Box)(({ theme }) => ({
  padding: '48px 24px',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const Section = styled(Paper)(({ theme }) => ({
  padding: '32px',
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  marginBottom: '32px',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#1DB954',
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  width: 'fit-content',
  boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
}));

const StepNumber = styled(Typography)(({ theme }) => ({
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
}));

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

const FeatureCard = styled(Paper)(({ theme }) => ({
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
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  backgroundColor: '#1DB954',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  boxShadow: '0 4px 12px rgba(29, 185, 84, 0.3)',
}));

const GuidePage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const audioFeatures = [
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

  return (
    <PageContainer>
      <Container maxWidth="lg" component={motion.div} variants={containerVariants} initial="hidden" animate="visible">
        <Section component={motion.div} variants={itemVariants}>
          <IconWrapper>
            <InfoIcon sx={{ color: '#000', fontSize: 28 }} />
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
            }}
          >
            How It Works
          </Typography>
          <Typography variant="body1" sx={{ color: '#b3b3b3', mb: 4, fontSize: '1.1rem' }}>
            Discover personalized music recommendations powered by Spotify's advanced algorithms
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            {[
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
            ].map((step, index) => (
              <StepContainer 
                key={index}
                variants={itemVariants}
              >
                <StepNumber>{index + 1}</StepNumber>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#fff',
                      mb: 1,
                      fontWeight: 600,
                      fontSize: '1.1rem'
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: '#b3b3b3',
                      lineHeight: 1.6,
                      fontSize: '0.95rem'
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </StepContainer>
            ))}
          </Box>
        </Section>

        <Section component={motion.div} variants={itemVariants}>
          <IconWrapper>
            <TuneIcon sx={{ color: '#000', fontSize: 28 }} />
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
            }}
          >
            Audio Features Explained
          </Typography>
          <Box 
            sx={{ 
              display: 'grid', 
              gap: '24px', 
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              }
            }}
          >
            {audioFeatures.map((feature, index) => (
              <FeatureCard
                key={feature.name}
                component={motion.div}
                variants={itemVariants}
                elevation={0}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <FeatureIcon>
                    <Typography variant="h6" sx={{ fontSize: '20px' }}>
                      {feature.icon}
                    </Typography>
                  </FeatureIcon>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      ml: 2
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
                    fontSize: '0.9rem',
                    mb: 2
                  }}
                >
                  {feature.description}
                </Typography>

                <Box sx={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  p: 2,
                  mt: 2
                }}>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#1DB954',
                      display: 'block',
                      mb: 1,
                      fontWeight: 500
                    }}
                  >
                    Range: {feature.range}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#fff',
                      display: 'block',
                      mb: 0.5
                    }}
                  >
                    High: {feature.examples.high}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      color: '#fff',
                      display: 'block'
                    }}
                  >
                    Low: {feature.examples.low}
                  </Typography>
                </Box>
              </FeatureCard>
            ))}
          </Box>
        </Section>
      </Container>
    </PageContainer>
  );
};

export default GuidePage; 