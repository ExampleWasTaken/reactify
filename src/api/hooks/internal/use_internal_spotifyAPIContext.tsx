import { useContext } from 'react';
import { SpotifyAPIContext } from '../../context/SpotifyAPIContext.ts';

export const use_internal_spotifyAPIContext = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const ctx = useContext(SpotifyAPIContext);

  if (!ctx) {
    throw Error('It seems like you are trying to use a Spotify Web API hook outside of a <SpotifyWebAPI /> component');
  }

  return ctx;
};
