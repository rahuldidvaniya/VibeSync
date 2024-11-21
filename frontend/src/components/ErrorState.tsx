import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message, onRetry }) => (
  <Box sx={{ 
    textAlign: 'center', 
    py: 4 
  }}>
    <ErrorOutlineIcon sx={{ fontSize: 48, color: 'error.main', mb: 2 }} />
    <Typography variant="h6" gutterBottom>
      Oops! Something went wrong
    </Typography>
    <Typography color="text.secondary" sx={{ mb: 3 }}>
      {message}
    </Typography>
    {onRetry && (
      <Button variant="contained" onClick={onRetry}>
        Try Again
      </Button>
    )}
  </Box>
);

export default ErrorState; 