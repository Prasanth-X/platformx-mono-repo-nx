import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    LivestreamFeedWrapper: {
      "&.LivestreamFeed": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .LivestreamWrapper": {
          display: "flex",
          alignItems: "center",
          "& .LivestreanLeft": {
            height: "400px",
            marginBottom: 0,
            borderRadius: theme.borderRadius.value1,
            overflow: "hidden",
            [theme.breakpoints.down("md")]: {
              height: "350px",
            },
            [theme.breakpoints.down("sm")]: {
              height: "300px",
              marginBottom: "24px",
            },
          },
          "& .LivestreanRight": {
            textAlign: "left",
            padding: "0 50px",
            boxSizing: "border-box",
            [theme.breakpoints.down("md")]: {
              padding: "24px 0",
            },
          },
        },
      },
    },
  };
});
