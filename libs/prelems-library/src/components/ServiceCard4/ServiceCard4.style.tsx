import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ServiceCard4Wrapper: {
      "&.ServiceCard4": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .ServiceCard4Slider": {
          "& .slider-wrapper": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "nowrap",
            padding: "20px 85px",
            height: "100vh",
            position: "relative",
            overflow: "hidden",
            [theme.breakpoints.down("em")]: {
              padding: "20px 50px",
            },
            [theme.breakpoints.down("sm")]: {
              padding: "30px 20px 100px",
              justifyContent: "center",
              height: "auto",
              flexWrap: "wrap",
            },
            "& .contentWrapper": {
              maxWidth: "50%",
              textAlign: "left",
              boxSizing: "border-box",
              margin: 0,
              position: "relative",
              minHeight: "140px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              [theme.breakpoints.down("sm")]: {
                maxWidth: "100%",
                margin: "0 0 30px",
              },
            },
            "& .imageWrapper": {
              width: "42%",
              height: "75vh",
              maxHeight: "500px",
              margin: 0,
              position: "relative",
              maxWidth: "500px",
              [theme.breakpoints.down("sm")]: {
                width: "100%",
                height: "330px",
                margin: "0 auto",
                maxWidth: "400px",
              },
              "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
              },
            },
          },
          "& .slick-slider": {
            position: "relative",
            display: "block",
            boxSizing: "border-box",
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
            KhtmlUserSelect: "none",
            touchAction: "pan-y",
            WebkitTapHighlightColor: "transparent",
            zIndex: 1,
            "& .slick-list": {
              transform: "translate3d(0, 0, 0)",
              position: "relative",
              display: "block",
              overflow: "hidden",
              margin: "0",
              padding: "0",
            },
            "& .slick-track": {
              transform: "translate3d(0, 0, 0)",
              position: "relative",
              top: "0",
              left: "0",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            },
          },
          "& .slick-track:before": {
            display: "table",
            content: "''",
          },
          "& .slick-track:after": {
            display: "table",
            content: "''",
          },
        },
        "& .rightBgWrapper": {
          height: "100%",
          width: "30%",
          position: "absolute",
          right: "0",
          top: "0",
          background: theme.palette.prelemType1.CARDS.VARIANT2.BACKGROUND,
          [theme.breakpoints.down("md")]: {
            width: "38%",
          },
        },
        "& .ReplaceWrapper": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          "& .WrapperBoxIcons": {
            cursor: "pointer",
            textAlign: "center",
            "& .overLaytextgap": {
              marginTop: "0px",
            },
            "& .autorenewIcon": {
              fill: theme.palette.autoRenewIcon,
              [theme.breakpoints.up("xs")]: {
                width: "50px",
                height: "50px",
              },
              [theme.breakpoints.up("sm")]: {
                width: "50px",
                height: "50px",
              },
            },
          },
        },
      },
    },
  };
});
