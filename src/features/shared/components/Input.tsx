import { type ChangeEvent, type ReactElement } from "react";

interface InputProps {
  label: string;
  name: string;
  type: "text" | "email" | "password" | "date";
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus: boolean;
  disabled: boolean;
  autoComplete?: string;
}

export const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  autoFocus,
  disabled,
  autoComplete,
}: InputProps): ReactElement => {
  const id = `${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <label>
        {label}
        <input
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required
          autoFocus={autoFocus}
          disabled={disabled}
        />
      </label>
    </>
  );
};
