import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    buttonwhite: {
      "&.ecom-delete-button-small": {
        color: theme.palette.prelemType1.NOTIFICATION.ERROR.BACKGROUND,
        border: `1px solid ${theme.palette.prelemType1.LINE}`,
        "&:hover": {
          background: theme.palette.prelemType1.NOTIFICATION.ERROR.COLOR,
        },
      },
    },
  };
});
