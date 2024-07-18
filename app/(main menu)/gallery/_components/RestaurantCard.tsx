"use client";
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
  classname,
}: {
  _id: Id<"restaurant">;
  _creationTime: number;
  name: string;
  city: Id<"city">;
  price_range_min: string;
  price_range_max: string;
  classname?: string;
}) => {
  return (
    <Card className={cn("bg-[#ffd3c5] p-6", classname)}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>
          Rp. {price_range_min} - Rp. {price_range_max}
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
