"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as React from "react";
import { cn } from "@/lib/utils";
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
import { toast } from "sonner";

export function DialogPickResaurant() {
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
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"lg"} className="bg-[#FD8D6D]">
          Pick a restaurant for me!
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Do you want to choose a city ?</DialogTitle>
          <DialogDescription>
            Choose a city so you get the restaurant that you can visit
          </DialogDescription>
        </DialogHeader>
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
        <DialogFooter>
          <Button className="bg-[#FD8D6D]" type="submit">
            Done
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
