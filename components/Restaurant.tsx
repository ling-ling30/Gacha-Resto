import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Photo from "./Photo";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "./ui/button";
import { AddPhotoDialog } from "./DialogAddPhoto";
import { Input } from "./ui/input";

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

export default function Restaurant({ restaurants }: Props) {
  const [search, setSearch] = useState("");

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Semua Restoran</AccordionTrigger>
        <AccordionContent className="py-10 px-15">
          <Input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="m-2 w-[300px]"
            placeholder="Search Restaurant..."
          />
          {filteredRestaurants
            ? filteredRestaurants?.map((item, index) => {
                return (
                  <div
                    key={item._id}
                    className="flex justify-between items-center px-2"
                  >
                    <div className="mb-10">
                      <div className="font-semibold text-lg">
                        {index + 1}. {item.name}
                      </div>
                      <div className="font-semibold">
                        Rp. {item.price_range_min} - Rp. {item.price_range_max}
                      </div>
                      <div className="gap-2 flex flex-wrap">
                        <Photo restaurant_id={item._id} />
                      </div>
                    </div>
                    <AddPhotoDialog restaurant_id={item._id} />
                  </div>
                );
              })
            : "Loading"}
          {restaurants?.length === 0 && (
            <p>Belum ada restorant yang disimpan</p>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
