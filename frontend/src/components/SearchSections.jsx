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
  gap: '48px',
  padding: '48px 24px',
  width: '100%',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const SectionContainer = styled(Container)(({ theme }) => ({
  maxWidth: '1800px',
  margin: '0 auto',
  width: '100%',
}));

const SectionWrapper = styled(Paper)(({ theme }) => ({
  padding: '32px',
  borderRadius: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '24px',
  padding: '16px',
  borderRadius: '16px',
  backgroundColor: 'rgba(29, 185, 84, 0.1)',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#000',
}));

const TopSection = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '24px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
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

  const [attributes, setAttributes] = useState({
    mood: 'happy',
    intensity: 0.5,
    acousticOnly: false,
    popularity: 50,
    limit: 5,
  });

  const handleError = (message) => {
    setError(message);
  };

  const handleGetRecommendations = async () => {
    setLoading(true);
    try {
      const recommendations = await getRecommendations(
        selectedArtists, 
        selectedTracks,
        selectedGenres,
        attributes
      );
      navigate('/recommendations', { state: { tracks: recommendations.tracks } });
    } catch (error) {
      handleError('Failed to get recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const hasSelection = selectedArtists.length > 0 || 
                      selectedTracks.length > 0 || 
                      selectedGenres.length > 0;

  return (
    <PageContainer id="search-section">
      <SectionContainer>
        <Typography 
          variant="h4" 
          sx={{ 
            mb: 6, 
            fontWeight: 700,
            textAlign: 'center',
            fontSize: { xs: '2rem', md: '2.5rem' },
            background: 'linear-gradient(45deg, #1DB954, #1ed760)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Create Your Perfect Mix
        </Typography>

        <TopSection>
          <SectionWrapper>
            <SectionHeader>
              <IconWrapper>
                <PersonIcon />
              </IconWrapper>
              <Typography variant="h6" fontWeight={600}>
                Select Artists
              </Typography>
            </SectionHeader>
            <ArtistSection />
          </SectionWrapper>

          <SectionWrapper>
            <SectionHeader>
              <IconWrapper>
                <MusicNoteIcon />
              </IconWrapper>
              <Typography variant="h6" fontWeight={600}>
                Choose Tracks
              </Typography>
            </SectionHeader>
            <TrackSection />
          </SectionWrapper>
        </TopSection>

        <Box sx={{ mt: 4 }}>
          <SectionWrapper>
            <SectionHeader>
              <IconWrapper>
                <CategoryIcon />
              </IconWrapper>
              <Typography variant="h6" fontWeight={600}>
                Pick Genres
              </Typography>
            </SectionHeader>
            <GenreSection />
          </SectionWrapper>
        </Box>

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
            <SongAttributesSection onAttributesChange={setAttributes} />
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