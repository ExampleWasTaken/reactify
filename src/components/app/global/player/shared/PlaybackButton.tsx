import { PlaybackState } from '@spotify/web-api-ts-sdk';
import { IconContext } from 'react-icons';
import { IoIosPause, IoIosPlay } from 'react-icons/io';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

// TODO: port to own api handling
interface PlaybackButtonProps {
  playbackState: PlaybackState;
  size: number;
  className?: string;
}

const TOAST_OPTS = { id: 'playback_error' };

export const PlaybackButton = ({ playbackState, size, className }: PlaybackButtonProps) => {
  const [playingBack, setPlayingBack] = useState(playbackState.is_playing);

  const onPlay = () => {
    const deviceId = playbackState.device.id;

    if (!deviceId) {
      toast.error('Could not determine device to playback on.', TOAST_OPTS);
      return;
    }

    if (playbackState.actions.resuming) {
      toast.error('Not allowed!', TOAST_OPTS);
      return;
    }

    setPlayingBack(true);
    // startOrResumePlayback(deviceId).catch(() => setPlayingBack(false));
  };

  const onPause = () => {
    const deviceId = playbackState.device.id;

    if (!deviceId) {
      toast.error('Could not determine device to pause.', TOAST_OPTS);
      return;
    }

    if (playbackState.actions.pausing) {
      toast.error('Not allowed!', TOAST_OPTS);
      return;
    }

    setPlayingBack(false);
    // pausePlayback(deviceId).catch(() => setPlayingBack(true));
  };

  return (
    <IconContext.Provider value={{ size: size.toString(), className: className }}>
      {playingBack ? <IoIosPause onClick={onPause} /> : <IoIosPlay onClick={onPlay} />}
    </IconContext.Provider>
  );
};
