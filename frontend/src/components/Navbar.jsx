import { AppBar, Toolbar, Typography, Box, Button, styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'rgba(18, 18, 18, 0.98)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: 'none',
});

const LogoContainer = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 16px',
  borderRadius: '12px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: 'scale(1.02)',
  },
});

const LogoIcon = styled(MusicNoteIcon)(({ theme }) => ({
  fontSize: '28px',
  color: theme.palette.primary.main,
  filter: 'drop-shadow(0 0 8px rgba(29, 185, 84, 0.3))',
  animation: 'pulse 2s infinite',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main}, #1ed760)`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  fontSize: '26px',
  letterSpacing: '-0.5px',
  fontFamily: '"Inter", sans-serif',
  textShadow: '0 0 20px rgba(29, 185, 84, 0.3)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  fontSize: '0.95rem',
  fontWeight: 500,
  padding: '8px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  letterSpacing: '0.3px',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-1px)',
  },
  transition: 'all 0.2s ease',
}));

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="sticky">
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        height: '72px',
        padding: '0 24px',
        maxWidth: '1800px',
        width: '100%',
        margin: '0 auto',
      }}>
        <LogoContainer 
          onClick={() => navigate('/')}
          disableRipple
        >
          <LogoIcon />
          <LogoText>
            VibeSync
          </LogoText>
        </LogoContainer>

        <NavButton
          startIcon={<InfoIcon />}
          onClick={() => navigate('/guide')}
        >
          How It Works
        </NavButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 