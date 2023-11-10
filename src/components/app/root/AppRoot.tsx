import { Outlet, useNavigate } from 'react-router-dom';
import { AppNavbar } from '../global/navbar/AppNavbar.tsx';
import { routes } from '../../../utils/routes.ts';
import { useEffect } from 'react';

export const AppRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(routes.home);
  }, []);

  return (
    <>
      <Outlet />
      <AppNavbar />
    </>
  );
};
