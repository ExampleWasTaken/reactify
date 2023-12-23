import { Spinner } from './Spinner.tsx';
import { useState } from 'react';

interface ContainerSpinnerProps {
  className?: string;
  label?: string;
  labelColor?: string;
}

export const ContainerSpinner = ({ className, label, labelColor }: ContainerSpinnerProps) => {
  const [spinnerStyle] = useState('text-green flex justify-center items-center ' + className);

  return (
    <div className={spinnerStyle}>
      <div className="flex flex-col max-w-[66.6%] justify-center items-center space-y-3">
        <Spinner />
        {label && (
          <p
            className="text-white text-center font-light"
            style={{ color: labelColor }}
          >
            {label}
          </p>
        )}
      </div>
    </div>
  );
};
