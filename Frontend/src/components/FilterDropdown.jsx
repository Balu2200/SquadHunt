import React from "react";

const FilterDropdown = ({ options, onChange, label, selectedValue }) => {
  return (
    <div className="mb-4">
      <label htmlFor="filter" className="block text-sm font-semibold mb-2">
        {label}
      </label>
      <select
        id="filter"
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All</option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
