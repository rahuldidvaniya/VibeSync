import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Chip,
  styled,
  Divider,
  CircularProgress
} from '@mui/material';
import { useSeedContext } from '../context/SeedContext';
import GenreSearchDropdown from './shared/GenreSearchDropdown';
import { getAvailableGenres } from '../services/api';
import { showToast } from '../utils/toast';

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

const SelectedGenresSection = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '16px',
});



const GenreSection = ({ onError }) => {
  const [allGenres, setAllGenres] = useState([]);
  const [filteredGenres, setFilteredGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  
  const { 
    selectedGenres, 
    updateSeeds, 
    remainingSeeds 
  } = useSeedContext();

  const fetchGenres = async () => {
    setLoading(true);
    try {
      const data = await getAvailableGenres();
      console.log(`Fetched ${data.items.length} genres from backend`);
      setAllGenres(data.items);
      setFilteredGenres(data.items);
    } catch (error) {
        console.error('Failed to fetch genres:', error);
        // onError('Failed to load genres');
        showToast.error('Failed to load genres', 'error');

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreSearch = (_, query) => {
    setInputValue(query);
    
    if (!query) {
      setFilteredGenres(allGenres);
      return;
    }
    
    const searchTerm = query.toLowerCase();
    const filtered = allGenres.filter(genre => 
      genre.label.toLowerCase().includes(searchTerm)
    );
    setFilteredGenres(filtered);
  };

  const handleGenreSelect = (_, genre) => {
    if (!genre) return;

    if (selectedGenres.includes(genre.value)) {
      onError('Genre already selected');
      setInputValue('');
      setFilteredGenres(allGenres);
      return;
    }

    const newSelection = [...selectedGenres, genre.value];
    const success = updateSeeds('genres', newSelection);
    if (!success) {
      onError(`Maximum ${MAX_TOTAL_SEEDS} total seeds allowed`);
    } else {
      setInputValue('');
      setFilteredGenres(allGenres);
    }
  };

  const handleGenreRemove = (genre) => {
    const newSelection = selectedGenres.filter(g => g !== genre);
    updateSeeds('genres', newSelection);
  };

  const handleGenreClick = (genre) => {
    if (selectedGenres.includes(genre.value)) {
      handleGenreRemove(genre.value);
    } else {
      handleGenreSelect(null, genre);
    }
  };

  return (
    <Section>
      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
        Genres ({selectedGenres.length})
        {remainingSeeds > 0 && 
          <Typography 
            component="span" 
            sx={{ color: '#b3b3b3', fontSize: '14px', marginLeft: '8px' }}
          >
            {remainingSeeds} more available
          </Typography>
        }
      </Typography>

      <GenreSearchDropdown
        options={filteredGenres.filter(genre => !selectedGenres.includes(genre.value))}
        loading={loading}
        onInputChange={handleGenreSearch}
        onChange={handleGenreSelect}
        value={null}
        inputValue={inputValue}
        placeholder="Search for genres..."
        getOptionLabel={(option) => option?.label || ''}
        isOptionEqualToValue={(option, value) => option?.value === value?.value}
      />

      {selectedGenres.length > 0 && (
        <Box>
          <Typography 
            variant="subtitle2" 
            sx={{ color: '#b3b3b3', mb: 1 }}
          >
            Selected Genres
          </Typography>
          <SelectedGenresSection>
            {selectedGenres.map(genreValue => {
              const genre = allGenres.find(g => g.value === genreValue);
              return genre && (
                <GenreChip
                  key={genre.value}
                  label={genre.label}
                  onDelete={() => handleGenreRemove(genre.value)}
                  selected
                />
              );
            })}
          </SelectedGenresSection>
          <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
        </Box>
      )}

      <GenreGrid>
        {filteredGenres.map((genre) => (
          <GenreChip
            key={genre.value}
            label={genre.label}
            onClick={() => handleGenreClick(genre)}
            selected={selectedGenres.includes(genre.value)}
            disabled={remainingSeeds === 0 && !selectedGenres.includes(genre.value)}
          />
        ))}
        {loading && <CircularProgress size={24} sx={{ margin: '8px auto' }} />}
      </GenreGrid>
    </Section>
  );
};

export default GenreSection; 