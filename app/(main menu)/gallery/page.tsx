"use client";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import EmblaCarousel from "./_components/EmblaCarousel";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

export default function Page({}: Props) {
  const [cityId, setCityId] = React.useState<Id<"city"> | undefined>(undefined);

  const restaurants = useQuery(api.restaurant.fetchAllRestaurantByCity, {
    city_id: cityId,
  });

  const slides = [1, 2, 3, 4, 5];
  return (
    <div className="w-full flex justify-center items-center h-[80vh]">
      <div className="container mx-auto py-10">
        {restaurants ? (
          <EmblaCarousel
            slides={restaurants}
            options={{ loop: true, align: "center" }}
          />
        ) : (
          <Skeleton className="w-full h-[400px] bg-gray-300" />
        )}
      </div>
    </div>
  );
}
