import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    subtotalBorder: {
      "&.checkOutBorder": {
        borderBottom: `1px solid ${theme.palette.prelemType3.LINE}`,
        borderTop: `1px solid ${theme.palette.prelemType3.LINE}`,
      },
    },
  };
});
