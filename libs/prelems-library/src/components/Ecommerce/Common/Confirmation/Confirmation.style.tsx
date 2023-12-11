import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    dialogWrapper: {
      "&.orderConfirmationPlaced": {
        "& .Platform-x-Dialog-paper": {
          background: theme.palette.prelemType1.BACKGROUND,
          width: "100%",
          margin: "0px",
          position: "absolute",
          bottom: 0,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          [theme.breakpoints.up("sm")]: {
            maxWidth: "700px",
            minWidth: "700px",
            width: "700px",
            margin: "0px",
            position: "inherit",
          },
          [theme.breakpoints.up("lg")]: {
            maxWidth: "800px",
            minWidth: "800px",
            width: "800px",
          },
          padding: "10px 60px 60px 60px",
          textAlign: "center",
        },
        "& .closeWrapper": {
          textAlign: "center",
          margin: 0,
          [theme.breakpoints.up("md")]: {
            margin: "15px 0 4px",
          },
        },
        "& .modal-close": {
          "& svg": {
            fill: theme.palette.prelemType1.TITLE,
          },
        },
        "& .dialogTitle": {
          padding: "0px 15px",
        },
        "& .dialogContent": {
          padding: "0 15px",
        },
        "& .dialogContentText": {
          maxWidth: "100%",
          margin: "auto",
          [theme.breakpoints.up("md")]: {
            maxWidth: "410px",
          },
        },
        "& .closeIcon": {
          color: theme.palette.prelemType1.TITLE,
        },
      },
    },
  };
});
