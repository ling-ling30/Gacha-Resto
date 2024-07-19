"use client";
import React from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";

type Props = {};

export default function Page({}: Props) {
  const allCites = useQuery(api.city.getAll);
  const createCity = useMutation(api.city.create);
  const [searchCity, setSearchCity] = React.useState<string>("");
  const [IsSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const filteredCities = allCites?.filter((city) =>
    city.name.toLowerCase().includes(searchCity.toLowerCase())
  );

  const addCity = async () => {
    setIsSubmitting(true);
    try {
      toast.loading("Menambahkan Kota...");
      const response = await createCity({ name: searchCity });
      toast.success(`City ${searchCity} has been added`);
      setSearchCity("");
    } catch (error) {
      console.error(error);
      toast.error(`Failed to add ${searchCity}!`);
    }
  };

  return (
    <main className="w-full h-full flex flex-col justify-center mt-20 space-y-4 p-20  ">
      <section className="space-y-10">
        <h1 className="text-4xl font-semibold">City List :</h1>
        <Input
          value={searchCity}
          onChange={(e) => {
            const value = capitalizeFirstLetter(e.target.value);
            setSearchCity(value);
          }}
          placeholder="Add / Search "
          className="max-w-xl py-6"
        />
      </section>
      <section className="gap-6 sm:grid-cols-2 grid">
        {filteredCities ? (
          filteredCities?.map((city) => {
            return (
              <Link
                className="w-full"
                key={city._id}
                href={`/city/${city._id}`}
              >
                <Button
                  size={"lg"}
                  variant={"outline"}
                  className="py-10 text-3xl font-semibold bg-[#FFD3C5] hover:bg-orange-300 w-full"
                >
                  {city.name}
                </Button>
              </Link>
            );
          })
        ) : (
          <>
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </>
        )}
        {filteredCities?.length === 0 && (
          <Button onClick={addCity}>Add City</Button>
        )}
      </section>
    </main>
  );
}
