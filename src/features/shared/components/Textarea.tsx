import { type ChangeEvent, type ReactElement } from "react";

interface TextareaProps {
  label: string;
  name: string;
  value: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  autoFocus: boolean;
  disabled: boolean;
  autoComplete?: string;
}

export const Textarea = ({
  label,
  name,
  value,
  onChange,
  autoFocus,
  disabled,
  autoComplete,
}: TextareaProps): ReactElement => {
  const id = `${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <label>
        {label}
        <textarea
          id={id}
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
