import { Home as HomeIcon } from 'react-feather';
import { Link, useLocation } from 'react-router-dom';

export const Home = () => {
  const location = useLocation();

  const colorCode = location.pathname.startsWith('/app/home')
    ? '#ffffff'
    : '#cccccc';

  return (
    <Link
      to="/app/home"
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
