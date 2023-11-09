import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Root } from './components/root/Root.tsx';
import { AppRoot } from './components/app/root/AppRoot.tsx';
import { AppError } from './components/app/error/AppError.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
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
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
