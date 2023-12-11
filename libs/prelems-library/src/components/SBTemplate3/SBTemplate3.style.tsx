import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    SBTemplate3Wrapper: {
      "&.SBTemplate3Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .rightCol": {
          [theme.breakpoints.down("em")]: {
            textAlign: "left",
            paddingBottom: "20px",
            paddingRight: "23px",
            paddingLeft: "8px",
          },
        },
        "& .noroundedImg": {
          [theme.breakpoints.down("em")]: {
            marginLeft: "-20px",
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
