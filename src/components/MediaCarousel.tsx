import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  caption?: string;
  videoType?: 'youtube' | 'tiktok' | 'instagram' | 'facebook';
}

interface MediaCarouselProps {
  isOpen: boolean;
  onClose: () => void;
  media: MediaItem[];
  initialIndex?: number;
}

const MediaCarousel: React.FC<MediaCarouselProps> = ({
  isOpen,
  onClose,
  media,
  initialIndex = 0
}) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex, isOpen]);

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const getEmbedUrl = (url: string, type: string) => {
    switch (type) {
      case 'youtube':
        const youtubeRegex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
        const youtubeMatch = url.match(youtubeRegex);
        return youtubeMatch ? `https://www.youtube.com/embed/${youtubeMatch[1]}?enablejsapi=1&rel=0` : url;
      
      case 'tiktok':
        const tiktokRegex = /tiktok\.com\/@[^\/]+\/video\/(\d+)/;
        const tiktokMatch = url.match(tiktokRegex);
        return tiktokMatch ? `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}` : url;
      
      case 'instagram':
        const instagramRegex = /instagram\.com\/p\/([^\/]+)/;
        const instagramMatch = url.match(instagramRegex);
        return instagramMatch ? `https://www.instagram.com/p/${instagramMatch[1]}/embed` : url;
      
      case 'facebook':
        return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}`;
      
      default:
        return url;
    }
  };

  if (!isOpen || !media.length) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 md:p-4">
      {/* Close Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="absolute top-2 right-2 md:top-4 md:right-4 z-10 text-white hover:bg-white/20 w-8 h-8 md:w-10 md:h-10"
      >
        <X className="w-4 h-4 md:w-6 md:h-6" />
      </Button>

      {/* Carousel Container */}
      <div className="w-full max-w-7xl bg-white rounded-lg md:rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          {/* Track */}
          <div 
            className="absolute top-0 left-0 w-full h-full flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {media.map((item, index) => (
              <div key={index} className="min-w-full h-full relative">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.caption || `Media ${index + 1}`}
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <iframe
                    src={getEmbedUrl(item.url, item.videoType || 'youtube')}
                    title={item.caption || `Video ${index + 1}`}
                    className="w-full h-full border-none"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          {media.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-8 h-8 md:w-12 md:h-12 rounded-full"
              >
                <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-black w-8 h-8 md:w-12 md:h-12 rounded-full"
              >
                <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
              </Button>
            </>
          )}

          {/* Dots */}
          {media.length > 1 && (
            <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex gap-1 md:gap-2 bg-black/30 rounded-full px-2 md:px-4 py-1 md:py-2">
              {media.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Caption */}
        {media[currentIndex]?.caption && (
          <div className="p-3 md:p-4 bg-white border-t">
            <p className="text-sm md:text-base text-gray-700 text-center">
              {media[currentIndex].caption}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaCarousel;