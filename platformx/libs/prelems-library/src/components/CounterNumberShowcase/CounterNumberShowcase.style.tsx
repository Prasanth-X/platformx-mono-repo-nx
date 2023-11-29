import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    counterNumbershowcaseWrapper: {
      "&.counterNumbershowcaseBg": {
        background: theme.palette.prelemType2.BACKGROUND,
        "& .firstColumnContent": {
          paddingRight: 0,
          textAlign: "left",
          display: "initial",
          marginBottom: "30px",
          [theme.breakpoints.up("md")]: {
            paddingRight: "0px",
            marginBottom: "35px",
          },
          [theme.breakpoints.up("em")]: {
            paddingRight: "35px",
            marginBottom: 0,
          },
          [theme.breakpoints.up("lg")]: {
            paddingRight: "60px",
            marginBottom: 0,
          },
        },
        "& .title": {
          borderBottom: `1px solid ${theme.palette.prelemType2.LINE}`,
          maxWidth: "80%",
          [theme.breakpoints.up("md")]: {
            maxWidth: "350px",
          },
          [theme.breakpoints.up("lg")]: {
            maxWidth: "420px",
          },
        },
        "& .secondColumnContent": {
          display: "block",
          [theme.breakpoints.up("md")]: {
            display: "flex",
          },
          [theme.breakpoints.up("em")]: {
            display: "block",
          },
        },
        "& .itemBox": {
          marginBottom: "30px",
          paddingRight: "0",
          display: "flex",
          [theme.breakpoints.up("md")]: {
            display: "block",
            paddingRight: "20px",
          },
          [theme.breakpoints.up("em")]: {
            display: "flex",
          },
        },
        "& .iconBox": {
          minWidth: "42px",
          maxWidth: "42px",
          minHeight: "42px",
          maxHeight: "42px",
          marginBottom: "0",
          display: "flex",
          marginRight: "10px",
          marginTop: "12px",
          [theme.breakpoints.up("md")]: {
            marginBottom: "15px",
            marginRight: "15px",
          },
          [theme.breakpoints.up("em")]: {
            marginBottom: "0",
          },
          [theme.breakpoints.up("lg")]: {
            marginRight: "25px",
          },
        },
        "& .iconWidth": {
          width: "100%",
          objectFit: "cover",
        },
        "& .discription": {
          display: "flex",
        },
        "& .heading": {
          paddingBottom: 0,
          margin: 0,
        },
        "& .subheading": {
          paddingTop: 0,
        },
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
        "& .textTruncated1Line": {
          lineClamp: 1,
          margin: 0,
          "-webkit-line-clamp": 3,
          textOverflow: "ellipsis",
          overflow: "hidden",
          display: "-webkit-box",
          "-webkit-box-orient": "vertical",
          wordWrap: "break-word",
        },
      },
    },
  };
});
