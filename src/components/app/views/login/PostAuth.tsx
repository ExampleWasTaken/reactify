import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSpotify } from '../../../../hooks/useSpotify.tsx';
import { routes } from '../../../../utils/routes.ts';

export const PostAuth = () => {
  const navigate = useNavigate();
  const spotify = useSpotify();

  // Redirecting logic
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.hash.substring(1));
      if (params.get('error')) {
        navigate(routes.app.authflowFail);
        return;
      }

      const result = await spotify.sdk.authenticate();

      if (result.authenticated) {
        navigate(routes.app.home);
      } else {
        navigate(routes.app.authflowFail);
      }
    })();
  }, [navigate, spotify]);

  return <p>post authentication</p>;
};
