import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    websiteSummaryWithSubHeading2Wrapper: {
      "&.websiteSummaryWithSubHeading2Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .firstColumn": {
          paddingRight: 0,
          [theme.breakpoints.up("em")]: {
            paddingRight: "65px",
          },
          [theme.breakpoints.up("xl")]: {
            paddingRight: "65px",
          },
        },
        "& .leftGridItem": {
          [theme.breakpoints.down("md")]: {
            textAlign: "left",
          },
        },
        "& .title": {
          borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
          maxWidth: "80%",
          [theme.breakpoints.up("md")]: {
            maxWidth: "350px",
          },
          [theme.breakpoints.up("lg")]: {
            maxWidth: "420px",
          },
        },
        "& .rightGridItem": {
          position: "relative",
          marginTop: theme.prelemPaddingBottom.value,
          [theme.breakpoints.up("em")]: {
            marginBottom: "0",
          },
        },
        "& .dottedBg": {
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "300px",
          [theme.breakpoints.up("md")]: {
            width: "472px",
          },
          [theme.breakpoints.up("em")]: {
            width: "437px",
          },
          [theme.breakpoints.up("lg")]: {
            width: "437px",
          },
        },
        "& .rightImageWrapper": {
          position: "relative",
          paddingTop: "20px",
          paddingLeft: "15px",
          display: "flex",
          [theme.breakpoints.up("md")]: {
            paddingTop: "30px",
            paddingLeft: "30px",
          },
          [theme.breakpoints.up("lg")]: {
            paddingTop: "51px",
            paddingLeft: "54px",
          },
        },
        "& .rightImage": {
          width: "100%",
          height: "100%",
          borderRadius: theme.borderRadius.value,
        },
        "& .rightImage1": {
          width: "100%",
        },
      },
    },
  };
});
