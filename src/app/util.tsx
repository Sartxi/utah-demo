import { useState, useEffect } from 'react';

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Windows NT|Opera Mini/i.test(navigator.userAgent);
}

export function useMedia() {
  const [width, setWidth] = useState(0);
  const [isDevice, setIsDevice] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    if (typeof window !== 'undefined') {
      setIsDevice(isMobileDevice());

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const mobile = isDevice && width <= 599;
  const tablet = isDevice && width >= 600 && width <= 1199;

  return { mobile, tablet, isDevice };
}
