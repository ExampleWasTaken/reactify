import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import {
  CountryCodeA2,
  FeaturedPlaylists,
  Image,
  Market,
  MaxInt,
  Page,
  Playlist,
  PlaylistedTrack,
  SimplifiedPlaylist,
} from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../Spotify.ts';

export const usePlaylists = () => {
  const { buildUrl } = use_internal_spotifyAPIContext();
  const { deleteRequest, getRequest, postRequest, putRequest } = use_internal_fetch();

  /**
   * Get a playlist owned by a Spotify user.
   * @param playlist_id The Spotify ID of the playlist.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   * @param fields Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned.<br>
   * For example, to get just the playlist''s description and URI: fields=description,uri. A dot separator can be used to<br>
   * specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. For example,<br>
   * to get just the added date and user ID of the adder: fields=tracks.items(added_at,added_by.id). Use multiple parentheses<br>
   * to drill down into nested objects, for example: fields=tracks.items(track(name,href,album(name,href))).<br>
   * Fields can be excluded by prefixing them with an exclamation mark, for example: fields=tracks.items(track(name,href,album(!name,href)))
   * <br>
   * Example: <code>fields=items(added_by.id,track(name,href,album(name,href)))</code>
   * @param additional_types A comma-separated list of item types that your client supports besides the default track type.<br>
   * Valid types are: track and episode.<br>
   * Note: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.
   * In addition to providing this parameter, make sure that your client properly handles cases of new types in the future<br>
   * by checking against the type field of each object.
   */
  const getPlaylist = async (playlist_id: string, market?: Market, fields?: string, additional_types?: string) => {
    const url = await buildUrl(`/playlists/${playlist_id}`, new SearchParams({ market, fields, additional_types }));

    return await getRequest<Playlist>(url);
  };

  /**
   * Change a playlist's name and public/private state. (The user must, of course, own the playlist.)
   * @param playlist_id The Spotify ID of the playlist.
   * @param name The new name for the playlist, for example "My New Playlist Title"
   * @param isPublic If true the playlist will be public, if false it will be private.
   * @param collaborative If true, the playlist will become collaborative and other users will be able to modify the playlist in their Spotify client.<br>
   * ***Note**: You can only set collaborative to true on non-public playlists.*
   * @param description Value for playlist description as displayed in Spotify Clients and in the Web API.
   */
  const changePlaylistDetails = async (
    playlist_id: string,
    name?: string,
    isPublic?: boolean,
    collaborative?: boolean,
    description?: string
  ) => {
    const url = await buildUrl(`/playlist/${playlist_id}`);

    return await putRequest<void, string>(url, JSON.stringify({ name, public: isPublic, collaborative, description }));
  };

  /**
   * Get full details of the items of a playlist owned by a Spotify user.
   * @param playlist_id The Spotify ID of the playlist.
   * @param market An ISO 3166-1 alpha-2 country code. If a country code is specified, only content that is available in that market will be returned.<br>
   * If a valid user access token is specified in the request header, the country associated with the user account will take priority over this parameter.<br>
   * ***Note:*** *If neither market nor user country are provided, the content is considered unavailable for the client.
   * Users can view the country that is associated with their account in the account settings.*
   * @param fields Filters for the query: a comma-separated list of the fields to return. If omitted, all fields are returned.<br>
   * For example, to get just the playlist''s description and URI: fields=description,uri. A dot separator can be used to<br>
   * specify non-reoccurring fields, while parentheses can be used to specify reoccurring fields within objects. For example,<br>
   * to get just the added date and user ID of the adder: fields=tracks.items(added_at,added_by.id). Use multiple parentheses<br>
   * to drill down into nested objects, for example: fields=tracks.items(track(name,href,album(name,href))).<br>
   * Fields can be excluded by prefixing them with an exclamation mark, for example: fields=tracks.items(track(name,href,album(!name,href)))
   * <br>
   * Example: <code>fields=items(added_by.id,track(name,href,album(name,href)))</code>
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   * @param additional_types A comma-separated list of item types that your client supports besides the default track type.<br>
   * Valid types are: track and episode.<br>
   * Note: This parameter was introduced to allow existing clients to maintain their current behaviour and might be deprecated in the future.
   * In addition to providing this parameter, make sure that your client properly handles cases of new types in the future<br>
   * by checking against the type field of each object.
   */
  const getItems = async (
    playlist_id: string,
    market?: Market,
    fields?: string,
    limit?: MaxInt<50>,
    offset?: number,
    additional_types?: string
  ) => {
    const url = await buildUrl(
      `/playlists/${playlist_id}/tracks`,
      new SearchParams({
        market,
        fields,
        limit,
        offset,
        additional_types,
      })
    );

    return await getRequest<Page<PlaylistedTrack>>(url);
  };

  /**
   * Either reorder or replace items in a playlist depending on the request's parameters. To reorder items, include range_start, <br>
   * insert_before, range_length and snapshot_id in the request's body. To replace items, include uris as either a query<br>
   * parameter or in the request's body. Replacing items in a playlist will overwrite its existing items. This operation<br>
   * can be used for replacing or clearing items in a playlist.
   * <br>
   * **Note**: Replace and reorder are mutually exclusive operations which share the same endpoint, but have different parameters.<br>
   * These operations can't be applied together in a single request.
   * @param playlist_id The Spotify ID of the playlist.
   * @param uris An array of Spotify URIs to set, can be track or episode URIs.<br>
   * A maximum of 100 items can be set in one request.
   * @param range_start The position of the first item to be reordered.
   * @param insert_before The position where the items should be inserted.
   * To reorder the items to the end of the playlist, simply set insert_before to the position after the last item.<br>
   * Examples:<br>
   * To reorder the first item to the last position in a playlist with 10 items, set range_start to 0, and insert_before to 10.<br>
   * To reorder the last item in a playlist with 10 items to the start of the playlist, set range_start to 9, and insert_before to 0.
   * @param range_length The amount of items to be reordered. Defaults to 1 if not set.<br>
   * The range of items to be reordered begins from the range_start position, and includes the range_length subsequent items.<br>
   * Example:<br>
   * To move the items at index 9-10 to the start of the playlist, range_start is set to 9, and range_length is set to 2.<br>
   * @param snapshot_id The playlist's snapshot ID against which you want to make the changes.
   */
  const updateItems = async (
    playlist_id: string,
    uris?: string[],
    range_start?: number,
    insert_before?: number,
    range_length?: number,
    snapshot_id?: string
  ) => {
    const url = await buildUrl(`/playlists/${playlist_id}/tracks`, new SearchParams({ playlist_id }));

    return await putRequest<void, string>(
      url,
      JSON.stringify({
        uris,
        range_start,
        insert_before,
        range_length,
        snapshot_id,
      })
    );
  };

  /**
   * Add one or more items to a user's playlist.
   * @param playlist_id The Spotify ID of the playlist.
   * @param uris A JSON array of the Spotify URIs to add.
   * @param position The position to insert the items, a zero-based index. For example, to insert the items in the first
   * position: position=0 ; to insert the items in the third position: position=2. If omitted, the items will be appended
   * to the playlist. Items are added in the order they appear in the uris array.
   */
  const addItems = async (playlist_id: string, uris?: string[], position?: number) => {
    const url = await buildUrl(`/playlists/${playlist_id}/tracks`);

    return await postRequest<void, string>(url, JSON.stringify({ uris, position }));
  };

  /**
   * Remove one or more items from a user's playlist.
   * @param playlist_id The Spotify ID of the playlist.
   * @param tracks An array of objects containing Spotify URIs of the tracks or episodes to remove. <br>
   * Maximum: 100
   * @param snapshot_id
   */
  const removeItems = async (playlist_id: number, tracks: Array<{ uri: string }>, snapshot_id?: string) => {
    if (tracks.length > 100) {
      throw new Error(`Maximum number of tracks to delete exceeded. Sent: ${tracks.length}; Allowed: 100`);
    }

    const url = await buildUrl(`playlists/${playlist_id}/tracks`);

    return await deleteRequest<void, string>(url, JSON.stringify({ tracks, snapshot_id }));
  };

  /**
   * Get a list of the playlists owned or followed by the current Spotify user.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset 'The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000.
   * Use with limit to get the next set of playlists.'
   */
  const getCurrentUsersPlaylists = async (limit?: number, offset?: number) => {
    const url = await buildUrl('/me/playlists', new SearchParams({ limit, offset }));

    return await getRequest<Page<SimplifiedPlaylist>>(url);
  };

  /**
   * Get a list of the playlists owned or followed by a Spotify user.
   * @param user_id The user's Spotify user ID.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000.
   * Use with limit to get the next set of playlists.
   */
  const getUsersPlaylists = async (user_id: string, limit?: number, offset?: number) => {
    const url = await buildUrl(`/users/${user_id}/playlists`, new SearchParams({ limit, offset }));

    return await getRequest<Page<Playlist>>(url);
  };

  /**
   * Create a playlist for a Spotify user. (The playlist will be empty until you add tracks.) Each user is generally limited to a maximum of 11000 playlists.
   * @param user_id The user's Spotify user ID.
   * @param name The name for the new playlist, for example "Your Coolest Playlist". This name does not need to be unique;
   * a user may have several playlists with the same name.
   * @param _public Defaults to true. If true the playlist will be public, if false it will be private.
   * To be able to create private playlists, the user must have granted the playlist-modify-private scope
   * @param collaborative Defaults to false. If true the playlist will be collaborative. ***Note:** to create a collaborative
   * playlist you must also set public to false. To create collaborative playlists you must have granted playlist-modify-private
   * and playlist-modify-public scopes.*
   * @param description Value for playlist description as displayed in Spotify Clients and in the Web API.
   */
  const createPlaylist = async (
    user_id: string,
    name: string,
    _public?: boolean,
    collaborative?: boolean,
    description?: string
  ) => {
    const url = await buildUrl(`/users/${user_id}/playlists`);

    return await postRequest<void, string>(url, JSON.stringify({ name, public: _public, collaborative, description }));
  };

  /**
   * Get a list of Spotify featured playlists (shown, for example, on a Spotify player's 'Browse' tab).
   * @param country A country: an ISO 3166-1 alpha-2 country code. Provide this parameter if you want the list of returned
   * items to be relevant to a particular country. If omitted, the returned items will be relevant to all countries.
   * @param locale The desired language, consisting of a lowercase ISO 639-1 language code and an uppercase ISO 3166-1 alpha-2 country code, joined by an underscore. For example: es_MX, meaning "Spanish (Mexico)". Provide this parameter if you want the results returned in a particular language (where available).
   * ***Note:** if locale is not supplied, or if the specified language is not available, all strings will be returned in the
   * Spotify default language (American English). The locale parameter, combined with the country parameter, may give odd
   * results if not carefully matched. For example country=SE&locale=de_DE will return a list of categories relevant to
   * Sweden but as German language strings.*
   * @param timestamp A timestamp in ISO 8601 format: yyyy-MM-ddTHH:mm:ss. Use this parameter to specify the user's local
   * time to get results tailored for that specific date and time in the day. If not provided, the response defaults to
   * the current UTC time. Example: "2014-10-23T09:00:00" for a user whose local time is 9AM. If there were no featured
   * playlists (or there is no data) at the specified time, the response will revert to the current UTC time.
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   */
  const getFeaturedPlaylist = async (
    country?: CountryCodeA2,
    locale?: string,
    timestamp?: string,
    limit?: number,
    offset?: number
  ) => {
    const url = await buildUrl(
      'browse/featured-playlists',
      new SearchParams({
        country,
        locale,
        timestamp,
        limit,
        offset,
      })
    );

    return await getRequest<FeaturedPlaylists>(url);
  };

  const getCategoryPlaylists = async (
    category_id: string,
    country?: CountryCodeA2,
    limit?: number,
    offset?: number
  ) => {
    const url = await buildUrl(
      `/browse/categories/${category_id}/playlists`,
      new SearchParams({
        country,
        limit,
        offset,
      })
    );

    return await getRequest<FeaturedPlaylists>(url);
  };

  /**
   * Get the current image associated with a specific playlist.
   * @param playlist_id The Spotify ID of the playlist.
   */
  const getPlaylistCover = async (playlist_id: string) => {
    const url = await buildUrl(`playlists/${playlist_id}/images`);

    return await getRequest<Image[]>(url);
  };

  /**
   * Replace the image used to represent a specific playlist.
   * @param playlist_id The Spotify ID of the playlist.
   * @param image Base64 encoded JPEG image data, maximum payload size is 256 KB.
   */
  const addPlaylistCover = async (playlist_id: string, image: string) => {
    const url = await buildUrl(`playlists/${playlist_id}/images`);

    return await putRequest<void, string>(url, image, 'image/jpeg');
  };

  return {
    getPlaylist,
    changePlaylistDetails,
    getItems,
    updateItems,
    addItems,
    removeItems,
    getCurrentUsersPlaylists,
    getUsersPlaylists,
    createPlaylist,
    getFeaturedPlaylist,
    getCategoryPlaylists,
    getPlaylistCover,
    addPlaylistCover,
  };
};
