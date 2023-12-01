import { forwardRef } from 'react';
import { AppNavbar } from './navbar/AppNavbar.tsx';

export const AppFooter = forwardRef<HTMLDivElement>(function AppFooter(_props, ref) {
  return (
    <div
      className="fixed bottom-0 left-0 w-full "
      ref={ref}
    >
      <AppNavbar />
    </div>
  );
});
