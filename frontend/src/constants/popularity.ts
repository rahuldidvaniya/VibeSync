export interface PopularityPreset {
  name: string;
  description: string;
  target_popularity: number;
  min_popularity: number;
  max_popularity: number;
}

export const POPULARITY_PRESETS: Record<string, PopularityPreset> = {
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