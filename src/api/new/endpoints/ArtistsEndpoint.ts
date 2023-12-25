import { Spotify } from '../Spotify.ts';
import { Artist, Market, MaxInt, Page, SimplifiedAlbum, TopTracksResult } from '@spotify/web-api-ts-sdk';
import { ArtistAlbumsIncludeGroup } from '../../types/InternalTypes.ts';
import { SearchParams } from '../../Spotify.ts';

export class ArtistsEndpoint {
  private readonly spotify: Spotify;

  constructor(spotify: Spotify) {
    this.spotify = spotify;
  }

  /**
   * Get Spotify catalog information for a single artist identified by their unique Spotify ID.
   * @param id The Spotify ID of the artist.
   */
  public async getArtist(id: string): Promise<Artist> {
    const url = await this.spotify.buildUrl(`/artists/${id}`);

    return await this.spotify.getRequestManager().getRequest<Artist>(url);
  }

  /**
   * Get Spotify catalog information for several artists based on their Spotify IDs.
   * @param ids An array containing the Spotify IDs for the artists. Maximum: 50 IDs.
   */
  public async getArtists(ids: string[]): Promise<Artist[]> {
    const url = await this.spotify.buildUrl(`/artists/${ids}`);

    return await this.spotify.getRequestManager().getRequest<Artist[]>(url);
  }

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
  public async getAlbumsByArtist(
    id: string,
    include_groups?: ArtistAlbumsIncludeGroup[],
    market?: Market,
    limit?: MaxInt<50>,
    offset?: number
  ): Promise<Page<SimplifiedAlbum>> {
    const url = await this.spotify.buildUrl(
      `/artists/${id}/albums`,
      new SearchParams({
        include_groups: include_groups?.join(','),
        market,
        limit,
        offset,
      })
    );

    return await this.spotify.getRequestManager().getRequest<Page<SimplifiedAlbum>>(url);
  }

  /**
   * Get Spotify catalog information about an artist's top tracks by country.
   * @param id The Spotify ID of the artist.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  public async getTopTracks(id: string, market?: Market): Promise<Page<TopTracksResult>> {
    const url = await this.spotify.buildUrl(`/artists/${id}/top-tracks`, new SearchParams({ market }));

    return await this.spotify.getRequestManager().getRequest<Page<TopTracksResult>>(url);
  }

  /**
   * Get Spotify catalog information about artists similar to a given artist. Similarity is based on analysis of the Spotify community's listening history.
   * @param id The Spotify ID of the artist.
   */
  public async getRelatedArtists(id: string): Promise<Page<Artist>> {
    const url = await this.spotify.buildUrl(`/artists/${id}/related-artists`);

    return await this.spotify.getRequestManager().getRequest<Page<Artist>>(url);
  }
}
