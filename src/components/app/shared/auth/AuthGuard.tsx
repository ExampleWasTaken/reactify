import { JSX, ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../../../../api/hooks/useAuth.tsx';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../../utils/routes.ts';
import { toast } from 'react-hot-toast';
import { FullscreenSpinner } from '../loaders/FullscreenSpinner.tsx';

interface AuthGuardProps {
  children: ReactNode;
}

const TOAST_OPTS = {
  id: 'auth_guard_error',
};

let preventRetry = false;

export const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Indicates that the component is currently checking if the user is allowed to view the requested content.
  const [isLoading, setIsLoading] = useState(true);
  const [label, setLabel] = useState('Checking login status');

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      navigate(routes.login);
      toast('Please login again', TOAST_OPTS);
      return;
    }

    if (preventRetry) return;
    preventRetry = true;
    setLabel('Requesting new token');

    const accessToken = auth.getAccessToken()!;

    if (accessToken.expires < Date.now()) {
      console.log('refreshing token');
      auth
        .refreshToken()
        .then(() => setIsLoading(false))
        .catch(e => {
          navigate(routes.login);
          console.error(e);
          toast('Please login again', TOAST_OPTS);
          return;
        });
    }
  }, [auth, navigate, children]);

  return isLoading ? <FullscreenSpinner label={label} /> : <>{children}</>;
};
