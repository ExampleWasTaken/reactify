import { RefObject, useLayoutEffect, useRef, useState } from 'react';
import Marquee from 'react-fast-marquee';

interface TitleMarqueeProps {
  content: string;
  parentRef: RefObject<HTMLElement>;
  className: string;
}

const SPEED = 27;

export const TitleMarquee = ({ content, parentRef, className }: TitleMarqueeProps) => {
  // Determines whether the marquee is displayed (i.e. the content overflows)
  const [show, setShow] = useState(false);
  const [speed, setSpeed] = useState(SPEED);

  const ref = useRef<HTMLParagraphElement | null>(null);

  const cycleCompleteHandler = () => {
    setSpeed(0);
    setTimeout(() => setSpeed(SPEED), 3000);
  };

  useLayoutEffect(() => {
    if (!ref.current || !parentRef.current) return;
    if (ref.current.scrollWidth > parentRef.current.offsetWidth) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [ref, parentRef]);

  if (show) {
    return (
      <Marquee
        speed={speed}
        onCycleComplete={cycleCompleteHandler}
      >
        <p
          ref={ref}
          className={className}
        >
          {content.padEnd(content.length + 15, String.fromCharCode(160))} {/* Char code 160 equals to &nbsp; */}
        </p>
      </Marquee>
    );
  }

  return (
    <p
      ref={ref}
      className={className}
    >
      {content}
    </p>
  );
};
