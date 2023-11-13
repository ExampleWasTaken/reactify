import { Link, useLocation } from 'react-router-dom';
import { Database as DatabaseIcon } from 'react-feather';
import { routes } from '../../../../../utils/routes.ts';

export const Library = () => {
  const location = useLocation();

  const colorCode = location.pathname.startsWith(routes.library)
    ? '#ffffff'
    : '#cccccc';

  return (
    <Link
      to={routes.library}
      className="flex flex-col justify-center items-center no-underline"
    >
      <DatabaseIcon
        size={27}
        color={colorCode}
      />
      <p style={{ color: colorCode }}>Library</p>
    </Link>
  );
};
