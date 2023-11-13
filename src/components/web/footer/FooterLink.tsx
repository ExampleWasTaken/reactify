import { Link, To } from 'react-router-dom';
import { ReactNode } from 'react';

interface FooterLinkProps {
  to: To;
  children: ReactNode;
}

export const FooterLink = ({ to, children }: FooterLinkProps) => {
  return (
    <Link
      className="no-underline text-white text-sm"
      to={to}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </Link>
  );
};
