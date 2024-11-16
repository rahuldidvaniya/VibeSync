import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingState = ({ message = 'Loading...' }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    gap: 2,
    py: 4 
  }}>
    <CircularProgress size={40} />
    <Typography color="text.secondary">{message}</Typography>
  </Box>
);

export default LoadingState; 