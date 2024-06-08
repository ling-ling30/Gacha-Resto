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

type Props = {};

export default function Page({}: Props) {
  const formSchema = z.object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });
  const [open, setOpen] = React.useState(false);
  const [searhCity, setSearchCity] = React.useState<string | undefined>(
    undefined
  );
  const [value, setValue] = React.useState("");
  const [IsSubmitting, setIsSubmitting] = React.useState<boolean>(false);

  const createCity = useMutation(api.city.create);
  const allCites = useQuery(api.city.getAll);

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* CITY */}
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  {allCites ? (
                    <FormItem>
                      <Label>Pilih Kota: </Label>
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
                                    value={city.name}
                                    onSelect={(currentValue) => {
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
                    </FormItem>
                  ) : (
                    <LoaderPinwheel />
                  )}
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Restaurant */}
        </form>
      </Form>
    </main>
  );
}
