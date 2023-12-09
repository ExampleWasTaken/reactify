import { _Spotify } from '../api/_Spotify.ts';

export const useSpotify = () => {
  return _Spotify.getInstance();
};
