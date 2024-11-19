// SongAttributesSection.js
import { useState, useEffect } from 'react';
import { Box, Typography, Slider, styled, Paper, Grid, Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
import { showToast } from '../utils/toast';

// Enhanced mood presets with more Spotify API parameters
const MOOD_PRESETS = [
  {
    name: 'Party',
    emoji: '🎉',
    description: 'High-energy dance tracks',
    attributes: {
      target_energy: 0.8,
      min_energy: 0.7,
      max_energy: 1.0,
      target_danceability: 0.8,
      min_danceability: 0.7,
      max_danceability: 1.0,
      target_valence: 0.7,
      min_valence: 0.6,
      max_valence: 1.0,
      target_tempo: 120,
      min_tempo: 115,
      max_tempo: 140,
      target_loudness: -5,
      min_loudness: -8,
      max_loudness: -3,
      target_instrumentalness: 0.2,
      min_instrumentalness: 0.0,
      max_instrumentalness: 0.4,
      target_speechiness: 0.3,
      min_speechiness: 0.1,
      max_speechiness: 0.5,
      target_liveness: 0.4,
      min_liveness: 0.2,
      max_liveness: 0.8,
      target_acousticness: 0.2,
      min_acousticness: 0.0,
      max_acousticness: 0.4,
      mode: 1, // Major
      key: 5  // Key of C#
    }
  },
  {
    name: 'Chill',
    emoji: '😌',
    description: 'Relaxed, laid-back vibes',
    attributes: {
      target_energy: 0.3,
      min_energy: 0.1,
      max_energy: 0.5,
      target_danceability: 0.4,
      min_danceability: 0.2,
      max_danceability: 0.6,
      target_valence: 0.6,
      min_valence: 0.4,
      max_valence: 0.8,
      target_tempo: 95,
      min_tempo: 70,
      max_tempo: 110,
      target_loudness: -12,
      min_loudness: -20,
      max_loudness: -8,
      target_acousticness: 0.6,
      min_acousticness: 0.4,
      max_acousticness: 0.85,
      target_instrumentalness: 0.4,
      min_instrumentalness: 0.2,
      max_instrumentalness: 0.8,
      target_speechiness: 0.2,
      min_speechiness: 0.0,
      max_speechiness: 0.4,
      target_liveness: 0.2,
      min_liveness: 0.0,
      max_liveness: 0.4,
      mode: 0, // Minor
      key: 8  // Key of G
    }
  },
  {
    name: 'Focus',
    emoji: '🎯',
    description: 'Concentration-enhancing tracks',
    attributes: {
      target_energy: 0.4,
      min_energy: 0.2,
      max_energy: 0.6,
      target_danceability: 0.3,
      min_danceability: 0.1,
      max_danceability: 0.5,
      target_valence: 0.5,
      min_valence: 0.3,
      max_valence: 0.7,
      target_tempo: 110,
      min_tempo: 90,
      max_tempo: 125,
      target_loudness: -15,
      min_loudness: -25,
      max_loudness: -10,
      target_instrumentalness: 0.7,
      min_instrumentalness: 0.5,
      max_instrumentalness: 1.0,
      target_speechiness: 0.1,
      min_speechiness: 0.0,
      max_speechiness: 0.3,
      target_acousticness: 0.5,
      min_acousticness: 0.3,
      max_acousticness: 0.8,
      target_liveness: 0.1,
      min_liveness: 0.0,
      max_liveness: 0.3,
      mode: 1, // Major
      key: 0  // Key of C
    }
  },
  {
    name: 'Workout',
    emoji: '💪',
    description: 'High-energy motivation',
    attributes: {
      target_energy: 0.9,
      min_energy: 0.8,
      max_energy: 1.0,
      target_danceability: 0.7,
      min_danceability: 0.6,
      max_danceability: 0.9,
      target_valence: 0.8,
      min_valence: 0.7,
      max_valence: 1.0,
      target_tempo: 135,
      min_tempo: 120,
      max_tempo: 160,
      target_loudness: -5,
      min_loudness: -8,
      max_loudness: -3,
      target_instrumentalness: 0.2,
      min_instrumentalness: 0.0,
      max_instrumentalness: 0.4,
      target_speechiness: 0.3,
      min_speechiness: 0.1,
      max_speechiness: 0.6,
      target_liveness: 0.5,
      min_liveness: 0.3,
      max_liveness: 0.8,
      target_acousticness: 0.2,
      min_acousticness: 0.0,
      max_acousticness: 0.3,
      mode: 1, // Major
      key: 7  // Key of G
    }
  },
  {
    name: 'Sleep',
    emoji: '😴',
    description: 'Calm & soothing sounds',
    attributes: {
      target_energy: 0.2,
      min_energy: 0.1,
      max_energy: 0.3,
      target_danceability: 0.3,
      min_danceability: 0.1,
      max_danceability: 0.4,
      target_valence: 0.4,
      min_valence: 0.3,
      max_valence: 0.5,
      target_tempo: 80,
      min_tempo: 60,
      max_tempo: 90,
      target_acousticness: 0.8,
      min_acousticness: 0.6,
      max_acousticness: 1.0,
      target_instrumentalness: 0.8,
      min_instrumentalness: 0.6,
      max_instrumentalness: 1.0,
      target_loudness: -18,
      min_loudness: -30,
      max_loudness: -12,
      target_speechiness: 0.1,
      min_speechiness: 0.0,
      max_speechiness: 0.2,
      target_liveness: 0.1,
      min_liveness: 0.0,
      max_liveness: 0.2,
      mode: 0, // Minor
      key: 4  // Key of E
    }
  }
];


// Add this new constant for popularity presets
const POPULARITY_PRESETS = {
  mainstream: {
    name: 'Mainstream',
    description: 'Popular hits and trending tracks',
    target_popularity: 75,
    min_popularity: 60,
    max_popularity: 100,
  },
  mixed: {
    name: 'Mixed',
    description: 'Balance of popular and lesser-known tracks',
    target_popularity: 50,
    min_popularity: 25,
    max_popularity: 75,
  },
  indie: {
    name: 'Underground',
    description: 'Hidden gems and emerging artists',
    target_popularity: 10,
    min_popularity: 0,
    max_popularity: 25,
  },
};

// Styled components
const Container = styled(Box)({
  padding: '32px',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  borderRadius: '16px',
  color: '#fff',
  width: '100%',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  maxWidth: '100%',
  overflowX: 'hidden',
});

const MoodGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '24px',
  marginBottom: '32px',
  width: '100%',
  
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  }
}));

