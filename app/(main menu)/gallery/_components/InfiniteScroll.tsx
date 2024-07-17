import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import React, { useState, useEffect, useRef } from "react";
import Restaurant from "../../../../components/Restaurant";
import { Id } from "@/convex/_generated/dataModel";
import Photo from "@/components/Photo";
import { AddPhotoDialog } from "@/components/DialogAddPhoto";
import { Input } from "@/components/ui/input";

const InfiniteHorizontalScroll = ({
  data,
}: {
  data: {
    _id: Id<"restaurant">;
    _creationTime: number;
    name: string;
    city: Id<"city">;
    price_range_min: string;
    price_range_max: string;
  }[];
}) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const [search, setSearch] = useState("");

  const filteredRestaurants = data.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full h-full">
      <Input
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="m-2 w-[300px]"
        placeholder="Search Restaurant..."
      />
      <div className="w-screen h-full overflow-x-auto whitespace-nowrap flex items-center">
        {filteredRestaurants.length === 1 && (
          <RestaurantCard {...filteredRestaurants[0]} />
        )}
        <Marquee pauseOnHover className="[--duration:30s]">
          {filteredRestaurants.length > 1 ? (
            <div className="inline-flex h-full space-x-4">
              {filteredRestaurants.map((item, index) => (
                <RestaurantCard key={item._id} {...item} />
              ))}
            </div>
          ) : (
            <p>No Restaurant found ..</p>
          )}
        </Marquee>
      </div>
    </div>
  );
};

export default InfiniteHorizontalScroll;

const RestaurantCard = ({
  _id,
  name,
  city,
  price_range_min,
  price_range_max,
}: {
  _id: Id<"restaurant">;
  _creationTime: number;
  name: string;
  city: Id<"city">;
  price_range_min: string;
  price_range_max: string;
}) => {
  return (
    <div className="flex p-4 border-r border-gray-200 w-[500px] bg-[#ffcb93] h-full items-center justify-center flex-col">
      <figure className="mb-4">
        <div className="font-semibold text-lg">{name}</div>
        <div className="font-semibold">
          Rp. {price_range_min} - Rp. {price_range_max}
        </div>
        <div className="gap-2 flex flex-col flex-wrap ">
          <Photo restaurant_id={_id} />
        </div>
      </figure>
      <AddPhotoDialog restaurant_id={_id} />
    </div>
  );
};

// export function MarqueeDemo() {
//   return (
//     <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
//       <Marquee reverse pauseOnHover className="[--duration:20s]">
//         {secondRow.map((review) => (
//           <ReviewCard key={review.username} {...review} />
//         ))}
//       </Marquee>
//       <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
//     </div>
//   );
// }
