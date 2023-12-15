import { useRef, useEffect } from 'react';

export function useNoInitialEffect() {
  const firstRender = useRef(true);

  useEffect(() => {
    firstRender.current = false;
  }, []);

  return firstRender.current;
}
