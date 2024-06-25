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
    <main className="flex min-h-[2000px] w-full flex-col items-center space-y-8 p-24 max-sm:p-4 flex-wrap">
      <section className="w-full flex flex-wrap">
        <div className="flex w-1/2">
          <Image
            alt=""
            src={front_image}
            width={350}
            height={600}
            className=" scale-x-[-1]"
          />
          {screenWidth > 1400 && (
            <Image
              alt=""
              src={front_image}
              width={350}
              height={600}
              className=""
            />
          )}
        </div>

        <div className="h-full max-md:p-5 flex-1 2xl:p-32 lg:p-20 flex items-center flex-col text-center justify-center">
          <h1 className={`${patrick.className} lg:text-2xl 2xl:text-4xl `}>
            {
              "One cannot think well, love well, sleep well, if one has not dined well."
            }
          </h1>
          <p className={`${patrick.className}`}>- Virginia Woolf</p>
        </div>
      </section>
      <Button variant={"link"}>
        <Link href={"/add"}>Tambah Restaurant</Link>
      </Button>
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
                  : "Pilih Kota..."}
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
                  placeholder="Cari Kota ..."
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

      {/* <div>{restaurants && <SpinWheel data={restaurants} />}</div> */}

      <section className="w-full">
        <div className="mt-2">
          {restaurants && <Restaurant restaurants={restaurants} />}
        </div>
      </section>
    </main>
  );
}
