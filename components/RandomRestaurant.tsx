"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Restaurant from "./Restaurant";
import Photo from "./Photo";

type Props = {
  restaurants: {
    _id: Id<"restaurant">;
    _creationTime: number;
    name: string;
    city: Id<"city">;
    price_range_min: string;
    price_range_max: string;
  }[];
};

export default function RandomRestaurant({ restaurants }: Props) {
  const [clicked, setClicked] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [restaurant, setRestaurant] = useState<any>(null);

  useEffect(() => {
    // Ensure restaurants array is available before accessing it
    if (!restaurants) {
      return; // Exit early if restaurants haven't been fetched yet
    }
    const randomIndex = Math.floor(Math.random() * restaurants.length);
    const randomRestaurant = restaurants[randomIndex];

    setRestaurant(randomRestaurant);
  }, [clicked, restaurants, refetch]);

  if (!restaurant) {
    return null;
  }
  return (
    <section className="flex justify-center flex-col max-sm:w-80 max-lg:w-96 w-[700px]">
      <Button
        onClick={() => {
          if (clicked === false) {
            setClicked(true);
          } else {
            setRefetch((prev) => !prev);
          }
        }}
      >
        Makan apa Hari ini ?
      </Button>
      {clicked && (
        <div
          className="mt-10 flex justify-center flex-col items-center"
          key={restaurant._id}
        >
          <div className="font-semibold">{restaurant.name}</div>
          <div className="font-semibold">
            Rp. {restaurant.price_range_min} - Rp. {restaurant.price_range_max}
          </div>
          <div className="gap-2 flex flex-wrap">
            <Photo restaurant_id={restaurant._id} />
          </div>
        </div>
      )}
    </section>
  );
}
