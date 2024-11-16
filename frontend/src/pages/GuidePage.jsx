import { Box, Typography, Container, Paper, styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import TuneIcon from '@mui/icons-material/Tune';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';

const PageContainer = styled(Box)(({ theme }) => ({
  padding: '48px 24px',
  backgroundColor: theme.palette.background.default,
  minHeight: '100vh',
}));

const Section = styled(Paper)(({ theme }) => ({
  padding: '32px',
  borderRadius: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  marginBottom: '32px',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '12px',
  padding: '12px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '16px',
  width: 'fit-content',
}));

const StepNumber = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#000',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  marginRight: '16px',
}));

const StepContainer = styled(Box)({
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '24px',
});

const MoodCard = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isSelected'
})(({ theme, isSelected }) => ({
  padding: '20px',
  borderRadius: '16px',
  cursor: 'pointer',
  backgroundColor: isSelected ? 'rgba(29, 185, 84, 0.1)' : 'rgba(255, 255, 255, 0.03)',
  border: `2px solid ${isSelected ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.05)'}`,
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '180px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: isSelected ? 'rgba(29, 185, 84, 0.15)' : 'rgba(255, 255, 255, 0.05)',
    transform: 'translateY(-2px)',
  },
}));

const GuidePage = () => {
  return (
    <PageContainer>
      <Container maxWidth="lg">
        <Section>
          <IconWrapper>
            <InfoIcon />
          </IconWrapper>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#fff' }}>
            How It Works
          </Typography>
          <Typography variant="body1" sx={{ color: '#b3b3b3', mb: 4 }}>
            Discover personalized music recommendations powered by Spotify's advanced algorithms
          </Typography>
          
          <Box sx={{ mt: 4 }}>
            <StepContainer>
              <StepNumber>1</StepNumber>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                  Select Your Seeds
                </Typography>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Choose up to 5 total seeds from your favorite artists, tracks, or genres. 
                  These seeds will be used as the foundation for your recommendations.
                </Typography>
              </Box>
            </StepContainer>

            <StepContainer>
              <StepNumber>2</StepNumber>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                  Choose Your Vibe
                </Typography>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Select from preset moods like Party, Chill, Focus, or Workout. Each mood adjusts 
                  various audio features like energy, danceability, and valence to match your desired atmosphere.
                </Typography>
              </Box>
            </StepContainer>

            <StepContainer>
              <StepNumber>3</StepNumber>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                  Fine-tune Parameters
                </Typography>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Adjust the intensity slider to control how strongly the mood attributes affect your 
                  recommendations. Choose how many tracks you want to discover.
                </Typography>
              </Box>
            </StepContainer>

            <StepContainer>
              <StepNumber>4</StepNumber>
              <Box>
                <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                  Get Recommendations
                </Typography>
                <Typography variant="body1" sx={{ color: '#b3b3b3' }}>
                  Our app uses Spotify's powerful recommendation engine to analyze your seeds and 
                  preferences, delivering a personalized playlist of tracks you might love.
                </Typography>
              </Box>
            </StepContainer>
          </Box>
        </Section>

        <Section>
          <IconWrapper>
            <TuneIcon />
          </IconWrapper>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: '#fff' }}>
            Audio Features Explained
          </Typography>
          <Box sx={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {audioFeatures.map((feature) => (
              <Box key={feature.name} sx={{ mb: 3 }}>
                <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>
                  {feature.name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#b3b3b3' }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Section>
      </Container>
    </PageContainer>
  );
};

const audioFeatures = [
  {
    name: 'Energy',
    description: 'Represents the intensity and activity level of the track. High energy tracks feel fast, loud, and noisy.'
  },
  {
    name: 'Danceability',
    description: 'Describes how suitable a track is for dancing based on tempo, rhythm stability, beat strength, and regularity.'
  },
  {
    name: 'Valence',
    description: 'Musical positiveness conveyed by a track. High valence sounds more positive (happy, cheerful), while low valence sounds more negative (sad, angry).'
  },
  {
    name: 'Acousticness',
    description: 'Confidence measure of whether the track is acoustic. Higher values represent more acoustic sounds.'
  },
  {
    name: 'Instrumentalness',
    description: 'Predicts whether a track contains no vocals. Higher values represent instrumental music.'
  },
  {
    name: 'Tempo',
    description: 'The overall estimated tempo of a track in beats per minute (BPM).'
  }
];

export default GuidePage; 