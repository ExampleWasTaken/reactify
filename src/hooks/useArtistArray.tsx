import { SimplifiedArtist } from '@spotify/web-api-ts-sdk';

export const useArtistArray = () => {
  const formatArtists = (artists: SimplifiedArtist[]) => {
    return artists.map((current, i) => {
      if (i < artists.length - 1) {
        return current.name + ', ';
      } else return current.name;
    });
  };

  return { formatArtists };
};
