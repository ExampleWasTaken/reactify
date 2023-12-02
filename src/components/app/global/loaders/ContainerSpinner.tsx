import { Spinner } from './Spinner.tsx';
import { useState } from 'react';

interface ContainerSpinnerProps {
  className?: string;
}

export const ContainerSpinner = ({ className }: ContainerSpinnerProps) => {
  const [style] = useState('text-green flex justify-center items-center ' + className);

  return (
    <div className={style}>
      <Spinner />
    </div>
  );
};
