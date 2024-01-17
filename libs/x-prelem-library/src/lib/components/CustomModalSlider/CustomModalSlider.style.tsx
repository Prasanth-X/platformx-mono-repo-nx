import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    customModalSliderWrapper: {
      "&.customModalSliderWrapperBg.image-video-gallery-modal-wrapper": {
        background: `rgba(0, 0, 0, 0.9)`,
        "& .slider-container-wrapper": {
          margin: "0px auto",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          "& .oneLineEllipsis": {
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
            textAlign: "center",
            textTransform: "capitalize",
          },
          "& .img": {
            width: "auto",
            height: `calc(100% - 120px)`,
            display: "flex",
            margin: "0px auto",
            [theme.breakpoints.down("sm")]: {
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `translate(-50%, -50%)`,
              width: "100%",
              height: "auto",
            },
          },
        },
        "& .fade": {
          position: "relative",
          width: "100%",
          height: "100vh",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
          overflow: "hidden",
          margin: "0px auto",
          "& .react-player-wrap.img": {
            width: "100%",
            [theme.breakpoints.down("sm")]: {
              height: "50% !important",
            },
            [theme.breakpoints.up("sm")]: {
              height: "70% !important",
            },
            [theme.breakpoints.up("lg")]: {
              height: "75% !important",
            },
          },
        },
        "& .thumbnails": {
          position: "absolute",
          bottom: 0,
          left: 0,
          display: "flex",
          gap: "5px",
          width: "100%",
          background: `rgba(0, 0, 0, 0.9)`,
          [theme.breakpoints.down("sm")]: {
            display: "none",
          },
          "& .thumb": {
            flex: 1,
            width: "auto",
            height: "100px" /* Fixed height for the thumbnail */,
            cursor: "pointer",
          },
        },
        "& .inside.dots": {
          display: "none",
        },
        "& .closeButton": {
          position: "absolute",
          [theme.breakpoints.up("xs")]: {
            right: "6px",
            top: "6px",
          },
          [theme.breakpoints.up("sm")]: {
            right: "15px",
            top: "12px",
          },
          padding: "0px !important",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          minWidth: "36px !important",
        },
      },
    },
  };
});

export default useCustomStyle;
