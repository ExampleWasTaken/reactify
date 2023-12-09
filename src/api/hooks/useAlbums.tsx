import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { Album, CountryCodeA2, Market, NewReleases, Page, SavedAlbum, Track } from '@spotify/web-api-ts-sdk';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { SearchParams } from '../Spotify.ts';

// TODO: change limits to type MaxInt<number>

export const useAlbums = () => {
  const { buildUrl } = use_internal_spotifyAPIContext();
  const { deleteRequest, getRequest, putRequest } = use_internal_fetch();

  /**
   * Get Spotify catalog information for a single album.
   * @param id The Spotify ID of the album.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  const getAlbum = async (id: string, market?: Market): Promise<Album> => {
    const url = await buildUrl(`/albums/${id}`, new SearchParams({ market: market }));

    return await getRequest<Album>(url);
  };

  /**
   * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
   * @param ids An array containing the Spotify IDs for the albums. Maximum: 20 IDs.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  const getAlbums = async (ids: string[], market?: Market): Promise<Album[]> => {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await buildUrl('/albums', new SearchParams({ ids: ids.join(','), market: market }));

    return await getRequest<Album[]>(url);
  };

  /**
   * Get Spotify catalog information about an album’s tracks. Optional parameters can be used to limit the number of tracks returned.
   * @param id The Spotify ID of the album.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   */
  const getAlbumTracks = async (id: string, market?: Market, limit?: string, offset?: string) => {
    const url = await buildUrl(`/albums/${id}/tracks`, new SearchParams({ market, limit, offset }));

    return await getRequest<Page<Track>>(url);
  };

  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  const getUsersSavedAlbums = async (limit?: string, offset?: string, market?: Market) => {
    const url = await buildUrl('/me/albums', new SearchParams({ limit, offset, market }));

    return await getRequest<Page<SavedAlbum>>(url);
  };

  /**
   * Save one or more albums to the current user's 'Your Music' library.
   * @param ids An array containing the Spotify IDs for the albums. Maximum: 20 IDs.
   */
  const saveAlbumsForCurrentUser = async (ids: string[]) => {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await buildUrl('/me/albums', new SearchParams({ ids: ids.join(',') }));

    await putRequest<void, string>(url, JSON.stringify(ids));
  };

  /**
   * Remove one or more albums from the current user's 'Your Music' library.
   * @param ids An array containing the Spotify IDs for the albums. Maximum: 20 IDs.
   */
  const deleteAlbumsForCurrentUser = async (ids: string[]) => {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await buildUrl('/me/albums', new SearchParams({ ids: ids.join(',') }));

    await deleteRequest<void, string>(url, JSON.stringify(ids));
  };

  /**
   * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
   * @param ids An array containing the Spotify IDs for the albums. Maximum: 20 IDs.
   */
  const checkUsersSavedAlbums = async (ids: string[]) => {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await buildUrl('/me/albums', new SearchParams({ ids: ids.join(',') }));

    return await getRequest<boolean[]>(url);
  };

  /**
   * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   * @param country A country: an ISO 3166-1 alpha-2 country code. Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   */
  const getNewReleases = async (country?: CountryCodeA2, limit?: string, offset?: string) => {
    const url = await buildUrl('/browse/new-releases', new SearchParams({ country, limit, offset }));

    return await getRequest<NewReleases>(url);
  };

  return {
    getAlbum,
    getAlbums,
    getAlbumTracks,
    getUsersSavedAlbums,
    saveAlbumsForCurrentUser,
    deleteAlbumsForCurrentUser,
    checkUsersSavedAlbums,
    getNewReleases,
  };
};
