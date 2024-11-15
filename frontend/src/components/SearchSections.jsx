import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Snackbar, Alert, Button, CircularProgress, styled, Typography } from '@mui/material';
import ArtistSection from './ArtistSection';
import TrackSection from './TrackSection';
import GenreSection from './GenreSection';
import SongAttributesSection from './SongAttributesSection';
import { getRecommendations } from '../services/api';
import { useSeedContext } from '../context/SeedContext';

const PageContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '32px',
  padding: '32px 24px',
  maxWidth: '1800px',
  margin: '0 auto',
  width: '100%',
});

const TopSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '24px',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));

const BottomSection = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
});

const GetRecommendationsButton = styled(Button)({
  backgroundColor: '#1DB954',
  color: '#000',
  fontWeight: 700,
  padding: '12px 24px',
  borderRadius: '24px',
  '&:hover': {
    backgroundColor: '#1ed760',
  },
  '&:disabled': {
    backgroundColor: '#535353',
    color: '#b3b3b3',
  },
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
    <PageContainer>
      <SeedCounter>
        Selected Seeds: {totalSeeds}/{MAX_TOTAL_SEEDS} 
        {remainingSeeds > 0 && ` (${remainingSeeds} remaining)`}
      </SeedCounter>
      
      <TopSection>
        <ArtistSection onError={handleError} />
        <TrackSection onError={handleError} />
      </TopSection>

      <BottomSection>
        <GenreSection onError={handleError} />
        <SongAttributesSection onAttributesChange={setAttributes} />
      </BottomSection>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <GetRecommendationsButton
          onClick={handleGetRecommendations}
          disabled={!hasSelection || loading}
        >
          {loading ? (
            <>
              <CircularProgress 
                size={20} 
                sx={{ mr: 1, color: '#000' }} 
              />
              Getting Recommendations...
            </>
          ) : (
            'Get Recommendations'
          )}
        </GetRecommendationsButton>
      </Box>

      <Snackbar 
        open={!!error} 
        autoHideDuration={5000} 
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity="error" 
          onClose={() => setError(null)}
          sx={{ width: '100%' }}
        >
          {error}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default SearchSections; 