import { Link, useLocation } from 'react-router-dom';
import { Search as SearchIcon } from 'react-feather';

export const Search = () => {
  const location = useLocation();

  const colorCode = location.pathname.startsWith('/app/search')
    ? '#ffffff'
    : '#cccccc';

  return (
    <Link
      to="/app/search"
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
