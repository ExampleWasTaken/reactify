import { createContext } from 'react';
import { Spotify } from '../Spotify.ts';

/**
 * **This context is for internal use only!** Use appropriate hooks to access the Spotify API!
 */
export const SpotifyAPIContext = createContext<Spotify | undefined>(undefined);
