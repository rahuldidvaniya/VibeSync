import { createContext, useContext, useState, useCallback } from 'react';

const MAX_TOTAL_SEEDS = 5;
const SeedContext = createContext();

export const SeedProvider = ({ children }) => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const totalSeeds = selectedArtists.length + selectedTracks.length + selectedGenres.length;
  const remainingSeeds = MAX_TOTAL_SEEDS - totalSeeds;

  const updateSeeds = useCallback((type, newValue) => {
    switch(type) {
      case 'artists': {
        const updatedArtists = Array.isArray(newValue) 
          ? newValue 
          : [...selectedArtists, newValue];
        
        if (updatedArtists.length + selectedTracks.length + selectedGenres.length > MAX_TOTAL_SEEDS) {
          return false;
        }
        setSelectedArtists(updatedArtists);
        break;
      }
      case 'tracks': {
        const updatedTracks = Array.isArray(newValue) 
          ? newValue 
          : [...selectedTracks, newValue];
        
        if (updatedTracks.length + selectedArtists.length + selectedGenres.length > MAX_TOTAL_SEEDS) {
          return false;
        }
        setSelectedTracks(updatedTracks);
        break;
      }
      case 'genres':
        setSelectedGenres(newValue);
        break;
      default:
        return false;
    }
    return true;
  }, [selectedArtists, selectedTracks, selectedGenres]);

  return (
    <SeedContext.Provider value={{
      selectedArtists,
      selectedTracks,
      selectedGenres,
      updateSeeds,
      totalSeeds,
      remainingSeeds,
      MAX_TOTAL_SEEDS
    }}>
      {children}
    </SeedContext.Provider>
  );
};

export const useSeedContext = () => useContext(SeedContext); 