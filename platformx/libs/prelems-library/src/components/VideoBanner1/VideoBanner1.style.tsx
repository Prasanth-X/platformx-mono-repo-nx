import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    videoBanner1Wrapper: {
      "&.videoBanner1": {
        scrollBehavior: "smooth",
        width: "100%",
        height: "100vh",
        "& .animatorContainer": {
          position: "absolute",
          width: "100%",
          zIndex: 1,
          "& .banner": {
            position: "relative",
            width: "100%",
            overflow: "hidden",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "& img": {
              width: "100%",
              height: "100%",
            },
            "& .react-player-anime": {
              width: "100% !important",
              height: "100vh !important",
              "& video": {
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                objectFit: "cover",
              },
            },
            "& .bannerText": {
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12vw",
              lineHeight: "12vw",
              margin: 0,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#000",
              textAlign: "center",
              color: theme.palette.textColor,
              mixBlendMode: "multiply",
            },
          },
          "& .anibuttonwrapper": {
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            margin: "auto",
            width: "100%",
            textAlign: "center",
            "& .videobanner1mouse-indicator": {
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              height: "50px",
              bottom: "50px",
              "& .vb1mouse-down": {
                cursor: "pointer",
                position: "relative",
                display: "inline-flex",
                alignItems: "center",
                animation: "nudgeMouse 2.4s cubic-bezier(0.250,0.460,0.450,0.940) infinite",
                "& svg": {
                  width: "22px",
                  color: "#fff",
                },
              },
              "& .vb1mouse-down:before": {
                position: "absolute",
                content: "''",
                display: "block",
                left: "50%",
                marginLeft: "-1px",
                top: "19px",
                backgroundColor: "#fff",
                width: "2px",
                height: "6px",
                borderRadius: "10px",
                transition: "background-color .55s cubic-bezier(.5,.1,.07,1)",
                WebkitAnimation:
                  "trackBallSlide 2.4s cubic-bezier(0.000,0.000,0.725,1.000) infinite",
                animation: "trackBallSlide 2.4s cubic-bezier(0.000,0.000,0.725,1.000) infinite",
              },
            },
          },
        },
        "& .bottomWrapper": {
          width: "100%",
          height: "100vh",
          position: "relative",
          "& .react-player": {
            height: "100vh !important",
            width: "100% !important",
            "& video": {
              objectFit: "cover",
            },
          },
          "& .bottomWraperImg": {
            width: "100%",
            height: "100vh",
            objectFit: "cover",
          },
        },
      },
    },
  };
});
