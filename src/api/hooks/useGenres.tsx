import { use_internal_spotifyAPIContext } from './internal/use_internal_spotifyAPIContext.tsx';
import { use_internal_fetch } from './internal/use_internal_fetch.tsx';
import { Genres } from '@spotify/web-api-ts-sdk';

export const useGenres = () => {
  const { buildUrl } = use_internal_spotifyAPIContext();
  const { getRequest } = use_internal_fetch();

  const getAvailableGenreSeeds = async () => {
    const url = await buildUrl('/recommendations/available-genre-seeds');

    return await getRequest<Genres>(url);
  };

  return {
    getAvailableGenreSeeds,
  };
};
