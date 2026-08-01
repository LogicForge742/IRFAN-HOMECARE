import React from "react";
import { FilterDropdown } from "@/components/data-table/FilterDropdown";

interface SpecializationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

const SPECIALIZATIONS = [
  { value: "ALL", label: "All Specializations" },
  { value: "Nursing", label: "General Nursing & Elderly Care" },
  { value: "Physiotherapy", label: "Physiotherapy & Rehabilitation" },
  { value: "Wound Care", label: "Post-Operative Wound Care" },
  { value: "Pediatric", label: "Pediatric Care" },
];

export const SpecializationFilter: React.FC<SpecializationFilterProps> = ({
  value,
  onChange,
}) => {
  return (
    <FilterDropdown
      label="Specialization"
      value={value}
      options={SPECIALIZATIONS}
      onChange={onChange}
    />
  );
};
export default SpecializationFilter;
