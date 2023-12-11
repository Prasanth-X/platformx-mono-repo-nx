import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    mainDivCouponPopup: {
      // "&.mainDivDialog": {
      "&.mainDivPopup": {
        backgroundColor: theme.palette.prelemType1.BACKGROUND,
        padding: "0px",
        "& .Textbox": {
          margin: "20px 0px 20px 0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        "& .Textbox2": {
          border: "1px solid #D9DBE9",
          borderRadius: "5px",
        },
        "& .TextboxExtra": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          margin: "20px 0px 20px 0px",
          border: "1px solid #D9DBE9",

          borderRadius: "5px",
        },
        "& .TextboxExtraCss": {
          padding: " 14px 20px",
        },
        "& .ApplyCouponMainBox": {
          padding: "0px",
          margin: "20px",
        },
        "& .BoxCursorPointer": {
          cursor: "pointer",
          "& svg": {
            fill: theme.palette.prelemType1.TITLE,
          },
        },
        "& .ApplyCouponBox": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        "& .TypographyApplyCouponBox": {
          margin: "0px",
        },
        "& .TextFieldbox": {
          width: "100%",
          marginRight: "8px",
        },
        "& .dividerColor": {
          borderColor: "#D9DBE9",
        },
        "& .TypographyMarginZero": {
          marginBottom: "0px",
          marginTop: "0px",
        },
        "& .TypographyMarginTop": {
          marginBottom: "0px",
        },
        "& .BoxScrollDiv": {
          overflowY: "auto",
          overflowX: "hidden",
          height: "306px",
        },
        "& .BoxFirstCoupon": {
          display: "flex",
          justifyContent: "flexstart",
          alignItems: "center",
          marginBottom: "12px",
          padding: "0px",
        },
        "& .TypograpgyFirstCouponCode": {
          color: theme.palette.prelemType1.LINK,
          border: "1px dashed  #4B9EF9",
          borderRadius: "5px",
          padding: "6px 12px",
          margin: "0px",
          width: "auto",
        },
        "& .TypographyExpiry": {
          margin: "0px",
          paddingRight: "10px",
        },
        "& .TypographyExpiryDate": {
          margin: "0px",
        },
        "& .TypographyOtherCoupon": {
          margin: "0px",
        },
        "& .TextboxExtraPadding": {
          padding: "14px 20px 10px 20px",
        },
        "& .BoxOtherCoupon": {
          display: "flex",
          justifyContent: "flexstart",
          alignItems: "center",
          marginBottom: "12px",
          padding: "0px",
        },
        "& .TypograpgyDivOtherCoupon": {
          color: theme.palette.prelemType1.LINK,
          border: "1px dashed #4B9EF9",
          borderRadius: "5px",
          padding: "6px 12px",
          margin: "0px",
          width: "auto",
        },
        "& .TypograpgySave": {
          margin: "0px",
          marginTop: "10px",
        },
        "& .OtherCouponsTypograpgyExpiry": {
          margin: "0px",
          paddingRight: "10px",
        },
        "          & .BoxMaximumSavings": {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px 10px 20px",
          boxShadow: "0px -15px 20px 0px rgba(0, 0, 0, 0.04) ",
        },
        "& .CircleIconStyle": {
          color: theme.palette.prelemType1.PARAGRAPH,

          marginRight: "20px",
        },
        "& .TypograpgyOffOnMin": {
          margin: "0px",
        },
        "& .TypograpgyBoxCss": {
          display: "flex",
          marginBottom: "10px",
        },
        " & .BoxTypograpgyExpiryAndDate": {
          display: "flex",
          marginBottom: "10px",
        },
        "& .OtherCouponTypograpgyDate": {
          margin: "0px",
        },
        "& .TopBottomMarginZero": {
          marginTop: "0px",
          marginBottom: "0px",
        },
      },
    },
  };
});
