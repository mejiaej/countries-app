import { useState } from 'react';
import './InputText.css';

interface InputTextProps {
  inititalValue?: string;
  onChange: (newText: string) => Promise<void>;
  placeHolder?: string;
  className?: string;
}

const InputText = ({
  inititalValue,
  onChange,
  placeHolder = '',
  className = '',
}: InputTextProps) => {
  const [text, setText] = useState(inititalValue || '');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setText(newValue);
    onChange(newValue);
  };

  return (
    <input
      className={`input-text ${className}`}
      type="text"
      value={text}
      onChange={handleChange}
      placeholder={placeHolder}
    />
  );
};

export { InputText };
