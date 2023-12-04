import { AppNavbar } from './navbar/AppNavbar.tsx';
import { MiniPlayer } from '../player/mini-player/MiniPlayer.tsx';

export const AppFooter = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full ">
      <MiniPlayer />
      <AppNavbar />
    </div>
  );
};
