import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Photo from "./Photo";
import { Id } from "@/convex/_generated/dataModel";

type Props = {
  restaurants:
    | {
        _id: Id<"restaurant">;
        _creationTime: number;
        name: string;
        city: Id<"city">;
        price_range_min: string;
        price_range_max: string;
      }[]
    | undefined;
};

export default function Restaurant({ restaurants }: Props) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Semua Restoran</AccordionTrigger>
        <AccordionContent className="py-10 px-15">
          {restaurants
            ? restaurants?.map((item, index) => {
                return (
                  <div className="mb-10" key={item._id}>
                    <div className="font-semibold">
                      {index + 1}. {item.name}
                    </div>
                    <div className="font-semibold">
                      Rp. {item.price_range_min} - Rp. {item.price_range_max}
                    </div>
                    <div className="gap-2 flex flex-wrap">
                      <Photo restaurant_id={item._id} />
                    </div>
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
