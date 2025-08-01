import React from 'react';
import { Settings } from 'lucide-react';
import { ThumbnailQuality } from '../types';

interface QualitySelectorProps {
  qualities: ThumbnailQuality[];
  selectedQuality: ThumbnailQuality;
  onQualityChange: (quality: ThumbnailQuality) => void;
}

const QualitySelector: React.FC<QualitySelectorProps> = ({
  qualities,
  selectedQuality,
  onQualityChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Settings className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">Thumbnail Quality</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {qualities.map((quality) => (
          <button
            key={quality.key}
            onClick={() => onQualityChange(quality)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedQuality.key === quality.key
                ? 'border-purple-500 bg-purple-50 text-purple-900'
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <div className="font-semibold mb-1">{quality.label}</div>
            <div className="text-sm opacity-75">{quality.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QualitySelector;