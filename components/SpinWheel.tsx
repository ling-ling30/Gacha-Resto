// src/components/SpinWheel.tsx
import { Id } from "@/convex/_generated/dataModel";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import Photo from "./Photo";

type Props = {
  data: {
    _id: Id<"restaurant">;
    _creationTime: number;
    city: Id<"city">;
    name: string;
    price_range_min: string;
    price_range_max: string;
  }[];
};

const data = [
  { name: "restaurant apik 1" },
  { name: "restaurant apik 2" },
  { name: "restaurant apik 3" },
  { name: "restaurant apik 4" },
  { name: "restaurant apik 5" },
  { name: "restaurant apik 6" },
  { name: "restaurant apik 7" },
  { name: "restaurant apik 8" },
  { name: "restaurant apik 9" },
  { name: "restaurant apik 10" },
  { name: "restaurant apik 11" },
  { name: "restaurant apik 12" },
];

const SpinWheel = ({ data }: Props) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{
    _id: Id<"restaurant">;
    _creationTime: number;
    city: Id<"city">;
    name: string;
    price_range_min: string;
    price_range_max: string;
  } | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);

  const spin = () => {
    setIsSpinning(true);
    const degree = Math.floor(5000 + Math.random() * 5000); // Random spin degree
    const wheel = wheelRef.current;
    if (wheel) {
      wheel.style.transition = "transform 4s ease-out";
      wheel.style.transform = `rotate(${degree}deg)`;

      setTimeout(() => {
        setIsSpinning(false);
        determineResult(degree);
      }, 4000); // Transition time
    }
  };

  const determineResult = (degree: number) => {
    const totalSegments = data.length;
    const segmentAngle = 360 / totalSegments;

    // Normalize the degree to a value between 0 and 360
    const normalizedDegree = degree % 360;

    // Calculate the index of the selected segment
    const selectedIndex =
      Math.floor((360 - normalizedDegree) / segmentAngle) % totalSegments;

    // Set the result
    setResult(data[selectedIndex]);
  };

  return (
    <>
      {data.length === 0 ? (
        <p>tidak ada restaurant untuk dipilih</p>
      ) : (
        <>
          <div className="flex flex-col items-center z-10 relative">
            <div
              className="absolute z-50 border-8 border-l-red-600 border-transparent left-2 top-[48%]"
              style={{
                rotate: "0deg", // Pointing to the top (0 degrees)
              }}
            ></div>

            <div
              className="relative max-md:w-[300px] md:w-[500px] aspect-square border-8 border-gray-300 rounded-full shadow-md z-10 bg-red-400"
              ref={wheelRef}
              id="wheel"
            >
              {data.map((item, index) => {
                const angle = (360 / data.length) * index;
                return (
                  <div
                    key={index}
                    className={`absolute w-1/2 aspect-square bg-gray-200 border-r p-1 bg-transparent origin-bottom-right z-0 `}
                    style={{
                      transform: `rotate(${angle}deg)`,
                    }}
                  >
                    <span className="block absolute bottom-0  mr-24 max-md:text-xs md:text-md  md:text-md pb-2 pl-5 ">
                      {item.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <Button
            className="mt-8 px-6 py-2 text-white rounded disabled:opacity-50 w-full"
            onClick={spin}
            disabled={isSpinning}
          >
            Makan apa Hari ini?
          </Button>
        </>
      )}

      {result && (
        <div className="mt-4 text-lg font-bold">
          Result:
          <div
            className="mt-10 flex justify-center flex-col items-center"
            key={result._id}
          >
            <div className="font-semibold">{result.name}</div>
            <div className="font-semibold">
              Rp. {result.price_range_min} - Rp. {result.price_range_max}
            </div>
            <div className="gap-2 flex flex-wrap">
              <Photo restaurant_id={result._id} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SpinWheel;
