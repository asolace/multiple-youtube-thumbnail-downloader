import React, { useState } from 'react';
import { Plus, Trash2, Link, List, Loader } from 'lucide-react';
import { isPlaylistUrl, extractPlaylistId, fetchPlaylistVideos } from '../utils/youtube';

interface URLInputProps {
  onAddUrls: (urls: string[]) => void;
}

const URLInput: React.FC<URLInputProps> = ({ onAddUrls }) => {
  const [inputValue, setInputValue] = useState('');
  const [urls, setUrls] = useState<string[]>(['']);
  const [isProcessingPlaylist, setIsProcessingPlaylist] = useState(false);

  const handleBulkPaste = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.includes('\n')) {
      const lines = value.split('\n').filter(line => line.trim());
      setUrls(lines);
    }
  };

  const handleUrlChange = (index: number, value: string) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const addUrlField = () => {
    setUrls([...urls, '']);
  };

  const removeUrlField = (index: number) => {
    if (urls.length > 1) {
      const newUrls = urls.filter((_, i) => i !== index);
      setUrls(newUrls);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let urlsToProcess: string[] = [];
    
    if (inputValue.includes('\n')) {
      urlsToProcess = inputValue.split('\n').filter(line => line.trim());
    } else {
      urlsToProcess = urls.filter(url => url.trim());
    }
    
    processUrls(urlsToProcess);
  };

  const processUrls = async (urlsToProcess: string[]) => {
    if (urlsToProcess.length === 0) return;

    setIsProcessingPlaylist(true);
    
    try {
      const allVideoUrls: string[] = [];
      
      for (const url of urlsToProcess) {
        const trimmedUrl = url.trim();
        
        if (isPlaylistUrl(trimmedUrl)) {
          const playlistId = extractPlaylistId(trimmedUrl);
          if (playlistId) {
            try {
              const videoIds = await fetchPlaylistVideos(playlistId);
              const videoUrls = videoIds.map(id => `https://www.youtube.com/watch?v=${id}`);
              allVideoUrls.push(...videoUrls);
            } catch (error) {
              console.error('Failed to process playlist:', error);
              // Add the original playlist URL as fallback
              allVideoUrls.push(trimmedUrl);
            }
          }
        } else {
          allVideoUrls.push(trimmedUrl);
        }
      }
      
      if (allVideoUrls.length > 0) {
        onAddUrls(allVideoUrls);
        setInputValue('');
        setUrls(['']);
      }
    } finally {
      setIsProcessingPlaylist(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <Link className="w-6 h-6 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Add YouTube URLs</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bulk Paste (one URL per line) - Supports playlists!
          </label>
          <textarea
            value={inputValue}
            onChange={handleBulkPaste}
            placeholder="Paste YouTube URLs or playlist links here, one per line...

Examples:
https://www.youtube.com/watch?v=VIDEO_ID
https://www.youtube.com/playlist?list=PLAYLIST_ID
https://youtu.be/VIDEO_ID"
            className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
            rows={6}
          />
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-500">OR</span>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Individual URLs (videos or playlists)
          </label>
          <div className="space-y-3">
            {urls.map((url, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="url"
                  value={url}
                  onChange={(e) => handleUrlChange(index, e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or playlist link"
                  className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
                {isPlaylistUrl(url) && (
                  <div className="flex items-center px-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <List className="w-4 h-4 text-purple-600" />
                    <span className="text-xs text-purple-600 ml-1">Playlist</span>
                  </div>
                )}
                {urls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUrlField(index)}
                    className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addUrlField}
            className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            Add another URL
          </button>
        </div>
        
        <button
          type="submit"
          disabled={isProcessingPlaylist}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
        >
          {isProcessingPlaylist ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="w-5 h-5 animate-spin" />
              Processing Playlist...
            </div>
          ) : (
            'Fetch Thumbnails'
          )}
        </button>
        
        {isProcessingPlaylist && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-700">
              <List className="w-5 h-5" />
              <span className="font-medium">Processing playlist...</span>
            </div>
            <p className="text-sm text-blue-600 mt-1">
              Extracting video URLs from playlist. This may take a moment.
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default URLInput;