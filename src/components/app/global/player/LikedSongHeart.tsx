import { IconContext } from 'react-icons';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import { useSpotify } from '../../../../hooks/useSpotify.tsx';
import { Track } from '@spotify/web-api-ts-sdk';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

interface LikedSongHeartProps {
  liked?: boolean;
  track: Track;
  size: number;
}

const SONG_LIKED_TOAST_ID = 'song_liked';
const SONG_UNLIKED_TOAST_ID = 'song_unliked';

export const LikedSongHeart = ({ liked, track, size }: LikedSongHeartProps) => {
  const spotify = useSpotify();

  const [isLiked, setIsLiked] = useState(liked);

  const onLike = () => {
    if (isLiked) return;
    setIsLiked(true);

    spotify.sdk.currentUser.tracks
      .saveTracks([track.id])
      .then(() => {
        toast.dismiss(SONG_UNLIKED_TOAST_ID);
        toast('Added to Liked Songs', { id: SONG_LIKED_TOAST_ID });
      })
      .catch(e => {
        setIsLiked(false);
        toast.error(`Something went wrong: ${e}`);
      });
  };

  const onUnlike = () => {
    if (!isLiked) return;
    setIsLiked(false);

    spotify.sdk.currentUser.tracks
      .removeSavedTracks([track.id])
      .then(() => {
        toast.dismiss(SONG_LIKED_TOAST_ID);
        toast('Removed from Liked Songs', { id: SONG_UNLIKED_TOAST_ID });
      })
      .catch(e => {
        setIsLiked(true);
        toast.error(`Something went wrong: ${e}`);
      });
  };

  return (
    <IconContext.Provider value={{ size: size.toString() }}>
      {isLiked ? (
        <IoIosHeart
          onClick={onUnlike}
          className="text-green"
        />
      ) : (
        <IoIosHeartEmpty onClick={onLike} />
      )}
    </IconContext.Provider>
  );
};
