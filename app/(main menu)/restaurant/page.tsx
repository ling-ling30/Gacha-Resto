"use client";
import { OrbitComponent } from "@/components/Orbit";
import { Button } from "@/components/ui/button";

import * as React from "react";
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
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { ChevronsUpDown, LoaderPinwheel } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { RestaurantCard } from "../gallery/_components/RestaurantCard";

type Props = {};

export default function Page({}: Props) {
  const allCities = useQuery(api.city.getAll);
  const [cityId, setCityId] = React.useState<Id<"city"> | undefined>(undefined);
  const [randomRestaurant, setRandomRestaurant] = React.useState<any>(null);
  const [open, setOpen] = React.useState(false);
  const [searchCity, setSearchCity] = React.useState<string | undefined>(
    undefined
  );
  const [animate, setAnimate] = React.useState<boolean>(false);
  const [showResult, setShowResult] = React.useState<boolean>(true);

  // Fetch all restaurants for the selected city
  const restaurants = useQuery(api.restaurant.fetchAllRestaurantByCity, {
    city_id: cityId,
  });

  // Function to pick a random restaurant
  const pickRandomRestaurant = () => {
    if (restaurants && restaurants.length > 0) {
      setShowResult(false);
      setAnimate(true);

      // Set a timeout to match the animation duration (adjust as needed)
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * restaurants.length);
        setRandomRestaurant(restaurants[randomIndex]);
        setAnimate(false);
        setShowResult(true);
      }, 3000); // Adjust this time to match your animation duration
    } else {
      setRandomRestaurant(null);
      setShowResult(true);
    }
  };

  // Effect to pick a random restaurant when restaurants change
  React.useEffect(() => {
    if (restaurants) {
      pickRandomRestaurant();
    }
  }, [restaurants]);

  const handleCityChange = (newCityId: Id<"city">) => {
    setCityId(newCityId);
  };

  return (
    <div className="w-full flex justify-center flex-col px-15">
      <div className="w-full mt-20 flex justify-center gap-x-5 gap-y-3 flex-wrap">
        {allCities ? (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                size={"lg"}
                className="w-[200px]"
              >
                {cityId
                  ? allCities.find((city) => city._id === cityId)?.name
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
                  <CommandEmpty>Oops! Not found!</CommandEmpty>
                  <CommandGroup>
                    {allCities.map((city) => (
                      <CommandItem
                        key={city._id}
                        value={city._id}
                        onSelect={(currentValue) => {
                          handleCityChange(currentValue as Id<"city">);
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
          <Skeleton className="w-[250px] h-10" />
        )}
        <Button
          onClick={pickRandomRestaurant}
          variant={"outline"}
          className="bg-[#ffd3c5] hover:bg-orange-300 max-w-[250px]"
        >
          Pick a restaurant for me!
        </Button>
      </div>
      <OrbitComponent animate={animate}>
        {showResult && randomRestaurant
          ? randomRestaurant.name
          : "Selecting..."}
      </OrbitComponent>

      {/* Display the random restaurant */}
      <div className="w-full flex items-center justify-center">
        {showResult &&
          (randomRestaurant ? (
            <RestaurantCard classname="" {...randomRestaurant} />
          ) : (
            <p>No restaurants found for this city.</p>
          ))}
      </div>
    </div>
  );
}
