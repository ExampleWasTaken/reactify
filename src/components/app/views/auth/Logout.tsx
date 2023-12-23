import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../utils/routes.ts';
import { FullscreenSpinner } from '../../shared/loaders/FullscreenSpinner.tsx';

export const Logout = () => {
  const navigate = useNavigate();

  // TODO: handle logout
  useEffect(() => {
    navigate(routes.login);
  }, []);

  return <FullscreenSpinner />;
};
