import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.ts';
import { useEffect, useState } from 'react';
import { AppFooter } from './global/footer/AppFooter.tsx';
import { SpotifyWebSDK } from 'spotify-web-playback-sdk-for-react';
import { useSpotify } from '../../hooks/useSpotify.tsx';
import { FullscreenSpinner } from './global/loaders/FullscreenSpinner.tsx';

export const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const spotify = useSpotify();

  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    if (location.pathname.endsWith('app/') || location.pathname.endsWith('app')) {
      navigate(routes.app.home);
    }

    spotify.sdk.getAccessToken().then(result => {
      if (result === null) {
        spotify.sdk.authenticate().then(r => r);
      }
      result && setAccessToken(result.access_token);
    });
  }, [navigate, location, spotify]);

  return (
    <div
      className="w-screen h-screen bg-black text-white overflow-scroll"
      id="app-container"
    >
      {accessToken ? (
        <SpotifyWebSDK
          name="Reactify"
          getOAuthToken={cb => cb(accessToken)}
        >
          <Outlet />
          <AppFooter />
        </SpotifyWebSDK>
      ) : (
        <FullscreenSpinner />
      )}
    </div>
  );
};
