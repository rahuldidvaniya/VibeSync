import { Box, Typography, Button, Container, Paper, styled } from '@mui/material';
import SpotifyIcon from '@mui/icons-material/MusicNote';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { motion } from 'framer-motion';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '48px 24px',
  background: `linear-gradient(
    135deg,
    rgba(18, 18, 18, 0.95) 0%,
    rgba(29, 185, 84, 0.5) 100%
  )`,
});

const ContentCard = styled(Paper)({
  padding: '48px',
  borderRadius: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  maxWidth: '600px',
  width: '100%',
  textAlign: 'center',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
});

const SpotifyButton = styled(Button)({
  backgroundColor: '#1DB954',
  color: '#000',
  padding: '16px 32px',
  borderRadius: '30px',
  fontSize: '1.1rem',
  fontWeight: 600,
  marginTop: '32px',
  boxShadow: '0 4px 20px rgba(29, 185, 84, 0.3)',
  '&:hover': {
    backgroundColor: '#1ed760',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 25px rgba(29, 185, 84, 0.4)',
  },
  transition: 'all 0.3s ease',
});

const IconWrapper = styled(Box)({
  backgroundColor: '#1DB954',
  borderRadius: '50%',
  padding: '20px',
  display: 'inline-flex',
  marginBottom: '24px',
  boxShadow: '0 4px 20px rgba(29, 185, 84, 0.3)',
});

const FeatureList = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '32px',
  textAlign: 'left',
});

const FeatureItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  color: '#b3b3b3',
});

const ConnectPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const handleConnect = () => {
    // Add your Spotify authentication logic here
    console.log('Connecting to Spotify...');
  };

  return (
    <PageContainer>
      <ContentCard
        component={motion.div}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <IconWrapper>
          <SpotifyIcon sx={{ fontSize: 40, color: '#000' }} />
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
          Connect with Spotify
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            color: '#b3b3b3',
            fontSize: '1.1rem',
            maxWidth: '400px',
            margin: '0 auto',
            mb: 4
          }}
        >
          Link your Spotify account to unlock personalized music recommendations
        </Typography>

        <FeatureList>
          <FeatureItem>
            <LockOpenIcon sx={{ color: '#1DB954' }} />
            <Typography>Access your favorite artists and tracks</Typography>
          </FeatureItem>
          <FeatureItem>
            <LockOpenIcon sx={{ color: '#1DB954' }} />
            <Typography>Get personalized recommendations</Typography>
          </FeatureItem>
          <FeatureItem>
            <LockOpenIcon sx={{ color: '#1DB954' }} />
            <Typography>Play music directly in Spotify</Typography>
          </FeatureItem>
        </FeatureList>

        <SpotifyButton
          startIcon={<SpotifyIcon />}
          onClick={handleConnect}
        >
          Connect with Spotify
        </SpotifyButton>
      </ContentCard>
    </PageContainer>
  );
};

export default ConnectPage; 