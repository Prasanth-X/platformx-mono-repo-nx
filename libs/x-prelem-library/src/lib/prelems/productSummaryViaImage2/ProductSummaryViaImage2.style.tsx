import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";
import { ProductsummaryviaImage2 } from "@platformx/utilities";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productSummaryViaImage2Wrapper: {
      "&.productSummaryViaImage2Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .backImgWrapper": {
          textAlign: "center",
          backgroundImage: `url(${ProductsummaryviaImage2})`,
          position: "relative",
          left: "0",
          top: "0",
          display: "flex",
          alignItems: "center",
          padding: 0,
          [theme.breakpoints.down("em")]: {
            padding: "0 15px 40px",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "0 15px 10px",
          },
          "& img": {
            width: "85% !important",
            [theme.breakpoints.down("em")]: {
              width: "100% !important",
            },
          },
        },
        "& .dottedImageWrapper": {
          position: "absolute",
          top: "65%",
          left: "-15px",
          [theme.breakpoints.down("md")]: {
            top: "40%",
          },
          [theme.breakpoints.down("sm")]: {
            top: "33%",
          },
          [theme.breakpoints.down("xs")]: {
            top: "45%",
          },
        },
      },
    },
  };
});
