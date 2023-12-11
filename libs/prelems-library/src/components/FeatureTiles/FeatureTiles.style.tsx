import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    featureTilesWrapper: {
      "&.featureTilesBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .featureTilesBox": {
          "& .heading": {
            textAlign: "center",
            marginBottom: theme.spacing(4),
          },
          "& .heightAuto": {
            height: "100%",
          },
          "& .tilesImageContainer": {
            display: "flex",
            [theme.breakpoints.up("xs")]: {
              padding: "5px",
            },
            [theme.breakpoints.up("md")]: {
              height: "auto",
              padding: "7px",
            },
            [theme.breakpoints.up("lg")]: {
              height: "50%",
              padding: "10px",
            },
          },
          "& .tilesImageInnerWrapper": {
            position: "relative",
            width: "100%",
            borderRadius: theme.borderRadius.value,
            overflow: "hidden",
            [theme.breakpoints.up("xs")]: {
              height: "270px",
            },
            [theme.breakpoints.up("md")]: {
              height: "320px",
            },
            [theme.breakpoints.up("em")]: {
              height: "365px",
            },
            [theme.breakpoints.up("lg")]: {
              height: "296px",
            },
          },
          "& .imageRender": {
            position: "relative",
            height: "100%",
            width: "100%",
            left: "0",
            top: "0",
            display: "flex",
          },
          "& .contentwp": {
            width: "100%",
            marginBottom: "-135px",
            [theme.breakpoints.up("xs")]: {
              padding: "15px",
            },
            [theme.breakpoints.up("md")]: {
              padding: "20px",
              marginBottom: "-145px",
            },
            [theme.breakpoints.up("lg")]: {
              marginBottom: "-155px",
            },
            [theme.breakpoints.up("xl")]: {
              marginBottom: "-145px",
            },
            "&.middleCard": {
              [theme.breakpoints.up("lg")]: {
                marginBottom: "-140px",
              },
            },
          },
          "& .text-truncated-3line": {
            [theme.breakpoints.up("xs")]: {
              margin: "8px 0 24px",
            },
            [theme.breakpoints.up("sm")]: {
              margin: "8px 0 16px",
            },
            minHeight: "54px",
          },
          "& .text-truncated-1line": {
            [theme.breakpoints.up("xs")]: {
              marginBottom: "25px",
            },
            [theme.breakpoints.up("sm")]: {
              marginBottom: "20px",
            },
          },
        },
        "& .gridPadding": {
          [theme.breakpoints.up("xs")]: {
            padding: "5px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "7px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "10px",
          },
        },
        /*middle Column */
        "& .tilesImageInnerWrapper1": {
          position: "relative",
          width: "100%",
          maxHeight: "365px",
          borderRadius: theme.borderRadius.value,
          overflow: "hidden",
          [theme.breakpoints.up("xs")]: {
            height: "270px",
          },
          [theme.breakpoints.up("md")]: {
            height: "320px",
          },
          [theme.breakpoints.up("em")]: {
            height: "365px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "365px",
          },
        },
        /*last column */
        "& .columnWrapper": {
          position: "relative",
          width: "100%",
          borderRadius: theme.borderRadius.value,
          overflow: "hidden",
          [theme.breakpoints.up("xs")]: {
            height: "270px",
          },
          [theme.breakpoints.up("md")]: {
            height: "320px",
          },
          [theme.breakpoints.up("em")]: {
            height: "365px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "auto",
          },
        },
        "& .secondColumnLastCard": {
          position: "relative",
          width: "100%",
          borderRadius: theme.borderRadius.value,
          [theme.breakpoints.up("xs")]: {
            height: "270px",
          },
          [theme.breakpoints.up("md")]: {
            height: "320px",
          },
          [theme.breakpoints.up("em")]: {
            height: "365px",
          },
          [theme.breakpoints.up("lg")]: {
            height: "225.5px",
          },
        },
        "& .fullHeight": {
          height: "100%",
          display: "flex",
        },
      },
    },
  };
});