const MoodCard = styled(Paper)(({ theme, isSelected }) => ({
  backgroundColor: isSelected ? 'rgba(29, 185, 84, 0.1)' : 'rgba(255, 255, 255, 0.03)',
  padding: '28px 24px',
  borderRadius: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: `1px solid ${isSelected ? '#1DB954' : 'rgba(255, 255, 255, 0.05)'}`,
  position: 'relative',
  overflow: 'hidden',
  minHeight: '220px',
  width: '100%',
  
  [theme.breakpoints.down('sm')]: {
    padding: '20px 16px',
    minHeight: '180px',
  },

  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: isSelected ? 'rgba(29, 185, 84, 0.15)' : 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  }
}));

const MoodContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  
  [theme.breakpoints.down('sm')]: {
    gap: '8px',
  }
}));

const MoodEmoji = styled(Box)({
  fontSize: '32px',
  width: '64px',
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
  borderRadius: '20px',
  marginBottom: '16px',
  transition: 'all 0.3s ease',
  backdropFilter: 'blur(8px)',
  '&:hover': {
    transform: 'scale(1.05) rotate(5deg)',
  }
});

const CustomSlider = styled(Slider)(({ theme }) => ({
  color: '#1DB954',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundImage: 'linear-gradient(90deg, #1DB954, #1ed760)',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid #1DB954',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: '0 0 0 8px rgba(29, 185, 84, 0.16)',
    },
    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    backgroundColor: '#1DB954',
  },
  '& .MuiSlider-rail': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '& .MuiSlider-mark': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}));

const StyledAccordion = styled(Accordion)({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '12px !important',
  marginTop: '32px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  width: '100%',
  maxWidth: '100%',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    borderRadius: '12px',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
    },
  },
  '& .MuiAccordionDetails-root': {
    padding: '24px',
    maxWidth: '100%',
    overflowX: 'hidden',
  },
});

const SliderContainer = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '24px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
});

const PopularityToggle = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '24px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
});

const ToggleButton = styled(Button)(({ selected }) => ({
  backgroundColor: selected ? 'rgba(29, 185, 84, 0.1)' : 'rgba(255, 255, 255, 0.03)',
  color: selected ? '#1DB954' : '#fff',
  border: `1px solid ${selected ? '#1DB954' : 'rgba(255, 255, 255, 0.05)'}`,
  padding: '8px 16px',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: selected ? 'rgba(29, 185, 84, 0.2)' : 'rgba(255, 255, 255, 0.05)',
    transform: 'translateY(-2px)',
  },
}));

