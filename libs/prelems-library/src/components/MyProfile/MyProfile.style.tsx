import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    borderBottom: "1px solid #E0E0E0",
    borderColor: "divider",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },

  tabContainer: {
    "&.Platform-x-ButtonBase-root": {
      border: "none",
    },
  },
}));
