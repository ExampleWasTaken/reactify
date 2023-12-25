import { IconContext } from 'react-icons';
import { NavbarItem } from './NavbarItem.tsx';

export const AppNavbar = () => {
  return (
    <nav
      className="py-4 px-8 backdrop-blur-xl backdrop-brightness-50 flex"
      id="app-navbar"
    >
      <IconContext.Provider value={{ size: '25' }}>
        <NavbarItem type="home" />
        <NavbarItem type="search" />
        <NavbarItem type="lib" />
      </IconContext.Provider>
    </nav>
  );
};
