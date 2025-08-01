import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Youtube, Trash2 } from 'lucide-react';
import URLInput from './components/URLInput';
import QualitySelector from './components/QualitySelector';
import BatchActions from './components/BatchActions';
import ThumbnailCard from './components/ThumbnailCard';
import PrivacyPolicy from './components/PrivacyPolicy';
import { useYouTubeVideos } from './hooks/useYouTubeVideos';
import { ThumbnailQuality } from './types';

const THUMBNAIL_QUALITIES: ThumbnailQuality[] = [
  { key: 'maxres', label: 'Max Res', description: '1280x720' },
  { key: 'high', label: 'High', description: '480x360' },
  { key: 'medium', label: 'Medium', description: '320x180' },
  { key: 'standard', label: 'Standard', description: '120x90' },
  { key: 'default', label: 'Default', description: '120x90' }
];

const HomePage: React.FC = () => {
  const { videos, addVideos, clearVideos } = useYouTubeVideos();
  const [selectedQuality, setSelectedQuality] = useState<ThumbnailQuality>(THUMBNAIL_QUALITIES[0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
              <Youtube className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              YouTube Thumbnail Downloader
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Extract and download high-quality thumbnails from YouTube videos with ease
          </p>
        </div>

        {/* URL Input */}
        <URLInput onAddUrls={addVideos} />

        {/* Quality Selector & Batch Actions */}
        {videos.length > 0 && (
          <>
            <QualitySelector
              qualities={THUMBNAIL_QUALITIES}
              selectedQuality={selectedQuality}
              onQualityChange={setSelectedQuality}
            />
            
            <BatchActions
              videos={videos}
              selectedQuality={selectedQuality}
            />
          </>
        )}

        {/* Results Header */}
        {videos.length > 0 && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Results ({videos.length})
            </h2>
            <button
              onClick={clearVideos}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}

        {/* Thumbnail Grid */}
        {videos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videos.map((video) => (
              <ThumbnailCard
                key={video.id}
                video={video}
                selectedQuality={selectedQuality}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {videos.length === 0 && (
          <div className="text-center py-12">
            <div className="p-4 bg-gray-100 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Youtube className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No videos added yet
            </h3>
            <p className="text-gray-500">
              Add some YouTube URLs above to get started with downloading thumbnails
            </p>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm">
          <div className="space-y-2">
            <p>Built with React, TypeScript, and Tailwind CSS</p>
            <div className="flex items-center justify-center gap-4">
              <a
                href="/privacy"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/privacy" element={<PrivacyPolicy />} />
    </Routes>
  );
}

export default App;