import React from "react";

export default function InputField({
  label,
  name,
  type,
  value,
  onChange,
  error,
}) {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-1">{label}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-lg p-2"
      />

      {error && <p className="text-red-500 text-sm mt-1"> {error}</p>}
    </div>
  );
}
