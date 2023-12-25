import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../../utils/routes.ts';
import { useEffect } from 'react';
import { AppFooter } from '../shared/footer/AppFooter.tsx';
import { AuthGuard } from '../shared/auth/AuthGuard.tsx';

export const AuthLayout = () => {
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
        <AppFooter />
      </AuthGuard>
    </div>
  );
};
