import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Chip,
  styled 
} from '@mui/material';
import { useSeedContext } from '../context/SeedContext';

const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '100%',
});

const GenreGrid = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  maxHeight: '200px',
  overflowY: 'auto',
  padding: '4px',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: '#121212',
  },
  '&::-webkit-scrollbar-thumb': {
    background: '#535353',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    background: '#636363',
  },
});

const GenreChip = styled(Chip)(({ selected }) => ({
  backgroundColor: selected ? '#1DB954' : '#282828',
  color: selected ? '#000' : '#fff',
  '&:hover': {
    backgroundColor: selected ? '#1ed760' : '#3E3E3E',
  },
}));

// List of available Spotify genres
const genres = [
  "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", 
  "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", 
  "british", "cantopop", "chicago-house", "children", "chill", "classical",
  "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house",
  "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", 
  "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk",
  "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge",
  "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal",
  "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie",
  "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock",
  "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal",
  "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age",
  "new-release", "opera", "pagode", "party", "philippines-opm", "piano",
  "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house",
  "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae",
  "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance",
  "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter",
  "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study",
  "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop",
  "turkish", "work-out", "world-music"
];

const GenreSection = ({ onError }) => {
  const { 
    selectedGenres, 
    updateSeeds, 
    remainingSeeds 
  } = useSeedContext();

  const handleGenreClick = (genre) => {
    const newSelection = selectedGenres.includes(genre)
      ? selectedGenres.filter(g => g !== genre)
      : [...selectedGenres, genre];
    
    const success = updateSeeds('genres', newSelection);
    if (!success) {
      onError(`Maximum ${MAX_TOTAL_SEEDS} total seeds allowed`);
    }
  };

  return (
    <Section>
      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
        Genres ({selectedGenres.length})
        {remainingSeeds > 0 && 
          <Typography 
            component="span" 
            sx={{ 
              color: '#b3b3b3',
              fontSize: '14px',
              marginLeft: '8px'
            }}
          >
            {remainingSeeds} more available
          </Typography>
        }
      </Typography>

      <GenreGrid>
        {genres.map((genre) => (
          <GenreChip
            key={genre}
            label={genre}
            selected={selectedGenres.includes(genre)}
            onClick={() => handleGenreClick(genre)}
            disabled={remainingSeeds === 0 && !selectedGenres.includes(genre)}
          />
        ))}
      </GenreGrid>
    </Section>
  );
};

export default GenreSection; 