import { Link, useLocation } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';
import { routes } from '../../../../../utils/routes.ts';

export const Search = () => {
  const location = useLocation();

  const colorCode = location.pathname.startsWith(routes.app.search)
    ? '#ffffff'
    : '#a7a7a7';

  return (
    <Link
      to={routes.app.search}
      className="flex flex-col justify-center items-center no-underline"
    >
      <SearchIcon
        size={27}
        color={colorCode}
      />
      <p style={{ color: colorCode }}>Search</p>
    </Link>
  );
};
