import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import TopHeader from '../ContentHeader/ContentHeader';
import SectionWrapper from '../SectionWrapper/SectionWrapper';
import VerticalScrollTab from '../VerticalScrollTab/VerticalScrollTab';
import { useStyles } from './ContentWrapper.styles';
import InViewWrapper from './InViewWrapper/InViewWrapper';
import icons from './Utils/Constants';

type ContentWrapperProp = {
  scrollTo?: number;
  sectionList?: any;
  Title?: string;
  Button1?: string;
  Button2?: string;
  Tab1?: string;
  Tab2?: string;
};

export default function ContentWrapper({
  scrollTo = 0,
  sectionList,
  Title,
  Button1,
  Button2,
  Tab1,
  Tab2,
}: ContentWrapperProp) {
  const classes = useStyles();
  const [activeScroll, setActiveScroll] = useState('');
  const ref: any = useRef(null);

  const handleScroll = (index: number) => {
    if (!ref.current) return;
    const childElement = ref.current?.children[index];
    childElement?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (scrollTo !== 0) {
      handleScroll(scrollTo - 1);
    }
  }, [scrollTo]);

  return (
    <>
      <Box className={classes.scrollTabContainer}>
        <VerticalScrollTab
          icons={icons}
          handleScroll={handleScroll}
          activeScroll={activeScroll}
        />
      </Box>
      <TopHeader
        Title={Title}
        Button1={Button1}
        Button2={Button2}
        Tab1={Tab1}
        Tab2={Tab2}
      />
      <Box ref={ref}>
        {sectionList?.map((section) => (
          <InViewWrapper
            key={section?.tooltip}
            setActiveScroll={setActiveScroll}
            activeSectionId={section?.tooltip}
            thresholdValue={section?.thresholdValue}
          >
            <SectionWrapper
              number={section?.sectionContent?.number}
              title={section?.sectionContent?.title}
              subTitle={section?.sectionContent?.subTitle}
              titleVariant={section?.sectionContent?.titleVariant}
              subTitleVariant={section?.sectionContent?.subTitleVariant}
              children={section?.sectionContent?.children}
            />
          </InViewWrapper>
        ))}
      </Box>
    </>
  );
}
