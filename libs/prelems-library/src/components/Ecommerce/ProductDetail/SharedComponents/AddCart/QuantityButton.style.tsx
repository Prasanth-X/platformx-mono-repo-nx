import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    buttonWrapper: {
      "&.quantityButtonWrapper": {
        border: `1px solid ${theme.palette.prelemType1.LINE}`,
        background: "transparent",
        padding: "10px 10px",
        minWidth: "107px",
        height: "47px",
        display: "flex",
        alignContent: "center",
        justifyContent: "space-around",
        alignItems: "center",
        "& .transparentBtnMinus": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "none",
          },
          "&:disabled": {
            opacity: 0.6,
          },
          backgroundColor: "transparent",
          border: "none",
          minWidth: "20px !important",
          padding: "0px !important",
          color: theme.palette.prelemType1.TITLE,
        },
        "& .transparentBtnValue": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "none",
            color: theme.palette.prelemType1.TITLE,
          },
          "&:disabled": {
            opacity: 0.6,
          },
          backgroundColor: "transparent",
          border: "none",
          minWidth: "20px !important",
          padding: "0px !important",
          color: theme.palette.prelemType1.TITLE,
          cursor: "default",
          fontWeight: "600",
        },
        "& .transparentBtnPlus": {
          "&:hover": {
            backgroundColor: "transparent",
            border: "none",
          },
          "&:disabled": {
            opacity: 0.7,
          },
          backgroundColor: "transparent",
          border: "none",
          minWidth: "20px !important",
          padding: "0px !important",
          color: theme.palette.prelemType1.TITLE,
        },
      },
    },
  };
});
