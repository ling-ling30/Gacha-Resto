"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { capitalizeFirstLetter } from "@/utils/capitalizeFirstLetter";
import { useQuery, useMutation } from "convex/react";

import { toast } from "sonner";
import Link from "next/link";
import { api } from "@/convex/_generated/api";
import { ChevronsUpDown, LoaderPinwheel } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import Photo from "@/components/Photo";
import Restaurant from "@/components/Restaurant";
import RandomRestaurant from "@/components/RandomRestaurant";
import SpinWheel from "@/components/SpinWheel";
import Image from "next/image";

import front_image from "../../public/assets/people-eating-sweet-delicious-cake.jpg";
import { honk, patrick } from "@/components/font";
import useScreenSize from "@/components/hook/useScreenSize";

export default function Home() {
  const allCites = useQuery(api.city.getAll);
  const createCity = useMutation(api.city.create);

  const [open, setOpen] = React.useState(false);
  const [cityId, setCityId] = React.useState<Id<"city"> | undefined>(undefined);
  const [searchCity, setSearchCity] = React.useState<string | undefined>(
    undefined
  );
  const [IsSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const restaurants = useQuery(api.restaurant.fetchAllRestaurantByCity, {
    city_id: cityId,
  });

  const addCity = async (name: string) => {
    setIsSubmitting(true);
    try {
      toast.loading("Menambahkan Kota...");
      const response = await createCity({ name });
      toast.success(`Kota ${name} telah ditambahkan !`);
    } catch (error) {
      console.error(error);
      toast.error(`Gagal menambahkan Kota ${name}!`);
    }
  };
  const screenWidth = useScreenSize();
  return (
    <main className="flex w-full flex-col items-center space-y-8 p-24 max-sm:p-8 flex-wrap">
      <section className="w-full flex flex-wrap">
        <div className="flex justify-center flex-1 min-w-[300px]">
          <Image
            alt=""
            src={front_image}
            width={350}
            height={600}
            className=" scale-x-[-1] bg-repeat"
          />
        </div>

        <div className="h-full   flex-1 2xl:p-32 lg:p-20 md:p-12 flex items-center flex-col text-center justify-center space-y-4">
          <section className="min-w-[266px]">
            <h1
              className={`${patrick.className}  2xl:text-4xl sm:text-2xl text-wrap`}
            >
              {
                "One cannot think well, love well, sleep well, if one has not dined well."
              }
            </h1>
            <p className={`${patrick.className}`}>- Virginia Woolf</p>
          </section>
          <section className="flex gap-4 flex-wrap justify-center">
            <Button size={"lg"} className="bg-[#ffb464]">
              <Link href={"/add"}>Add a restaurant</Link>
            </Button>
            <Button size={"lg"} className="bg-[#FD8D6D]">
              <Link href={"/roll"}>Surprise me!</Link>
            </Button>
          </section>
        </div>
      </section>

      <section>
        {allCites ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
              >
                {cityId
                  ? allCites.find((city) => city._id === cityId)?.name
                  : "Choose a city..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput
                  onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const query = e.target.value;
                    const newQuery = capitalizeFirstLetter(query);
                    setSearchCity(newQuery);
                  }}
                  placeholder="Search..."
                />
                <CommandList>
                  <CommandEmpty>
                    <Button
                      variant={"outline"}
                      onClick={() => addCity(searchCity!)}
                      disabled={IsSubmitting}
                    >{`Tambah Kota ${searchCity}`}</Button>
                  </CommandEmpty>
                  <CommandGroup>
                    {allCites.map((city) => (
                      <CommandItem
                        key={city._id}
                        value={city._id}
                        onSelect={(currentValue) => {
                          setCityId(currentValue as Id<"city">);
                          setOpen(false);
                        }}
                      >
                        {city.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <LoaderPinwheel />
        )}
      </section>

      <section className="w-full">
        <div className="mt-2">
          {restaurants && <Restaurant restaurants={restaurants} />}
        </div>
      </section>
    </main>
  );
}
