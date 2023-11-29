import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    FeatureBox1Wrapper: {
      "&.FeatureBox1": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .featureBox1CardContent": {
          width: "100% !important",
          minHeight: "215px",
          margin: "0",
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          borderRadius: theme.borderRadius.value,
          textAlign: "left",
          boxShadow: "none",
          [theme.breakpoints.down("sm")]: {
            width: "100% !important",
            minHeight: "185px",
            margin: "5% 0",
          },
          background: theme.palette.prelemType1.CARDS.VARIANT2.BACKGROUND,
          "& .featureLabel": {
            color: theme.palette.prelemType1.CARDS.VARIANT2.LABEL,
          },
          "& .featureTitle": {
            color: theme.palette.prelemType1.CARDS.VARIANT2.TITLE,
          },
          "& .cardFeatureDescription": {
            color: theme.palette.prelemType1.CARDS.VARIANT2.PARAGRAPH,
          },
          "& .FeatureBox1WhiteBox": {
            display: "inline-block",
            textAlign: "center",
            overflow: "hidden",
            width: "70px",
            height: "70px",
            backgroundColor: theme.palette.textColor,
            marginBottom: "10px",
            [theme.breakpoints.down("sm")]: {
              width: "50px",
              height: "50px",
            },
          },
        },
        "& .title": {
          marginLeft: "8px",
        },
        "& .featureBox1InnerWrapper": {
          [theme.breakpoints.down("md")]: {
            padding: "0px 8px",
          },
        },
        "& .ReplaceWrapper": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "0",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          "& .WrapperBoxIcons": {
            cursor: "pointer",
            textAlign: "center",
            "& .overLaytextgap": {
              marginTop: "0px",
            },
            "& .autorenewIcon": {
              fill: theme.palette.autoRenewIcon,
              [theme.breakpoints.up("xs")]: {
                width: "50px",
                height: "50px",
              },
              [theme.breakpoints.up("sm")]: {
                width: "50px",
                height: "50px",
              },
            },
          },
        },
      },
    },
  };
});
