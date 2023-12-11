import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productDetailTabWrapper: {
      "&.full-row-tabcontainer": {
        width: "100%",
        "& .product-detail-tab-item": {
          background: theme.palette.prelemType3.TAB.VARIANT1.TITLE_BACKGROUND,
          color: theme.palette.prelemType3.TAB.VARIANT1.TITLE,
          textTransform: "capitalize",
          marginRight: "5px",
          border: "none",
          fontFamily: theme.fontFamily.secondary,
        },
        "& button.Mui-selected": {
          backgroundColor: theme.palette.prelemType3.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND,
          color: theme.palette.prelemType3.TAB.VARIANT1.TITLE_ACTIVE,
        },
        "& .product-detail-tabs .MuiTabs-indicator": {
          display: "none",
        },
        "& .tab-detail-wrapper": {
          background: theme.palette.prelemType3.TAB.VARIANT1.BACKGROUND_COLOR,
          borderTop: `1px solid ${theme.palette.prelemType3.LINE}`,
          borderBottom: `1px solid ${theme.palette.prelemType3.LINE}`,
          minHeight: "150px",
        },
        "& .tab-detail": {
          padding: "0px 110px",
        },
      },
    },
  };
});
