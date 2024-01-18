import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    quoteWrapperPrelem: {
      "&.quoteBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .typographyFirst": {
          textAlign: "center",
          [theme.breakpoints.down("sm")]: {
            textAlign: "left",
          },
        },
        "& .typographySecond": {
          textAlign: "right",
        },
        "& .wrapperImg": {
          marginBottom: "0px",
          [theme.breakpoints.down("sm")]: {
            marginBottom: "20px",
          },
        },
      },
    },
  };
});
