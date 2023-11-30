import { Spotify } from '../api/Spotify.ts';

export const useSpotify = () => {
  return Spotify.getInstance();
};
