import { Card, CardContent } from "@/components/ui/card";
import { Id } from "@/convex/_generated/dataModel";
import React from "react";

type Props = {
  cities: {
    _id: Id<"city">;
    _creationTime: number;
    name: string;
  }[];
};

export default function CityCard({ cities }: Props) {
  return (
    <>
      {cities.map((city) => {
        <Card key={city._id}>
          <CardContent className="flex items-center justify-center p-6">
            <span className="text-3xl font-semibold">{city.name}</span>
          </CardContent>
        </Card>;
      })}
    </>
  );
}
