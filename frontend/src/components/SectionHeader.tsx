import { Typography, styled } from '@mui/material';
import { Theme } from '@mui/material/styles';

interface SectionHeaderProps {
  theme?: Theme;
}

const SectionHeader = styled(Typography)<SectionHeaderProps>(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 700,
  marginBottom: '24px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -8,
    left: 0,
    width: '40px',
    height: '3px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '2px',
  },
}));

export default SectionHeader; 