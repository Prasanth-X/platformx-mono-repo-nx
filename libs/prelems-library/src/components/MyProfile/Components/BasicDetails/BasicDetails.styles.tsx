import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  typoMargin: {
    margin: 0,
  },
  basicText: {
    padding: "20px",
  },
  editButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  editButton: {
    width: "10px",
    "& .Platform-x-Button-root": {
      width: "100px",
    },
  },
  gray: {
    color: "#6E7191",
  },
}));
