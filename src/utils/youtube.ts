export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/|m\.youtube\.com\/watch\?v=|youtube\.com\/watch\?.*&v=)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

export const extractPlaylistId = (url: string): string | null => {
  const patterns = [
    /[?&]list=([^&\n?#]+)/,
    /youtube\.com\/playlist\?list=([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) {
      return match[1];
    }
  }
  
  return null;
};

export const isPlaylistUrl = (url: string): boolean => {
  return extractPlaylistId(url) !== null;
};

export const fetchPlaylistVideos = async (playlistId: string): Promise<string[]> => {
  try {
    // Use YouTube's RSS feed for playlists (no API key required)
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }
    
    const xmlText = await response.text();
    
    // Parse XML to extract video IDs
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const entries = xmlDoc.querySelectorAll('entry');
    
    const videoIds: string[] = [];
    entries.forEach(entry => {
      const videoIdElement = entry.querySelector('videoId');
      if (videoIdElement) {
        videoIds.push(videoIdElement.textContent || '');
      }
    });
    
    return videoIds.filter(id => id.length > 0);
  } catch (error) {
    console.error('Failed to fetch playlist videos:', error);
    throw new Error('Failed to fetch playlist videos. Please check the playlist URL and try again.');
  }
};

export const generateThumbnailUrls = (videoId: string) => ({
  maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
  default: `https://img.youtube.com/vi/${videoId}/default.jpg`
});

export const fetchVideoTitle = async (videoId: string): Promise<string> => {
  try {
    // Try to get title from YouTube's oEmbed API
    const oEmbedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const response = await fetch(oEmbedUrl);
    
    if (response.ok) {
      const data = await response.json();
      return data.title || `YouTube Video ${videoId}`;
    }
  } catch (error) {
    console.warn('Failed to fetch title from oEmbed:', error);
  }
  
  // Fallback to generic title
  return `YouTube Video ${videoId}`;
};

export const sanitizeFilename = (filename: string): string => {
  // Remove or replace invalid filename characters
  return filename
    .replace(/[<>:"/\\|?*]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100); // Limit length
};

export const downloadImage = async (url: string, filename: string) => {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    
    const downloadUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Download failed:', error);
    throw new Error('Failed to download image');
  }
};

export const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok && response.headers.get('content-type')?.startsWith('image/');
  } catch {
    return false;
  }
};