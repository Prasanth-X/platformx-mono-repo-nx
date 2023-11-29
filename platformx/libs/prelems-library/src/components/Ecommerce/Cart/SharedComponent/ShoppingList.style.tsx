import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productCartListWrapper: {
      "&.productCartListRow": {
        "& .productCartList": {
          [theme.breakpoints.up("em")]: {
            maxHeight: "590px",
            overflowX: "auto",
            marginRight: "30px",
          },
        },
        "& .heading": {
          marginBottom: "30px",
          display: "flex",
          alignItems: "center",
        },
      },
    },
  };
});
