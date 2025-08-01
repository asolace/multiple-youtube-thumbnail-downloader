import React, { useState } from 'react';
import { Download, ExternalLink, AlertCircle, Loader } from 'lucide-react';
import { YouTubeVideo, ThumbnailQuality } from '../types';
import { downloadImage } from '../utils/youtube';

interface ThumbnailCardProps {
  video: YouTubeVideo;
  selectedQuality: ThumbnailQuality;
}

const ThumbnailCard: React.FC<ThumbnailCardProps> = ({ video, selectedQuality }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const thumbnailUrl = video.thumbnails[selectedQuality.key];
      const filename = `${video.id}_${selectedQuality.key}.jpg`;
      await downloadImage(thumbnailUrl, filename);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const openYouTube = () => {
    window.open(video.url, '_blank');
  };

  if (video.status === 'loading') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
        <div className="aspect-video bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-4 bg-gray-200 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (video.status === 'error') {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
        <div className="flex items-center gap-3 text-red-600 mb-3">
          <AlertCircle className="w-5 h-5" />
          <span className="font-semibold">Failed to load</span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{video.error}</p>
        <p className="text-xs text-gray-400 break-all">{video.url}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative group">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <Loader className="w-6 h-6 text-gray-400 animate-spin" />
          </div>
        )}
        <img
          src={video.thumbnails[selectedQuality.key]}
          alt={`Thumbnail for ${video.id}`}
          className={`w-full aspect-video object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={openYouTube}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110"
              title="Open on YouTube"
            >
              <ExternalLink className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all duration-200 transform hover:scale-110 disabled:opacity-50"
              title="Download thumbnail"
            >
              {isDownloading ? (
                <Loader className="w-4 h-4 text-gray-700 animate-spin" />
              ) : (
                <Download className="w-4 h-4 text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Video ID:</span>
          <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-800">
            {video.id}
          </code>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Quality:</span>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {selectedQuality.label}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailCard;