import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    learningLintWrapper: {
      "&.learningLint": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .topContentRapper": {
          textAlign: "center",
          margin: "auto",
          maxWidth: "75%",
          [theme.breakpoints.down("lg")]: {
            maxWidth: "100%",
          },
        },
      },
    },
  };
});
