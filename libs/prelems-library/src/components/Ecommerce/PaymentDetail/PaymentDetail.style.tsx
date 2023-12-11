import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    paymentDetailSectionWrapper: {
      "&.paymentDetailSelection": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .paymentDetail": {
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          marginTop: "12px",
          "& .custom-textbox": {
            marginTop: "15px",
          },
          "& .custom-dropdown": {
            marginTop: "15px",
          },
          "&.same-address": {
            paddingRight: "24px",
            paddingBottom: "24px",
            [theme.breakpoints.up("em")]: {
              paddingRight: "12px",
            },
          },
        },
        "& .addressWrapperBg": {
          background: theme.palette.prelemType3.BACKGROUND,
        },
        "& .boxWrapper": {
          [theme.breakpoints.up("sm")]: {
            paddingRight: 0,
          },
          [theme.breakpoints.up("em")]: {
            paddingRight: "30px",
          },
        },
        "& .paymentDetailRightSidebarwrapper": {
          display: "none",
          [theme.breakpoints.up("sm")]: {
            display: "block",
          },
        },
        "& .linkBtn": {
          textDecoration: "none",
          marginBottom: "20px",
          [theme.breakpoints.up("md")]: {
            marginBottom: 0,
          },
        },
      },
    },
  };
});
