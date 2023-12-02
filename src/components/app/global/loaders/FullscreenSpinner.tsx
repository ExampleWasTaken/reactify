import { Spinner } from './Spinner.tsx';

export const FullscreenSpinner = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black text-green flex justify-center items-center">
      <Spinner />
    </div>
  );
};
