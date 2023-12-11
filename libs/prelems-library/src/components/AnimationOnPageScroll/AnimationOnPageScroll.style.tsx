import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    animationOnPageWrapper: {
      "&.animationOnPageScrollBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        textAlign: "center",
        "& .animationText": {
          fontSize: "42px",
          lineHeight: "42px",
          [theme.breakpoints.up("sm")]: {
            fontSize: "50px",
            lineHeight: "50px",
          },
          [theme.breakpoints.up("em")]: {
            fontSize: "100px",
            lineHeight: "100px",
          },
        },
        "& .signBoardWrapper": {
          padding: "15px 0",
          [theme.breakpoints.up("sm")]: {
            padding: "15px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "20px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "25px",
          },
        },
      },
    },
  };
});
