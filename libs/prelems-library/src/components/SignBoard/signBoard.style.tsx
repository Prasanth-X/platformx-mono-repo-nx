import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    signBoardWrapper: {
      "&.signBoardBg": {
        backgroundColor: theme.palette.prelemType2.BACKGROUND,
        "& .leftContentWrapper": {
          textAlign: "left",
          [theme.breakpoints.down("md")]: {
            textAlign: "center",
          },
        },
        "& .rightButtonWrapper": {
          width: "100%",
          textAlign: "right",
          [theme.breakpoints.down("md")]: {
            textAlign: "center",
          },
          "& button": {
            marginRight: 0,
          },
        },
      },
    },
  };
});