const AUDIO_FEATURES = {
  energy: {
    name: 'Energy',
    description: 'Intensity and activity level',
    icon: '⚡',
    min: 0,
    max: 1,
    step: 0.01,
    default: {
      target: 0.5,
      min: 0.2,
      max: 0.8
    }
  },
  danceability: {
    name: 'Danceability',
    description: 'How suitable for dancing',
    icon: '💃',
    min: 0,
    max: 1,
    step: 0.01,
    default: {
      target: 0.5,
      min: 0.2,
      max: 0.8
    }
  },
  valence: {
    name: 'Valence',
    description: 'Musical positiveness',
    icon: '😊',
    min: 0,
    max: 1,
    step: 0.01,
    default: {
      target: 0.5,
      min: 0.2,
      max: 0.8
    }
  },
  acousticness: {
    name: 'Acousticness',
    description: 'Amount of acoustic sound',
    icon: '🎸',
    min: 0,
    max: 1,
    step: 0.01,
    default: {
      target: 0.5,
      min: 0.2,
      max: 0.8
    }
  },
  instrumentalness: {
    name: 'Instrumentalness',
    description: 'Predicts no vocal content',
    icon: '🎹',
    min: 0,
    max: 1,
    step: 0.01,
    default: {
      target: 0.5,
      min: 0.2,
      max: 0.8
    }
  },
  liveness: {
    name: 'Liveness',
    description: 'Presence of audience sounds',
    icon: '🎭',
    min: 0,
    max: 1,
    step: 0.01,
    default: {
      target: 0.5,
      min: 0.2,
      max: 0.8
    }
  },
  speechiness: {
    name: 'Speechiness',
    description: 'Presence of spoken words',
    icon: '🗣️',
    min: 0,
    max: 1,
    step: 0.01,
    default: {
      target: 0.5,
      min: 0.2,
      max: 0.8
    }
  },
  tempo: {
    name: 'Tempo',
    description: 'Beats per minute (BPM)',
    icon: '⏱️',
    min: 50,
    max: 200,
    step: 1,
    default: {
      target: 120,
      min: 60,
      max: 180
    }
  },
  loudness: {
    name: 'Loudness',
    description: 'Overall loudness in dB',
    icon: '🔊',
    min: -60,
    max: 0,
    step: 1,
    default: {
      target: -10,
      min: -20,
      max: -5
    }
  }
};

// Add this new styled component
const FeatureSliderGroup = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  }
}));

