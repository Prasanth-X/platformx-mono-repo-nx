import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productCartWrapper: {
      "&.productCartWrapperbutton": {
        border: `1px solid ${theme.palette.prelemType1.LINE}`,
      },
    },
  };
});
