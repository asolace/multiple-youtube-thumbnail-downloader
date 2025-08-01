export interface YouTubeVideo {
  id: string;
  url: string;
  title?: string;
  thumbnails: {
    maxres: string;
    high: string;
    medium: string;
    standard: string;
    default: string;
  };
  status: 'loading' | 'success' | 'error';
  error?: string;
}

export interface ThumbnailQuality {
  key: keyof YouTubeVideo['thumbnails'];
  label: string;
  description: string;
}