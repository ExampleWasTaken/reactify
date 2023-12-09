export interface PlaybackProgressInfo {
  adjustedProgress_ms: number;
  timeRemaining_ms: number;
  progressPercentage: number;
}

/**
 * Returns an object with functions for handling playback bars.
 */
export const usePlaybackBar = () => {
  /**
   * Calculates the progress of playback while adjusting for time passed between fetching and now. <br/>
   * **The timestamp MUST be synchronized to the provided progress value!** Note, that the Spotify API does not return
   * synchronize those two values so you will need to keep track of the timestamp of last fetched data yourself!
   * @param timestamp_ms The time in milliseconds when the data was fetched.
   * @param progress_ms The progress in milliseconds into the current track.
   * @param duration_ms The duration in milliseconds of the current track.
   * @returns An object that contains playback timing information in various formats.
   */
  const calcProgress = (timestamp_ms: number, progress_ms: number, duration_ms: number): PlaybackProgressInfo => {
    const currentTimestamp = Date.now();

    const adjustedProgress_ms = progress_ms + (currentTimestamp - timestamp_ms);
    const timeRemaining_ms = Math.round(duration_ms - adjustedProgress_ms);
    const progressPercentage = Math.min((adjustedProgress_ms / duration_ms) * 100, 100);
    return { adjustedProgress_ms, timeRemaining_ms, progressPercentage };
  };

  return { calcProgress };
};
