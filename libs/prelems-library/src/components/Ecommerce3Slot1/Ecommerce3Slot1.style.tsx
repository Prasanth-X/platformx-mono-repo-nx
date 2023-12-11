import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ecommerce3Slot1Wrapper: {
      "&.ecommerce3Slot1Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
      },
      "& .discover-picture img": {
        borderRadius: theme.borderRadius.value,
      },
      "& .imgOverlay": {
        borderRadius: theme.borderRadius.value,
        position: "absolute",
        top: 0,
        opacity: 0.2,
        width: "100%",
        height: "100%",
        background: `rgba(${theme.palette.overlay["cardOverlay"]})`,
      },
    },
  };
});
