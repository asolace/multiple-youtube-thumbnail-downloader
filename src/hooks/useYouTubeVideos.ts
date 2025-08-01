import { useState, useCallback } from 'react';
import { YouTubeVideo } from '../types';
import { extractVideoId, generateThumbnailUrls, validateImageUrl } from '../utils/youtube';

export const useYouTubeVideos = () => {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  const addVideos = useCallback(async (urls: string[]) => {
    const newVideos: YouTubeVideo[] = [];

    // Create initial video objects
    for (const url of urls) {
      const videoId = extractVideoId(url.trim());
      
      if (!videoId) {
        newVideos.push({
          id: Math.random().toString(36).substr(2, 9),
          url: url.trim(),
          thumbnails: {
            maxres: '',
            high: '',
            medium: '',
            standard: '',
            default: ''
          },
          status: 'error',
          error: 'Invalid YouTube URL format'
        });
        continue;
      }

      // Check if video already exists
      const existingVideo = videos.find(v => v.id === videoId);
      if (existingVideo) {
        continue;
      }

      newVideos.push({
        id: videoId,
        url: url.trim(),
        thumbnails: generateThumbnailUrls(videoId),
        status: 'loading'
      });
    }

    // Add new videos to state
    setVideos(prev => [...prev, ...newVideos]);

    // Validate thumbnails for loading videos
    for (const video of newVideos) {
      if (video.status === 'loading') {
        try {
          // Try to validate the highest quality thumbnail first
          const isValid = await validateImageUrl(video.thumbnails.maxres);
          
          setVideos(prev =>
            prev.map(v =>
              v.id === video.id
                ? {
                    ...v,
                    status: isValid ? 'success' : 'error',
                    error: isValid ? undefined : 'Thumbnail not available'
                  }
                : v
            )
          );
        } catch (error) {
          setVideos(prev =>
            prev.map(v =>
              v.id === video.id
                ? {
                    ...v,
                    status: 'error',
                    error: 'Failed to validate thumbnail'
                  }
                : v
            )
          );
        }
      }
    }
  }, [videos]);

  const clearVideos = useCallback(() => {
    setVideos([]);
  }, []);

  const removeVideo = useCallback((videoId: string) => {
    setVideos(prev => prev.filter(v => v.id !== videoId));
  }, []);

  return {
    videos,
    addVideos,
    clearVideos,
    removeVideo
  };
};