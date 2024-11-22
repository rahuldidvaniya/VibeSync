import { AppBar, Toolbar, Typography, Button, styled } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom';
import '@fontsource/outfit/700.css';
import { useState, useEffect } from 'react';
import { Theme } from '@mui/material/styles';

interface StyledAppBarProps {
  scrolled: boolean;
  theme?: Theme;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'scrolled'
})<StyledAppBarProps>(({ theme, scrolled }) => ({
  backgroundColor: scrolled 
    ? 'rgba(18, 18, 18, 0.85)'
    : 'rgba(18, 18, 18, 0.75)',
  backdropFilter: 'blur(10px)',
  borderBottom: scrolled 
    ? '1px solid rgba(255, 255, 255, 0.03)'
    : '1px solid rgba(255, 255, 255, 0.08)',
  boxShadow: scrolled 
    ? '0 4px 30px rgba(0, 0, 0, 0.2)'
    : 'none',
  transition: 'all 0.3s ease',

  [theme.breakpoints.down('sm')]: {
    padding: '4px 0',
  }
}));

const LogoContainer = styled(Button)<{ theme?: Theme }>(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '1px',
  padding: '8px 12px',
  borderRadius: '12px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-1px)',
    '& .logo-icon': {
      transform: 'rotate(-10deg) scale(1.1)',
    }
  },

  [theme.breakpoints.down('sm')]: {
    padding: '6px 8px',
    gap: '0px',
  }
}));

const LogoIcon = styled(MusicNoteIcon)<{ theme?: Theme }>(({ theme }) => ({
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

  [theme.breakpoints.down('sm')]: {
    fontSize: '26px',
  }
}));

const LogoText = styled(Typography)<{ theme?: Theme }>(({ theme }) => ({
  background: `linear-gradient(135deg, 
    #FFFFFF 0%,
    ${theme.palette.primary.main} 50%,
    ${theme.palette.primary.light} 100%
  )`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 700,
  fontSize: '28px',
  letterSpacing: '-0.02em',
  fontFamily: '"Outfit", sans-serif',
  textShadow: `
    0 0 20px rgba(29, 185, 84, 0.15),
    0 0 40px rgba(29, 185, 84, 0.1)
  `,

  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
  }
}));

const NavButton = styled(Button)<{ theme?: Theme }>(({ theme }) => ({
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

  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    padding: '8px 16px',
  }
}));

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <StyledAppBar position="fixed" scrolled={scrolled}>
      <Toolbar sx={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        height: { xs: '64px', sm: '55px' },
        padding: { xs: '0 16px', sm: '0 24px' },
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
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            navigate('/guide');
          }}
        >
          How It Works
        </NavButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar; 