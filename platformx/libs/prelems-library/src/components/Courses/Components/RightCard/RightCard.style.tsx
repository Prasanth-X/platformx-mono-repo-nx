import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    RightCardWrapper: {
      "&.RightCard": {
        background: theme.palette.prelemType1.BACKGROUND,
        border: `solid 1px ${theme.palette.prelemType1.LINE}`,
        boxShadow: "0px 25px 30px rgba(0, 0, 0, 0.05)",
        padding: "15px",
        position: "absolute",
        top: 0,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          position: "relative",
          margin: "15px 0",
        },
        "& .BoxWp": {
          "& .videoWrapper": {
            position: "relative",
            width: "100%",
            overflow: "hidden",
            display: "inline-flex",
            left: "0",
            marginBottom: "20px",
            "& img": {
              objectFit: "cover",
              width: "100%",
            },
            "& .VideoIcon": {
              position: "absolute",
              margin: "auto",
              top: "0",
              bottom: "0",
              left: "0",
              right: "0",
              width: "64px",
              height: "64px",
            },
          },
          "& .BottomWrapper": {
            "& .bottomWp": {
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
              "& button": {
                marginRight: 0,
              },
            },
            "& ul.itemsList": {
              color: theme.palette.prelemType1.TITLE,
              margin: "0",
              padding: "0 0 0 20px",
              "& li": {
                "& p": {
                  margin: "3px 0",
                },
              },
            },
          },
        },
        "& h4": {
          margin: 0,
        },
      },
    },
  };
});
