import { useSpotify } from './useSpotify.tsx';

export const useDevices = () => {
  const { sdk } = useSpotify();
  const fetchAvailableDevices = async () => {
    console.log('Fetching available devices...');
    return await sdk.player.getAvailableDevices();
  };

  const transferPlayback = async (device_ids: [string], play?: boolean) => {
    return await sdk.player.transferPlayback(device_ids, play);
  };

  return { fetchAvailableDevices, transferPlayback };
};
