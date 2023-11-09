import { Home } from './items/Home.tsx';
import { Search } from './items/Search.tsx';
import { Library } from './items/Library.tsx';

export const AppNavbar = () => {
  return (
    <nav className="fixed bottom-0 left-0 w-full p-4 bg-black flex flex-row justify-around">
      <Home />
      <Search />
      <Library />
    </nav>
  );
};
