import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    paragraphWithHeadlineWrapper: {
      "&.paragraphWithHeadlineBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .heading": {
          [theme.breakpoints.up("xs")]: {
            paddingRight: 0,
          },
          [theme.breakpoints.up("md")]: {
            paddingRight: "30px",
          },
          [theme.breakpoints.up("em")]: {
            paddingRight: "75px",
          },
          [theme.breakpoints.up("lg")]: {
            paddingRight: "150px",
          },
        },
        "& .detail": {
          textAlign: "left",
          marginBottom: 0,
        },
      },
    },
  };
});
