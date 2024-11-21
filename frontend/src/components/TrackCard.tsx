import { Card, styled } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface TrackCardProps {
  theme?: Theme;
}

const TrackCard = styled(Card)<TrackCardProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.elevation1,
  borderRadius: '12px',
  border: '1px solid rgba(255, 255, 255, 0.03)',
  transition: 'all 0.3s ease',
  transform: 'translateY(0)',
  '&:hover': {
    transform: 'translateY(-8px)',
    backgroundColor: theme.palette.background.elevation2,
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
  },
}));

export default TrackCard; 