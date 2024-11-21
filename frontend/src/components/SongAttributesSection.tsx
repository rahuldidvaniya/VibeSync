// SongAttributesSection.tsx
import { useState, useEffect } from 'react';
import { Box, Typography, Slider, styled, Paper, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TuneIcon from '@mui/icons-material/Tune';
import { AUDIO_FEATURES } from '../constants/audioFeatures';
import { POPULARITY_PRESETS } from '../constants/popularity';
import type { AudioFeature } from '../constants/audioFeatures';
import type { PopularityPreset } from '../constants/popularity';

// Interfaces
interface MoodPreset {
  name: string;
  emoji: string;
  description: string;
  attributes: {
    [key: string]: number;
  };
}

interface AdvancedAttribute {
  target: number;
  min: number;
  max: number;
}

interface SongAttributesSectionProps {
  onAttributesChange: (attributes: Record<string, number>) => void;
}

// Enhanced mood presets with more Spotify API parameters
const MOOD_PRESETS: MoodPreset[] = [
  {
    name: 'Party',
    emoji: '🎉',
    description: 'High-energy dance tracks',
    attributes: {
      target_energy: 0.8,
      min_energy: 0.7,
      target_danceability: 0.8,
      min_danceability: 0.7,
      target_valence: 0.7,
      min_valence: 0.6,
      target_tempo: 120,
      min_tempo: 115,
      target_loudness: -5,
      min_loudness: -8
    }
  },
  {
    name: 'Chill',
    emoji: '😌',
    description: 'Relaxed, laid-back vibes',
    attributes: {
      target_energy: 0.3,
      max_energy: 0.5,
      target_valence: 0.6,
      target_acousticness: 0.6,
      min_acousticness: 0.4,
      target_tempo: 95,
      max_tempo: 110,
      target_loudness: -12,
      max_loudness: -8
    }
  },
  {
    name: 'Focus',
    emoji: '🎯',
    description: 'Concentration-enhancing tracks',
    attributes: {
      target_energy: 0.4,
      max_energy: 0.6,
      target_instrumentalness: 0.7,
      min_instrumentalness: 0.5,
      target_speechiness: 0.1,
      max_speechiness: 0.3,
      target_tempo: 110,
      max_tempo: 125
    }
  },
  {
    name: 'Workout',
    emoji: '💪',
    description: 'High-energy motivation',
    attributes: {
      target_energy: 0.9,
      min_energy: 0.8,
      target_tempo: 135,
      min_tempo: 120,
      target_valence: 0.8,
      min_valence: 0.7,
      target_loudness: -5,
      min_loudness: -8
    }
  },
  {
    name: 'Sleep',
    emoji: '😴',
    description: 'Calm & soothing sounds',
    attributes: {
      target_energy: 0.2,
      max_energy: 0.3,
      target_acousticness: 0.8,
      min_acousticness: 0.6,
      target_instrumentalness: 0.8,
      min_instrumentalness: 0.6,
      target_loudness: -18,
      max_loudness: -12
    }
  }
];

// Styled components
const Container = styled(Box)({
  padding: '20px 35px',
  backgroundColor: 'rgba(255, 255, 255, 0.02)',
  borderRadius: '16px',
  color: '#fff',
  width: '100%',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  maxWidth: '100%',
  overflowX: 'hidden',
});

const MoodGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '24px',
  marginBottom: '32px',
  width: '100%',
  
  '@media (max-width: 600px)': {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
    marginBottom: '24px',
  }
});

interface MoodCardProps {
  isSelected: boolean;
}

const MoodCard = styled(Paper)<MoodCardProps>(({ isSelected }) => ({
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
  
  '@media (max-width: 600px)': {
    padding: '20px 16px',
    minHeight: '180px',
  },

  '&:hover': {
    transform: 'translateY(-4px)',
    backgroundColor: isSelected ? 'rgba(29, 185, 84, 0.15)' : 'rgba(255, 255, 255, 0.05)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
  }
}));

const MoodContent = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  width: '100%',
  
  '@media (max-width: 600px)': {
    gap: '8px',
  }
});

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

const CustomSlider = styled(Slider)({
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
});

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

const PopularityGrid = styled(Grid)({
  marginBottom: '48px',
  '@media (max-width: 600px)': {
    marginBottom: '32px',
  }
});

const PopularityCard = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  padding: '24px',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  height: '100%',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
  },

  '@media (max-width: 600px)': {
    padding: '16px',
  }
});

// Add this new styled component
const FeatureSliderGroup = styled(Box)({
  backgroundColor: 'rgba(255, 255, 255, 0.03)',
  padding: '24px',
  borderRadius: '12px',
  marginBottom: '16px',
  border: '1px solid rgba(255, 255, 255, 0.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  }
});

