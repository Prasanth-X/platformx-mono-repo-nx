import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    dynamicPrelemWithCarousel1: {
      "&.dynamicPrelemWithCarousel1Wrapper": {
        background: theme.palette.prelemType2.BACKGROUND,
        "& .textWrapper": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        "& .navigationWrapper": {
          display: "flex",
          minWidth: "68px",
          justifyContent: "space-between",
        },
        "& .noResultFound": {
          display: "flex",
          justifyContent: "center",
          width: "inherit",
          padding: "30px 0",
        },
        "& .add-content-overlay": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
        },
        "& .arrowIcons": {
          fill: theme.palette.prelemType2.TITLE,
          cursor: "pointer",
          "&.arrowIconsDisabled": {
            opacity: 0.5,
          },
        },
      },
    },
  };
});
