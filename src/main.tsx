import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppError } from './components/app/views/error/AppError.tsx';
import { AppLogin } from './components/app/views/auth/AppLogin.tsx';
import { LandingPage } from './components/web/pages/landingpage/LandingPage.tsx';
import { _404 } from './components/web/pages/404/404.tsx';
import { WebRoot } from './components/web/WebRoot.tsx';
import { About } from './components/web/pages/about/About.tsx';
import { PostAuth } from './components/app/views/auth/PostAuth.tsx';
import { LibraryList } from './components/app/views/library/list/LibraryList.tsx';
import { Logout } from './components/app/views/auth/Logout.tsx';
import { SpotifyWebAPI } from './api/components/SpotifyWebAPI.tsx';
import { AuthLayout } from './components/app/layouts/AuthLayout.tsx';
import env from './utils/public-env.ts';
import { BaseLayout } from './components/app/layouts/BaseLayout.tsx';

// This is only for testing purposes to have a quick way of knowing
// if an issue is caused by strict mode rendering everything twice.
const ENABLE_STRICT = true;

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/',
    element: <WebRoot />,
    children: [
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/',
    element: <BaseLayout />,
    children: [
      {
        path: 'app',
        element: <AuthLayout />,
        errorElement: <AppError />,
        children: [
          {
            path: 'home',
            element: <p>home</p>,
          },
          {
            path: 'search',
            element: <p>search</p>,
          },
          {
            path: 'library',
            element: <LibraryList />,
          },
          {
            path: '*',
            element: <AppError />,
          },
        ],
      },
      {
        path: 'login',
        element: <AppLogin />,
      },
      {
        path: 'auth',
        element: <PostAuth />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
    ],
  },
  {
    path: '*',
    element: <_404 />,
  },
]);

if (ENABLE_STRICT) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <SpotifyWebAPI
        clientId={env.AUTH_CLIENT_ID}
        redirectUrl={new URL(env.AUTH_REDIRECT_URL)}
        scopes={env.AUTH_SCOPE}
      >
        <RouterProvider router={router} />
      </SpotifyWebAPI>
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <SpotifyWebAPI
      clientId={env.AUTH_CLIENT_ID}
      redirectUrl={new URL(env.AUTH_REDIRECT_URL)}
      scopes={env.AUTH_SCOPE}
    >
      <RouterProvider router={router} />
    </SpotifyWebAPI>
  );
}
