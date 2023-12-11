import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    SBTemplate4Wrapper: {
      "&.SBTemplate4Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .rightCol": {
          [theme.breakpoints.down("em")]: {
            textAlign: "left",
            paddingTop: "20px",
            paddingBottom: "20px",
            paddingLeft: "23px",
            paddingRight: "8px",
          },
        },
        "& .noroundedImg": {
          [theme.breakpoints.down("em")]: {
            marginRight: "-20px",
            width: "calc(100% + 20px)",
          },
          "& img": {
            borderRadius: 0,
          },
        },
      },
    },
  };
});
