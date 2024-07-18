"use client";
import { api } from "@/convex/_generated/api";

import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { RestaurantCard } from "../../gallery/_components/RestaurantCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  params: {
    id: Id<"city">;
  };
};

export default function Page({ params: { id } }: Props) {
  const city = useQuery(api.city.getbyId, { id });
  const restaurants = useQuery(api.restaurant.fetchAllRestaurantByCity, {
    city_id: id,
  });
  return (
    <div className="w-full flex flex-col p-20 gap-y-4">
      {city ? (
        <h1 className=" inline-flex self-center text-2xl font-semibold ">
          Restaurant in {city?.name}
        </h1>
      ) : (
        <Skeleton className="w-[300px] h-10 inline-flex self-center text-2xl font-semibold  bg-gray-400" />
      )}
      <section className="flex flex-wrap w-full justify-center gap-6">
        {restaurants ? (
          restaurants.map((restaurant) => {
            return (
              <RestaurantCard
                key={restaurant._id}
                {...restaurant}
                classname="relative"
              />
            );
          })
        ) : (
          <>
            <Skeleton className="w-[400px] h-[500px] bg-gray-400" />
            <Skeleton className="w-[400px] h-[500px] bg-gray-400" />
            <Skeleton className="w-[400px] h-[500px] bg-gray-400" />
            <Skeleton className="w-[400px] h-[500px] bg-gray-400" />
          </>
        )}
        {restaurants?.length === 0 && (
          <div className="flex justify-center h-full flex-col">
            <p className="text-4xl font-semibold p-8">
              Be the first to add a restaurant to this city!
            </p>
            <Button
              size={"lg"}
              className="max-w-[200px] self-center bg-[#ffb464]"
            >
              <Link href={"/add"}>Add a restaurant</Link>
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
