import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { routes } from '../../../../utils/routes.ts';
import { useAuth } from '../../../../api/hooks/useAuth.tsx';
import { toast } from 'react-hot-toast';
import { FullscreenSpinner } from '../../shared/loaders/FullscreenSpinner.tsx';

// Prevent strict mode from executing the same thing twice.
let preventRetry = false;

export const PostAuth = () => {
  const navigate = useNavigate();
  const { requestAccessToken } = useAuth();

  useEffect(() => {
    if (preventRetry) return;
    preventRetry = true;

    const getAccessToken = async () => {
      const params = new URLSearchParams(window.location.hash.substring(1));
      if (params.get('error')) {
        navigate(routes.login, { replace: true });
        toast.error('Could not authenticate.');
        return;
      }

      try {
        await requestAccessToken();
      } catch (e) {
        navigate(routes.login, { replace: true });
        console.log(e);
        toast.error('Could not retrieve access token.');
        return;
      }

      navigate(routes.app.home, { replace: true });
    };

    getAccessToken().then();
  }, [navigate, requestAccessToken]);

  return <FullscreenSpinner />;
};
