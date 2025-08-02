import React from 'react';
import { Card } from '@/components/ui/card';

interface PropertyVideoPlayerProps {
  videoUrl: string;
  videoType?: string;
  className?: string;
}

const PropertyVideoPlayer: React.FC<PropertyVideoPlayerProps> = ({ 
  videoUrl, 
  videoType = 'youtube', 
  className = "" 
}) => {
  if (!videoUrl) return null;

  const getEmbedUrl = (url: string, type: string) => {
    if (type === 'youtube') {
      // Convert YouTube URLs to embed format
      const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
      const match = url.match(youtubeRegex);
      if (match) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    } else if (type === 'tiktok') {
      // Convert TikTok URLs to embed format
      const tiktokRegex = /tiktok\.com\/@[^\/]+\/video\/(\d+)/;
      const match = url.match(tiktokRegex);
      if (match) {
        return `https://www.tiktok.com/embed/v2/${match[1]}`;
      }
    }
    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl, videoType);

  return (
    <Card className={`overflow-hidden ${className}`}>
      <div className="aspect-video">
        <iframe
          src={embedUrl}
          title="Vidéo de la propriété"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </Card>
  );
};

export default PropertyVideoPlayer;