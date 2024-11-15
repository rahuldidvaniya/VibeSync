import { createContext, useContext, useState, useCallback } from 'react';

const MAX_TOTAL_SEEDS = 5;
const SeedContext = createContext();

export const SeedProvider = ({ children }) => {
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const totalSeeds = selectedArtists.length + selectedTracks.length + selectedGenres.length;
  const remainingSeeds = MAX_TOTAL_SEEDS - totalSeeds;

  const updateSeeds = useCallback((type, newSelection) => {
    const newTotal = newSelection.length + 
      (type === 'artists' ? selectedTracks.length + selectedGenres.length :
       type === 'tracks' ? selectedArtists.length + selectedGenres.length :
       selectedArtists.length + selectedTracks.length);

    if (newTotal > MAX_TOTAL_SEEDS) {
      return false;
    }

    switch(type) {
      case 'artists':
        setSelectedArtists(newSelection);
        break;
      case 'tracks':
        setSelectedTracks(newSelection);
        break;
      case 'genres':
        setSelectedGenres(newSelection);
        break;
    }
    return true;
  }, [selectedArtists.length, selectedTracks.length, selectedGenres.length]);

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