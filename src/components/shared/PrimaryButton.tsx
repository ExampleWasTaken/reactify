import React, { ReactNode } from 'react';

interface PrimaryButtonProps {
  className: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  children: ReactNode;
}

export const PrimaryButton = ({
  className,
  onClick,
  children,
}: PrimaryButtonProps) => {
  const style = 'bg-green text-black rounded-lg ' + className;
  return (
    <button
      className={style}
      onClick={event => onClick(event)}
    >
      {children}
    </button>
  );
};
