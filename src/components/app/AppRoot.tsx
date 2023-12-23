import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.ts';
import { useEffect } from 'react';
import { AppFooter } from './shared/footer/AppFooter.tsx';
import { Toaster } from 'react-hot-toast';
import { AuthGuard } from './shared/auth/AuthGuard.tsx';

export const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.endsWith('app/') || pathname.endsWith('app')) {
      navigate(routes.app.home);
      return;
    }
  }, [navigate, location]);

  return (
    <div
      className="w-screen h-screen bg-black text-white overflow-scroll"
      id="app-container"
    >
      <AuthGuard>
        <Outlet />
        <Toaster position="bottom-center" />
        <AppFooter />
      </AuthGuard>
    </div>
  );
};
