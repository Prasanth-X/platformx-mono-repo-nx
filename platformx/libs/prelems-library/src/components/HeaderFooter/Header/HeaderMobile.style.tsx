import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    xMobileheader: {
      "&.xMobileHeaderWrapper": {
        background: theme.palette.header.VARIANT1.BACKGROUND,
        "& .xMobileTopSection": {
          display: "flex",
          padding: "13.5px 3%",
          alignItems: "center",
        },
        "& .menuCloseIcon": {
          cursor: "pointer",
          width: "auto",
        },
        "& .menuListWrapper": {
          justifyContent: "center",
        },
        "& .listButtonItemGap": {
          paddingTop: "0px",
          paddingBottom: "0px",
          "& svg": {
            fill: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .listButtonTextGap": {
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& .alignSubMenuItem": {
          textAlign: "center",
          padding: "0 16px",
        },
        "& .alignSubMenuText": {
          textAlign: "left",
          paddingLeft: "10px",
          margin: 0,
        },
        "& .btnOutlined": {
          whiteSpace: "nowrap",
          marginRight: "20px",
          width: "200px",
          textTransform: "none",
        },
      },
    },
    xMobileheaderTopSection: {
      "&.mobileHeaderTop": {
        "& .ecommercePanel": {
          margin: "15px 10px 10px 10px",
          "& svg": {
            fill: theme.palette.header.VARIANT1.TITLE,
          },
        },
        "& .menuIcon": {
          padding: 0,
          color: theme.palette.header.VARIANT1.TITLE,
        },
        "& .pointer": {
          cursor: "pointer",
        },
        "& .headerTopToolbar": {
          padding: 0,
        },
        "& .toolbarInnerWrapper": {
          flexGrow: 1,
        },
        "& .headerFlagIcon": {
          marginRight: "10px",
        },
      },
    },
  };
});
