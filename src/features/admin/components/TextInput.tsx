import { TextInputProps } from "../types/forms";

export function TextInput({
  label,
  name,
  value,
  required = false,
  error,
  type = "text",
  onChange,
}: TextInputProps) {
  return (
    <div className="form-control">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
}
