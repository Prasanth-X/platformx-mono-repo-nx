import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    gallery1PrelemWrapper: {
      "&.gallery1PrelemBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .galleryBox": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
          padding: "15px 0 0 0",
        },
        "& .gallery1FirstBox": {
          display: "flex",
          marginBottom: "20px",
          [theme.breakpoints.down("sm")]: {
            marginBottom: "10px",
          },
        },
        "& .gallery1SecondBox": {
          display: "flex",
        },
        "& .gallery1ImageWrapper": {
          minWidth: "400px",
          maxWidth: "500px",
          height: "246px",
          padding: "0 12px",
          cursor: "pointer",
          [theme.breakpoints.down("md")]: {
            minWidth: "250px",
            maxWidth: "250px",
            height: "150px",
            padding: "0 5px",
          },
          "& img": {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            cursor: "pointer",
          },
        },
        "& .replaceWrapper": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
        },
        "& .replaceIconWrapper": {
          width: "70px",
          height: "70px",
          color: theme.palette.autoRenewIcon,
          margin: "auto",
          [theme.breakpoints.down("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
        "& .wrapperBoxIcons": {
          cursor: "pointer",
          textAlign: "center",
        },
      },
    },
  };
});
