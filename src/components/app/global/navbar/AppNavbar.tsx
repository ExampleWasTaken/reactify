import { Search } from './items/Search.tsx';
import { Library } from './items/Library.tsx';
import { Home } from './items/Home.tsx';

export const AppNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full py-4 px-8 bg-black/90 flex flex-row justify-around">
      <Home />
      <Search />
      <Library />
    </nav>
  );
};
