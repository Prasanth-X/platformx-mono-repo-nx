import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ecomCoupanCodeWrapper: {
      "&.ecomCoupanCode": {
        borderBottom: `solid 1px ${theme.palette.prelemType3.LINE}`,
        "& .custom-textbox": {
          marginTop: "15px",
        },
      },
    },
  };
});
