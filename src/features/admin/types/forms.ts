export interface FormProps {
  legend: string;
  onClose: () => void;
}

export interface InputProps {
  label: string;
  name: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

export interface TextInputProps extends InputProps {
  type?: string;
}

export interface SelectInputProps extends InputProps {
  options: string[];
}
