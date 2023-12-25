import { useEffect, useState } from 'react';
import { Device, Devices } from '@spotify/web-api-ts-sdk';
import { CgClose } from 'react-icons/cg';
import { IconContext } from 'react-icons';
import { TbDeviceLaptop, TbDeviceMobile, TbDevices2, TbDeviceSpeaker } from 'react-icons/tb';
import { toast } from 'react-hot-toast';

interface MenuProps {
  currentDevice: Device;
  closeHandler: () => void;
}

export const Menu = ({ currentDevice, closeHandler }: MenuProps) => {
  const [availableDevices, _setAvailableDevices] = useState<Devices | null>(null);

  useEffect(() => {
    // TODO: fetch devices

    const id = setInterval(() => {}, 5000);

    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="fixed z-10 top-0 left-0 w-screen h-screen bg-black flex flex-col space-y-5">
      <div className="p-5">
        <div className="mb-5 flex justify-end">
          <div onClick={closeHandler}>
            <CgClose />
          </div>
        </div>
        <div className="p-5 bg-gradient-to-t from-green/5 to-green/30 border border-green backdrop-brightness-80 drop-shadow-lg flex flex-col space-y-1 rounded-xl">
          <span className="flex items-center space-x-1">
            <IconContext.Provider value={{ className: 'text-green', size: '25' }}>
              <Icon device={currentDevice} />
            </IconContext.Provider>
            <h1 className="text-xl font-normal">Current device</h1>
          </span>
          <p>{currentDevice.name}</p>
        </div>
      </div>
      {availableDevices && (
        <div className="flex flex-col space-y-5">
          <h2 className="px-5 text-base font-normal">Select a device</h2>
          <div className="flex flex-col">
            {availableDevices.devices.map(current => {
              // if (current.id === currentDevice.id) return;
              return (
                <div
                  className="p-5 flex items-center space-x-4 transition-colors active:bg-[rgba(0,0,0,.5)]"
                  onClick={async () => {
                    if (current.id) {
                      try {
                        closeHandler();
                        // FIXME: handle playback transfer here
                      } catch (e) {
                        toast.error('Could not transfer playback');
                        console.error('Error while transferring playback:', e);
                      }
                    }
                  }}
                  key={current.id}
                >
                  <IconContext.Provider value={{ className: 'flex justify-center items-center', size: '28' }}>
                    <Icon device={current} />
                  </IconContext.Provider>
                  <p>{current.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

interface IconProps {
  device: Device;
}

export const Icon = ({ device }: IconProps) => {
  return (
    <>
      {device.type.toLowerCase() === 'computer' ? (
        <TbDeviceLaptop />
      ) : device.type.toLowerCase() === 'smartphone' ? (
        <TbDeviceMobile />
      ) : device.type.toLowerCase() === 'speaker' ? (
        <TbDeviceSpeaker />
      ) : (
        <TbDevices2 />
      )}
    </>
  );
};
