import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    sponsorWrapper: {
      "&.sponsorBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .wrapperMain": {
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        },
        "& .wrapperImg": {
          padding: "15px",
          "& img": {
            maxWidth: "100%",
          },
          [theme.breakpoints.down("em")]: {
            padding: "10px",
          },
          [theme.breakpoints.down("sm")]: {
            padding: "5px",
          },
        },
      },
    },
  };
});
