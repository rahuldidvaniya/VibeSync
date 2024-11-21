export interface AudioFeature {
  name: string;
  key: string;
  description: string;
  min: number;
  max: number;
  step: number;
  default: {
    target: number;
    min: number;
    max: number;
  };
  icon?: string;
}

export const AUDIO_FEATURES: Record<string, AudioFeature> = {
  danceability: {
    name: 'Danceability',
    key: 'danceability',
    description: 'How suitable a track is for dancing',
    min: 0,
    max: 1,
    step: 0.1,
    default: {
      target: 0.5,
      min: 0,
      max: 1
    }
  },
  energy: {
    name: 'Energy',
    key: 'energy',
    description: 'Intensity and activity level',
    min: 0,
    max: 1,
    step: 0.1,
    default: {
      target: 0.5,
      min: 0,
      max: 1
    }
  },
  valence: {
    name: 'Valence',
    key: 'target_valence',
    description: 'Musical positiveness and mood',
    min: 0,
    max: 1,
    step: 0.1,
    default: {
      target: 0.5,
      min: 0,
      max: 1
    }
  },
  instrumentalness: {
    name: 'Instrumentalness',
    key: 'target_instrumentalness',
    description: 'Predicts whether a track contains no vocals',
    min: 0,
    max: 1,
    step: 0.1,
    default: {
      target: 0.5,
      min: 0,
      max: 1
    }
  },
  acousticness: {
    name: 'Acousticness',
    key: 'target_acousticness',
    description: 'Amount of acoustic sound',
    min: 0,
    max: 1,
    step: 0.1,
    default: {
      target: 0.5,
      min: 0,
      max: 1
    }
  }
}; // Close the audioFeatures object