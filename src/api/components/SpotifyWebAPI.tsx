import { ReactNode } from 'react';
import { Spotify } from '../Spotify.ts';
import { SpotifyAPIContext } from '../context/SpotifyAPIContext.ts';

interface SpotifyWebAPIProps {
  clientId: string;
  redirectUrl: URL;
  scopes: string[];
  children: ReactNode;
}

export const SpotifyWebAPI = ({ clientId, redirectUrl, scopes, children }: SpotifyWebAPIProps) => {
  return (
    <SpotifyAPIContext.Provider value={new Spotify(clientId, redirectUrl, scopes)}>
      {children}
    </SpotifyAPIContext.Provider>
  );
};
