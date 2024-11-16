import { Box, Container, Typography, Button, styled } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExploreIcon from '@mui/icons-material/Explore';
import TuneIcon from '@mui/icons-material/Tune';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';

const HeroContainer = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1DB954 0%, #191414 100%)',
  padding: '80px 0',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 150%, rgba(29, 185, 84, 0.15) 0%, rgba(0, 0, 0, 0) 50%)',
  }
}));

const ContentWrapper = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    display: 'flex',
    alignItems: 'center',
    gap: '48px',
  },
}));

const TextContent = styled(Box)(({ theme }) => ({
  flex: 1,
  [theme.breakpoints.down('md')]: {
    marginBottom: '40px',
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '12px',
  padding: '12px',
  color: '#000',
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '32px',
  justifyContent: 'center',
  marginTop: '48px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '16px',
  },
}));

const StatItem = styled(Box)({
  textAlign: 'center',
});

const HeroSection = () => {
  const navigate = useNavigate();

  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <ContentWrapper>
        <TextContent>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 3,
              background: 'linear-gradient(45deg, #fff, #1DB954)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover Your Perfect
            <br />
            Music Mix
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              mb: 4,
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Create personalized playlists powered by AI and your music taste.
            Find new tracks that match your vibe perfectly.
          </Typography>

          <Box sx={{ display: 'flex', gap: 2, mb: 6, justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={scrollToSearch}
              sx={{
                backgroundColor: '#1DB954',
                color: '#000',
                fontSize: '1.1rem',
                padding: '12px 32px',
                borderRadius: '30px',
                fontWeight: 600,
                '&:hover': {
                  backgroundColor: '#1ed760',
                }
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<InfoIcon />}
              onClick={() => navigate('/guide')}
              sx={{
                borderColor: 'rgba(255, 255, 255, 0.5)',
                color: '#fff',
                fontSize: '1.1rem',
                padding: '12px 32px',
                borderRadius: '30px',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              How It Works
            </Button>
          </Box>

          <StatsContainer>
            <StatItem>
              <Typography variant="h4" color="primary.main" fontWeight={700}>
                100K+
              </Typography>
              <Typography color="text.secondary">
                Active Users
              </Typography>
            </StatItem>
            <StatItem>
              <Typography variant="h4" color="primary.main" fontWeight={700}>
                50M+
              </Typography>
              <Typography color="text.secondary">
                Songs Available
              </Typography>
            </StatItem>
            <StatItem>
              <Typography variant="h4" color="primary.main" fontWeight={700}>
                98%
              </Typography>
              <Typography color="text.secondary">
                Satisfaction Rate
              </Typography>
            </StatItem>
          </StatsContainer>
        </TextContent>

        <Box sx={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          maxWidth: { xs: '100%', md: '400px' }
        }}>
          <FeatureCard>
            <IconWrapper>
              <ExploreIcon />
            </IconWrapper>
            <Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Smart Discovery
              </Typography>
              <Typography color="text.secondary">
                Find new music based on your favorite artists, tracks, and genres
              </Typography>
            </Box>
          </FeatureCard>

          <FeatureCard>
            <IconWrapper>
              <TuneIcon />
            </IconWrapper>
            <Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Fine-Tune Your Mix
              </Typography>
              <Typography color="text.secondary">
                Adjust mood and intensity to get the perfect recommendations
              </Typography>
            </Box>
          </FeatureCard>

          <FeatureCard>
            <IconWrapper>
              <OpenInNewIcon />
            </IconWrapper>
            <Box>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Listen on Spotify
              </Typography>
              <Typography color="text.secondary">
                Click any track to instantly open and play it in your Spotify app
              </Typography>
            </Box>
          </FeatureCard>
        </Box>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection; 