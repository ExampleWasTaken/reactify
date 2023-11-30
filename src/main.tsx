import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AppRoot } from './components/app/AppRoot.tsx';
import { AppError } from './components/app/views/error/AppError.tsx';
import { AppLogin } from './components/app/views/login/AppLogin.tsx';
import { LandingPage } from './components/web/pages/landingpage/LandingPage.tsx';
import { _404 } from './components/web/pages/404/404.tsx';
import { WebRoot } from './components/web/WebRoot.tsx';
import { About } from './components/web/pages/about/About.tsx';
import { LibraryView } from './components/app/views/library/LibraryView.tsx';
import { PostAuth } from './components/app/views/login/PostAuth.tsx';
import { PostAuthFail } from './components/app/views/login/PostAuthFail.tsx';

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
            element: <LibraryView />,
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
    path: '*',
    element: <_404 />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
