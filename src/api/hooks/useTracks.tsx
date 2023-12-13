import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { AudioAnalysis, AudioFeatures, Market, MaxInt, Page, SavedTrack, Track } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../Spotify.ts';
import { RecommendationsRequest, RecommendationsResponse, SearchParamsObject } from '../types/InternalTypes.ts';

export const useTracks = () => {
  const { buildUrl } = use_internal_spotifyAPIContext();
  const { deleteRequest, getRequest, putRequest } = use_internal_fetch();

  /**
   * Get Spotify catalog information for a single track identified by its unique Spotify ID.
   * @param id The Spotify ID for the track.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  const getTrack = async (id: string, market?: Market) => {
    const url = await buildUrl(`tracks/${id}`, new SearchParams({ market }));

    return await getRequest<Track>(url);
  };

  /**
   * Get Spotify catalog information for multiple tracks based on their Spotify IDs.
   * @param ids An array of the Spotify IDs. Maximum: 50 IDs.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   */
  const getTracks = async (ids: string[], market?: Market) => {
    const url = await buildUrl('tracks', new SearchParams({ market, ids: ids.join(',') }));

    return await getRequest<Track[]>(url);
  };

  /**
   * Get a list of the songs saved in the current Spotify user's 'Your Music' library.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   */
  const getSavedTracks = async (market?: Market, limit?: MaxInt<50>, offset?: number) => {
    const url = await buildUrl('/me/tracks', new SearchParams({ market, limit, offset }));

    return await getRequest<Page<SavedTrack>>(url);
  };

  /**
   * Save one or more tracks to the current user's 'Your Music' library.
   * @param ids A JSON array of the Spotify IDs. For example: ["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]
   * A maximum of 50 items can be specified in one request.
   */
  const saveTracks = async (ids: string[]) => {
    if (ids.length > 50) {
      throw new Error(`Maximum number of tracks per request exceeded. Got: ${ids.length}; Allowed: 50`);
    }

    const url = await buildUrl('/me/tracks');

    return await putRequest<void, string>(url, JSON.stringify({ ids }));
  };

  /**
   * Remove one or more tracks to the current user's 'Your Music' library.
   * @param ids A JSON array of the Spotify IDs. For example: ["4iV5W9uYEdYUVa79Axb7Rh", "1301WleyT98MSxVHPZCA6M"]
   * A maximum of 50 items can be specified in one request.
   */
  const removeTracks = async (ids: string[]) => {
    if (ids.length > 50) {
      throw new Error(`Maximum number of tracks per request exceeded. Got: ${ids.length}; Allowed: 50`);
    }

    const url = await buildUrl('/me/tracks');

    return await deleteRequest<void, string>(url, JSON.stringify({ ids }));
  };

  /**
   * Check if one or more tracks is already saved in the current Spotify user's 'Your Music' library.
   * @param ids An array of the Spotify IDs. Maximum: 50 IDs.
   */
  const isSaved = async (ids: string[]) => {
    if (ids.length > 50) {
      throw new Error(`Maximum tracks per request exceeded. Got: ${ids.length}; Allowed: 50`);
    }

    const url = await buildUrl('/me/tracks/contains', new SearchParams({ ids: ids.join(',') }));

    return await getRequest<boolean[]>(url);
  };

  /**
   * Get audio features for multiple tracks based on their Spotify IDs.
   * @param ids An array of the Spotify IDs for the tracks. Maximum: 100 IDs.
   */
  const getTracksAudioFeatures = async (ids: string[]) => {
    if (ids.length > 100) {
      throw new Error(`Maximum tracks per request exceeded. Got ${ids.length}; Allowed: 100`);
    }

    const url = await buildUrl('/audio-features', new SearchParams({ ids: ids.join(',') }));

    return await getRequest<AudioFeatures[]>(url);
  };

  /**
   * Get audio feature information for a single track identified by its unique Spotify ID.
   * @param id The Spotify ID for the track.
   */
  const getTrackAudioFeatures = async (id: string) => {
    const url = await buildUrl(`/audio-features/${id}`);

    return await getRequest<AudioFeatures>(url);
  };

  /**
   * Get a low-level audio analysis for a track in the Spotify catalog. The audio analysis describes the track’s structure
   * and musical content, including rhythm, pitch, and timbre.
   * @param id The Spotify ID for the track.
   */
  const getTrackAudioAnalysis = async (id: string) => {
    const url = await buildUrl(`/audio-analysis/${id}`);

    return await getRequest<AudioAnalysis>(url);
  };

  /**
   * Recommendations are generated based on the available information for a given seed entity and matched against similar
   * artists and tracks. If there is sufficient information about the provided seeds, a list of tracks will be returned
   * together with pool size details.
   *
   * For artists and tracks that are very new or obscure there might not be enough data to generate a list of tracks.
   * @param request see [](/node_modules/@spotify/)
   */
  const getRecommendations = async (request: RecommendationsRequest) => {
    const params: SearchParamsObject = {};

    for (const key in request) {
      if (Array.isArray(request[key])) {
        params[key] = (request[key] as string[]).join(',');
      } else {
        params[key] = request[key] as string | number | undefined;
      }
    }

    const url = await buildUrl('/recommendations', new SearchParams(params));

    return await getRequest<RecommendationsResponse>(url);
  };

  return {
    getTrack,
    getTracks,
    getSavedTracks,
    saveTracks,
    removeTracks,
    isSaved,
    getTracksAudioFeatures,
    getTrackAudioFeatures,
    getTrackAudioAnalysis,
    getRecommendations,
  };
};
