import { NavLink } from 'react-router-dom';
import { GrHomeRounded } from 'react-icons/gr';
import { CgSearch } from 'react-icons/cg';
import { LuLibrary } from 'react-icons/lu';
import { routes } from '../../../../utils/routes.ts';

interface NavbarItemProps {
  type: 'home' | 'search' | 'lib';
}

export const NavbarItem = ({ type }: NavbarItemProps) => {
  const activeHandler = (isActive: boolean) => {
    let className = 'px-5 w-1/3 flex flex-col justify-center items-center no-underline ';
    return isActive ? (className += 'text-white') : (className += 'text-subdued');
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
      {type === 'home' ? <GrHomeRounded /> : type === 'search' ? <CgSearch /> : type === 'lib' ? <LuLibrary /> : null}
      <p className="text-xs">
        {type === 'home' ? 'Home' : type === 'search' ? 'Search' : type === 'lib' ? 'Your Library' : null}
      </p>
    </NavLink>
  );
};
