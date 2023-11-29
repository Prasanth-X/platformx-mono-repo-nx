import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    videoBanner2Wrapper: {
      "&.videoBanner2WrapperBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .banner": {
          [theme.breakpoints.up("xs")]: {
            width: "237px",
            height: "237px",
          },
          [theme.breakpoints.up("md")]: {
            width: "350px",
            height: "350px",
          },
          [theme.breakpoints.up("lg")]: {
            width: "392px",
            height: "392px",
          },
          [theme.breakpoints.up("xl")]: {
            width: "446px",
            height: "446px",
          },
        },
        "& .silhouette": {
          background: theme.palette.prelemType1.BACKGROUND,
        },
        "& .fullViewport": {
          display: "flex",
          position: "relative",
          flexDirection: "column",
          height: `calc(100vh - ${theme.palette.header.HEADER_HEIGHT})`,
        },
        "& .mouse-down": {
          color: theme.palette.prelemType1.TITLE,
          "& svg": {
            color: theme.palette.prelemType1.TITLE,
          },
          "&:before": {
            backgroundColor: theme.palette.prelemType1.TITLE,
          },
        },
        "& .mask1": {
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
        },
      },
    },
  };
});
