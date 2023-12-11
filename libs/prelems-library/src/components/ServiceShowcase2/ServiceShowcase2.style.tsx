import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";
import LeftArrow from "../../assets/svgIcon/leftarrow.svg";
import RightArrow from "../../assets/svgIcon/rightarrow.svg";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceshowCase2Wrapper: {
      "&.serviceshowCase2Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .gridContainer": {
          display: "flex",
          alignItems: "end",
        },
        "& .serviceShowcaseContent": {
          padding: "15px 0",
          textAlign: "center",
          [theme.breakpoints.up("md")]: {
            padding: "0px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "0px 60px 0px 0px",
          },
          [theme.breakpoints.up("em")]: {
            textAlign: "left",
            padding: "0px 35px 0px 0px",
          },
        },
        "& .alignButton": {
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          [theme.breakpoints.up("em")]: {
            justifyContent: "flex-end",
          },
        },
        "& .sliderBlock": {
          display: "block",
        },
        "& .heightPercenntage": {
          height: "100%",
        },
        "& .editContent": {
          display: "inline-block",
          position: "relative",
          marginTop: "30px",
          [theme.breakpoints.up("md")]: {
            marginTop: "75px",
          },
          "& .slick-slider .slick-arrow.slick-prev:after": {
            backgroundImage: `url('${LeftArrow}')`,
          },
          "& .slick-slider .slick-arrow.slick-next:after": {
            backgroundImage: `url('${RightArrow}')`,
          },
          "&:hover": {
            "& .overlay": {
              display: "flex",
            },
          },
        },
        "& .cardWrapper": {
          boxShadow: "none",
          position: "relative",
        },
        "& .cardContent": {
          height: "100%",
          minHeight: "220px",
          background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
          "& .title": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
          },
          "& .description": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
          },
        },
        "& .boxWrapper": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          // marginBottom: "24px",
        },
        "& .imageWrapper": {
          width: "46px",
          height: "46px",
          marginRight: "20px",
        },
        "& .hideElementClass": {
          display: "none",
        },
        "& .overlay": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          "& .overLaytextgap": {
            marginTop: "0px",
          },
        },
        "& .pointer": {
          cursor: "pointer",
          textAlign: "center",
        },
        "& .autorenewIcon": {
          fill: theme.palette.autoRenewIcon,
          [theme.breakpoints.up("xs")]: {
            width: "50px",
            height: "50px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
      },
    },
  };
});

export default useCustomStyle;
