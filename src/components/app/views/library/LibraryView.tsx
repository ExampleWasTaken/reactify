import { publicAssets } from '../../../../utils/publicAssets.ts';
import { Plus, Search } from 'react-feather';
import { LibraryList } from './LibraryList.tsx';

export const LibraryView = () => {
  return (
    <>
      <header className="sticky top-0 bg-black drop-shadow-lg px-5 py-10 flex justify-between items-center">
        <div className="flex justify-between items-center space-x-3">
          {/* Remove and change for user icon once mockup is in place */}
          <img
            className="h-10"
            src={publicAssets.spotifyIconGreen}
            alt="User profile picture"
          />
          <h1 className="text-3xl">Your Library</h1>
        </div>
        <div className="flex justify-between items-center space-x-4">
          <Search size={30} />
          <Plus size={30} />
        </div>
      </header>
      <main>
        <LibraryList />
      </main>
    </>
  );
};
