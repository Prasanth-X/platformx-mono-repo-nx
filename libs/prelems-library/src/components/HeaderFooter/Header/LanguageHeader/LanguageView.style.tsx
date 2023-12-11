import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    languageViewWrapper: {
      "&.languageViewWrapperDesktop": {
        "& .languageDesktopView": {
          background: theme.palette.header.VARIANT1.BACKGROUND,
          color: theme.palette.header.VARIANT1.TITLE,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          marginTop: theme.spacing(1.5),
          "&:before": {
            backgroundColor: theme.palette.header.VARIANT1.BACKGROUND,
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
          "& svg": {
            color: theme.palette.header.VARIANT1.TITLE,
          },
          "& .gapLeft": {
            marginLeft: "40px",
          },
        },
      },
    },
    languageViewWrapper1: {
      "&.languageViewWrapperMobile": {
        "& .languageMobileView": {
          background: theme.palette.header.VARIANT1.BACKGROUND,
          color: theme.palette.header.VARIANT1.TITLE,
          "& svg": {
            color: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .languageText": {
          marginLeft: "10px",
        },
        "& .gapLeftMobile": {
          position: "absolute",
          right: "20px",
        },
      },
    },
  };
});
