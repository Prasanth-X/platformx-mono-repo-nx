import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";
import { leftarrow, rightarrow } from "../../assets/svg";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    testimonialSliderWrapper: {
      "&.testimonialSliderBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .testimonialHeading": {
          paddingRight: "100px",
        },
        "& .testimonialCardWrapper": {
          border: `solid 1px ${theme.palette.prelemType1.LINE}`,
          minHeight: "312px",
          borderRadius: "3px",
          boxShadow: "none",
          "& .textTruncated3Line": {
            lineClamp: 3,
            margin: 0,
            "-webkit-line-clamp": 3,
            textOverflow: "ellipsis",
            overflow: "hidden",
            display: "-webkit-box",
            "-webkit-box-orient": "vertical",
            wordWrap: "break-word",
          },
          "& .title": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
          },
          "& .cardDescription": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
          },
        },
        "&.testimonialSlider .slick-initialized": {
          "& .slick-slide.slick-active:last-child": {
            marginRight: 0,
          },
        },
        "& .editContent": {
          "& .slick-arrow.slick-prev:before": {
            backgroundImage: `url('${leftarrow}')`,
          },
          "& .slick-arrow.slick-next:before": {
            backgroundImage: `url('${rightarrow}')`,
          },
        },
        "& .my20": {
          margin: "20px 0",
        },
      },
    },
  };
});
