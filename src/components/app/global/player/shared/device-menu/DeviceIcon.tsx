import { TbDeviceLaptop } from 'react-icons/tb';
import { BsPhone } from 'react-icons/bs';
import { CgMusicSpeaker } from 'react-icons/cg';
import { LuMonitorSpeaker } from 'react-icons/lu';
import { IconContext } from 'react-icons';
import { useState } from 'react';
import { Menu } from './Menu.tsx';
import { Device } from '@spotify/web-api-ts-sdk';

interface DeviceIconProps {
  device: Device;
}

export const DeviceIcon = ({ device }: DeviceIconProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div onClick={() => setMenuOpen(!menuOpen)}>
        <IconContext.Provider value={{ className: 'text-green', size: '27' }}>
          {device.type.toLowerCase() === 'computer' ? (
            <TbDeviceLaptop size={28} />
          ) : device.type.toLowerCase() === 'smartphone' ? (
            <BsPhone size={22} />
          ) : device.type.toLowerCase() === 'speaker' ? (
            <CgMusicSpeaker />
          ) : (
            <LuMonitorSpeaker color="#fff" />
          )}
        </IconContext.Provider>
      </div>
      {menuOpen && (
        <Menu
          currentDevice={device}
          closeHandler={() => setMenuOpen(false)}
        />
      )}
    </>
  );
};
