import { LibraryItem } from './LibraryItem.tsx';
import { useEffect, useState } from 'react';
import { useSpotify } from '../../../../hooks/useSpotify.tsx';
import { Page, SimplifiedPlaylist } from '@spotify/web-api-ts-sdk';

export const LibraryList = () => {
  const spotify = useSpotify();
  const [playlists, setPlaylists] = useState<Page<SimplifiedPlaylist> | null>(null);

  // liked songs are not returned as playlist but need to be fetched through the
  // Get User's Saved Tracks endpoint

  useEffect(() => {
    (async () => {
      setPlaylists(await spotify.sdk.currentUser.playlists.playlists(50));
    })();
  }, [spotify]);

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
            type={current.type.charAt(0).toUpperCase() + current.type.substring(1)}
            author={current.owner.display_name}
          />
        );
      })}
    </div>
  );
};
