// src/components/SpinWheel.tsx
import React, { useState } from "react";

const segments = [
  "Prize 1",
  "Prize 2",
  "Prize 3",
  "Prize 4",
  "Prize 5",
  "Prize 6",
  "Prize 7",
  "Prize 8",
];

const SpinWheel: React.FC = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [itemRadius, setItemRadius] = useState<number>(360 / segments.length);

  const spin = () => {
    setIsSpinning(true);
    const degree = Math.floor(5000 + Math.random() * 5000); // Random spin degree
    const wheel = document.getElementById("wheel") as HTMLElement;
    wheel.style.transition = "transform 4s ease-out";
    wheel.style.transform = `rotate(${degree}deg)`;

    setTimeout(() => {
      setIsSpinning(false);
      const actualDegree = degree % 360;
      const segmentIndex = Math.floor(actualDegree / (360 / segments.length));
      setResult(segments[segments.length - 1 - segmentIndex]); // Determine the result
    }, 4000); // Transition time
  };

  return (
    <div className="flex flex-col items-center z-10 bg-yellow-200">
      <div
        className="relative w-72 h-72 border-8 border-gray-300 rounded-full shadow-md z-10 bg-red-400"
        id="wheel"
      >
        {segments.map((segment, index) => {
          const radius = itemRadius * index;
          return (
            <div
              key={index}
              className={`absolute w-1/2 h-1/2 bg-gray-200 border-r bg-transparent transform origin-bottom-right z-0 `}
              style={{
                rotate: `${radius}deg`,
              }}
            >
              <span
                className="block mt-20 px-2 pt-2 me-10 text-center "
                style={{
                  rotate: `-${radius}deg`,
                }}
              >
                {segment}
              </span>
            </div>
          );
        })}
      </div>
      <button
        className="mt-8 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={spin}
        disabled={isSpinning}
      >
        Spin
      </button>
      {result && <div className="mt-4 text-lg font-bold">Result: {result}</div>}
    </div>
  );
};

export default SpinWheel;
