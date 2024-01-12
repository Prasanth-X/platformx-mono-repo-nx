import { makeStyles } from "@mui/styles";
import { LeftArrowIcon, RightArrowIcon } from '@platformx/utilities';

export const useCustomStyle = makeStyles(() => {
  return {
    dashboardCardSlider: {
     "&.CardSliderDashboard": {
      "& .slick-arrow.slick-prev": {
        "&:before": {
          content: `''`,
          textIndent: 0,
          width: '11px',
          height: '16px',
          filter: 'brightness(0) invert(1)',
          opacity: 1,
          backgroundImage: `url(${LeftArrowIcon})`,
        },
      },
      "& .slick-arrow.slick-next": {
        "&:before": {
          content: `''`,
          textIndent: 0,
          width: '11px',
          height: '16px',
          filter: 'brightness(0) invert(1)',
          opacity: 1,
          backgroundImage: `url(${RightArrowIcon})`,
        },
      },
     }
    },
  };
});
