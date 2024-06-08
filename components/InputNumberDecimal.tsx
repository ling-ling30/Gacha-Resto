import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  defaultValue?: string | number;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  value?: string | number;
  max?: number;
  min?: number;
  disabled?: boolean;
};

export const InputNumberDecimal = ({
  placeholder,
  className,
  onChange,
  defaultValue,
  onClick,
  value,
  max,
  min,
  disabled = false,
}: Props) => {
  const [quantity, setQuantity] = useState(value ? +value : "");

  useEffect(() => {
    setQuantity(value ? formatNumber(value.toString()) : "");
  }, [value]);

  const [error, setError] = useState(false);

  function isNumberOrDecimal(value: string) {
    // This regex matches a number with optional decimals
    const numberPattern = /^\d*\.?\d*$/;
    return numberPattern.test(value);
  }
  function formatNumber(value: string) {
    if (value.includes(".")) {
      const [integerPart, decimalPart] = value.split(".");
      const formattedInteger = integerPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        ","
      );
      return `${formattedInteger}.${decimalPart}`;
    } else {
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  }

  function unformatNumber(value: string) {
    return value.replace(/,/g, "");
  }

  const onChangeHandle = (value: string) => {
    const unformattedValue = unformatNumber(value);
    const numericValue = parseFloat(unformattedValue);

    if (!isNumberOrDecimal(unformattedValue)) {
      setError(true);
    } else if (max !== undefined && numericValue > max) {
      setError(true);
    } else if (min !== undefined && numericValue < min) {
      setError(true);
    } else {
      setError(false);
      setQuantity(formatNumber(unformattedValue));
      if (onChange) {
        onChange(formatNumber(unformattedValue));
      }
    }
  };

  return (
    <>
      <Input
        onClick={onClick}
        value={quantity}
        placeholder={placeholder}
        onChange={(e) => onChangeHandle(e.target.value)}
        className={cn("px-2 py-1", className)}
        defaultValue={defaultValue}
        disabled={disabled}
      />
      {/* {error && <div className="text-red-500">Invalid Input</div>} */}
    </>
  );
};
