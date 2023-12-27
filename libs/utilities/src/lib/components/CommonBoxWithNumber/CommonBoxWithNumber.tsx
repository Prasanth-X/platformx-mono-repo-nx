import { Box } from '@mui/material';
import { PropsWithChildren } from 'react';
import TitleSubTitle from '../TitleSubTitle';
import { useCustomStyle } from './CommonBoxWithNumber.style';

interface CommonBoxWithNumberProp {
  number: string;
  title: string;
  subTitle: string;
  titleVarient: string;
  subTitleVarient: string;
  panelStyle?: any;
}
export const CommonBoxWithNumber = ({
  number,
  title,
  subTitle,
  titleVarient,
  subTitleVarient,
  panelStyle = {},
  children,
}: PropsWithChildren<CommonBoxWithNumberProp>) => {
  const classes = useCustomStyle({ panelStyle });
  return (
    <Box className={`${classes.commonBoxWithNumber} commonBoxWithNumber`}>
      <Box className="headerWrapper">
        <Box className="numberBox">{number}</Box>
        <TitleSubTitle
          title={title}
          subTitle={subTitle}
          titleVarient={titleVarient}
          subTitleVarient={subTitleVarient}
        />
      </Box>
      <Box className="contentWrapper" sx={panelStyle}>
        {children}
      </Box>
    </Box>
  );
};
