import { Link, useLocation } from 'react-router-dom';
import { Database as DatabaseIcon } from 'react-feather';

export const Library = () => {
  const location = useLocation();

  const colorCode = location.pathname.startsWith('/app/library')
    ? '#ffffff'
    : '#cccccc';

  return (
    <Link
      to="/app/library"
      className="flex flex-col items-center"
    >
      <DatabaseIcon
        size={43}
        color={colorCode}
      />
      <p style={{ color: colorCode }}>Library</p>
    </Link>
  );
};
