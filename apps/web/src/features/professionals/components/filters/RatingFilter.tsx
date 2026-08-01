import React from "react";
import { FilterDropdown } from "@/components/data-table/FilterDropdown";

interface RatingFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const RATINGS = [
  { value: "ALL", label: "Any Rating" },
  { value: "4.5", label: "4.5+ Stars" },
  { value: "4.8", label: "4.8+ Stars" },
  { value: "5.0", label: "5.0 Stars" },
];

export const RatingFilter: React.FC<RatingFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <FilterDropdown
      label="Rating"
      value={value}
      options={RATINGS}
      onChange={onChange}
    />
  );
};
export default RatingFilter;
