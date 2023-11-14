import React, { ReactNode } from 'react';
import { clsx } from 'clsx';

interface PrimaryButtonProps {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  children: ReactNode;
}

export const PrimaryButton = ({
  className,
  onClick,
  disabled,
  children,
}: PrimaryButtonProps) => {
  const style = 'bg-green text-black rounded-lg ' + className;
  return (
    <button
      className={clsx(
        style,
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'hover:bg-green/90 active:bg-green/75'
      )}
      onClick={event => onClick(event)}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
