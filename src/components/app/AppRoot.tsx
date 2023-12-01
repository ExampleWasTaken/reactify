import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.ts';
import { useEffect, useRef } from 'react';
import { AppFooterContext } from './global/footer/AppFooterContext.ts';
import { AppFooter } from './global/footer/AppFooter.tsx';

export const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const appFooter = useRef<HTMLDivElement>(null);

  const calcFooterOffsetHeight = () => {
    if (appFooter.current) {
      return appFooter.current.offsetHeight;
    }
    return 0;
  };

  useEffect(() => {
    if (location.pathname.endsWith('app/') || location.pathname.endsWith('app')) {
      navigate(routes.app.home);
    }
  }, [navigate, location]);

  return (
    <AppFooterContext.Provider value={calcFooterOffsetHeight()}>
      <div
        className="w-screen h-screen bg-black text-white overflow-scroll"
        id="app-container"
      >
        <Outlet />
        <AppFooter ref={appFooter} />
      </div>
    </AppFooterContext.Provider>
  );
};
