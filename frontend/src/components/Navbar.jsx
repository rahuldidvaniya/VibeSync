import { AppBar, Toolbar, Typography, Box, Button, styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import '@fontsource/outfit/700.css';

const StyledAppBar = styled(AppBar)({
  backgroundColor: 'rgba(18, 18, 18, 0.98)',
  backdropFilter: 'blur(10px)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
  boxShadow: 'none',
});

const LogoContainer = styled(Button)({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 16px',
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
  fontSize: '32px',
  color: '#1ed760',
  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  filter: `
    drop-shadow(0 0 8px rgba(30, 215, 96, 0.3))
    drop-shadow(0 0 20px rgba(30, 215, 96, 0.2))
  `,
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-4px)',
    },
    '100%': {
      transform: 'translateY(0px)',
    },
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    #1ed760 0%,
    #1db954 50%,
    #1ed760 100%
  )`,
  backgroundSize: '200% auto',
  animation: 'shine 3s linear infinite',
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
  '@keyframes shine': {
    '0%': {
      backgroundPosition: '200% center',
    },
    '100%': {
      backgroundPosition: '-200% center',
    },
  },
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