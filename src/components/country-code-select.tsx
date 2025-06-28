// components/country-code-select.tsx
"use client";
import { allCountries } from "country-telephone-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectProps } from "@radix-ui/react-select";
import ReactCountryFlag, { ReactCountryFlagProps } from "react-country-flag";

// Using TypeScript interface for props
interface CountryCodeSelectProps
  extends Pick<SelectProps, "value" | "onValueChange"> {
  className?: string;
}

// React will automatically optimize this component
export function CountryCodeSelect({
  value,
  onValueChange,
  className,
}: CountryCodeSelectProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className ?? "w-[120px]"}>
        <SelectValue placeholder="Code" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px] overflow-y-auto">
        {allCountries.map((country: any) => (
          <SelectItem key={country.iso2} value={country.dialCode}>
            <div className="flex items-center gap-2">
              <ReactCountryFlag
                countryCode={country.iso2}
                svg
                style={{ width: "1em", height: "1em" }}
              />
              +{country.dialCode}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
