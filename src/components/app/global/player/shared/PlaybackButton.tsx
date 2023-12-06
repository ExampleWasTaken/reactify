import { PlaybackState } from '@spotify/web-api-ts-sdk';
import { IconContext } from 'react-icons';
import { IoIosPause, IoIosPlay } from 'react-icons/io';
import { usePlaybackState } from '../../../../../hooks/usePlaybackState.tsx';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

interface PlaybackButtonProps {
  playbackState: PlaybackState;
  size: number;
  className?: string;
}

export const PlaybackButton = ({ playbackState, size, className }: PlaybackButtonProps) => {
  const { startOrResumePlayback, pausePlayback } = usePlaybackState();

  const [playingBack, setPlayingBack] = useState(playbackState.is_playing);

  const onPlay = () => {
    const deviceId = playbackState.device.id;

    if (!deviceId) {
      toast.error('Could not determine device to playback on.');
      return;
    }

    setPlayingBack(true);
    startOrResumePlayback(deviceId).catch(() => setPlayingBack(false));
  };

  const onPause = () => {
    const deviceId = playbackState.device.id;

    if (!deviceId) {
      toast.error('Could not determine device to pause.');
      return;
    }

    setPlayingBack(false);
    pausePlayback(deviceId).catch(() => setPlayingBack(true));
  };

  return (
    <IconContext.Provider value={{ size: size.toString(), className: className }}>
      {playingBack ? <IoIosPause onClick={onPause} /> : <IoIosPlay onClick={onPlay} />}
    </IconContext.Provider>
  );
};
