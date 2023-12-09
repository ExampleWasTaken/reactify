import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { Markets } from '@spotify/web-api-ts-sdk';

export const useMarkets = () => {
  const { buildUrl } = use_internal_spotifyAPIContext();
  const { getRequest } = use_internal_fetch();

  /**
   * Get the list of markets where Spotify is available.
   */
  const getAvailableMarkets = async () => {
    const url = await buildUrl('/markets');

    return await getRequest<Markets>(url);
  };

  return {
    getAvailableMarkets,
  };
};
