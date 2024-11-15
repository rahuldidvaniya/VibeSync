// SongAttributesSection.js
import { useState, useEffect } from 'react';
import { Box, Typography, Slider, styled, Paper, Grid } from '@mui/material';

// Mood presets with their corresponding Spotify API parameters
const MOOD_PRESETS = [
  {
    name: 'Party',
    emoji: '🎉',
    description: 'High-energy dance tracks',
    color: '#FF4B4B',
    attributes: {
      target_energy: 0.8,
      target_danceability: 0.8,
      target_valence: 0.7,
      target_popularity: 70,
      target_tempo: 120,
      min_popularity: 50,
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
      target_danceability: 0.5,
      target_valence: 0.5,
      target_popularity: 60,
      target_acousticness: 0.6,
      min_popularity: 30,
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
      target_danceability: 0.3,
      target_valence: 0.5,
      target_popularity: 50,
      target_instrumentalness: 0.7,
      min_popularity: 20,
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
      target_danceability: 0.7,
      target_valence: 0.8,
      target_popularity: 75,
      target_tempo: 130,
      min_popularity: 60,
      limit: 20
    }
  }
];

// Styled components
const Container = styled(Box)({
  padding: '24px',
  backgroundColor: '#121212',
  borderRadius: '8px',
  color: '#fff'
});

const MoodGrid = styled(Grid)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
  gap: '16px',
  marginBottom: '32px'
});

const MoodCard = styled(Paper)(({ isSelected, cardColor }) => ({
  padding: '16px',
  cursor: 'pointer',
  backgroundColor: isSelected ? cardColor : '#282828',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 12px rgba(0,0,0,0.2)'
  }
}));

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

  useEffect(() => {
    const selectedPreset = MOOD_PRESETS.find(preset => preset.name === selectedMood);
    if (selectedPreset) {
      const adjustedAttributes = {
        ...selectedPreset.attributes,
        target_energy: selectedPreset.attributes.target_energy * intensity,
        target_danceability: selectedPreset.attributes.target_danceability * intensity,
        target_valence: selectedPreset.attributes.target_valence * intensity,
        limit: numTracks
      };
      onAttributesChange(adjustedAttributes);
    }
  }, [selectedMood, intensity, numTracks, onAttributesChange]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Choose Your Vibe
      </Typography>

      <MoodGrid container spacing={2}>
        {MOOD_PRESETS.map((preset) => (
          <Grid item xs={12} sm={6} key={preset.name}>
            <MoodCard
              isSelected={selectedMood === preset.name}
              cardColor={preset.color}
              onClick={() => setSelectedMood(preset.name)}
            >
              <Typography variant="h3" sx={{ fontSize: '2rem', mb: 1 }}>
                {preset.emoji}
              </Typography>
              <Typography variant="h6">{preset.name}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {preset.description}
              </Typography>
            </MoodCard>
          </Grid>
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
    </Container>
  );
}

export default SongAttributesSection;