import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    fullWidthVideoWrapper: {
      "&.fullWidthVideoProp": {
        width: "100%",
        height: "500px",
        objectFit: "cover",
        display: "flex",
        [theme.breakpoints.down("md")]: {
          height: "100%",
        },

        "& .reactPlayer": {
          "& video": {
            objectFit: "cover",
          },
        },
      },
    },
  };
});
