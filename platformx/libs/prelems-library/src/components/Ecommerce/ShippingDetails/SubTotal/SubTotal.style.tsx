import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    subTotalwrapper: {
      "&.subTotalSection": {
        borderTop: `solid 1px ${theme.palette.prelemType3.LINE}`,
      },
    },
  };
});
