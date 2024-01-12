import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import TitleSubTitle from '../TitleSubtitle/TitleSubTitle';
import { useStyles } from './SectionWrapper.styles';
import { SectionWrapperProp } from './SectionWrapper.types';

const SectionWrapper = ({
  number,
  title,
  subTitle,
  titleVariant,
  subTitleVariant,
  children,
}: PropsWithChildren<SectionWrapperProp>) => {
  const classes = useStyles();
  return (
    <Box className={classes.commonBoxWithNumber}>
      <Box className={classes.headerWrapper}>
        <Box className={classes.numberBox}>{number}</Box>
        <TitleSubTitle
          title={title}
          subTitle={subTitle}
          titleVariant={titleVariant}
          subTitleVariant={subTitleVariant}
        />
      </Box>
      <Box className={classes.contentWrapper}>{children}</Box>
    </Box>
  );
};

export default SectionWrapper;
