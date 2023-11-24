import { Search } from './items/Search.tsx';
import { Library } from './items/Library.tsx';
import { Home } from './items/Home.tsx';

export const AppNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full py-4 px-8 bg-gradient-to-t from-[#000] flex flex-row justify-around">
      <Home />
      <Search />
      <Library />
    </nav>
  );
};
