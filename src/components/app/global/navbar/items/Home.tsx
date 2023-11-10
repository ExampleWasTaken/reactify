import { Home as HomeIcon } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../../../utils/routes.ts';

export const Home = () => {
  const location = useLocation();

  const colorCode = location.pathname.startsWith(routes.home)
    ? '#ffffff'
    : '#cccccc';

  return (
    <Link
      to={routes.home}
      className="flex flex-col justify-center items-center space-y-1 no-underline"
    >
      <HomeIcon
        size={30}
        color={colorCode}
      />
      <p style={{ color: colorCode }}>Home</p>
    </Link>
  );
};
