import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    sliderPrelemWrapper: {
      "&.slideshow-container": {
        width: "100%",
        position: "relative",
        margin: "auto",
        "& .prev, & .next": {
          cursor: "pointer",
          position: "absolute",
          top: "50%",
          width: "auto",
          padding: "8px",
          paddingBottom: "4px",
          marginTop: "-22px",
          color: theme.palette.prelemType1.TITLE,
          fontWeight: "bold",
          transition: "0.6s ease",
          borderRadius: "0 3px 3px 0",
          userSelect: "none",
          border: "none",
          background: theme.palette.prelemType1.BACKGROUND,
          "& svg": {
            fontSize: "30px",
          },
          [theme.breakpoints.down("sm")]: {
            "& svg": {
              fontSize: "20px",
            },
          },
          "&:hover": {
            background: theme.palette.prelemType1.LINK,
            color: "#fff",
          },
        },
        "& .next": {
          right: 0,
          borderRadius: "3px 0 0 3px",
        },
        "& .mySlides": {
          display: "none",
        },
        "& .dot": {
          cursor: "pointer",
          height: "15px",
          width: "15px",
          margin: "0 2px",
          backgroundColor: "#bbb",
          borderRadius: "50%",
          display: "inline-block",
          transition: "background-color 0.6s ease",
          "&:hover, &.active": {
            background: theme.palette.prelemType1.LINK,
          },
        },
        "& .inside": {
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: "8px",
        },
        "& .outside": {
          textAlign: "center",
        },
        "& .fade": {
          animationName: "fade",
          animationDuration: "2s",
          width: "100%",
          height: "100%",
        },
        "&.cardType .fade": {
          display: "flex",
        },
        "& .buttonWrapper": {
          width: "100%",
        },
        "&.outside-arrow": {
          paddingTop: "30px",
          "& .buttonWrapper": {
            width: "60px",
            position: "absolute",
            top: "20px",
            right: 0,
            "& .prev, & .next": {
              padding: "4px",
              width: "28px",
              borderRadius: "4px",
            },
          },
        },
        "& .thumbnails": {
          float: "left",
          width: "100%",
          "& .thumbCenter": {
            margin: "0px auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          },
          "& .thumb": {
            display: "flex",
            margin: "3px",
            overflow: "hidden",
            borderRadius: "8px",
            border: "solid 2px transparent",
            opacity: 0.6,
            [theme.breakpoints.up("xs")]: {
              width: "60px",
              height: "50px",
            },
            [theme.breakpoints.up("sm")]: {
              width: "90px",
              height: "75px",
            },
            [theme.breakpoints.up("md")]: {
              width: "144px",
              height: "110px",
            },
            "&:hover": {
              opacity: 1,
              border: `solid 2px ${theme.palette.prelemType1.LINK}`,
            },
            "& .thumbImage": {
              cursor: "pointer",
              borderRadius: "8px",
              width: "100%",
              height: "100%",
            },
            "&.active": {
              opacity: 1,
              border: `solid 2px ${theme.palette.prelemType1.LINK}`,
            },
          },
        },
      },
    },
  };
});
