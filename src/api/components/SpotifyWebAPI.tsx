import { ReactNode, useRef } from 'react';
import { Spotify } from '../Spotify.ts';
import { SpotifyAPIContext } from '../context/SpotifyAPIContext.ts';

interface SpotifyWebAPIProps {
  clientId: string;
  redirectUrl: URL;
  scopes: string[];
  children: ReactNode;
}

export const SpotifyWebAPI = ({ clientId, redirectUrl, scopes, children }: SpotifyWebAPIProps) => {
  const spotify = useRef<Spotify>(new Spotify(clientId, redirectUrl, scopes));

  return <SpotifyAPIContext.Provider value={spotify.current}>{children}</SpotifyAPIContext.Provider>;
};
