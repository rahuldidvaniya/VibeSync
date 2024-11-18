// SongAttributesSection.js
import { useState, useEffect } from 'react';
import { Box, Typography, Slider, styled, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Enhanced mood presets with more Spotify API parameters
const MOOD_PRESETS = [
  {
    name: 'Party',
    emoji: '🎉',
    description: 'High-energy dance tracks',
    color: '#FF4B4B',
    attributes: {
      target_energy: 0.8,
      min_energy: 0.7,
      max_energy: 0.9,
      target_danceability: 0.8,
      min_danceability: 0.7,
      max_danceability: 0.9,
      target_valence: 0.7,
      min_valence: 0.6,
      max_valence: 0.8,
      target_popularity: 70,
      min_popularity: 50,
      max_popularity: 90,
      target_tempo: 120,
      min_tempo: 100,
      max_tempo: 140,
      target_loudness: -6,
      min_loudness: -10,
      max_instrumentalness: 0.3,
      limit: 20
    }
  },
  {
    name: 'Chill',
    emoji: '🌊',
    description: 'Relaxing & peaceful vibes',
    color: '#4B96FF',
    attributes: {
      target_energy: 0.4,
      min_energy: 0.2,
      max_energy: 0.6,
      target_danceability: 0.5,
      min_danceability: 0.4,
      max_danceability: 0.6,
      target_valence: 0.5,
      min_valence: 0.4,
      max_valence: 0.6,
      target_popularity: 60,
      min_popularity: 30,
      max_popularity: 80,
      target_acousticness: 0.6,
      min_acousticness: 0.4,
      max_acousticness: 0.8,
      target_instrumentalness: 0.3,
      min_instrumentalness: 0.1,
      max_tempo: 100,
      min_tempo: 60,
      target_loudness: -12,
      min_loudness: -20,
      max_loudness: -8,
      limit: 20
    }
  },
  {
    name: 'Focus',
    emoji: '🎯',
    description: 'Concentration & productivity',
    color: '#32CD32',
    attributes: {
      target_energy: 0.5,
      min_energy: 0.4,
      max_energy: 0.6,
      target_danceability: 0.3,
      min_danceability: 0.2,
      max_danceability: 0.4,
      target_valence: 0.5,
      min_valence: 0.4,
      max_valence: 0.6,
      target_popularity: 50,
      min_popularity: 20,
      max_popularity: 70,
      target_instrumentalness: 0.7,
      min_instrumentalness: 0.5,
      max_instrumentalness: 0.9,
      max_speechiness: 0.3,
      target_tempo: 110,
      min_tempo: 90,
      max_tempo: 120,
      target_loudness: -15,
      min_loudness: -25,
      max_loudness: -10,
      limit: 20
    }
  },
  {
    name: 'Workout',
    emoji: '💪',
    description: 'High-energy motivation',
    color: '#FFD700',
    attributes: {
      target_energy: 0.9,
      min_energy: 0.8,
      max_energy: 1.0,
      target_danceability: 0.7,
      min_danceability: 0.6,
      max_danceability: 0.8,
      target_valence: 0.8,
      min_valence: 0.7,
      max_valence: 0.9,
      target_popularity: 75,
      min_popularity: 60,
      max_popularity: 90,
      target_tempo: 130,
      min_tempo: 120,
      max_tempo: 150,
      target_loudness: -5,
      min_loudness: -8,
      max_acousticness: 0.3,
      limit: 20
    }
  },
  {
    name: 'Sleep',
    emoji: '😴',
    description: 'Calm & soothing sounds',
    color: '#9370DB',
    attributes: {
      target_energy: 0.2,
      min_energy: 0.1,
      max_energy: 0.3,
      target_danceability: 0.3,
      min_danceability: 0.2,
      max_danceability: 0.4,
      target_valence: 0.4,
      min_valence: 0.3,
      max_valence: 0.5,
      target_popularity: 40,
      min_popularity: 20,
      max_popularity: 60,
      target_tempo: 80,
      min_tempo: 60,
      max_tempo: 100,
      target_acousticness: 0.8,
      min_acousticness: 0.6,
      max_acousticness: 1.0,
      target_instrumentalness: 0.6,
      min_instrumentalness: 0.4,
      max_instrumentalness: 0.8,
      max_loudness: -10,
      target_loudness: -18,
      min_loudness: -30,
      limit: 20
    }
  }
];


// Styled components
const Container = styled(Box)({
  padding: '24px',
  backgroundColor: '#121212',
  borderRadius: '8px',
  color: '#fff',
  width: '90%',
  margin: '0 auto'
});

const MoodGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '16px',
  marginBottom: '32px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const MoodCard = styled(Paper)(({ theme, isSelected }) => ({
  padding: '20px',
  borderRadius: '16px',
  cursor: 'pointer',
  backgroundColor: isSelected ? 'rgba(29, 185, 84, 0.1)' : 'rgba(255, 255, 255, 0.03)',
  border: `2px solid ${isSelected ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.05)'}`,
  transition: 'all 0.2s ease',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  minHeight: '180px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    backgroundColor: isSelected ? 'rgba(29, 185, 84, 0.15)' : 'rgba(255, 255, 255, 0.05)',
    transform: 'translateY(-2px)',
  },
}));

const MoodContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
});

const MoodEmoji = styled(Box)({
  fontSize: '32px',
  width: '56px',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  marginBottom: '8px',
});

const CustomSlider = styled(Slider)({
  color: '#1DB954',
  '& .MuiSlider-thumb': {
    width: 24,
    height: 24
  }
});

function SongAttributesSection({ onAttributesChange }) {
  const [selectedMood, setSelectedMood] = useState(MOOD_PRESETS[0].name);
  const [intensity, setIntensity] = useState(1);
  const [numTracks, setNumTracks] = useState(20);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [advancedAttributes, setAdvancedAttributes] = useState({
    target_tempo: 120,
    target_acousticness: 0.5,
    target_instrumentalness: 0.5,
    target_speechiness: 0.5,
    target_liveness: 0.5,
    target_loudness: -10,
  });

  useEffect(() => {
    const selectedPreset = MOOD_PRESETS.find(preset => preset.name === selectedMood);
    if (selectedPreset) {
      const adjustedAttributes = {
        ...selectedPreset.attributes,
        ...advancedAttributes,
        target_energy: Math.min(selectedPreset.attributes.target_energy * intensity, 1),
        target_danceability: Math.min(selectedPreset.attributes.target_danceability * intensity, 1),
        target_valence: Math.min(selectedPreset.attributes.target_valence * intensity, 1),
        limit: numTracks
      };
      onAttributesChange(adjustedAttributes);
    }
  }, [selectedMood, intensity, numTracks, advancedAttributes, onAttributesChange]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Choose Your Vibe
      </Typography>

      <MoodGrid>
        {MOOD_PRESETS.map((preset) => (
          <MoodCard
            key={preset.name}
            isSelected={selectedMood === preset.name}
            onClick={() => setSelectedMood(preset.name)}
          >
            <MoodContent>
              <MoodEmoji>
                {preset.emoji}
              </MoodEmoji>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mb: 1
                }}
              >
                {preset.name}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  opacity: 0.8,
                  fontSize: '0.875rem',
                  maxWidth: '90%',
                  margin: '0 auto'
                }}
              >
                {preset.description}
              </Typography>
            </MoodContent>
          </MoodCard>
        ))}
      </MoodGrid>

      <Box sx={{ mb: 4 }}>
        <Typography gutterBottom>
          Intensity: {Math.round(intensity * 100)}%
        </Typography>
        <CustomSlider
          value={intensity}
          onChange={(_, value) => setIntensity(value)}
          min={0.1}
          max={1}
          step={0.1}
          marks
          valueLabelDisplay="auto"
          valueLabelFormat={(value) => `${Math.round(value * 100)}%`}
        />
      </Box>

      <Box>
        <Typography gutterBottom>
          Number of Tracks: {numTracks}
        </Typography>
        <CustomSlider
          value={numTracks}
          onChange={(_, value) => setNumTracks(value)}
          min={1}
          max={100}
          marks={[
            { value: 1, label: '1' },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: 100, label: '100' }
          ]}
        />
      </Box>

      <Accordion 
        expanded={showAdvanced}
        onChange={() => setShowAdvanced(!showAdvanced)}
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          color: '#fff',
          marginTop: 3
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
          <Typography>Advanced Tuning</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            {Object.entries(advancedAttributes).map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <Typography gutterBottom>
                  {key.replace('target_', '').charAt(0).toUpperCase() + 
                   key.slice(8).replace('_', ' ')}
                </Typography>
                <CustomSlider
                  value={value}
                  onChange={(_, newValue) => {
                    setAdvancedAttributes(prev => ({
                      ...prev,
                      [key]: newValue
                    }));
                  }}
                  min={key === 'target_loudness' ? -60 : 0}
                  max={key === 'target_loudness' ? 0 : 1}
                  step={key === 'target_loudness' ? 1 : 0.1}
                  marks
                  valueLabelDisplay="auto"
                />
              </Grid>
            ))}
          </Grid>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

export default SongAttributesSection;