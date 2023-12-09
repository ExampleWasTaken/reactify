import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { Categories, Category, CountryCodeA2, MaxInt } from '@spotify/web-api-ts-sdk';
import { SearchParams } from '../Spotify.ts';

export const useCategories = () => {
  const { buildUrl } = use_internal_spotifyAPIContext();
  const { getRequest } = use_internal_fetch();

  /**
   * Get a single category used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
   * @param id The Spotify category ID for the category.
   * @param country A country: an ISO 3166-1 alpha-2 country code. Provide this parameter to ensure that the category exists for a particular country.
   * @param local The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code,<br>
   * joined by an underscore. For example: es_MX, meaning "Spanish (Mexico)". Provide this parameter if you want the category<br>
   * metadata returned in a particular language.<br>
   * ***Note:*** *If locale is not supplied, or if the specified language is not available, all strings will be returned<br>
   * in the Spotify default language (American English). The locale parameter, combined with the country parameter, may<br>
   * give odd results if not carefully matched. For example country=SE&locale=de_DE will return a list of categories relevant<br>
   * to Sweden but as German language strings.*
   */
  const getBrowseCategory = async (id: string, country?: CountryCodeA2, local?: string) => {
    const url = await buildUrl(`/browse/categories/${id}`, new SearchParams({ country, local }));

    return await getRequest<Category>(url);
  };

  /**
   * Get a list of categories used to tag items in Spotify (on, for example, the Spotify player’s “Browse” tab).
   * @param country A country: an ISO 3166-1 alpha-2 country code. Provide this parameter if you want to narrow the list<br>
   * of returned categories to those relevant to a particular country. If omitted, the returned items will be globally relevant.
   * @param locale The desired language, consisting of an ISO 639-1 language code and an ISO 3166-1 alpha-2 country code,<br>
   * joined by an underscore. For example: es_MX, meaning "Spanish (Mexico)". Provide this parameter if you want the category<br>
   * metadata returned in a particular language.<br>
   * ***Note:*** *If locale is not supplied, or if the specified language is not available, all strings will be returned<br>
   * in the Spotify default language (American English). The locale parameter, combined with the country parameter, may<br>
   * give odd results if not carefully matched. For example country=SE&locale=de_DE will return a list of categories relevant<br>
   * to Sweden but as German language strings.*
   * @param limit The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
   * @param offset The index of the first item to return. Default: 0 (the first item). Use with limit to get the next set of items.
   */
  const getBrowseCategories = async (country?: CountryCodeA2, locale?: string, limit?: MaxInt<50>, offset?: number) => {
    const url = await buildUrl('/browser/categories', new SearchParams({ country, locale, limit, offset }));

    return await getRequest<Categories>(url);
  };

  return {
    getBrowseCategory,
    getBrowseCategories,
  };
};
