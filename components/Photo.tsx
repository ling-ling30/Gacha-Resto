import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import Image from "next/image";
import React from "react";

type Props = {
  restaurant_id: Id<"restaurant">;
};

function Photo({ restaurant_id }: Props) {
  const photos = useQuery(api.photo.fetchPhotoByRestaurant, { restaurant_id });
  return (
    <>
      {photos &&
        photos.map((photo) => {
          return (
            <Image
              key={photo._id}
              src={photo.url}
              alt="photo"
              width={250}
              height={250}
            />
          );
        })}
    </>
  );
}

export default Photo;
