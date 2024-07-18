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

export default function Home() {
  const createCity = useMutation(api.city.create);

  return (
    <main className="flex w-full min-h-screen flex-col items-center space-y-8 p-24 max-sm:p-8 flex-wrap">
      <section className="w-full flex flex-wrap h-full items-center">
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
            <Button size={"lg"} className="bg-[#FD8D6D] hover:bg-[#ffd3c5]">
              <Link href={"/restaurant"}>Surprise me!</Link>
            </Button>
          </section>
        </div>
      </section>
    </main>
  );
}
