import { Spinner } from './Spinner.tsx';

interface FullscreenSpinnerProps {
  label?: string;
}

export const FullscreenSpinner = ({ label }: FullscreenSpinnerProps) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-black text-green flex justify-center items-center">
      <div className="flex flex-col max-w-[66.6%] justify-center items-center space-y-3">
        <Spinner />
        {label && <p className="text-white text-center font-light">{label}</p>}
      </div>
    </div>
  );
};
