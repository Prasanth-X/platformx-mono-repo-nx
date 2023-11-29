import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    shippingDetailWrapper: {
      "&.shippingDetailPage": {
        background: theme.palette.prelemType1.BACKGROUND,
        paddingTop: theme.spacing(6),
        "& .rightGap": {
          paddingRight: "0px",
          [theme.breakpoints.up("em")]: {
            paddingRight: "15px",
          },
          "& .custom-textbox": {
            marginTop: "15px",
          },
          "& .custom-dropdown": {
            marginTop: "15px",
            // background: theme.palette.primaryColor[400],
          },
        },
        "& .rightGap1": {
          [theme.breakpoints.up("em")]: {
            paddingRight: "30px",
          },
        },
        "& .textWrapper": {
          paddingRight: 0,
          [theme.breakpoints.up("em")]: {
            // paddingRight: "15px"
          },
          display: "flex",
          justifyContent: "space-between",
          margin: 0,
          "& button": {
            marginRight: 0,
          },
        },
        "& .textProp": {
          textDecoration: "none",
        },
        "& .rightSectionBg": {
          background: theme.palette.prelemType3.BACKGROUND,
        },
      },
    },
  };
});
