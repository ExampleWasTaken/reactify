import { Spotify } from '../Spotify.ts';
import { Album, CountryCodeA2, Market, MaxInt, NewReleases, Page, SavedAlbum, Track } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../../Spotify.ts';

export class Albums {
  private readonly spotify: Spotify;

  constructor(spotify: Spotify) {
    this.spotify = spotify;
  }

  public async getAlbum(id: string, market?: Market): Promise<Album> {
    const url = await this.spotify.buildUrl(`/albums/${id}`, new SearchParams({ market: market }));

    return await this.spotify.getRequestManager().getRequest<Album>(url);
  }

  public async getAlbums(ids: string[], market?: Market): Promise<Album[]> {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await this.spotify.buildUrl('/albums', new SearchParams({ ids: ids.join(','), market: market }));

    return await this.spotify.getRequestManager().getRequest<Album[]>(url);
  }

  public async getAlbumTracks(id: string, market?: Market, limit?: MaxInt<50>, offset?: string): Promise<Page<Track>> {
    const url = await this.spotify.buildUrl(`/albums/${id}/tracks`, new SearchParams({ market, limit, offset }));

    return await this.spotify.getRequestManager().getRequest<Page<Track>>(url);
  }

  public async getUsersSavedAlbums(limit?: MaxInt<50>, offset?: string, market?: Market): Promise<Page<SavedAlbum>> {
    const url = await this.spotify.buildUrl('/me/albums', new SearchParams({ limit, offset, market }));

    return await this.spotify.getRequestManager().getRequest<Page<SavedAlbum>>(url);
  }

  public async saveAlbumsForCurrentUser(ids: string[]): Promise<void> {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await this.spotify.buildUrl('/me/albums', new SearchParams({ ids: ids.join(',') }));

    return await this.spotify.getRequestManager().putRequest<void>(url, JSON.stringify(ids));
  }

  public async deleteAlbumsForCurrentUser(ids: string[]): Promise<void> {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await this.spotify.buildUrl('/me/albums', new SearchParams({ ids: ids.join(',') }));

    return await this.spotify.getRequestManager().deleteRequest<void>(url, JSON.stringify(ids));
  }

  public async checkUsersSavedAlbums(ids: string[]): Promise<boolean[]> {
    if (ids.length > 20) {
      throw new Error('Max album count per request (20) exceeded.');
    }

    const url = await this.spotify.buildUrl('/me/albums/contains', new SearchParams({ ids: ids.join(',') }));

    return await this.spotify.getRequestManager().getRequest<boolean[]>(url);
  }

  public async getNewReleases(country?: CountryCodeA2, limit?: MaxInt<50>, offset?: string): Promise<NewReleases> {
    const url = await this.spotify.buildUrl('/browse/new-releases', new SearchParams({ country, limit, offset }));

    return await this.spotify.getRequestManager().getRequest<NewReleases>(url);
  }
}
