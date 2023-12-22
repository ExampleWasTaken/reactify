import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { Devices, Market, MaxInt, PlaybackState, Queue, RecentlyPlayedTracksPage } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../Spotify.ts';

export const usePlayer = () => {
  const spotify = use_internal_spotifyAPIContext();
  const { getRequest, postRequest, putRequest } = use_internal_fetch();

  /**
   * Get information about the user’s current playback state, including track or episode, progress, and active device.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   * @param additional_types A comma-separated list of item types that your client supports besides the default track type.<br>
   * Valid types are: track and episode.<br>
   * ***Note:*** *This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.*<br>
   * In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the type field of each object.
   */
  const getPlaybackState = async (market?: Market, additional_types?: string) => {
    const url = await spotify.buildUrl('/me/player', new SearchParams({ market, additional_types }));

    return await getRequest<PlaybackState>(url);
  };

  /**
   * Transfer playback to a new device and optionally begin playback. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param device_ids A JSON array containing the ID of the device on which playback should be started/transferred.<br>
   * For example: {device_ids:["74ASZWbe4lXaubB36ztrGX"]}
   * ***Note:*** *Although an array is accepted, only a single device_id is currently supported. Supplying more than one will return 400 Bad Request.*
   * @param play **true**: ensure playback happens on new device.<br>
   * **false** or not provided: keep the current playback state.
   */
  const transferPlayback = async (device_ids: string[], play?: boolean) => {
    const url = await spotify.buildUrl('/me/player');

    return await putRequest<void, string>(url, JSON.stringify({ device_ids: device_ids, play }));
  };

  /**
   * Get information about a user’s available Spotify Connect devices. Some device models are not supported and will not be listed in the API response.
   */
  const getAvailableDevices = async () => {
    const url = await spotify.buildUrl('/me/player/devices');

    return await getRequest<Devices>(url);
  };

  /**
   * Get information about the user’s current playback state, including track or episode, progress, and active device.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   * @param additional_types A comma-separated list of item types that your client supports besides the default track type.<br>
   * Valid types are: track and episode.<br>
   * ***Note:*** *This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.*<br>
   * In addition to providing this parameter, make sure that your client properly handles cases of new types in the future by checking against the type field of each object.
   */
  const getCurrentlyPlayingTrack = async (market?: Market, additional_types?: string) => {
    const url = await spotify.buildUrl('/me/player', new SearchParams({ market, additional_types }));

    return await getRequest<PlaybackState>(url);
  };

  const startResumePlayback = async (
    device_id?: string,
    context_uri?: string,
    uris?: string[],
    offset?: object,
    position_ms?: number
  ) => {
    const url = await spotify.buildUrl('/me/player/play', new SearchParams({ device_id }));

    return await putRequest<void, string>(url, JSON.stringify({ context_uri, uris, offset, position_ms }));
  };

  /**
   * Pause playback on the user's account. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param device_id The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  const pausePlayback = async (device_id?: string) => {
    const url = await spotify.buildUrl('/me/player/pause', new SearchParams({ device_id }));

    return await putRequest<void, void>(url, undefined);
  };

  /**
   * Skips to next track in the user’s queue. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param device_id The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  const skipToNext = async (device_id?: string) => {
    const url = await spotify.buildUrl('/me/player/next', new SearchParams({ device_id }));

    return await postRequest<void, void>(url, undefined);
  };

  /**
   * Skips to previous track in the user’s queue. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param device_id The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  const skipToPrevious = async (device_id?: string) => {
    const url = await spotify.buildUrl('/me/player/previous', new SearchParams({ device_id }));

    return await postRequest<void, void>(url, undefined);
  };

  /**
   * Seeks to the given position in the user’s currently playing track. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param position_ms The position in milliseconds to seek to. Must be a positive number. Passing in a position that<br>
   * is greater than the length of the track will cause the player to start playing the next song.
   * @param device_id The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  const seekToPosition = async (position_ms: number, device_id?: string) => {
    const url = await spotify.buildUrl('me/player/seek', new SearchParams({ position_ms, device_id }));

    return await putRequest<void, void>(url, undefined);
  };

  /**
   * Set the repeat mode for the user's playback. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param state track, context or off.<br>
   * **track** will repeat the current track.<br>
   * **context** will repeat the current context.<br>
   * **off** will turn repeat off.
   * @param device_id The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  const setRepeatMode = async (state: 'track' | 'context' | 'off', device_id?: string) => {
    const url = await spotify.buildUrl('/me/player/repeat', new SearchParams({ state, device_id }));

    return await putRequest<void, void>(url, undefined);
  };

  /**
   * Set the volume for the user’s current playback device. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param volume_percent The volume to set. Must be a value from 0 to 100 inclusive.
   * @param device_id The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  const setVolume = async (volume_percent: MaxInt<100>, device_id?: string) => {
    const url = await spotify.buildUrl('/me/player/volume', new SearchParams({ volume_percent, device_id }));

    return await putRequest<void, void>(url, undefined);
  };

  /**
   * Toggle shuffle on or off for user’s playback. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param state **true**: Shuffle user's playback. <br>
   * **false**: Do not shuffle user's playback.
   * @param device_id The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  const toggleShuffle = async (state: boolean, device_id?: string) => {
    const url = await spotify.buildUrl('/me/player/shuffle', new SearchParams({ state: state.toString(), device_id }));

    return await putRequest<void, void>(url, undefined);
  };

  /**
   * Get tracks from the current user's recently played tracks. ***Note**: Currently doesn't support podcast episodes.*
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param after A Unix timestamp in milliseconds. Returns all items after (but not including) this cursor position.
   * If after is specified, before must not be specified.
   * @param before A Unix timestamp in milliseconds. Returns all items before (but not including) this cursor position.
   * If before is specified, after must not be specified.
   */
  const getRecentlyPlayedTracks = async (limit?: MaxInt<50>, after?: number, before?: number) => {
    const url = await spotify.buildUrl('/me/player/recently-played', new SearchParams({ limit, after, before }));

    return getRequest<RecentlyPlayedTracksPage>(url);
  };

  /**
   * Get the list of objects that make up the user's queue.
   */
  const getQueue = async () => {
    const url = await spotify.buildUrl('/me/player/queue');

    return await getRequest<Queue>(url);
  };

  /**
   * Add an item to the end of the user's current playback queue. This API only works for users who have Spotify Premium.<br>
   * The order of execution is not guaranteed when you use this API with other Player API endpoints.
   * @param uri The uri of the item to add to the queue. Must be a track or an episode uri.
   * @param device_id The id of the device this command is targeting. If not supplied, the user's currently active device is the target.
   */
  const addItemToQueue = async (uri: string, device_id?: string) => {
    const url = await spotify.buildUrl('/me/player/queue', new SearchParams({ uri, device_id }));

    return await postRequest<void, void>(url, undefined);
  };

  return {
    getPlaybackState,
    transferPlayback,
    getAvailableDevices,
    getCurrentlyPlayingTrack,
    startResumePlayback,
    pausePlayback,
    skipToNext,
    skipToPrevious,
    seekToPosition,
    setRepeatMode,
    setVolume,
    toggleShuffle,
    getRecentlyPlayedTracks,
    getQueue,
    addItemToQueue,
  };
};
