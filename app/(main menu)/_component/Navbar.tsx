"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Honk, Patrick_Hand } from "next/font/google";
import { Button } from "@/components/ui/button";
import { honk, patrick } from "@/components/font";
import useScreenSize from "@/components/hook/useScreenSize";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

export default function Navbar({ className }: Props) {
  const path = usePathname();
  const [showNavbar, setShowNavbar] = useState<boolean>(true);
  window.addEventListener("wheel", function (event) {
    if (event.deltaY < 0) {
      setShowNavbar(true);
    } else if (event.deltaY > 0) {
      setShowNavbar(false);
    }
  });
  const screenWidth = useScreenSize();
  console.log(path);
  return (
    <>
      <nav
        className={cn(
          "w-full sticky top-0 ease-in-out duration-500 text-center z-50 flex items-center justify-between sm:px-20 px-5",
          className,
          showNavbar ? "translate-y-4" : "-translate-y-10"
        )}
      >
        <section className={`${honk.className} text-3xl`}>LOGO</section>
        <section className={`${patrick.className} flex sm:space-x-10 `}>
          <Button
            className={`${path === "/" && "bg-orange-300"} sm:text-2xl`}
            variant={"link"}
          >
            Home
          </Button>
          <Button className={`sm:text-2xl`} variant={"link"}>
            About
          </Button>
          <Button className={`sm:text-2xl`} variant={"link"}>
            Galery
          </Button>
          <Button className={`sm:text-2xl`} variant={"link"}>
            City
          </Button>
        </section>
      </nav>
    </>
  );
}
