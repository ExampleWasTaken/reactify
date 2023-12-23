import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.ts';
import { useEffect } from 'react';
import { AppFooter } from './global/footer/AppFooter.tsx';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../../api/hooks/useAuth.tsx';

export const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAccessToken } = useAuth();

  const checkLoginStatus = () => {
    const at = getAccessToken();
    if (!at) {
      navigate(routes.login);
    } else {
      console.log(at);
    }
  };

  useEffect(() => {
    if (location.pathname.endsWith('app/') || location.pathname.endsWith('app')) {
      navigate(routes.app.home);
    }

    checkLoginStatus();
  }, [navigate, location]);

  return (
    <div
      className="w-screen h-screen bg-black text-white overflow-scroll"
      id="app-container"
    >
      {/*{accessToken ? (
        <SpotifyWebSDK
          name="Reactify"
          getOAuthToken={cb => cb(accessToken)}
        >
          <Outlet />
          <AppFooter />
        </SpotifyWebSDK>
      ) : (
        <FullscreenSpinner />
      )}*/}
      <Outlet />
      <Toaster position="bottom-center" />
      <AppFooter />
    </div>
  );
};
