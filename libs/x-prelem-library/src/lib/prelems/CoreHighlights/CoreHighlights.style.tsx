import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    CoreHighlightsWrapper: {
      "&.CoreHighlightsBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        width: "100%",
        padding: "0",
        "& .leftImgBox": {
          position: "relative",
          "& .spRight": {
            paddingRight: "12px",
            [theme.breakpoints.down("md")]: {
              paddingRight: "6px",
            },
          },
          "& .spLeft": {
            paddingLeft: "12px",
            [theme.breakpoints.down("md")]: {
              paddingLeft: "6px",
            },
          },
          "& .ImgBoxinner": {
            marginBottom: "24px",
            "& picture": {
              "& img": {
                borderRadius: "5px",
              },
            },
            [theme.breakpoints.down("md")]: {
              marginBottom: "12px",
            },
          },
          "& .ImgBoxinner:last-child": {
            marginBottom: "0px",
          },
          "& .middleBoxWp": {
            position: "absolute",
            background: theme.palette.prelemType1.BACKGROUND,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            margin: "auto",
            width: "200px",
            height: "200px",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            borderRadius: "10px",
            padding: "10px",
            [theme.breakpoints.down("md")]: {
              width: "140px",
              height: "140px",
              padding: "5px",
            },
            "& h1": {
              margin: 0,
            },
            "& p": {
              margin: 0,
            },
          },
        },
        "& .rightCol": {
          [theme.breakpoints.down("em")]: {
            textAlign: "left",
            marginTop: "12px",
          },
          "& p": {
            display: "inline-block",
            width: "100%",
          },
          "& .leftborder": {
            paddingLeft: "20px",
            borderLeft: "2px solid #4B9EF9",
          },
          "& hr": {
            margin: "12px 0",
            display: "inline-block",
            width: "100%",
          },
          "& .bootomTextContent": {
            display: "flex",
            width: "100%",
            alignItems: "center",
            "& .imgBoxIcon": {
              width: "48px",
              height: "48px",
              display: "inline-block",
              marginRight: "20px",
            },
          },
        },
      },
    },
  };
});
