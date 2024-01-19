import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    imageAndVideoGalleryWrapper: {
      "&.imageAndVideoGalleryBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .textCenter": {
          textAlign: "center",
        },
        "& .buttonsWrapper": {
          "& .Platform-x-Tabs-flexContainer": {
            justifyContent: "center",
            marginBottom: "20px",
            "& .tab-item": {
              marginRight: 0,
              color: theme.palette.prelemType1.TAB.VARIANT1.TITLE,
              border: `solid 1px ${theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND}`,
              background: theme.palette.prelemType1.TAB.VARIANT1.TITLE_BACKGROUND,
              "&.Mui-selected": {
                color: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE,
                border: `solid 1px ${theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND}`,
                background: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND,
              },
            },
          },
        },
        "& .positionRelative": {
          position: "relative",
          "&:hover": {
            "& .replaceWrapper": {
              display: "flex",
            },
          },
        },
        "& .positionAbsolute": {
          position: "absolute",
        },
        "& .tabPanelWrapper": {
          padding: "20px 0",
          [theme.breakpoints.down("md")]: {
            padding: 0,
          },
        },
        "& .imgBoxWrapper": {
          padding: "0 !important",
          position: "relative",
          borderRadius: theme.borderRadius.value1,
          overflow: "hidden",
        },
        "& .playIconSize": {
          width: "35px",
          height: "35px",
          fill: theme.palette.textColor1,
        },
        "& .replaceWrapper": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: 0,
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          "& .overLaytextgap": {
            marginTop: "0px",
          },
        },
        "& .hideElementClass": {
          display: "none",
        },
        "& .replaceIconWrapper": {
          cursor: "pointer",
          textAlign: "center",
          "& svg": {
            width: "70px",
            height: "70px",
            marginBottom: "10px",
            color: theme.palette.autoRenewIcon,
            [theme.breakpoints.down("md")]: {
              width: "50px",
              height: "50px",
            },
          },
        },
      },
    },
  };
});
