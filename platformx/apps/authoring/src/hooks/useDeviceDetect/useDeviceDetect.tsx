import { useEffect, useState } from 'react';

export const useDeviceDetect = () => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWidth(window.innerWidth);
      });
    };
  }, []);
  if (typeof window !== 'undefined') {
    setWidth(window.innerWidth);
    if (width < 700) {
      return 'mobile';
    } else if (width > 700 && width < 1000) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  } else {
    return 'desktop';
  }
};
