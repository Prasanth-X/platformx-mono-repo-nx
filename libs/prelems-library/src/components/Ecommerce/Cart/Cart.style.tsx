import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    cartDetailWrapper: {
      "&.cartDetailListPage": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .buttonWrapper": {
          marginTop: "40px",
          marginLeft: "0px",
          marginBottom: "16px",
          display: "flex",
          justifyContent: "center",
          [theme.breakpoints.up("md")]: {
            marginTop: "30px",
            justifyContent: "left",
          },
        },
        "& .continueBtn": {
          display: "none",
          [theme.breakpoints.up("md")]: {
            display: "flex",
          },
        },
      },
    },
  };
});
