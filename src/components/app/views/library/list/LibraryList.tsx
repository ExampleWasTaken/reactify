import { LibraryItem } from './LibraryItem.tsx';
import { useEffect, useState } from 'react';
import { Spotify } from '../../../../../api/Spotify.ts';
import { ContainerSpinner } from '../../../global/loaders/ContainerSpinner.tsx';
import { useSpotify } from '../../../../../hooks/useSpotify.tsx';
import { publicAssets } from '../../../../../utils/publicAssets.ts';

interface LibraryListObject {
  id: string;
  cover: string;
  name: string;
  type: string;
  /**
   * This is optional because artists have no owner.
   */
  owner?: string;
}

const fetchLibrary = async (): Promise<LibraryListObject[]> => {
  const sdk = Spotify.getInstance().sdk;

  const savedPlaylists = await sdk.currentUser.playlists.playlists();
  const savedAlbums = await sdk.currentUser.albums.savedAlbums();
  const followedArtists = await sdk.currentUser.followedArtists();

  const sortedLibrary: LibraryListObject[] = [];

  savedPlaylists.items.forEach(current => {
    sortedLibrary.push({
      id: current.uri,
      cover: current.images[0].url,
      name: current.name,
      type: current.type,
      owner: current.owner.display_name,
    });
  });

  savedAlbums.items.forEach(current => {
    let artist: string;
    if (current.album.artists.length === 1) {
      artist = current.album.artists[0].name;
    } else if (current.album.artists.length === 2) {
      artist = `${current.album.artists[0].name} & ${current.album.artists[1].name}`;
    } else {
      artist = 'Various Artists';
    }

    sortedLibrary.push({
      id: current.album.uri,
      cover: current.album.images[0].url,
      name: current.album.name,
      type: current.album.album_type,
      owner: artist,
    });
  });

  followedArtists.artists.items.forEach(current => {
    sortedLibrary.push({
      id: current.uri,
      cover: current.images[0].url,
      name: current.name,
      type: current.type,
    });
  });

  return sortedLibrary;
};

export const LibraryList = () => {
  const spotify = useSpotify();

  const [library, setLibrary] = useState<LibraryListObject[] | null>(null);
  const [userProfilePic, setUserProfilePic] = useState('');

  useEffect(() => {
    spotify.sdk.currentUser
      .profile()
      .then(profile => setUserProfilePic(profile.images[0].url))
      .catch(() => setUserProfilePic(publicAssets.spotifyIconGreen));
    fetchLibrary().then(library => setLibrary(library));
  }, [spotify]);

  // liked songs are not returned as playlist but need to be fetched through the
  // Get User's Saved Tracks endpoint

  return (
    <>
      <header className="sticky top-0 bg-black drop-shadow-lg px-5 py-10 flex justify-between items-center">
        <div className="flex justify-between items-center space-x-3">
          {/* Remove and change for user icon once mockup is in place */}
          <img
            className="h-10 rounded-full"
            src={userProfilePic}
            alt="User profile picture"
          />
          <h1 className="text-3xl">Your Library</h1>
        </div>
        {/* TODO: implement playlist search and creation */}
        {/*<div className="flex justify-between items-center space-x-4">
          <Search size={30} />
          <Plus size={30} />
        </div>*/}
      </header>
      <main>
        {library ? (
          <div
            className="py-4 flex flex-col space-y-4"
            style={{ paddingBottom: 'calc(137px + 1rem)' }}
          >
            {library.map(current => {
              return (
                <LibraryItem
                  key={current.id}
                  cover={current.cover}
                  name={current.name}
                  type={current.type.charAt(0).toUpperCase() + current.type.substring(1)}
                  owner={current.owner}
                />
              );
            })}
          </div>
        ) : (
          <ContainerSpinner className="mt-52" />
        )}
      </main>
    </>
  );
};
