import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../utils/routes.ts';
import { FullscreenSpinner } from './global/loaders/FullscreenSpinner.tsx';

export const Logout = () => {
  const navigate = useNavigate();

  // TODO: handle logout
  useEffect(() => {
    navigate(routes.app.login);
  }, []);

  return <FullscreenSpinner />;
};
