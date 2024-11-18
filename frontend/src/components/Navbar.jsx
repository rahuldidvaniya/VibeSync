import { AppBar, Toolbar, Typography, Box, Button, styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import '@fontsource/outfit/700.css';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'rgba(18, 18, 18, 0.8)',
  backdropFilter: 'blur(8px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.15)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0) 100%)',
    pointerEvents: 'none',
  }
});

const LogoContainer = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  gap: '1px',
  padding: '8px 12px',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    transform: 'translateY(-1px)',
    '& .logo-icon': {
      transform: 'rotate(-10deg) scale(1.1)',
    }
  },
});

const LogoIcon = styled(MusicNoteIcon)(({ theme }) => ({
  fontSize: '30px',
  color: '#1ed760',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  filter: `
    drop-shadow(0 0 8px rgba(30, 215, 96, 0.3))
    drop-shadow(0 0 20px rgba(30, 215, 96, 0.2))
  `,
  animation: 'float 4s ease-in-out infinite',
  '@keyframes float': {
    '0%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-3px)' },
    '100%': { transform: 'translateY(0px)' },
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    #ffffff 0%,
    #1db954 50%,
    #1ed760 100%
  )`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  fontSize: '28px',
  letterSpacing: '-0.02em',
  fontFamily: '"Outfit", sans-serif',
  textShadow: `
    0 0 20px rgba(30, 215, 96, 0.2),
    0 0 40px rgba(30, 215, 96, 0.1)
  `,
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  fontSize: '0.95rem',
  fontWeight: 600,
  padding: '10px 20px',
  borderRadius: '30px',
  textTransform: 'none',
  letterSpacing: '0.3px',
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderColor: 'rgba(255, 255, 255, 0.2)',
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 25px rgba(0, 0, 0, 0.15)',
  },
  transition: 'all 0.3s ease',
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
          <LogoIcon className="logo-icon" />
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