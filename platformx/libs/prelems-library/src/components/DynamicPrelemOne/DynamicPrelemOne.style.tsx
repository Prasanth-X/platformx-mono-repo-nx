import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    dynamicPrelemOne: {
      "&.dynamicPrelemOneWrapper": {
        background: theme.palette.prelemType1.BACKGROUND,
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
        "& .textWrapper": {
          display: "flex",
          justifyContent: "center",
          width: "inherit",
          padding: "30px 0",
          minHeight: "240px",
          alignItems: "center",
          height: "240px",
        },
      },
    },
  };
});
