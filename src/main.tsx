import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { AppRoot } from './components/app/root/AppRoot.tsx';
import { AppError } from './components/app/error/AppError.tsx';
import { AppLogin } from './components/app/login/AppLogin.tsx';
import { LandingPage } from './components/web/pages/landingpage/LandingPage.tsx';
import { _404 } from './components/web/pages/404/404.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
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
            element: <p>library</p>,
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
    path: '*',
    element: <_404 />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
