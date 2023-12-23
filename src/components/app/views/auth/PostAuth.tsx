import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { routes } from '../../../../utils/routes.ts';
import { useAuth } from '../../../../api/hooks/useAuth.tsx';

export const PostAuth = () => {
  const navigate = useNavigate();
  const { requestAccessToken } = useAuth();

  // TODO: this could be moved to a react-router loader
  // Redirecting logic
  useEffect(() => {
    (async () => {
      const params = new URLSearchParams(window.location.hash.substring(1));
      if (params.get('error')) {
        navigate(routes.app.authflowFail + params.toString());
        return;
      }

      try {
        await requestAccessToken();
      } catch (e) {
        console.log(e);
        navigate(routes.app.authflowFail);
      }

      navigate(routes.app.home);
    })();
  }, [navigate]);

  return <p>post authentication</p>;
};
