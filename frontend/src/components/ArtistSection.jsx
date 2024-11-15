import { useState, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Autocomplete, 
  TextField, 
  Avatar, 
  Paper,
  CircularProgress,
  styled 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { searchArtists } from '../services/api';
import debounce from 'lodash/debounce';
import { useSeedContext } from '../context/SeedContext';

const Section = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  width: '50%',
  '@media (max-width: 900px)': {
    width: '100%',
  },
});

const SearchWrapper = styled(Box)({
  width: '100%',
});

const SelectedArtistsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gap: '16px',
  width: '100%',
});

const ArtistCard = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  padding: '12px',
  backgroundColor: '#181818',
  borderRadius: '4px',
  width: '100%',
});

const ArtistAvatar = styled(Avatar)({
  width: '100%',
  height: 'auto',
  borderRadius: '50%',
  aspectRatio: '1',
});

const DropdownOption = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '8px 16px',
});

const ArtistSection = ({ onError }) => {
  const [artistOptions, setArtistOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { 
    selectedArtists, 
    updateSeeds, 
    remainingSeeds 
  } = useSeedContext();

  const debouncedSearchArtists = useCallback(
    debounce(async (query) => {
      if (!query) {
        setArtistOptions([]);
        return;
      }
      
      setLoading(true);
      try {
        const data = await searchArtists(query);
        setArtistOptions(data.items);
      } catch (error) {
        console.error('Artist search failed:', error);
        onError('Failed to search artists. Please try again.');
        setArtistOptions([]);
      } finally {
        setLoading(false);
      }
    }, 300),
    [onError]
  );

  const handleArtistChange = (_, newValue) => {
    const success = updateSeeds('artists', newValue);
    if (!success) {
      onError(`Maximum ${MAX_TOTAL_SEEDS} total seeds allowed`);
    }
  };

  return (
    <Section>
      <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>
        Artists ({selectedArtists.length})
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

      <SearchWrapper>
        <Autocomplete
          multiple
          options={artistOptions}
          loading={loading}
          getOptionLabel={(option) => option.name}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={handleArtistChange}
          onInputChange={(_, value) => debouncedSearchArtists(value)}
          value={selectedArtists}
          disabled={remainingSeeds === 0}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={remainingSeeds === 0 ? 
                "Maximum seeds reached" : 
                "Search for artists..."
              }
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <>
                    <SearchIcon sx={{ color: '#b3b3b3', ml: 1 }} />
                    {params.InputProps.startAdornment}
                  </>
                ),
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
          renderOption={(props, option) => {
            const { key, ...otherProps } = props;
            return (
              <Box 
                component="li" 
                key={option.id}
                {...otherProps}
              >
                <DropdownOption>
                  <Avatar 
                    src={option.images?.[0]?.url} 
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography 
                      color="text.primary"
                      sx={{ fontSize: '14px', fontWeight: 500 }}
                    >
                      {option.name}
                    </Typography>
                    <Typography 
                      color="text.secondary" 
                      sx={{ fontSize: '12px' }}
                    >
                      Artist
                    </Typography>
                  </Box>
                </DropdownOption>
              </Box>
            );
          }}
          PaperComponent={({ children, ...props }) => (
            <Paper 
              {...props} 
              sx={{ 
                backgroundColor: '#282828',
                borderRadius: '4px',
                marginTop: '8px',
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              }}
            >
              {children}
            </Paper>
          )}
        />
      </SearchWrapper>

      <SelectedArtistsGrid>
        {selectedArtists.map((artist) => (
          <ArtistCard key={artist.id}>
            <ArtistAvatar src={artist.images?.[0]?.url} />
            <Typography 
              sx={{ 
                color: '#fff',
                fontSize: '14px',
                fontWeight: 500,
                textAlign: 'center',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                width: '100%',
              }}
            >
              {artist.name}
            </Typography>
          </ArtistCard>
        ))}
      </SelectedArtistsGrid>
    </Section>
  );
};

export default ArtistSection;