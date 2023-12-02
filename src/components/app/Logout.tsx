import { useSpotify } from '../../hooks/useSpotify.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.ts';
import { FullscreenSpinner } from './global/loaders/FullscreenSpinner.tsx';

export const Logout = () => {
  const spotify = useSpotify();
  const navigate = useNavigate();

  useEffect(() => {
    spotify.sdk.logOut();
    navigate(routes.app.login);
  }, [spotify, navigate]);

  return <FullscreenSpinner />;
};
