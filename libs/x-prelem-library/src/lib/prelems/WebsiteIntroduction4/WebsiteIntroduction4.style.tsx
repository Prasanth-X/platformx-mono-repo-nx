import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    WebsiteIntroduction4Wrapper: {
      "&.WebsiteIntroduction4Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        width: "100%",
        padding: "0",
        "& .rightCol": {
          [theme.breakpoints.down("em")]: {
            textAlign: "left",
            paddingBottom: "20px",
            paddingLeft: 0,
          },
        },
      },
    },
  };
});
