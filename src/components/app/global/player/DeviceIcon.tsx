import { TbDeviceLaptop } from 'react-icons/tb';
import { BsPhone } from 'react-icons/bs';
import { CgMusicSpeaker } from 'react-icons/cg';
import { LuMonitorSpeaker } from 'react-icons/lu';
import { IconContext } from 'react-icons';

interface DeviceIconProps {
  deviceType: string;
}

export const DeviceIcon = ({ deviceType }: DeviceIconProps) => {
  return (
    <IconContext.Provider value={{ className: 'text-green', size: '27' }}>
      {deviceType.toLowerCase() === 'computer' ? (
        <TbDeviceLaptop size={28} />
      ) : deviceType.toLowerCase() === 'smartphone' ? (
        <BsPhone size={22} />
      ) : deviceType.toLowerCase() === 'speaker' ? (
        <CgMusicSpeaker />
      ) : (
        <LuMonitorSpeaker color="#fff" />
      )}
    </IconContext.Provider>
  );
};
