import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { ItemTypes, Market, MaxInt, SearchResults } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../Spotify.ts';

export const useSearch = <T extends ItemTypes[]>() => {
  const { buildUrl } = use_internal_spotifyAPIContext();
  const { getRequest } = use_internal_fetch();

  /**
   * Get Spotify catalog information about albums, artists, playlists, tracks, shows, episodes or audiobooks that match
   * a keyword string. Audiobooks are only available within the US, UK, Canada, Ireland, New Zealand and Australia markets.
   * @param query Your search query.
   *
   * You can narrow down your search using field filters. The available filters are album, artist, track, year, upc, tag:hipster, tag:new, isrc, and genre.<br>
   * Each field filter only applies to certain result types.<br>
   * <br>
   * The artist and year filters can be used while searching albums, artists and tracks. You can filter on a single year or a range (e.g. 1955-1960). <br>
   * The album filter can be used while searching albums and tracks. <br>
   * The genre filter can be used while searching artists and tracks. <br>
   * The isrc and track filters can be used while searching tracks. <br>
   * The upc, tag:new and tag:hipster filters can only be used while searching albums. The tag:new filter will return albums <br>
   * released in the past two weeks and tag:hipster can be used to return only albums with the lowest 10% popularity.
   * <br>
   * Example: q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis
   * @param type An array of item types to search across. Search results include hits from all the specified item types.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   * @param limit The maximum number of results to return in each item type.
   * @param offset The index of the first result to return. Use with limit to get the next page of search results.
   * @param include_external If include_external=audio is specified it signals that the client can play externally hosted
   * audio content, and marks the content as playable in the response. By default externally hosted audio content is marked as unplayable in the response.
   */
  const search = async (
    query: string,
    type: Array<'album' | 'artist' | 'playlist' | 'track' | 'show' | 'episode' | 'audiobook'>,
    market?: Market,
    limit?: MaxInt<50>,
    offset?: number,
    include_external?: 'audio'
  ) => {
    const url = await buildUrl(
      '/search',
      new SearchParams({
        query,
        type: type.join(','),
        market,
        limit,
        offset,
        include_external,
      })
    );

    return await getRequest<SearchResults<T>>(url);
  };

  return { search };
};
