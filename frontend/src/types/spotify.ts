export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Artist {
  id: string;
  name: string;
  images?: Image[];
  followers?: {
    total: number;
  };
  explicit?: boolean;
}

export interface Album {
  id: string;
  name: string;
  images: Image[];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  explicit: boolean;
  duration_ms: number;
}

export interface RecommendationsResponse {
  tracks: Track[];
} 