import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    fullWidthImageWrapper: {
      "&.fullWidthImageInner": {
        width: "100%",
        height: "500px",
        objectFit: "cover",
        [theme.breakpoints.down("md")]: {
          height: "100%",
        },
      },
    },
  };
});
