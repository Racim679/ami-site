import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import PropertyVideoPlayer from './PropertyVideoPlayer';

interface PropertyVideoCarouselProps {
  videos: Array<{ video_url: string; video_type?: string }>;
  className?: string;
}

const PropertyVideoCarousel: React.FC<PropertyVideoCarouselProps> = ({ videos, className = "" }) => {
  if (!videos || videos.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <h3 className="text-2xl font-bold mb-4">Vidéos de la propriété</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {videos.map((video, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <PropertyVideoPlayer
                videoUrl={video.video_url}
                videoType={video.video_type || 'youtube'}
                className="w-full aspect-video"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {videos.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
      <div className="text-center text-sm text-muted-foreground mt-2">
        {videos.length} vidéo{videos.length > 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default PropertyVideoCarousel;