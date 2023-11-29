import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    aboutUsfourWithsubHeadingWrapper: {
      "&.aboutUsfourWithsubHeadingBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .firstColumnWrapper": {
          textAlign: "left",
          [theme.breakpoints.up("xs")]: {
            marginBottom: "25px",
            paddingRight: 0,
          },
          [theme.breakpoints.up("em")]: {
            marginBottom: "35px",
            paddingRight: "35px",
          },
          [theme.breakpoints.up("lg")]: {
            marginBottom: 0,
            paddingRight: "60px",
          },
          display: "initial",
        },
        "& .secondColumnWrapper": {
          display: "initial",
          textAlign: "left",
        },
        "& .quotesColumn": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          marginTop: "15px",
        },
        "& .doubleQuote": {
          fill: theme.palette.prelemType1.TITLE,
        },
        "& .imgWrapper": {
          minWidth: "57px",
          overflow: "hidden",
          minHeight: "57px",
          maxWidth: "57px",
          maxHeight: "57px",
          background: "#f1f1f1",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "15px",
        },
        "& .quoteGap": {
          marginTop: "12px",
          marginBottom: "12px",
        },
        "& .headingSubheading": {
          display: "flex",
          flexDirection: "column",
          "& p": {
            margin: 0,
          },
        },
      },
    },
  };
});
