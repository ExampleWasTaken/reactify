import { Market, PlaybackState } from '@spotify/web-api-ts-sdk';
import { _Spotify } from '../api/_Spotify.ts';
import { toast } from 'react-hot-toast';

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
 * Returns an object with a functions for fetching and controlling playback state.
 */
export const usePlaybackState = () => {
  const fetchPlaybackState = async (
    market?: Market | undefined,
    additional_types?: string | undefined
  ): Promise<CustomPlaybackState | null> => {
    const sdk = _Spotify.getInstance().sdk;

    try {
      const state = await sdk.player.getPlaybackState(market, additional_types);
      if (!state) {
        return null;
      }
      const saved = await sdk.currentUser.tracks.hasSavedTracks([state.item.id]);

      return { ...state, saved: saved[0] };
    } catch (e) {
      console.error('Error while fetching playback state:', e);
      return null;
    }
  };

  const startOrResumePlayback = async (
    device_id: string,
    context_uri?: string,
    uris?: string[],
    offset?: object,
    positionMs?: number
  ) => {
    const sdk = _Spotify.getInstance().sdk;

    // FIXME: does not respect caching -> always tries to start playback regardless of user subscription

    try {
      await sdk.player.startResumePlayback(device_id, context_uri, uris, offset, positionMs);
    } catch (e) {
      toast.error(`Something went wrong: ${e}`);
    }
  };

  const pausePlayback = async (device_id: string) => {
    const sdk = _Spotify.getInstance().sdk;

    // FIXME: does not respect caching -> always tries to pause playback regardless of user subscription

    try {
      await sdk.player.pausePlayback(device_id);
    } catch (e) {
      toast.error(`Something went wrong: ${e}`);
    }
  };

  return {
    fetchPlaybackState,
    startOrResumePlayback,
    pausePlayback,
  };
};
