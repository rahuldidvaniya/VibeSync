import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Snackbar, 
  Alert, 
  Button, 
  CircularProgress, 
  styled, 
  Typography,
  Container,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import PersonIcon from '@mui/icons-material/Person';
import CategoryIcon from '@mui/icons-material/Category';
import TuneIcon from '@mui/icons-material/Tune';
import ArtistSection from './ArtistSection';
import TrackSection from './TrackSection';
import GenreSection from './GenreSection';
import SongAttributesSection from './SongAttributesSection';
import { getRecommendations } from '../services/api';
import { useSeedContext } from '../context/SeedContext';

const PageContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: { xs: '24px', sm: '32px', md: '48px' },
  padding: { xs: '24px 16px', sm: '32px 24px', md: '48px 24px' },
  width: '100%',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: {
    xs: '20px 16px',
    sm: '32px 24px',
    md: '40px 24px'
  },
  maxWidth: '1200px',
  margin: '0 auto',
  position: 'relative',
  width: '100%',
  overflow: 'hidden',
}));

const MainHeading = styled(Typography)(({ theme }) => ({
  marginBottom: '48px',
  fontWeight: 800,
  textAlign: 'center',
  fontSize: { xs: '2rem', md: '2.5rem' },
  fontFamily: '"Outfit", sans-serif',
  background: 'linear-gradient(135deg, #1DB954, #1ed760)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '0 2px 20px rgba(29, 185, 84, 0.2)',
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '16px',
  padding: '24px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  marginBottom: '20px',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(29, 185, 84, 0.1)',
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#1DB954',
  boxShadow: '0 0 20px rgba(29, 185, 84, 0.1)',
}));

const TopSection = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
  marginBottom: '24px',
}));

const GetRecommendationsButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#000',
  fontWeight: 700,
  padding: '16px 48px',
  borderRadius: '32px',
  fontSize: '1.1rem',
  boxShadow: '0 4px 16px rgba(29, 185, 84, 0.3)',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    boxShadow: '0 6px 20px rgba(29, 185, 84, 0.4)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    backgroundColor: '#535353',
    color: '#b3b3b3',
  },
}));

const StyledCircularProgress = styled(CircularProgress)({
  color: '#000',
});

const SeedCounter = styled(Typography)({
  color: '#b3b3b3',
  fontSize: '14px',
  textAlign: 'center',
  marginBottom: '16px',
});

const SearchSections = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { 
    selectedArtists, 
    selectedTracks, 
    selectedGenres,
    totalSeeds,
    remainingSeeds,
    MAX_TOTAL_SEEDS
  } = useSeedContext();

  const [recommendationAttributes, setRecommendationAttributes] = useState({});

  const handleError = (message) => {
    setError(message);
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const completeAttributes = {
        seed_artists: selectedArtists.map(artist => artist.id).join(','),
        seed_tracks: selectedTracks.map(track => track.id).join(','),
        seed_genres: selectedGenres.join(','),
        
        ...recommendationAttributes,
        
        ...(recommendationAttributes.target_popularity && {
          target_popularity: recommendationAttributes.target_popularity,
          min_popularity: recommendationAttributes.min_popularity,
          max_popularity: recommendationAttributes.max_popularity
        }),
        
        limit: recommendationAttributes.limit || 20
      };

      
    


      const recommendations = await getRecommendations(
        selectedArtists,
        selectedTracks,
        selectedGenres,
        completeAttributes
      );

      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/recommendations', { state: { tracks: recommendations.tracks } });
    } catch (error) {
      console.error('Recommendation error:', error);
      handleError('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  return (
    <PageContainer id="search-section">
      <SectionContainer>
        <MainHeading variant="h4">
          Create Your Perfect Mix
        </MainHeading>

        <TopSection>
          <SectionWrapper>
            <SectionHeader>
              <IconWrapper>
                <PersonIcon sx={{ fontSize: 24 }} />
              </IconWrapper>
              <Typography variant="h6" fontWeight={600} color="white">
                Select Artists
              </Typography>
            </SectionHeader>
            <ArtistSection />
          </SectionWrapper>

          <SectionWrapper>
            <SectionHeader>
              <IconWrapper>
                <MusicNoteIcon sx={{ fontSize: 24 }} />
              </IconWrapper>
              <Typography variant="h6" fontWeight={600} color="white">
                Choose Tracks
              </Typography>
            </SectionHeader>
            <TrackSection />
          </SectionWrapper>
        </TopSection>

        <SectionWrapper>
          <SectionHeader>
            <IconWrapper>
              <CategoryIcon sx={{ fontSize: 24 }} />
            </IconWrapper>
            <Typography variant="h6" fontWeight={600} color="white">
              Pick Genres
            </Typography>
          </SectionHeader>
          <GenreSection />
        </SectionWrapper>

        <Box sx={{ mt: 4 }}>
          <SectionWrapper>
            <SectionHeader>
              <IconWrapper>
                <TuneIcon />
              </IconWrapper>
              <Typography variant="h6" fontWeight={600}>
                Fine-tune Your Mix
              </Typography>
            </SectionHeader>
            <SongAttributesSection onAttributesChange={setRecommendationAttributes} />
          </SectionWrapper>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center',
          mt: 6,
          mb: 4
        }}>
          <GetRecommendationsButton
            onClick={handleGetRecommendations}
            disabled={loading || totalSeeds === 0}
            startIcon={loading ? <StyledCircularProgress size={24} /> : <SearchIcon />}
          >
            {loading ? 'Generating...' : 'Get Recommendations'}
          </GetRecommendationsButton>
        </Box>

        <Snackbar 
          open={!!error} 
          autoHideDuration={6000} 
          onClose={() => setError(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={() => setError(null)} 
            severity="error" 
            sx={{ 
              width: '100%',
              borderRadius: '12px',
              backgroundColor: 'rgba(211, 47, 47, 0.95)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {error}
          </Alert>
        </Snackbar>
      </SectionContainer>
    </PageContainer>
  );
};

export default SearchSections; 