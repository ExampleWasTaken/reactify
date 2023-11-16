import { Link } from 'react-router-dom';
import { routes } from '../../../utils/routes.ts';

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 px-8 w-full h-20 flex justify-between items-center bg-green text-white border-b border-white/50">
      <h1 className="font-bold text-3xl">
        <Link
          to={routes.web.root}
          className="font-bold text-3xl text-white no-underline"
        >
          Reactify&trade;
        </Link>
      </h1>
    </header>
  );
};
