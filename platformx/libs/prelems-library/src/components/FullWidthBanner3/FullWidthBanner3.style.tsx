import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    FullWidthBanner3Wrapper: {
      "&.FullWidthBanner3Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        position: "relative",
        width: "100%",
        padding: "0",
        "& .contentWithOverlay": {
          position: "absolute",
          top: "0",
          bottom: "0",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background:
            "linear-gradient(135deg,  rgba(0,0,0,0.78) 0%,rgba(251,251,251,0) 60%,rgba(255,255,255,0) 61%)",
        },
      },
    },
  };
});
