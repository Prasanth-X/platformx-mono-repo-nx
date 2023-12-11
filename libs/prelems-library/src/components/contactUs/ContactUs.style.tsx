import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    contactUsWrapper: {
      "&.contactUsBg": {
        background: theme.palette.prelemType1.BACKGROUND,
      },
    },
  };
});
