import { Box } from '@mui/material';
import { PropsWithChildren, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

type InViewWrapperProps = {
  setActiveScroll: (activeScroll: string) => void;
  activeSectionId: string;
  thresholdValue: number;
};

const InViewWrapper = ({
  setActiveScroll,
  activeSectionId,
  children,
  thresholdValue = 1,
}: PropsWithChildren<InViewWrapperProps>) => {
  const { ref, inView } = useInView({
    threshold: thresholdValue,
  });

  useEffect(() => {
    if (inView) {
      setActiveScroll(activeSectionId);
    }
  }, [inView]);

  return <Box ref={ref}>{children}</Box>;
};

export default InViewWrapper;
