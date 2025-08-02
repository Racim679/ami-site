import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface PropertyCarouselProps {
  photos: Array<{ photo_url: string; caption?: string }>;
  className?: string;
}

const PropertyCarousel: React.FC<PropertyCarouselProps> = ({ photos, className = "" }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <Carousel className="w-full">
        <CarouselContent>
          {photos.map((photo, index) => (
            <CarouselItem key={index}>
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={photo.photo_url}
                  alt={photo.caption || `Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {photo.caption && (
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  {photo.caption}
                </p>
              )}
            </CarouselItem>
          ))}
        </CarouselContent>
        {photos.length > 1 && (
          <>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </>
        )}
      </Carousel>
      {photos.length > 1 && (
        <div className="text-center text-sm text-muted-foreground mt-2">
          {photos.length} photo{photos.length > 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default PropertyCarousel;