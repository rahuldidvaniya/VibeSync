import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, styled } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RecommendedTracks from '../components/RecommendedTracks';

const BackButton = styled(Button)({
  color: '#fff',
  marginBottom: '24px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const RecommendationsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tracks } = location.state || { tracks: [] };

  return (
    <Box>
      <Box sx={{ padding: '32px 24px 0' }}>
        <BackButton 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
        >
          Back to Search
        </BackButton>
      </Box>
      <RecommendedTracks tracks={tracks} />
    </Box>
  );
};

export default RecommendationsPage; 