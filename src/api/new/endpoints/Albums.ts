import { Spotify } from '../Spotify.ts';
import { Album, CountryCodeA2, Market, MaxInt, NewReleases, Page, SavedAlbum, Track } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../../Spotify.ts';

export class Albums {
  private readonly spotify: Spotify;

  constructor(spotify: Spotify) {
    this.spotify = spotify;
  }

  /**
   * Get Spotify catalog information for a single album.
   * @param id The Spotify ID of the album.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  public async getAlbum(id: string, market?: Market): Promise<Album> {
    const url = await this.spotify.buildUrl(`/albums/${id}`, new SearchParams({ market: market }));

    return await this.spotify.getRequestManager().getRequest<Album>(url);
  }

  /**
   * Get Spotify catalog information for multiple albums identified by their Spotify IDs.
   * @param ids An array containing the Spotify IDs for the albums. Maximum: 20 IDs.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  public async getAlbums(ids: string[], market?: Market): Promise<Album[]> {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await this.spotify.buildUrl('/albums', new SearchParams({ ids: ids.join(','), market: market }));

    return await this.spotify.getRequestManager().getRequest<Album[]>(url);
  }

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
  public async getAlbumTracks(id: string, market?: Market, limit?: MaxInt<50>, offset?: string): Promise<Page<Track>> {
    const url = await this.spotify.buildUrl(`/albums/${id}/tracks`, new SearchParams({ market, limit, offset }));

    return await this.spotify.getRequestManager().getRequest<Page<Track>>(url);
  }

  /**
   * Get a list of the albums saved in the current Spotify user's 'Your Music' library.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  public async getUsersSavedAlbums(limit?: MaxInt<50>, offset?: string, market?: Market): Promise<Page<SavedAlbum>> {
    const url = await this.spotify.buildUrl('/me/albums', new SearchParams({ limit, offset, market }));

    return await this.spotify.getRequestManager().getRequest<Page<SavedAlbum>>(url);
  }

  /**
   * Save one or more albums to the current user's 'Your Music' library.
   * @param ids An array containing the Spotify IDs for the albums. Maximum: 20 IDs.
   */
  public async saveAlbumsForCurrentUser(ids: string[]): Promise<void> {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await this.spotify.buildUrl('/me/albums', new SearchParams({ ids: ids.join(',') }));

    return await this.spotify.getRequestManager().putRequest<void>(url, JSON.stringify(ids));
  }

  /**
   * Remove one or more albums from the current user's 'Your Music' library.
   * @param ids An array containing the Spotify IDs for the albums. Maximum: 20 IDs.
   */
  public async deleteAlbumsForCurrentUser(ids: string[]): Promise<void> {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await this.spotify.buildUrl('/me/albums', new SearchParams({ ids: ids.join(',') }));

    return await this.spotify.getRequestManager().deleteRequest<void>(url, JSON.stringify(ids));
  }

  /**
   * Check if one or more albums is already saved in the current Spotify user's 'Your Music' library.
   * @param ids An array containing the Spotify IDs for the albums. Maximum: 20 IDs.
   */
  public async checkUsersSavedAlbums(ids: string[]): Promise<boolean[]> {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await this.spotify.buildUrl('/me/albums/contains', new SearchParams({ ids: ids.join(',') }));

    return await this.spotify.getRequestManager().getRequest<boolean[]>(url);
  }

  /**
   * Get a list of new album releases featured in Spotify (shown, for example, on a Spotify player’s “Browse” tab).
   * @param country A country: an ISO 3166-1 alpha-2 country code. Provide this parameter if you want the list of returned items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   */
  public async getNewReleases(country?: CountryCodeA2, limit?: MaxInt<50>, offset?: string): Promise<NewReleases> {
    const url = await this.spotify.buildUrl('/browse/new-releases', new SearchParams({ country, limit, offset }));

    return await this.spotify.getRequestManager().getRequest<NewReleases>(url);
  }
}
