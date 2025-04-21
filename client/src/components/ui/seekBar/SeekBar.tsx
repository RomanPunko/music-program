import React, { useEffect, useRef } from 'react';
import './seekBar.scss';

interface ISeekBarProps {
  value: number;
  width: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  max: number;
  ref: React.RefObject<HTMLInputElement | null>;
  className?: string; 
}


const SeekBar: React.FC<ISeekBarProps> = ({ value, width, onChange, max, ref, className }) => {
  const progress = (value / max) * 100;

  useEffect(() => {
    if (ref.current) {
      const inputElement = ref.current;
      inputElement.style.setProperty('--progress', `${progress}%`);
    }
  }, [value, max, ref, progress]);

  return (
    <input
      type="range"
      className={` ${className} h-1 ml-3 rounded-lg`}
      style={{ width }}
      min="0"
      max={max}
      value={value}
      onChange={onChange}
      ref={ref}
    />
  );
};

export default SeekBar;
