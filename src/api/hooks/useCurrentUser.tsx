import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { Artist, FollowedArtists, MaxInt, Page, Track, UserProfile } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../Spotify.ts';
import { useAlbums } from './useAlbums.tsx';
import { usePlayer } from './usePlayer.tsx';
import { usePlaylists } from './usePlaylists.tsx';
import { useTracks } from './useTracks.tsx';

export const useCurrentUser = () => {
  const spotify = use_internal_spotifyAPIContext();
  const { deleteRequest, getRequest, putRequest } = use_internal_fetch();

  const { getCurrentUsersPlaylists } = usePlaylists();
  const player = usePlayer();
  const { getSavedTracks, saveTracks, removeSavedTracks, isSaved } = useTracks();
  const { getUsersSavedAlbums, saveAlbumsForCurrentUser, removeAlbumsForCurrentUser, checkUsersSavedAlbums } =
    useAlbums();

  /**
   * Get detailed profile information about the current user (including the current user's username).
   */
  const getProfile = async () => {
    const url = await spotify.buildUrl('/me');

    return await getRequest<UserProfile>(url);
  };

  /**
   * Get the current user's top artists or tracks based on calculated affinity.
   * @param type The type of entity to return. Valid values: artists or tracks
   * @param time_range Over what time frame the affinities are computed. Valid values: long_term (calculated from several
   * years of data and including all new data as it becomes available), medium_term (approximately last 6 months),
   * short_term (approximately last 4 weeks). Default: medium_term
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   */
  const getTopItems = async <T extends 'artists' | 'tracks'>(
    type: T,
    time_range?: string,
    limit?: MaxInt<50>,
    offset?: number
  ) => {
    const url = await spotify.buildUrl(`/me/top/${type}`, new SearchParams({ time_range, limit, offset }));

    return await getRequest<Page<T extends 'artists' ? Artist : Track>>(url);
  };

  /**
   * Add the current user as a follower of a playlist.
   * @param playlist_id The Spotify ID of the playlist.
   * @param _public Defaults to true. If true the playlist will be included in user's public playlists, if false it will remain private.
   */
  const followPlaylist = async (playlist_id: string, _public?: boolean) => {
    const url = await spotify.buildUrl(`/playlists/${playlist_id}/followers`);

    return await putRequest<void, string>(url, JSON.stringify({ public: _public }));
  };

  /**
   * Remove the current user as a follower of a playlist.
   * @param playlist_id The Spotify ID of the playlist.
   */
  const unfollowPlaylist = async (playlist_id: string) => {
    const url = await spotify.buildUrl(`/playlists/${playlist_id}/followers`);

    return await deleteRequest<void, void>(url, undefined);
  };

  // TODO: rename to match API reference
  /**
   * Get the current user's followed artists.
   * @param type The ID type: currently only artist is supported.
   * @param after The last artist ID retrieved from the previous request.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   */
  const getFollowing = async (type = 'artist', after?: string, limit?: MaxInt<50>) => {
    const url = await spotify.buildUrl('/me/following', new SearchParams({ type, after, limit }));

    return await getRequest<FollowedArtists>(url);
  };

  /**
   * Add the current user as a follower of one or more artists or other Spotify users.
   * @param type The ID type.
   * @param ids A comma-separated list of the artist or the user Spotify IDs. A maximum of 50 IDs can be sent in one request.
   */
  const followPerson = async (type: 'artist' | 'user', ids: string[]) => {
    if (ids.length > 50) {
      throw new Error(`Maximum allowed users/artists per request exceeded. Got ${ids.length}; Allowed: 50`);
    }

    const url = await spotify.buildUrl('/me/following', new SearchParams({ type }));

    return await putRequest<void, string>(url, JSON.stringify(ids));
  };

  /**
   * Remove the current user as a follower of one or more artists or other Spotify users.
   * @param type The ID type: either artist or user.
   * @param ids An array of the artist or the user Spotify IDs. A maximum of 50 IDs can be sent in one request.
   */
  const unfollowPerson = async (type: 'artist' | 'user', ids: string[]) => {
    if (ids.length > 50) {
      throw new Error(`Maximum allowed users/artists per request exceeded. Got ${ids.length}; Allowed: 50`);
    }

    const url = await spotify.buildUrl('/me/following', new SearchParams({ type }));

    return await deleteRequest<void, string>(url, JSON.stringify(ids));
  };

  /**
   * Check to see if the current user is following one or more artists or other Spotify users.
   * @param type The ID type: either artist or user.
   * @param ids An array of the artist or the user Spotify IDs to check. A maximum of 50 IDs can be sent in one request.
   */
  const isFollowingPerson = async (type: 'artist' | 'user' | 'playlist', ids: string[]) => {
    if (ids.length > 50) {
      throw new Error(`Maximum allowed users/artist per request exceeded. Got ${ids.length}; Allowed: 50`);
    }

    const url = await spotify.buildUrl('/me/following/contains', new SearchParams({ type, ids: ids.join(',') }));

    return await getRequest<boolean[]>(url);
  };

  return {
    getProfile,
    getTopItems,
    followPlaylist,
    unfollowPlaylist,
    getFollowing,
    followPerson,
    unfollowPerson,
    isFollowingPerson,
    getSavedTracks,
    saveTracks,
    removeSavedTracks,
    checkTrackSaved: isSaved,
    getPlaylists: getCurrentUsersPlaylists,
    getSavedAlbums: getUsersSavedAlbums,
    saveAlbums: saveAlbumsForCurrentUser,
    removeSavedAlbums: removeAlbumsForCurrentUser,
    checkAlbumsSaved: checkUsersSavedAlbums,
    ...player,
  };
};
