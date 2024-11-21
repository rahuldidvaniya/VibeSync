import { Box, Container, Typography, IconButton, Stack, Link } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { styled } from '@mui/material/styles';

const FooterContainer = styled(Box)({
  backgroundColor: 'rgba(18, 18, 18, 0.95)',
  backdropFilter: 'blur(10px)',
  borderTop: '1px solid rgba(255, 255, 255, 0.05)',
  padding: '48px 0 24px 0',
  marginTop: 'auto',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '1px',
    background: 'linear-gradient(90deg, transparent, rgba(29, 185, 84, 0.3), transparent)',
  }
});

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '48px',
  [theme.breakpoints.down('sm')]: {
    gap: '32px',
  }
}));

const LogoSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  maxWidth: '300px',

  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center',
  }
}));

const SocialIcons = styled(Stack)({
  display: 'flex',
  gap: '16px',
});

const StyledIconButton = styled(IconButton)({
  color: 'rgba(255, 255, 255, 0.7)',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: '#1DB954',
    transform: 'translateY(-4px)',
  }
});

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent maxWidth="lg">
        <Box sx={(theme) => ({ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '32px',
            textAlign: 'center',
          }
        })}>
          <LogoSection>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.1 }}>
              <MusicNoteIcon 
                sx={{ 
                  fontSize: '23px',
                  color: '#1DB954',
                  filter: 'drop-shadow(0 0 8px rgba(29, 185, 84, 0.3))'
                }} 
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(90deg, #fff, #1DB954)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginLeft: '-1px',
                }}
              >
                VibeSync
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              © {new Date().getFullYear()} VibeSync. All rights reserved.
            </Typography>
          </LogoSection>

          <SocialIcons direction="row">
            <Link
              href="https://github.com/rahuldidvaniya/VibeSync"
              target="_blank"
              rel="noopener noreferrer"
            >
              <StyledIconButton aria-label="GitHub">
                <GitHubIcon />
              </StyledIconButton>
            </Link>
            <StyledIconButton aria-label="LinkedIn">
              <Link
                href="https://www.linkedin.com/in/rahuldidvaniya/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedInIcon />
              </Link>
            </StyledIconButton>
          </SocialIcons>
        </Box>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 