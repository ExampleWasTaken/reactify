import { Home as HomeIcon } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';
import { routes } from '../../../../../utils/routes.ts';

export const Home = () => {
  const location = useLocation();

  const colorCode = location.pathname.startsWith(routes.app.home)
    ? '#ffffff'
    : '#cccccc';

  return (
    <Link
      to={routes.app.home}
      className="flex flex-col items-center"
    >
      <HomeIcon
        size={43}
        color={colorCode}
      />
      <p style={{ color: colorCode }}>Home</p>
    </Link>
  );
};
