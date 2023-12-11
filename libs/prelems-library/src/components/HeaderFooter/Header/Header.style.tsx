import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    xheader: {
      "&.xHeaderSectionWrapper": {
        "& .headerBackground": {
          backgroundColor: theme.palette.header.VARIANT1.BACKGROUND,
          padding: "0px 3%",
          boxShadow: "none",
          borderBottom: `1px solid ${theme.palette.header.VARIANT1.LINE}`,
        },
        "& .my0": {
          marginTop: 0,
          marginBottom: 0,
        },
        "& .shoppingCartIcon svg": {
          fill: theme.palette.header.VARIANT1.TITLE,
        },
        "& .customBadge": {
          backgroundColor: theme.palette.header.VARIANT1.BADGE.BACKGROUND,
          color: theme.palette.header.VARIANT1.BADGE.TITLE,
          marginTop: "-3px",
        },
        "& .cartButtonPadding": {
          padding: "15px",
        },
        "& .header-button": {
          whiteSpace: "nowrap",
          marginRight: 0,
          minWidth: "80px",
        },
        "& .rightMenuButtonWrapper": {
          display: "flex",
          alignItems: "center",
          "& svg": {
            fill: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .authWrapper": {
          display: "flex",
          alignItems: "center",
          "& .Platform-x-Menu-paper": {
            boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
            borderRadius: theme.borderRadius.value1,
          },
        },
        "& .x-app-menu": {
          color: theme.palette.header.VARIANT1.TITLE,
          "&:hover": {
            color: theme.palette.header.VARIANT1.TITLE_HOVER,
            backgroundColor: theme.palette.header.VARIANT1.BACKGROUND_HOVER,
          },
          "&.active": {
            backgroundColor: theme.palette.header.VARIANT1.BACKGROUND_HOVER,
          },
        },
        "& button.primaryButton2": {
          background: theme.palette.header.VARIANT1.BACKGROUND,
          color: theme.palette.header.VARIANT1.TITLE,
          border: `solid 1px ${theme.palette.header.VARIANT1.TITLE}`,
          "&:hover": {
            backgroundColor: theme.palette.header.VARIANT1.TITLE,
            color: theme.palette.header.VARIANT1.BACKGROUND,
          },
        },
      },
    },
    headerPopupMenu: {
      "&.xHeaderPopupMenuWrapper": {
        "& .firstUlWrapper": {
          display: "flex",
          margin: "30px",
          padding: "0px",
          width: "auto !important",
        },
        "& .xHeaderPopupCardWrapper": {
          backgroundColor: theme.palette.header.VARIANT1.BACKGROUND,
          color: theme.palette.header.VARIANT1.TITLE,
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          marginTop: "25px",
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: "50%",
            width: 10,
            height: 10,
            backgroundColor: theme.palette.header.VARIANT1.BACKGROUND,
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
        "& .popupMenuList": {
          width: "100%",
          maxWidth: 360,
          backgroundColor: theme.palette.header.VARIANT1.BACKGROUND,
          padding: "0",
        },
        "& .popupMenuListItems": {
          padding: "0",
          cursor: "pointer",
          display: "flex",
          minWidth: 150,
          "& a:hover": {
            backgroundColor: theme.palette.header.VARIANT1.BACKGROUND_HOVER,
          },
          "& .submenuTitle": {
            paddingBottom: "4px",
            display: "contents",
            "&:hover": {
              textShadow: "0 0 0.01px black, 0 0 0.01px black, 0 0 0.01px black",
            },
          },
        },
        "& .iconGapRight": {
          marginRight: "8px",
        },
        "& .avatarbox": {
          borderRadius: theme.borderRadius.value,
          backgroundColor: theme.palette.header.VARIANT1.BACKGROUND_HOVER,
          "& img": {
            width: "24px",
            height: "24px",
          },
        },
        "& .externalLinkIcon": {
          marginLeft: "5px",
          "&:hover": {
            backgroundColor: theme.palette.header.VARIANT1.BACKGROUND_HOVER,
          },
          "& .iconLaunch": {
            fill: theme.palette.header.VARIANT1.TITLE,
            width: "20px",
            height: "20px",
          },
        },
        "& .subMenuCards": {
          borderRadius: theme.borderRadius.value1,
          minWidth: "356px",
          maxWidth: "356px",
          backgroundColor: theme.palette.header.VARIANT1.BACKGROUND_HOVER,
          boxShadow: "none",
          alignSelf: "center",
          cursor: "pointer",
        },
        "& .subMenuCardsMedia": {
          height: "150px",
          objectFit: "cover",
        },
        "& .menuVerticalDivider": {
          margin: "20px",
          height: "auto",
          borderColor: theme.palette.header.VARIANT1.BORDER_COLOR,
          opacity: 0.4,
        },
      },
    },
  };
});
