import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { Artist, Market, MaxInt, Page, SimplifiedAlbum, TopTracksResult } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../Spotify.ts';
import { ArtistAlbumsIncludeGroup } from '../types/InternalTypes.ts';

export const useArtists = () => {
  const api = use_internal_spotifyAPIContext();
  const { getRequest } = use_internal_fetch();

  /**
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   * @param id The Spotify ID of the artist.
   */
  const getArtist = async (id: string) => {
    const url = await api.buildUrl(`/artists/${id}`);

    return await getRequest<Artist>(url);
  };

  /**
   * Get Spotify catalog information for several artists based on their Spotify IDs.
   * @param ids An array containing the Spotify IDs for the artists. Maximum: 50 IDs.
   */
  const getArtists = async (ids: string[]) => {
    const url = await api.buildUrl('/artists', new SearchParams({ ids: ids.join(',') }));

    return getRequest<Artist[]>(url);
  };

  /**
   * Get Spotify catalog information about an artist's albums.
   * @param id The Spotify ID of the artist.
   * @param include_groups An array containing keywords that will be used to filter the response. If not supplied, all album types will be returned.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   */
  const getAlbumsByArtist = async (
    id: string,
    include_groups?: ArtistAlbumsIncludeGroup[],
    market?: Market,
    limit?: MaxInt<50>,
    offset?: number
  ) => {
    const url = await api.buildUrl(
      `/artists/${id}/albums`,
      new SearchParams({
        include_groups: include_groups?.join(','),
        market,
        limit,
        offset,
      })
    );

    return await getRequest<Page<SimplifiedAlbum>>(url);
  };

  /**
   * Get Spotify catalog information about an artist's top tracks by country.
   * @param id The Spotify ID of the artist.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  const getTopTracks = async (id: string, market: Market) => {
    const url = await api.buildUrl(`/artists/${id}/top-tracks`, new SearchParams({ market }));

    return await getRequest<TopTracksResult>(url);
  };

  /**
   * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.
   * @param id The Spotify ID of the artist.
   */
  const getRelatedArtists = async (id: string) => {
    const url = await api.buildUrl(`/artists/${id}/related-artists`);

    return getRequest<Page<Artist>>(url);
  };

  return {
    getArtist,
    getArtists,
    getAlbumsByArtist,
    getTopTracks,
    getRelatedArtists,
  };
};
