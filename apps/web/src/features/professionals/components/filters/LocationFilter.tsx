import React from "react";
import { FilterDropdown } from "@/components/data-table/FilterDropdown";

interface LocationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const LOCATIONS = [
  { value: "ALL", label: "All Locations" },
  { value: "Westlands", label: "Nairobi, Westlands" },
  { value: "Kilimani", label: "Nairobi, Kilimani" },
  { value: "Karen", label: "Nairobi, Karen" },
  { value: "Gigiri", label: "Nairobi, Gigiri" },
];

export const LocationFilter: React.FC<LocationFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <FilterDropdown
      label="Location"
      value={value}
      options={LOCATIONS}
      onChange={onChange}
    />
  );
};
export default LocationFilter;
