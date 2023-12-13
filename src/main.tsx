import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AppError } from './components/app/views/error/AppError.tsx';
import { AppLogin } from './components/app/views/login/AppLogin.tsx';
import { LandingPage } from './components/web/pages/landingpage/LandingPage.tsx';
import { _404 } from './components/web/pages/404/404.tsx';
import { WebRoot } from './components/web/WebRoot.tsx';
import { About } from './components/web/pages/about/About.tsx';
import { PostAuth } from './components/app/views/login/PostAuth.tsx';
import { PostAuthFail } from './components/app/views/login/PostAuthFail.tsx';
import { LibraryList } from './components/app/views/library/list/LibraryList.tsx';
import { Logout } from './components/app/Logout.tsx';
import { SpotifyWebAPI } from './api/components/SpotifyWebAPI.tsx';
import { AppRoot } from './components/app/AppRoot.tsx';

const ENABLE_STRICT = true;

const CLIENT_ID = '5ca64c0a829949428154075795560d0d';
const REDIRECT_URL = 'https://localhost:5173/app/authflow';
const SCOPES = [
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-private',
  'playlist-modify-public',
  'user-follow-modify',
  'user-follow-read',
  'user-read-playback-position',
  'user-top-read',
  'user-read-recently-played',
  'user-library-modify',
  'user-library-read',
  'user-read-email',
  'user-read-private',
];

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
    element: <Outlet />,
    children: [
      {
        path: 'app',
        element: <AppRoot />,
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
    ],
  },
  {
    path: 'app/login',
    element: <AppLogin />,
  },
  {
    path: 'app/authflow',
    element: <PostAuth />,
  },
  {
    path: 'app/authflow/fail',
    element: <PostAuthFail />,
  },
  {
    path: '/app/logout',
    element: <Logout />,
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
        clientId={CLIENT_ID}
        redirectUrl={new URL(REDIRECT_URL)}
        scopes={SCOPES}
      >
        <RouterProvider router={router} />
      </SpotifyWebAPI>
    </React.StrictMode>
  );
} else {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <SpotifyWebAPI
      clientId={CLIENT_ID}
      redirectUrl={new URL(REDIRECT_URL)}
      scopes={SCOPES}
    >
      <RouterProvider router={router} />
    </SpotifyWebAPI>
  );
}
