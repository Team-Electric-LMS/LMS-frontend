import { type ChangeEvent, type ReactElement, type RefObject } from "react";

interface InputProps {
  label: string;
  name: string;
  type: "text" | "email" | "password" | "submit";
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  autoFocus: boolean;
  disabled: boolean;
}

export const Input = ({
  label,
  name,
  type,
  value,
  onChange,
  autoFocus,
  disabled,
}: InputProps): ReactElement => {
  const id = `${name.toLowerCase().replace(/\s+/g, "-")}`;

  if (type === "submit") {
    return <input id={id} type={type} value={label} disabled={disabled} />;
  } else {
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
            autoComplete="on"
            required
            autoFocus={autoFocus}
            disabled={disabled}
          />
        </label>
      </>
    );
  }
};
