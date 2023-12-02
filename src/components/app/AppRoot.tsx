import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.ts';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AppFooterContext } from './global/footer/AppFooterContext.ts';
import { AppFooter } from './global/footer/AppFooter.tsx';
import { SpotifyWebSDK } from 'spotify-web-playback-sdk-for-react';
import { useSpotify } from '../../hooks/useSpotify.tsx';
import { FullscreenSpinner } from './global/loaders/FullscreenSpinner.tsx';

export const AppRoot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const spotify = useSpotify();

  const [accessToken, setAccessToken] = useState('');
  const [footerOffsetHeight, setFooterOffsetHeight] = useState(0);

  const appFooter = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (appFooter.current) {
      setFooterOffsetHeight(appFooter.current.offsetHeight);
    }
    setFooterOffsetHeight(0);
  }, []);

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
    <AppFooterContext.Provider value={footerOffsetHeight}>
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
            <AppFooter ref={appFooter} />
          </SpotifyWebSDK>
        ) : (
          <FullscreenSpinner />
        )}
      </div>
    </AppFooterContext.Provider>
  );
};
