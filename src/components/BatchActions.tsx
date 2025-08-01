import React, { useState } from 'react';
import { Download, Loader, Package } from 'lucide-react';
import { YouTubeVideo, ThumbnailQuality } from '../types';
import { downloadImage } from '../utils/youtube';

interface BatchActionsProps {
  videos: YouTubeVideo[];
  selectedQuality: ThumbnailQuality;
}

const BatchActions: React.FC<BatchActionsProps> = ({ videos, selectedQuality }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const successfulVideos = videos.filter(video => video.status === 'success');

  const handleBatchDownload = async () => {
    if (successfulVideos.length === 0) return;

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      for (let i = 0; i < successfulVideos.length; i++) {
        const video = successfulVideos[i];
        const thumbnailUrl = video.thumbnails[selectedQuality.key];
        const filename = `${video.id}_${selectedQuality.key}.jpg`;
        
        await downloadImage(thumbnailUrl, filename);
        setDownloadProgress(((i + 1) / successfulVideos.length) * 100);
        
        // Small delay to prevent overwhelming the browser
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error) {
      console.error('Batch download failed:', error);
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  };

  if (successfulVideos.length === 0) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-green-100 rounded-lg">
          <Package className="w-6 h-6 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Batch Actions</h3>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-gray-600">
          <span className="font-semibold text-gray-900">{successfulVideos.length}</span> thumbnails ready for download
        </div>
        
        <button
          onClick={handleBatchDownload}
          disabled={isDownloading}
          className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isDownloading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Downloading... {Math.round(downloadProgress)}%
            </>
          ) : (
            <>
              <Download className="w-5 h-5" />
              Download All ({selectedQuality.label})
            </>
          )}
        </button>
      </div>
      
      {isDownloading && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${downloadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default BatchActions;