import React, { useEffect, useState, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Id } from "@/convex/_generated/dataModel";
import Photo from "@/components/Photo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const RestaurantCard = ({
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
    <Card className=" bg-[#FDBA74]">
      <CardHeader>
        <CardTitle>
          <div className="font-semibold ">{name}</div>
        </CardTitle>
        <CardDescription>
          <div className="font-semibold">
            Rp. {price_range_min} - Rp. {price_range_max}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <div className="gap-2 flex flex-col flex-wrap ">
          <Photo restaurant_id={_id} />
        </div>
      </CardContent>
      {/* <AddPhotoDialog restaurant_id={_id} /> */}
    </Card>
  );
};
