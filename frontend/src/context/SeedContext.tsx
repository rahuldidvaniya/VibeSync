import React, { createContext, useContext, useState, useCallback } from 'react';


interface Artist {
  id: string;
  name: string;
  images?: Array<{
    url: string;
    height: number;
    width: number;
  }>;
  followers?: {
    total: number;
  };
}

interface Track {
  id: string;
  name: string;
  album: {
    images?: Array<{
      url: string;
      height: number;
      width: number;
    }>;
  };
  artists: Artist[];
  explicit: boolean;
  duration_ms: number;
}

interface SeedContextType {
  selectedArtists: Artist[];
  selectedTracks: Track[];
  selectedGenres: string[];
  updateSeeds: (
    type: 'artists' | 'tracks' | 'genres', 
    value: Artist | Track | string | Artist[] | Track[] | string[]
  ) => boolean;
  totalSeeds: number;
  remainingSeeds: number;
  MAX_TOTAL_SEEDS: number;
  clearSeeds: () => void;
}

interface SeedProviderProps {
  children: React.ReactNode;
}

const MAX_TOTAL_SEEDS = 5;

// Create context with initial type
const SeedContext = createContext<SeedContextType | undefined>(undefined);

export const SeedProvider: React.FC<SeedProviderProps> = ({ children }) => {
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<Track[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const totalSeeds = selectedArtists.length + selectedTracks.length + selectedGenres.length;
  const remainingSeeds = MAX_TOTAL_SEEDS - totalSeeds;

  const updateSeeds = useCallback((
    type: 'artists' | 'tracks' | 'genres',
    value: Artist | Track | string | Artist[] | Track[] | string[]
  ): boolean => {
    switch(type) {
      case 'artists': {
        if (Array.isArray(value)) {
          setSelectedArtists(value as Artist[]);
          return true;
        }
        
        const artist = value as Artist;
        const updatedArtists = [...selectedArtists, artist];
        
        if (updatedArtists.length + selectedTracks.length + selectedGenres.length > MAX_TOTAL_SEEDS) {
          return false;
        }
        setSelectedArtists(updatedArtists);
        break;
      }
      case 'tracks': {
        if (Array.isArray(value)) {
          setSelectedTracks(value as Track[]);
          return true;
        }
        
        const track = value as Track;
        const updatedTracks = [...selectedTracks, track];
        
        if (updatedTracks.length + selectedArtists.length + selectedGenres.length > MAX_TOTAL_SEEDS) {
          return false;
        }
        setSelectedTracks(updatedTracks);
        break;
      }
      case 'genres': {
        if (Array.isArray(value)) {
          setSelectedGenres(value as string[]);
          return true;
        }
        
        const genre = value as string;
        const updatedGenres = [...selectedGenres, genre];
        
        if (updatedGenres.length + selectedArtists.length + selectedTracks.length > MAX_TOTAL_SEEDS) {
          return false;
        }
        setSelectedGenres(updatedGenres);
        break;
      }
      default:
        return false;
    }
    return true;
  }, [selectedArtists, selectedTracks, selectedGenres]);

  const clearSeeds = useCallback((): void => {
    setSelectedArtists([]);
    setSelectedTracks([]);
    setSelectedGenres([]);
  }, []);

  const value: SeedContextType = {
    selectedArtists,
    selectedTracks,
    selectedGenres,
    updateSeeds,
    totalSeeds,
    remainingSeeds,
    MAX_TOTAL_SEEDS,
    clearSeeds,
  };

  return (
    <SeedContext.Provider value={value}>
      {children}
    </SeedContext.Provider>
  );
};

// Custom hook with type safety
export const useSeedContext = (): SeedContextType => {
  const context = useContext(SeedContext);
  if (context === undefined) {
    throw new Error('useSeedContext must be used within a SeedProvider');
  }
  return context;
};

export default SeedContext; 