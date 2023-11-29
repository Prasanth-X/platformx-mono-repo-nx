import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles(() => ({
  container: {
    margin: "0 20px ",
    borderBottom: "1px solid #E0E0E0",
    paddingBottom: "30px",
  },
  typoMargin: {
    margin: 0,
  },
  avatar: {
    width: "70px",
    height: "70px",
    backgroundColor: "#14142B",
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
