import { useCallback } from 'react';
import { InputProps } from './Input.types';
import styles from './Input.module.scss'

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  
  let countryCode = '';
  let nationalNumber = '';
  
  if (digits.startsWith('8') && digits.length <= 11) {
    countryCode = '7';
    nationalNumber = digits.slice(1);
  }

  else if (digits.startsWith('380')) {
    countryCode = '380';
    nationalNumber = digits.slice(3);
  }

  else if (digits.startsWith('375')) {
    countryCode = '375';
    nationalNumber = digits.slice(3);
  }

  else if (digits.startsWith('1') && digits.length <= 11) {
    countryCode = '1';
    nationalNumber = digits.slice(1);
  }

  else if (digits.startsWith('7')) {
    countryCode = '7';
    nationalNumber = digits.slice(1);
  }

  else {
    countryCode = digits.slice(0, Math.min(3, digits.length));
    nationalNumber = digits.slice(countryCode.length);
  }
  
  const maxNationalLength = 15 - countryCode.length;
  nationalNumber = nationalNumber.slice(0, maxNationalLength);
  

  let formatted = `+${countryCode}`;
  
  if (nationalNumber.length > 0) {
    formatted += ` (${nationalNumber.slice(0, 3)}`;
  }
  if (nationalNumber.length > 3) {
    formatted += `) ${nationalNumber.slice(3, 6)}`;
  }
  if (nationalNumber.length > 6) {
    formatted += `-${nationalNumber.slice(6, 8)}`;
  }
  if (nationalNumber.length > 8) {
    formatted += `-${nationalNumber.slice(8)}`;
  }
  
  return formatted;
};

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
}) => {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'tel') {
      const formatted = formatPhoneNumber(e.target.value);
      const syntheticEvent = {
        ...e,
        target: { ...e.target, value: formatted }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    } else {
      onChange(e);
    }
  }, [type, onChange]);

  return (
    <div className={styles.inputGroup}>
			{label && (
				<label className={styles.label}>{label}</label>
			)}
      <input
        type={type}
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required={required}
      />
    </div>
  );
};

export default Input;

