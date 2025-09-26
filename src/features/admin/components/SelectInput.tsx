import { SelectInputProps } from "../types";

export function SelectInput({
  label,
  name,
  value,
  options,
  required = false,
  error,
  onChange,
}: SelectInputProps) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{label} is required</span>}
    </div>
  );
}
