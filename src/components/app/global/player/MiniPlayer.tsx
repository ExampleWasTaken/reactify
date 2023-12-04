import { IoIosPause, IoIosPlay, IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { IconContext } from 'react-icons';
import { PlaybackProgressInfo, usePlaybackBar } from '../../../../hooks/usePlaybackBar.tsx';
import { CustomPlaybackState, usePlaybackState } from '../../../../hooks/usePlaybackState.tsx';
import { useEffect, useState } from 'react';
import { Track } from '@spotify/web-api-ts-sdk';
import { DeviceIcon } from './DeviceIcon.tsx';
import { FastAverageColor } from 'fast-average-color';
import { colord, extend } from 'colord';
import a11yPlugin from 'colord/plugins/a11y';

export const MiniPlayer = () => {
  const { fetchPlaybackState } = usePlaybackState();
  const { calcProgress } = usePlaybackBar();

  const [backgroundColor, setBackgroundColor] = useState('#000');
  const [playbackState, setPlaybackState] = useState<CustomPlaybackState | null>(null);

  // This is needed as the API returns a cached value that is only updated once the playback state has changed.
  // This means that the progress value is not synchronized to the returned timestamp. Therefore, we must keep track of the timestamp ourselves.
  const [lastPlaybackStateFetchTimestamp, setLastPlaybackStateFetchTimestamp] = useState(0);
  const [progress, setProgress] = useState<PlaybackProgressInfo | null>(null);

  useEffect(() => {
    const playbackUpdateId = setInterval(() => {
      fetchPlaybackState()
        .then(state => {
          // console.log('Updating playback state:', state);
          setPlaybackState(state);
          setLastPlaybackStateFetchTimestamp(Date.now());
        })
        .catch(() => setPlaybackState(null));
    }, 1000);

    const progressUpdateId = setInterval(() => {
      if (!playbackState) return;
      if (!playbackState.is_playing) return;
      const progress = calcProgress(
        lastPlaybackStateFetchTimestamp,
        playbackState.progress_ms,
        playbackState.item.duration_ms
      );
      setProgress(progress);
    }, 100);

    return () => {
      clearInterval(progressUpdateId);
      clearInterval(playbackUpdateId);
    };
  }, [playbackState, lastPlaybackStateFetchTimestamp]);

  useEffect(() => {
    if (!playbackState) return;

    (async () => {
      extend([a11yPlugin]);
      const fac = new FastAverageColor();
      const dominantColor = await fac.getColorAsync((playbackState.item as Track).album.images[0].url, {
        ignoredColor: [
          [0, 0, 0],
          [255, 255, 255],
        ],
      });

      const color = colord(dominantColor.hex);
      const contrast = color.contrast('#1db954');

      if (contrast < 7) {
        setBackgroundColor(color.darken(color.luminance()).toHex());
        return;
      }
      setBackgroundColor(dominantColor.hex);
    })();
  }, [playbackState]);

  if (!playbackState) return null;
  if (playbackState.currently_playing_type !== 'track') return null;
  if ((playbackState.item as Track).is_local) return null; // TODO: support local track in future

  return (
    <div
      className="h-14 m-2 mt-0 px-2 rounded flex flex-col items-center"
      style={{ backgroundColor: backgroundColor }}
      id="mini-player-container"
    >
      <div
        className="w-full py-2 flex justify-center z-10"
        style={{ height: 'calc(3.5rem - 2px)' }}
        id="mini-player-content-container"
      >
        <div
          className="w-full h-full flex space-x-2 basis-2/3"
          id="mini-player-metadata-container"
        >
          <div
            className="shrink-0"
            id="mini-player-cover-container"
          >
            <img
              src={(playbackState.item as Track).album.images[0].url}
              className="aspect-square rounded w-full h-full"
              alt="Cover art"
            />
          </div>
          <div
            className="w-full h-full overflow-hidden flex flex-col justify-center"
            id="mini-player-track-details"
          >
            <p className="truncate text-sm font-medium">{playbackState.item.name}</p>
            <p className="truncate text-xs text-white/90">
              {(playbackState.item as Track).artists.map((current, i) => {
                if (i < (playbackState.item as Track).artists.length - 1) {
                  return current.name + ', ';
                } else return current.name;
              })}
            </p>
          </div>
        </div>
        <div
          className="flex flex-row-reverse justify-start items-center space-x-3 space-x-reverse basis-1/3"
          id="mini-player-controls-container"
        >
          <IconContext.Provider value={{ size: '25' }}>
            {playbackState.is_playing ? <IoIosPause /> : <IoIosPlay />}
            {playbackState.saved ? <IoMdHeart className="text-green" /> : <IoMdHeartEmpty />}
            <DeviceIcon deviceType={playbackState.device.type} />
          </IconContext.Provider>
        </div>
      </div>
      <div
        className="w-full h-[2px] bg-white/50"
        id="mini-player-playback-bar-container"
      >
        <div
          className="h-full bg-white"
          style={{ width: `${progress ? progress.progressPercentage : 0}%` }}
          id="mini-player-playback-bar"
        >
          <></>
        </div>
      </div>
    </div>
  );
};