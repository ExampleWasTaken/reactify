import { IconContext } from 'react-icons';
import { NavbarItem } from './NavbarItem.tsx';

export const AppNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full py-4 px-8 backdrop-blur-xl backdrop-brightness-50 flex">
      <IconContext.Provider value={{ size: '28' }}>
        <NavbarItem type="home" />
        <NavbarItem type="search" />
        <NavbarItem type="lib" />
      </IconContext.Provider>
    </nav>
  );
};
