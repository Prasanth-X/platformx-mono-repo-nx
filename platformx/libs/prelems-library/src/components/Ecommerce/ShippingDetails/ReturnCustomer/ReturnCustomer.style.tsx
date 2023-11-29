import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    returnCustomerWrapper: {
      "&.returnCustomerLogin": {
        paddingRight: 0,
        [theme.breakpoints.up("em")]: {
          paddingRight: "15px",
        },
        "& .accordianBg": {
          // background: theme.palette.primaryColor[300],
          marginBottom: "12px",
        },
        "& .orText": {
          background: theme.palette.prelemType1.BACKGROUND,
          zIndex: 1,
          padding: "0 10px",
        },
        "& .borderBottomLine": {
          borderBottom: `solid 1px ${theme.palette.prelemType1.LINE}`,
        },
        "& .borderLine": {
          border: `solid 1px ${theme.palette.prelemType1.LINE}`,
          // background: theme.palette.bgDefault,
          margin: 0,
          "&:hover": {
            // background: theme.palette.primaryColor[900],
          },
        },
        "& .noMarginall": {
          margin: 0,
        },
      },
    },
  };
});
