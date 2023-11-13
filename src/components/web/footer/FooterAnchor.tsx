import { ReactNode } from 'react';

interface FooterAnchorProps {
  href: string;
  children: ReactNode;
}

export const FooterAnchor = ({ href, children }: FooterAnchorProps) => {
  return (
    <a
      className="no-underline text-white text-sm"
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      {children}
    </a>
  );
};
