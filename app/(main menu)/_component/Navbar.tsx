"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Honk, Patrick_Hand } from "next/font/google";
import { Button } from "@/components/ui/button";
import { honk, patrick } from "@/components/font";
import useScreenSize from "@/components/hook/useScreenSize";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function Navbar({ className }: Props) {
  const path = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY < 0) {
        setShowNavbar(true);
      } else if (event.deltaY > 0) {
        setShowNavbar(false);
      }
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        className={cn(
          "w-full sticky top-0 ease-in-out duration-500 text-center z-50 flex items-center justify-between sm:px-20 px-5 bg-white/40 rounded-md py-5",
          className,
          showNavbar ? "null" : "-translate-y-20"
        )}
      >
        <section className={`${honk.className} text-3xl`}>LOGO</section>
        <section
          className={`${patrick.className} flex sm:space-x-5  md:space-x-10 `}
        >
          <Button
            className={`${path === "/add" && "bg-orange-300"} sm:text-sm max-sm:px-2 md:text-2xl`}
            variant={"link"}
          >
            <Link href={"/add"}>Add</Link>
          </Button>
          <Button
            className={`${path === "/" && "bg-orange-300"}  sm:text-sm max-sm:px-2 md:text-2xl`}
            variant={"link"}
          >
            <Link href={"/"}>Home</Link>
          </Button>
          <Button
            variant={"link"}
            className={`${path === "/gallery" && "bg-orange-300"} sm:text-sm max-sm:px-2 md:text-2xl`}
          >
            <Link href={"/gallery"}>Gallery</Link>
          </Button>
          <Button
            variant={"link"}
            className={`${path === "/city" && "bg-orange-300"} sm:text-sm max-sm:px-2 md:text-2xl`}
          >
            <Link href={"/city"}>City</Link>
          </Button>
          <Button
            variant={"link"}
            className={`${path === "/restaurant" && "bg-orange-300"} sm:text-sm max-sm:px-2 md:text-2xl`}
          >
            <Link href={"/restaurant"}>What to eat?</Link>
          </Button>
        </section>
      </nav>
    </>
  );
}
