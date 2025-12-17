export interface InputProps {
  label?: string;
  type?: 'text' | 'tel' | 'email';
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}
