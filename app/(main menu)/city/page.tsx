"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

type Props = {};

export default function Page({}: Props) {
  const allCites = useQuery(api.city.getAll);
  const createCity = useMutation(api.city.create);
  const [searchCity, setSearchCity] = React.useState<string>("");
  const [IsSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const filteredCities = allCites?.filter((city) =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  const addCity = async (name: string) => {
    setIsSubmitting(true);
    try {
      toast.loading("Menambahkan Kota...");
      const response = await createCity({ name });
      toast.success(`City ${name} has been added`);
    } catch (error) {
      console.error(error);
      toast.error(`Failed to add ${name}!`);
    }
  };

  return (
    <main className="w-full h-full flex justify-center mt-16 space-y-4">
      <section className="space-y-10">
        <h1 className="text-4xl font-semibold">City List :</h1>
        <Input
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Search..."
        />
        <section className="space-y-5">
          {filteredCities?.map((city) => {
            return (
              <Card key={city._id}>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="text-3xl font-semibold">{city.name}</span>
                </CardContent>
              </Card>
            );
          })}
        </section>
      </section>
    </main>
  );
}
