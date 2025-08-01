import React, { useState } from 'react';
import { Plus, Trash2, Link, List, Loader } from 'lucide-react';

interface URLInputProps {
  onAddUrls: (urls: string[]) => void;
  onAddPlaylist: (playlistUrl: string) => void;
}

const URLInput: React.FC<URLInputProps> = ({ onAddUrls, onAddPlaylist }) => {
  const [inputValue, setInputValue] = useState('');
  const [urls, setUrls] = useState<string[]>(['']);
  const [playlistUrl, setPlaylistUrl] = useState('');
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
    
    if (urlsToProcess.length > 0) {
      onAddUrls(urlsToProcess);
      setInputValue('');
      setUrls(['']);
    }
  };

  const handlePlaylistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playlistUrl.trim()) return;
    
    setIsProcessingPlaylist(true);
    try {
      await onAddPlaylist(playlistUrl.trim());
      setPlaylistUrl('');
    } catch (error) {
      console.error('Playlist processing failed:', error);
    } finally {
      setIsProcessingPlaylist(false);
    }
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Playlist Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-purple-100 rounded-lg">
            <List className="w-6 h-6 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Add YouTube Playlist</h2>
        </div>
        
        <form onSubmit={handlePlaylistSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Playlist URL
            </label>
            <input
              type="url"
              value={playlistUrl}
              onChange={(e) => setPlaylistUrl(e.target.value)}
              placeholder="https://www.youtube.com/playlist?list=..."
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
              disabled={isProcessingPlaylist}
            />
          </div>
          
          <button
            type="submit"
            disabled={isProcessingPlaylist || !playlistUrl.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isProcessingPlaylist ? (
              <div className="flex items-center justify-center gap-2">
                <Loader className="w-5 h-5 animate-spin" />
                Processing Playlist...
              </div>
            ) : (
              'Fetch All Thumbnails from Playlist'
            )}
          </button>
        </form>
      </div>

      {/* Individual URLs Input */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Link className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Add Individual YouTube URLs</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bulk Paste (one URL per line)
            </label>
            <textarea
              value={inputValue}
              onChange={handleBulkPaste}
              placeholder="Paste multiple YouTube URLs here, one per line..."
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              rows={4}
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
              Individual URLs
            </label>
            <div className="space-y-3">
              {urls.map((url, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => handleUrlChange(index, e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
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
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 shadow-lg"
          >
            Fetch Thumbnails
          </button>
        </form>
      </div>
    </div>
  );
};

export default URLInput;