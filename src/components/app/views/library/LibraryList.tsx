import { LibraryItem } from './LibraryItem.tsx';
import { useState } from 'react';

export const LibraryList = () => {
  // @ts-ignore will be needed once playlist retrieval is impl.
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [playlists, setPlaylists] =
    useState<SpotifyApi.ListOfCurrentUsersPlaylistsResponse | null>(null);

  // fetch playlists here
  // note that liked songs are not returned as playlist but need to be fetched through the
  // Get User's Saved Tracks endpoint

  if (playlists === null) {
    return <p>empty state</p>;
  }

  return (
    <div className="pt-5 flex flex-col space-y-4">
      {playlists.items.map(current => {
        return (
          <LibraryItem
            key={current.id}
            cover={current.images[0].url}
            title={current.name}
            type={
              current.type.charAt(0).toUpperCase() + current.type.substring(1)
            }
            author={current.owner.display_name}
          />
        );
      })}
    </div>
  );
};
