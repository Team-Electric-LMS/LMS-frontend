import { type ChangeEvent, type ReactElement } from "react";

interface InputProps {
  label: string;
  name: string;
  type: "text" | "email" | "password" | "date" | "radio";
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus: boolean;
  disabled: boolean;
  autoComplete?: string;
  checked?: boolean
  required?: boolean
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
  checked,
  required,
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
          required = {required}
          autoFocus={autoFocus}
          disabled={disabled}
          checked={checked}
        />
      </label>
    </>
  );
};
