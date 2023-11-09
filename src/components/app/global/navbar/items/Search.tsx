import { Link, useLocation } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { routes } from '../../../../../utils/routes.ts';

export const Search = () => {
  const location = useLocation();

  const colorCode = location.pathname.startsWith(routes.app.search)
    ? '#ffffff'
    : '#cccccc';

  return (
    <Link
      to={routes.app.search}
      className="flex flex-col items-center"
    >
      <SearchIcon
        size={43}
        color={colorCode}
      />
      <p style={{ color: colorCode }}>Search</p>
    </Link>
  );
};
