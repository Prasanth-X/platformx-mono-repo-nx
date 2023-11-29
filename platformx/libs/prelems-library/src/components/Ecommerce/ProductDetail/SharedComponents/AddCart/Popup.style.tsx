import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    //styles
    mainDivPopup: {
      "&.mainDiv": {
        backgroundColor: theme.palette.prelemType1.BACKGROUND,
        "& .closeIconCss": {
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: "10px",
          marginRight: "10px",
          cursor: "pointer",
          "& svg": {
            fill: theme.palette.prelemType1.TITLE,
          },
        },
        "& .secondBox": {
          margin: "20px 40px",
        },
        "& .BoxCoinImage": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        },
        "& .DivTypography1": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        "& .TypographyShopEarn": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // color: "#14142B",
          margin: "0px",
          marginBottom: "20px",
        },
        "& .BoxMargin": {
          marginBottom: "20px",
        },

        "& .DivTypograpgyShop": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // color: "#14142B",
          margin: "0px",
        },

        "& .BoxBottonMargin": {
          marginBottom: "20px",
        },
        "& .TypograpgyDescription": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          // color: "#14142B",
          margin: "0px",
        },
        "& .LastBox": {
          marginBottom: "30px",
          // background: "#F3FAFF",
          background: theme.palette.prelemType1.ACCENTS.VARIANT2.BACKGROUND,
          border: "1px solid #8CC8FA",
        },

        "& .TypoLast": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          // color: "#14142B",
          color: theme.palette.prelemType1.ACCENTS.VARIANT2.TITLE,
          margin: "10px 44px",
        },
      },
    },
  };
});
