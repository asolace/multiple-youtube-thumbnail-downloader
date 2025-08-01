# YouTube Thumbnail Downloader

A modern, client-side web application that allows users to extract and download high-quality thumbnails from YouTube videos with ease.

## 🚀 Features

- **Multiple URL Input**: Add YouTube URLs individually or paste multiple URLs at once
- **Bulk Processing**: Process multiple videos simultaneously
- **Quality Selection**: Choose from 5 different thumbnail qualities (Max Res, High, Medium, Standard, Default)
- **Batch Downloads**: Download all thumbnails at once or individually
- **Smart Filename Formatting**: Automatically formats filenames using video titles and resolution (e.g., `My_Video_Title_1280x720.jpg`)
- **Real-time Validation**: Instant feedback on URL validity and thumbnail availability
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Privacy-First**: All processing happens client-side - no data is stored on servers

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Hooks (useState, useCallback)
- **API Integration**: YouTube oEmbed API for video titles
- **Deployment**: Netlify

## 📱 Usage

### Adding YouTube URLs

1. **Bulk Paste Method**:
   - Copy multiple YouTube URLs (one per line)
   - Paste them into the "Bulk Paste" textarea
   - Click "Fetch Thumbnails"

2. **Individual URL Method**:
   - Enter URLs one by one in the individual input fields
   - Use the "Add another URL" button to add more fields
   - Click "Fetch Thumbnails"

### Supported URL Formats

The app supports all common YouTube URL formats:
- `https://www.youtube.com/watch?v=VIDEO_ID`
- `https://youtu.be/VIDEO_ID`
- `https://www.youtube.com/embed/VIDEO_ID`
- `https://www.youtube.com/v/VIDEO_ID`
- `https://m.youtube.com/watch?v=VIDEO_ID`
- `https://www.youtube.com/shorts/VIDEO_ID`

### Downloading Thumbnails

1. **Select Quality**: Choose your preferred thumbnail quality from the quality selector
2. **Individual Downloads**: Click the download button on any thumbnail card
3. **Batch Downloads**: Use the "Download All" button to download all thumbnails at once

### Thumbnail Qualities

| Quality | Resolution | Description |
|---------|------------|-------------|
| Max Res | 1280x720 | Highest quality available |
| High | 480x360 | High definition |
| Medium | 320x180 | Medium quality |
| Standard | 120x90 | Standard definition |
| Default | 120x90 | Default thumbnail |

## 🔧 Development

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd youtube-thumbnail-downloader

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
# Build the application
npm run build

# Preview the build
npm run preview
```

## 🔒 Privacy & Security

- **Client-Side Processing**: All URL processing and thumbnail generation happens in your browser
- **No Data Storage**: No URLs or personal data are stored on our servers
- **Direct Downloads**: Thumbnails are downloaded directly from YouTube's servers to your device
- **No Tracking**: We don't track or store any user behavior or personal information

## 📄 File Structure

```
src/
├── components/          # React components
│   ├── URLInput.tsx    # URL input form
│   ├── ThumbnailCard.tsx # Individual thumbnail display
│   ├── QualitySelector.tsx # Quality selection
│   ├── BatchActions.tsx # Batch download actions
│   └── PrivacyPolicy.tsx # Privacy policy page
├── hooks/              # Custom React hooks
│   └── useYouTubeVideos.ts # Video management logic
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── youtube.ts      # YouTube API and processing
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## 🌐 Live Demo

Visit the live application: [https://multipleyoutubethumbnaildownloader.com](https://multipleyoutubethumbnaildownloader.com)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please open an issue on the GitHub repository.