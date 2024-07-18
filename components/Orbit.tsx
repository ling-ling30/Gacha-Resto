import OrbitingCircles from "@/components/magicui/orbiting-circles";
import {
  Beef,
  Beer,
  BeerIcon,
  CakeSlice,
  IceCreamCone,
  Utensils,
  Wine,
} from "lucide-react";
import React, { useState, useEffect } from "react";

type Props = {
  children: React.ReactNode;
  animate: boolean;
};

export function OrbitComponent({ children, animate }: Props) {
  const [duration, setDuration] = useState(20);
  const [isDecreasing, setIsDecreasing] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (animate && !isAnimating) {
      setIsAnimating(true);
      setIsDecreasing(true);
      setDuration(20);
    }
  }, [animate]);

  useEffect(() => {
    let animationFrameId: number;
    const minDuration = 5;
    const maxDuration = 20;
    const animationSpeed = 0.05; // Adjust this value to change animation speed

    const animateFrame = () => {
      setDuration((prevDuration) => {
        let newDuration;
        if (isDecreasing) {
          newDuration = prevDuration - animationSpeed;
          if (newDuration <= minDuration) {
            setIsDecreasing(false);
            return minDuration;
          }
        } else {
          newDuration = prevDuration + animationSpeed;
          if (newDuration >= maxDuration) {
            setIsAnimating(false);
            return maxDuration;
          }
        }
        return newDuration;
      });

      if (isAnimating) {
        animationFrameId = requestAnimationFrame(animateFrame);
      }
    };

    if (isAnimating) {
      animationFrameId = requestAnimationFrame(animateFrame);
    }

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isAnimating, isDecreasing]);

  return (
    <div className="relative flex h-[700px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300 bg-clip-text text-center text-4xl md:text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-black">
        {children}
      </span>

      {/* Inner Circles */}
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={duration}
        delay={20}
        radius={80}
      >
        <Wine className="size-9 text-red-300" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[30px] border-none bg-transparent"
        duration={duration}
        delay={10}
        radius={80}
      >
        <Beef className="size-9 text-red-300" />
      </OrbitingCircles>

      {/* Outer Circles (reverse) */}
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={170}
        duration={duration}
        reverse
      >
        <Utensils className="size-9 text-red-300" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={170}
        duration={duration}
        delay={20}
        reverse
      >
        <CakeSlice className="size-9 text-red-300" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={250}
        duration={duration}
        delay={20}
      >
        <IceCreamCone className="size-9 text-red-300" />
      </OrbitingCircles>
      <OrbitingCircles
        className="size-[50px] border-none bg-transparent"
        radius={250}
        duration={duration}
      >
        <BeerIcon className="size-9 text-red-300" />
      </OrbitingCircles>
    </div>
  );
}
