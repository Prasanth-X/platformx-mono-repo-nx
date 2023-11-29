import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    fullWidthWrapperPrelem: {
      "&.fullWidthWrapperBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        textAlign: "center",
        "& .descriptionText": {
          textAlign: "left",
          padding: 0,
        },
      },
    },
  };
});
