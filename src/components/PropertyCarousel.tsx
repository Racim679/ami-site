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
      <h3 className="text-2xl font-bold mb-4">Photos de la propriété</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {photos.slice(0, 4).map((photo, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div 
                className="aspect-video rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => window.open(photo.photo_url, '_blank')}
              >
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
      <div className="text-center text-sm text-muted-foreground mt-2">
        Affichage de {Math.min(4, photos.length)} sur {photos.length} photo{photos.length > 1 ? 's' : ''}
        {photos.length > 4 && (
          <span className="block mt-1 text-primary cursor-pointer" onClick={() => window.open(photos[0].photo_url, '_blank')}>
            Cliquez sur une image pour voir toutes les photos
          </span>
        )}
      </div>
    </div>
  );
};

export default PropertyCarousel;