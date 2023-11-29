import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    FullWidthBanner2Wrapper: {
      "&.FullWidthBanner2Bg": {
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
          position: "relative",
          "& .triangle": {
            width: "250px",
            height: "100%",
            background: `linear-gradient(to bottom right, ${theme.palette.prelemType1.BACKGROUND} 0%, ${theme.palette.prelemType1.BACKGROUND} 50%, transparent 50%, transparent 100%)`,
            position: "absolute",
            top: 0,
            left: 0,
            [theme.breakpoints.down("lg")]: {
              width: "150px",
            },
            [theme.breakpoints.down("em")]: {
              display: "none",
            },
          },
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
