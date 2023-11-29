import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    rightSideCartblock: {
      "&.cardDetails": {
        "&.cardDetailsBg": {
          background: theme.palette.prelemType1.BACKGROUND,
        },
      },
      "&.rightSideCartblockBg": {
        background: theme.palette.prelemType3.BACKGROUND,
      },
    },
  };
});
