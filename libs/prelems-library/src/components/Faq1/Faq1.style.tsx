import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    faq1Wrapper: {
      "&.faq1Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .faq": {
          [theme.breakpoints.up("xs")]: {
            padding: "0 0 20px 0",
            textAlign: "center",
          },
          [theme.breakpoints.up("em")]: {
            padding: "0px 74px 0px 0px",
            textAlign: "left",
          },
          width: "100%",
        },
        "& .title": {
          marginTop: 0,
        },
        "& .accordianWrapper": {
          height: "auto",
          overflow: "auto",
          position: "relative",
          textAlign: "left",
          [theme.breakpoints.up("xs")]: {
            maxHeight: "560px",
          },
          [theme.breakpoints.up("sm")]: {
            maxHeight: "580px",
          },
          [theme.breakpoints.up("md")]: {
            maxHeight: "590px",
          },
          [theme.breakpoints.up("em")]: {
            maxHeight: "548px",
          },
          [theme.breakpoints.up("lg")]: {
            maxHeight: "590px",
          },
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      },
    },
  };
});
