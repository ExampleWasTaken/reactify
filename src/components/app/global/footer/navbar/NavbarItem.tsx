import { NavLink } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';
import { LuLibrary, LuSearch } from 'react-icons/lu';
import { routes } from '../../../../../utils/routes.ts';

interface NavbarItemProps {
  type: 'home' | 'search' | 'lib';
}

export const NavbarItem = ({ type }: NavbarItemProps) => {
  const activeHandler = (isActive: boolean) => {
    const className =
      'w-1/3 flex flex-col justify-center items-center no-underline active:scale-active active:text-subdued/75 ';
    return isActive ? className + 'text-white' : className + 'text-subdued';
  };

  return (
    <NavLink
      to={
        type === 'home'
          ? routes.app.home
          : type === 'search'
          ? routes.app.search
          : type === 'lib'
          ? routes.app.library
          : '404'
      }
      className={({ isActive }) => activeHandler(isActive)}
    >
      {type === 'home' ? <GrHomeRounded /> : type === 'search' ? <LuSearch /> : type === 'lib' ? <LuLibrary /> : null}
      <p className="mt-1 text-[0.60rem] leading-tight text-center">
        {type === 'home' ? 'Home' : type === 'search' ? 'Search' : type === 'lib' ? 'Your Library' : null}
      </p>
    </NavLink>
  );
};
