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
  const style =
    'bg-green text-black rounded-lg hover:bg-green/90 active:bg-green/75 ' +
    className;
  return (
    <button
      className={style}
      onClick={event => onClick(event)}
    >
      {children}
    </button>
  );
};
