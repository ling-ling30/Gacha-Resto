import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Add this import

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";

interface Props {
  restaurant_id: Id<"restaurant">;
}

function Photo({ restaurant_id }: Props) {
  const photos = useQuery(api.photo.fetchPhotoByRestaurant, { restaurant_id });
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  if (!photos) {
    return (
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {[...Array(3)].map((_, index) => (
            <CarouselItem key={index}>
              <Card>
                <CardContent className="flex aspect-square items-center justify-center">
                  <Skeleton className="w-[300px] h-[300px]" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    );
  }

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {photos.length > 0 &&
          photos.map((photo, index) => {
            return (
              <CarouselItem key={index}>
                <Card className="p-0">
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <Image
                      className="w-[300px] h-[300px] object-contain"
                      key={photo._id}
                      src={photo.url}
                      alt="photo"
                      width={500}
                      height={500}
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
      </CarouselContent>
    </Carousel>
  );
}

export default Photo;
