import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../utils/routes.ts';
import { useEffect } from 'react';
import { AppNavbar } from '../global/navbar/AppNavbar.tsx';

export const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      location.pathname.endsWith('app/') ||
      location.pathname.endsWith('app')
    ) {
      navigate(routes.app.home);
    }
  }, []);

  return (
    <div
      className="w-screen h-screen overflow-scroll"
      id="app-container"
    >
      <Outlet />
      <AppNavbar />
    </div>
  );
};
