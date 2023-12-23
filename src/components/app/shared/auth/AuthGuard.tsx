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

export const AuthGuard = ({ children }: AuthGuardProps): JSX.Element => {
  const auth = useAuth();
  const navigate = useNavigate();

  // Indicates that the component is currently checking if the user is allowed to view the requested content.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (auth.isLoggedIn()) {
      setIsLoading(false);
    }

    const accessToken = auth.getAccessToken()!;

    if (accessToken.expires < Date.now()) {
      auth
        .refreshToken()
        .then(() => setIsLoading(false))
        .catch(e => {
          navigate(routes.login);
          console.error(e);
          toast('Please login again.', TOAST_OPTS);
          return;
        });
    }
  }, [auth, navigate]);

  return isLoading ? <FullscreenSpinner /> : <>{children}</>;
};
