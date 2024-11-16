const TrackCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  transform: 'translateY(0)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.2)',
  },
})); 