"use client";
import React from "react";
import InfiniteScroll from "./_components/InfiniteScroll";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

type Props = {};

export default function Page({}: Props) {
  const [cityId, setCityId] = React.useState<Id<"city"> | undefined>(undefined);

  const restaurants = useQuery(api.restaurant.fetchAllRestaurantByCity, {
    city_id: cityId,
  });
  if (!restaurants) {
    return "loading..";
  }
  return (
    <div>
      <InfiniteScroll data={restaurants!} />
    </div>
  );
}
