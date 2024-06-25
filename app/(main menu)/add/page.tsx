"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown, LoaderPinwheel } from "lucide-react";

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
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { InputNumberDecimal } from "@/components/InputNumberDecimal";
import { FileState, MultiImageDropzone } from "@/components/MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Id } from "@/convex/_generated/dataModel";

type Props = {};

export default function Page({}: Props) {
  const formSchema = z.object({
    name: z.string(),
    price_range_min: z.string(),
    price_range_max: z.string(),
    city: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [open, setOpen] = React.useState(false);
  const [searhCity, setSearchCity] = React.useState<string | undefined>(
    undefined
  );
  const [value, setValue] = React.useState("");
  const [IsSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const createCity = useMutation(api.city.create);
  const allCites = useQuery(api.city.getAll);
  const upload = useMutation(api.photo.create);
  const createRestaurant = useMutation(api.restaurant.create);

  //upload file
  const [fileStates, setFileStates] = React.useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

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

    setSearchCity("");
    setIsSubmitting(false);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    const cityId: Id<"city"> = values.city as unknown as Id<"city">;
    const restaurant = await createRestaurant({
      name: values.name,
      price_range_min: values.price_range_min,
      price_range_max: values.price_range_max,
      city: cityId,
    });
    toast.success("Restaurant behasil disimpan!");
    if (fileStates.length > 0) {
      await Promise.all(
        fileStates.map(async (item) => {
          try {
            const res = await edgestore.publicFiles.upload({
              file: item.file as File,
            });
            await upload({ url: res.url, restaurant_id: restaurant });
            toast.success("Foto terupload!");
          } catch (err) {
            console.error(err);
          }
        })
      );
    }

    setIsSubmitting(false);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* CITY */}
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex  items-center">
                <Label className="mr-4">Pilih Kota: </Label>
                <FormControl>
                  <FormItem>
                    {allCites ? (
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-[200px] justify-between"
                          >
                            {value
                              ? allCites.find((city) => city._id === value)
                                  ?.name
                              : "Pilih Kota..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandInput
                              onChangeCapture={(
                                e: React.ChangeEvent<HTMLInputElement>
                              ) => {
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
                                  onClick={() => addCity(searhCity!)}
                                  disabled={IsSubmitting}
                                >{`Tambah Kota ${searhCity}`}</Button>
                              </CommandEmpty>
                              <CommandGroup>
                                {allCites.map((city) => (
                                  <CommandItem
                                    key={city._id}
                                    value={city._id}
                                    onSelect={(currentValue) => {
                                      form.setValue("city", currentValue);
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );

                                      setOpen(false);
                                    }}
                                  >
                                    <Check
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        value === city._id
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
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
                  </FormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Nama Restaurant */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Restaurant</FormLabel>
                <FormControl>
                  <FormItem>
                    <Input {...field} />
                  </FormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price Range */}
          <div>
            <Label>Kisaran Harga (per orang)</Label>
            <Select
              onValueChange={(value) => {
                switch (value) {
                  case "murah":
                    form.setValue("price_range_min", "0");
                    form.setValue("price_range_max", "50,000");
                    return;
                  case "sedang":
                    form.setValue("price_range_min", "50,000");
                    form.setValue("price_range_max", "100,000");
                    return;
                  case "mahal":
                    form.setValue("price_range_min", "100,000");
                    form.setValue("price_range_max", "150,000");
                    return;
                  case "sangatmahal":
                    form.setValue("price_range_min", "150,000");
                    form.setValue("price_range_max", "300,000");
                    return;
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="murah">{"< Rp. 50,000"}</SelectItem>
                <SelectItem value="sedang">Rp. 50,000 - 100,000</SelectItem>
                <SelectItem value="mahal">Rp. 100,000 - 150,000</SelectItem>
                <SelectItem value="sangatmahal">{"> Rp. 150,000"}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Photo */}

          <MultiImageDropzone
            value={fileStates}
            onChange={(files) => {
              setFileStates(files);
              console.log(fileStates);
            }}
            dropzoneOptions={{
              maxFiles: 6,
            }}
          />

          <Button disabled={IsSubmitting}>Simpan</Button>
        </form>
      </Form>
    </main>
  );
}
