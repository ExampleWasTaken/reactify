import { IconContext } from 'react-icons';
import { NavLink } from 'react-router-dom';
import { routes } from '../../../../utils/routes.ts';
import { LuLibrary } from 'react-icons/lu';
import { CgSearch } from 'react-icons/cg';
import { GrHomeRounded } from 'react-icons/gr';

export const AppNavbar = () => {
  const activeHandler = (isActive: boolean) => {
    let className = 'flex flex-col justify-center items-center no-underline ';
    return isActive ? (className += 'text-white') : (className += 'text-subdued');
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full py-4 px-8 backdrop-blur-xl backdrop-brightness-50 flex flex-row justify-around">
      <IconContext.Provider value={{ size: '28' }}>
        <NavLink
          to={routes.app.home}
          className={({ isActive }) => activeHandler(isActive)}
        >
          <GrHomeRounded />
          <p className="text-xs">Home</p>
        </NavLink>
        <NavLink
          to={routes.app.search}
          className={({ isActive }) => activeHandler(isActive)}
        >
          <CgSearch />
          <p className="text-xs">Search</p>
        </NavLink>
        <NavLink
          to={routes.app.library}
          className={({ isActive }) => activeHandler(isActive)}
        >
          <LuLibrary />
          <p className="text-xs">Library</p>
        </NavLink>
      </IconContext.Provider>
    </nav>
  );
};
