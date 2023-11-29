import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    SBTemplate2Wrapper: {
      "&.SBTemplate2Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .rightCol": {
          [theme.breakpoints.down("em")]: {
            textAlign: "left",
            paddingTop: "20px",
            paddingLeft: 0,
          },
        },
      },
    },
  };
});
