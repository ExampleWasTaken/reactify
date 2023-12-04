import { Market, PlaybackState } from '@spotify/web-api-ts-sdk';
import { Spotify } from '../api/Spotify.ts';

/**
 * Extends {@link PlaybackState } but also provides info on whether the item of the playback state is saved in the users library.
 */
export interface CustomPlaybackState extends PlaybackState {
  /**
   * Whether the item of the playback state is saved in the user's library.
   */
  saved: boolean;
}

/**
 * Returns an object with a function for fetching playback state.
 */
export const usePlaybackState = () => {
  const fetchPlaybackState = async (
    market?: Market | undefined,
    additional_types?: string | undefined
  ): Promise<CustomPlaybackState | null> => {
    const sdk = Spotify.getInstance().sdk;

    try {
      const state = await sdk.player.getPlaybackState(market, additional_types);
      const saved = await sdk.currentUser.tracks.hasSavedTracks([state.item.id]);
      return { ...state, saved: saved[0] };
    } catch (e) {
      console.error('Error while fetching playback state:', e);
      return null;
    }
  };

  return { fetchPlaybackState };
};
