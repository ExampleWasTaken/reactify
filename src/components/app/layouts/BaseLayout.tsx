import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export const BaseLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster position="bottom-center" />
    </>
  );
};
