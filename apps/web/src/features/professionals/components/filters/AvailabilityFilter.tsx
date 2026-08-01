import React from "react";
import { FilterDropdown } from "@/components/data-table/FilterDropdown";

interface AvailabilityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const DAYS = [
  { value: "ALL", label: "Any Day" },
  { value: "Mon", label: "Monday" },
  { value: "Tue", label: "Tuesday" },
  { value: "Wed", label: "Wednesday" },
  { value: "Thu", label: "Thursday" },
  { value: "Fri", label: "Friday" },
  { value: "Sat", label: "Saturday" },
  { value: "Sun", label: "Sunday" },
];

export const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <FilterDropdown
      label="Available Day"
      value={value}
      options={DAYS}
      onChange={onChange}
    />
  );
};
export default AvailabilityFilter;
