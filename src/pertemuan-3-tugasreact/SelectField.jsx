import React from "react";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  options,
  error,
}) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2"
      >
        <option value="">-- Pilih --</option>

        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>

      {error && <p className="text-red-500 text-sm mt-1"> {error}</p>}
    </div>
  );
}
