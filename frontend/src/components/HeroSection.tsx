import { Box, Container, Typography, Button, styled } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ExploreIcon from '@mui/icons-material/Explore';
import TuneIcon from '@mui/icons-material/Tune';
import InfoIcon from '@mui/icons-material/Info';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { useNavigate } from 'react-router-dom';
import { useTheme, Theme } from '@mui/material/styles';

const HeroContainer = styled(Box)({
  position: 'relative',
  minHeight: '80vh',
  display: 'flex',
  alignItems: 'center',
  padding: '48px 24px',
  overflow: 'hidden',
  marginBottom: '48px',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `linear-gradient(
      135deg,
      rgba(18, 18, 18, 0.95) 0%,
      rgba(29, 185, 84, 0.5) 100%
    )`,
    zIndex: 1
  }
});

const BackgroundImage = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: 'url("/hero-bg.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  filter: 'blur(2px)',
});

const ContentWrapper = styled(Container)<{ theme?: Theme }>(({ theme }) => ({
  position: 'relative',
  zIndex: 2,
  maxWidth: '1200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '48px',
  padding: '48px 24px',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '32px',
    padding: '16px 12px',
    paddingTop: '64px',
    width: '100%'
  }
}));

const TextContent = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  flex: '1',
  maxWidth: '600px',

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    textAlign: 'center',
    padding: '0',
  }
}));

interface FeatureCardProps {
  theme?: Theme;
}

const FeatureCard = styled(Box)<FeatureCardProps>(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease',

  [theme.breakpoints.down('sm')]: {
    padding: '16px',
    gap: '12px',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center'
  },

  '&:hover': {
    transform: 'translateY(-4px)',
  }
}));

const IconWrapper = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '12px',
  padding: '12px',
  color: '#000',

  [theme.breakpoints.down('sm')]: {
    padding: '10px',
    marginBottom: '8px'
  }
}));

const FeatureCardsWrapper = styled(Box)<{ theme?: Theme }>(({ theme }) => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  maxWidth: '500px',

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '0 16px',
    gap: '16px'
  }
}));

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const scrollToSearch = (): void => {
    const searchSection = document.getElementById('search-section');
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <BackgroundImage />
      <ContentWrapper>
        <TextContent>
          <Typography
            variant="h1"
            sx={{
              fontSize: { 
                xs: '2.75rem',
                sm: '2.5rem',
                md: '3.5rem'
              },
              fontWeight: 800,
              mb: { xs: 2, sm: 3 },
              background: 'linear-gradient(135deg, #ffffff 0%, #1DB954 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 30px rgba(29, 185, 84, 0.3)',
              letterSpacing: '-0.02em',
              lineHeight: { xs: 1.1, sm: 1.3 },
              padding: { xs: '0 8px', sm: 0 },
            }}
          >
            Discover Your Perfect
            <br />
            Music Mix
          </Typography>

          <Typography
            variant="h5"
            sx={{
              color: 'rgba(255, 255, 255, 0.95)',
              mb: { xs: 3, sm: 4 },
              fontWeight: 400,
              lineHeight: 1.5,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
              fontSize: { 
                xs: '1.1rem',
                sm: '1.1rem',
                md: '1.25rem' 
              },
              padding: { xs: '0 8px', sm: 0 },
              maxWidth: { xs: '100%', sm: 'none' },
              mx: { xs: 'auto', sm: 0 },
              background: 'linear-gradient(to bottom, #ffffff, #e0e0e0)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Create personalized playlists powered by AI and your music taste.
            Find new tracks that match your vibe perfectly.
          </Typography>

          <Box 
            sx={{ 
              display: 'flex', 
              gap: { xs: 2, sm: 2 }, 
              mb: { xs: 4, sm: 6 },
              justifyContent: { xs: 'center', md: 'flex-start' },
              flexDirection: { xs: 'column', sm: 'row' },
              padding: { xs: '0 8px', sm: 0 },
              width: '100%',
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayArrowIcon />}
              onClick={scrollToSearch}
              sx={{
                backgroundColor: '#1DB954',
                color: '#000',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                padding: { xs: '14px 24px', sm: '12px 32px' },
                borderRadius: '30px',
                fontWeight: 600,
                boxShadow: '0 4px 20px rgba(29, 185, 84, 0.3)',
                width: { xs: '100%', sm: 'auto' },
                '&:hover': {
                  backgroundColor: '#1ed760',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 25px rgba(29, 185, 84, 0.4)',
                },
                transition: 'all 0.3s ease',
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
                borderColor: 'rgba(255, 255, 255, 0.3)',
                color: '#fff',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                padding: { xs: '12px 24px', sm: '12px 32px' },
                borderRadius: '30px',
                fontWeight: 600,
                width: { xs: '100%', sm: 'auto' },
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                '&:hover': {
                  borderColor: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              How It Works
            </Button>
          </Box>

          {/* <StatsContainer>
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
          </StatsContainer> */}
        </TextContent>

        <FeatureCardsWrapper>
          <FeatureCard
            sx={{
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'row',
                alignItems: 'center',
                padding: '16px',
                gap: '12px',
                marginBottom: '12px',
              }
            }}
          >
            <IconWrapper>
              <ExploreIcon />
            </IconWrapper>
            <Box>
              <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600,
                  color: '#fff',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                Smart Discovery
              </Typography>
              <Typography 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  textShadow: '0 1px 8px rgba(0,0,0,0.2)',
                }}
              >
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
        </FeatureCardsWrapper>
      </ContentWrapper>
    </HeroContainer>
  );
};

export default HeroSection; 