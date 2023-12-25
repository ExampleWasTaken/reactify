import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { User } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../Spotify.ts';

export const useUser = () => {
  const spotify = use_internal_spotifyAPIContext();
  const { getRequest } = use_internal_fetch();

  /**
   * Get public profile information about a Spotify user.
   * @param user_id The user's Spotify user ID.
   */
  const getUser = async (user_id: string) => {
    const url = await spotify.buildUrl(`/users/${user_id}`);

    return await getRequest<User>(url);
  };

  const isFollowingPlaylist = async (playlist_id: string, ids: string[]) => {
    const url = await spotify.buildUrl(
      `/playlist/${playlist_id}/followers/contains`,
      new SearchParams({ ids: ids.join(',') })
    );

    return await getRequest<boolean[]>(url);
  };

  return {
    getUser,
    isFollowingPlaylist,
  };
};
