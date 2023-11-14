import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../utils/routes.ts';
import { useEffect } from 'react';
import { AppNavbar } from '../global/navbar/AppNavbar.tsx';

export const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    location.pathname.endsWith(routes.app) ||
      (location.pathname.endsWith(routes.app + '/') && navigate(routes.home));
  }, []);

  return (
    <>
      <Outlet />
      <AppNavbar />
    </>
  );
};
