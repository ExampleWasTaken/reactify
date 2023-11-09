import { Outlet } from 'react-router-dom';
import { AppNavbar } from '../global/navbar/AppNavbar.tsx';

export const AppRoot = () => {
  return (
    <>
      <Outlet />
      <AppNavbar />
    </>
  );
};