function SongAttributesSection({ onAttributesChange }) {
  const [selectedMood, setSelectedMood] = useState(MOOD_PRESETS[0].name);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedPopularity, setSelectedPopularity] = useState('mixed');
  const [numTracks, setNumTracks] = useState(20);
  
  // Initialize advanced attributes with the first mood preset's values
  const [advancedAttributes, setAdvancedAttributes] = useState(() => {
    const initialMood = MOOD_PRESETS[0];
    return Object.fromEntries(
      Object.entries(AUDIO_FEATURES).map(([key, feature]) => {
        // If the mood preset has this attribute, use its values, otherwise use defaults
        const moodValue = initialMood.attributes[`target_${key}`];
        const moodMin = initialMood.attributes[`min_${key}`];
        const moodMax = initialMood.attributes[`max_${key}`];
        
        return [key, {
          target: moodValue ?? feature.default.target,
          min: moodMin ?? feature.default.min,
          max: moodMax ?? feature.default.max
        }];
      })
    );
  });

  // Update advanced attributes when mood changes
  const handleMoodChange = (newMood) => {
    if (selectedMood === newMood) return; // Prevent unnecessary updates
    
    try {
      setSelectedMood(newMood);
      const selectedPreset = MOOD_PRESETS.find(preset => preset.name === newMood);
      
      if (selectedPreset) {
        setAdvancedAttributes(prev => {
          const newAttributes = { ...prev };
          
          // Update each audio feature based on the mood preset
          Object.keys(AUDIO_FEATURES).forEach(key => {
            const targetKey = `target_${key}`;
            const minKey = `min_${key}`;
            const maxKey = `max_${key}`;
            
            if (selectedPreset.attributes[targetKey] !== undefined) {
              newAttributes[key] = {
                target: selectedPreset.attributes[targetKey],
                min: selectedPreset.attributes[minKey] ?? AUDIO_FEATURES[key].default.min,
                max: selectedPreset.attributes[maxKey] ?? AUDIO_FEATURES[key].default.max
              };
            }
          });
          
          return newAttributes;
        });
        showToast.success(`Mood set to ${newMood}`);
      }
    } catch (error) {
      showToast.error('Failed to change mood');
    }
  };

  // Handle changes to advanced attributes
  const handleAdvancedChange = (feature, type, value) => {
    try {
      setAdvancedAttributes(prev => ({
        ...prev,
        [feature]: {
          ...prev[feature],
          [type]: value
        }
      }));
    } catch (error) {
      showToast.error(`Failed to update ${feature}`);
    }
  };

  // Combine mood preset with advanced attributes
  useEffect(() => {
    const selectedPreset = MOOD_PRESETS.find(preset => preset.name === selectedMood);
    if (selectedPreset) {
      // Start with the base attributes from the mood preset
      let combinedAttributes = {
        ...selectedPreset.attributes,
        ...POPULARITY_PRESETS[selectedPopularity],
        limit: numTracks
      };

      // If advanced section is open, override with any modified advanced attributes
      if (showAdvanced) {
        Object.entries(advancedAttributes).forEach(([key, value]) => {
          combinedAttributes[`target_${key}`] = value.target;
          combinedAttributes[`min_${key}`] = value.min;
          combinedAttributes[`max_${key}`] = value.max;
        });
      }

      onAttributesChange(combinedAttributes);
    }
  }, [selectedMood, selectedPopularity, numTracks, showAdvanced, advancedAttributes, onAttributesChange]);

  const handlePopularityChange = (newPopularity) => {
    if (selectedPopularity === newPopularity) return; // Prevent unnecessary updates
    
    try {
      setSelectedPopularity(newPopularity);
      showToast.success(`Popularity set to ${POPULARITY_PRESETS[newPopularity].name}`);
    } catch (error) {
      showToast.error('Failed to update popularity preference');
    }
  };

  return (
    <Container>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          mb: 4,
          textAlign: 'center',
          background: 'linear-gradient(90deg, #fff, #1DB954)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Choose Your Vibe
      </Typography>

      <MoodGrid>
        {MOOD_PRESETS.map((mood) => (
          <MoodCard
            key={mood.name}
            isSelected={selectedMood === mood.name}
            onClick={() => handleMoodChange(mood.name)}
          >
            <MoodContent>
              <MoodEmoji>
                {mood.emoji}
              </MoodEmoji>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  mb: 1
                }}
              >
                {mood.name}
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
                {mood.description}
              </Typography>
            </MoodContent>
          </MoodCard>
        ))}
      </MoodGrid>

      <PopularityToggle>
        <Typography gutterBottom sx={{ mb: 2, fontWeight: 500 }}>
          Popularity Preference
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          {Object.entries(POPULARITY_PRESETS).map(([key, preset]) => (
            <ToggleButton
              key={key}
              selected={selectedPopularity === key}
              onClick={() => handlePopularityChange(key)}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" fontWeight={500}>
                  {preset.name}
                </Typography>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    display: 'block', 
                    opacity: 0.7,
                    fontSize: '0.75rem' 
                  }}
                >
                  {preset.description}
                </Typography>
              </Box>
            </ToggleButton>
          ))}
        </Box>
      </PopularityToggle>

      <SliderContainer>
        <Typography gutterBottom sx={{ mb: 2, fontWeight: 500 }}>
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
          valueLabelDisplay="auto"
        />
      </SliderContainer>

      <StyledAccordion expanded={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <TuneIcon sx={{ color: '#1DB954' }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Advanced Tuning
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{ mb: 3, color: 'text.secondary' }}>
            Fine-tune your recommendations by adjusting specific audio features. Each feature has a target value and a range.
          </Typography>
          
          {Object.entries(AUDIO_FEATURES).map(([key, feature]) => (
            <FeatureSliderGroup key={key}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                <Typography sx={{ fontSize: '24px' }}>{feature.icon}</Typography>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {feature.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    {feature.description}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography gutterBottom>
                  Target Value: {advancedAttributes[key].target}
                </Typography>
                <CustomSlider
                  value={advancedAttributes[key].target}
                  onChange={(_, value) => handleAdvancedChange(key, 'target', value)}
                  min={feature.min}
                  max={feature.max}
                  step={feature.step}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box>
                <Typography gutterBottom>
                  Range: {advancedAttributes[key].min} - {advancedAttributes[key].max}
                </Typography>
                <CustomSlider
                  value={[advancedAttributes[key].min, advancedAttributes[key].max]}
                  onChange={(_, value) => {
                    handleAdvancedChange(key, 'min', value[0]);
                    handleAdvancedChange(key, 'max', value[1]);
                  }}
                  min={feature.min}
                  max={feature.max}
                  step={feature.step}
                  valueLabelDisplay="auto"
                />
              </Box>
            </FeatureSliderGroup>
          ))}
        </AccordionDetails>
      </StyledAccordion>
    </Container>
  );
}

export default SongAttributesSection;