const SongAttributesSection: React.FC<SongAttributesSectionProps> = ({ onAttributesChange }) => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [selectedPopularity, setSelectedPopularity] = useState<string | null>(null);
  const [numTracks, setNumTracks] = useState<number>(20);
  
  const [advancedAttributes, setAdvancedAttributes] = useState<Record<string, AdvancedAttribute>>(() => {
    return Object.fromEntries(
      Object.entries(AUDIO_FEATURES).map(([key, feature]: [string, AudioFeature]) => {
        return [key, {
          target: feature.default.target,
          min: feature.default.min,
          max: feature.default.max
        }];
      })
    );
  });

  const handleAdvancedChange = (
    key: string, 
    type: 'target' | 'min' | 'max', 
    value: number
  ): void => {
    setAdvancedAttributes(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        [type]: value
      }
    }));
  };

  const handleMoodSelect = (moodName: string): void => {
    setSelectedMood(moodName === selectedMood ? null : moodName);
    
    if (selectedMood !== moodName) {
      const selectedMoodPreset = MOOD_PRESETS.find(preset => preset.name === moodName);
      if (selectedMoodPreset) {
        setAdvancedAttributes(() => {
          const newAttributes: Record<string, AdvancedAttribute> = {};
          Object.entries(AUDIO_FEATURES).forEach(([key, feature]) => {
            const moodValue = selectedMoodPreset.attributes[`target_${key}`];
            const moodMin = selectedMoodPreset.attributes[`min_${key}`];
            const moodMax = selectedMoodPreset.attributes[`max_${key}`];
            
            newAttributes[key] = {
              target: moodValue ?? feature.default.target,
              min: moodMin ?? feature.default.min,
              max: moodMax ?? feature.default.max
            };
          });
          return newAttributes;
        });
      }
    }
  };

  const handlePopularitySelect = (popularityKey: string): void => {
    setSelectedPopularity(popularityKey === selectedPopularity ? null : popularityKey);
  };

  useEffect(() => {
    const attributes = Object.entries(advancedAttributes).reduce((acc, [key, value]) => {
      acc[`target_${key}`] = value.target;
      acc[`min_${key}`] = value.min;
      acc[`max_${key}`] = value.max;
      return acc;
    }, {} as Record<string, number>);

    if (selectedPopularity) {
      const popularityPreset = POPULARITY_PRESETS[selectedPopularity];
      attributes.target_popularity = popularityPreset.target_popularity;
      attributes.min_popularity = popularityPreset.min_popularity;
      attributes.max_popularity = popularityPreset.max_popularity;
    }

    attributes.limit = numTracks;

    onAttributesChange(attributes);
  }, [advancedAttributes, selectedPopularity, onAttributesChange, numTracks]);

  return (
    <Container>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ 
          fontWeight: 700,
          mb: { xs: 5, sm: 6 },
          textAlign: 'center',
          background: 'linear-gradient(90deg, #fff, #1DB954)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontSize: { xs: '1.75rem', sm: '2rem' },
        }}
      >
        Choose Your Vibe
      </Typography>

      <Typography variant="h6" gutterBottom>
        Choose a Mood (Optional)
      </Typography>
      <MoodGrid>
        {MOOD_PRESETS.map((mood) => (
          <MoodCard
            key={mood.name}
            isSelected={selectedMood === mood.name}
            onClick={() => handleMoodSelect(mood.name)}
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

      <Typography variant="h6" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Select Popularity (Optional)
      </Typography>
      <PopularityGrid container spacing={3}>
        {Object.entries(POPULARITY_PRESETS).map(([key, preset]: [string, PopularityPreset]) => (
          <Grid item xs={12} sm={4} key={key}>
            <PopularityCard
              onClick={() => handlePopularitySelect(key)}
              sx={{
                backgroundColor: selectedPopularity === key ? 
                  'rgba(29, 185, 84, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                borderColor: selectedPopularity === key ? 
                  '#1DB954' : 'rgba(255, 255, 255, 0.05)',
              }}
            >
              <Typography variant="h6" gutterBottom sx={{ color: '#fff', fontWeight: 600 }}>
                {preset.name}
              </Typography>
              <Typography sx={{ color: '#b3b3b3', fontSize: '0.9rem', lineHeight: 1.5 }}>
                {preset.description}
              </Typography>
            </PopularityCard>
          </Grid>
        ))}
      </PopularityGrid>

      <SliderContainer sx={{ mt: 4 }}>
        <Typography gutterBottom sx={{ mb: 2, fontWeight: 500 }}>
          Number of Tracks: {numTracks}
        </Typography>
        <CustomSlider
          value={numTracks}
          onChange={(_, value) => setNumTracks(value as number)}
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
          
          {Object.entries(AUDIO_FEATURES).map(([key, feature]: [string, AudioFeature]) => (
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
                  onChange={(_, value) => handleAdvancedChange(key, 'target', value as number)}
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
                  onChange={(_, value: number | number[]) => {
                    if (Array.isArray(value)) {
                      handleAdvancedChange(key, 'min', value[0]);
                      handleAdvancedChange(key, 'max', value[1]); 
                    }
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
};

export default SongAttributesSection;