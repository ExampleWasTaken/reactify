import { useSpotify } from '../../hooks/useSpotify.tsx';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.ts';

export const Logout = () => {
  const spotify = useSpotify();
  const navigate = useNavigate();

  useEffect(() => {
    spotify.sdk.logOut();
    navigate(routes.app.login);
  }, [spotify, navigate]);

  return <></>;
};
