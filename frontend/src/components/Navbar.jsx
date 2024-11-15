import { AppBar, Toolbar, Typography, Box, styled } from '@mui/material';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  height: '64px',
  backgroundColor: '#121212',
  padding: '0 24px',
  width: '100%',
  maxWidth: '100vw',
});

const LogoContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        margin: 0,
        padding: 0,
        width: '100%',
        left: 0,
        top: 0,
        right: 0
      }}
    >
      <StyledToolbar>
        <LogoContainer>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: '24px',
              color: '#fff',
              letterSpacing: '-0.04em',
            }}
          >
            VibeSync
          </Typography>
        </LogoContainer>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar; 