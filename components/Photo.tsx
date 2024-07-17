import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

interface Props {
  restaurant_id: Id<"restaurant">;
}

function Photo({ restaurant_id }: Props) {
  const photos = useQuery(api.photo.fetchPhotoByRestaurant, { restaurant_id });

  return (
    <div className="w-[300px] h-[500px] relative overflow-auto">
      {photos && photos.length > 0 ? (
        <Image
          src={photos[0].url}
          alt="photo"
          layout="fill"
          objectFit="cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
          No Photo
        </div>
      )}
    </div>
  );
}

export default Photo;
