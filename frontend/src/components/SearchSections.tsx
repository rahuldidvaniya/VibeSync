import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Snackbar, 
  Alert, 
  Button, 
  CircularProgress, 
  styled, 
  Typography
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
import type { RecommendationsResponse } from '../types/spotify';

// Interfaces
interface RecommendationAttributes {
  target_popularity?: number;
  min_popularity?: number;
  max_popularity?: number;
  limit?: number;
  [key: string]: number | undefined;
}

// Styled components
const PageContainer = styled(Box)(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  padding: ${theme.spacing(3, 2)};
  width: 100%;
  background-color: ${theme.palette.background.default};
  min-height: 100vh;

  ${theme.breakpoints.up('sm')} {
    gap: ${theme.spacing(4)};
    padding: ${theme.spacing(4, 3)};
  }

  ${theme.breakpoints.up('md')} {
    gap: ${theme.spacing(6)};
    padding: ${theme.spacing(6, 3)};
  }
`);

const SectionContainer = styled(Box)(({ theme }) => `
  padding: ${theme.spacing(2.5, 2)};
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  width: 100%;
  overflow: hidden;

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(4, 3)};
  }

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(5, 3)};
  }
`);

const MainHeading = styled(Typography)(({ theme }) => `
  margin-bottom: ${theme.spacing(6)};
  font-weight: 800;
  text-align: center;
  font-size: 2rem;
  font-family: "Outfit", sans-serif;
  background: linear-gradient(135deg, #1DB954, #1ed760);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 20px rgba(29, 185, 84, 0.2);

  ${theme.breakpoints.up('md')} {
    font-size: 2.5rem;
  }
`);

const SectionWrapper = styled(Box)(({ theme }) => `
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(4, 3)};
  }

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(5, 3)};
  }
`);

const SectionHeader = styled(Box)(({ theme }) => `
  display: flex;
  align-items: center;
  gap: ${theme.spacing(1.5)};
  margin-bottom: ${theme.spacing(2)};

  ${theme.breakpoints.up('sm')} {
    gap: ${theme.spacing(3)};
    margin-bottom: ${theme.spacing(3)};
  }

  ${theme.breakpoints.up('md')} {
    gap: ${theme.spacing(4)};
    margin-bottom: ${theme.spacing(4)};
  }
`);

const IconWrapper = styled(Box)(({ theme }) => `
  background-color: rgba(29, 185, 84, 0.1);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1DB954;
  box-shadow: 0 0 20px rgba(29, 185, 84, 0.1);

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(2)};
  }

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(3)};
  }
`);

const TopSection = styled(Box)(({ theme }) => `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing(2)};
  margin-bottom: ${theme.spacing(2)};

  ${theme.breakpoints.up('sm')} {
    gap: ${theme.spacing(3)};
    margin-bottom: ${theme.spacing(3)};
  }

  ${theme.breakpoints.up('md')} {
    gap: ${theme.spacing(4)};
    margin-bottom: ${theme.spacing(4)};
  }
`);

const GetRecommendationsButton = styled(Button)(({ theme }) => `
  background-color: ${theme.palette.primary.main};
  color: #000;
  font-weight: 700;
  padding: ${theme.spacing(2, 4)};
  border-radius: 32px;
  font-size: 1.1rem;
  box-shadow: 0 4px 16px rgba(29, 185, 84, 0.3);

  &:hover {
    background-color: ${theme.palette.primary.light};
    box-shadow: 0 6px 20px rgba(29, 185, 84, 0.4);
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #535353;
    color: #b3b3b3;
  }

  ${theme.breakpoints.up('sm')} {
    padding: ${theme.spacing(3, 4)};
  }

  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(4, 4)};
  }
`);

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => `
  color: ${theme.palette.text.primary};

  ${theme.breakpoints.up('sm')} {
    font-size: ${theme.spacing(2)};
  }

  ${theme.breakpoints.up('md')} {
    font-size: ${theme.spacing(3)};
  }
`);

const SearchSections: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { 
    selectedArtists, 
    selectedTracks, 
    selectedGenres,
    totalSeeds
  } = useSeedContext();

  const [recommendationAttributes, setRecommendationAttributes] = useState<RecommendationAttributes>({});

  const handleError = (message: string): void => {
    setError(message);
  };

  const handleGetRecommendations = async (): Promise<void> => {
    setLoading(true);
    try {
      const completeAttributes: RecommendationAttributes = {
        ...recommendationAttributes,
        limit: recommendationAttributes.limit || 20
      };
      const recommendations = await getRecommendations(
        selectedArtists as any[],
        selectedTracks as any[],
        selectedGenres,
        completeAttributes
      ) as RecommendationsResponse;

      window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/recommendations', { 
        state: { 
          tracks: recommendations.tracks 
        } 
      });
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
          <GenreSection onError={handleError} />
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
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          sx={{ top: { xs: 16, sm: 24 } }}
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