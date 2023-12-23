import { ImSpinner2 } from 'react-icons/im';
import { IconContext } from 'react-icons';

export const Spinner = () => {
  return (
    <IconContext.Provider value={{ size: '45', className: 'animate-spin' }}>
      <ImSpinner2 />
    </IconContext.Provider>
  );
};
