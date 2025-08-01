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
    // Use YouTube's RSS feed for playlists (public playlists only)
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch playlist');
    }
    
    const data = await response.json();
    const xmlText = data.contents;
    
    // Parse XML to extract video IDs
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const entries = xmlDoc.querySelectorAll('entry');
    
    const videoIds: string[] = [];
    entries.forEach(entry => {
      const link = entry.querySelector('link');
      if (link) {
        const href = link.getAttribute('href');
        if (href) {
          const videoId = extractVideoId(href);
          if (videoId) {
            videoIds.push(videoId);
          }
        }
      }
    });
    
    return videoIds;
  } catch (error) {
    console.error('Error fetching playlist:', error);
    throw new Error('Failed to fetch playlist videos');
  }
};

export const generateThumbnailUrls = (videoId: string) => ({
  maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
  high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
  standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
  default: `https://img.youtube.com/vi/${videoId}/default.jpg`
});

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