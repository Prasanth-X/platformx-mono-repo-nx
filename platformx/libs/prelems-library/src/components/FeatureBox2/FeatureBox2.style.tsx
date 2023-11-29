import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    featureBox2PrelemWrapper: {
      "&.featureBox2PrelemBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .topRightBox": {
          height: "50%",
          borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
          paddingBottom: "20px",
        },
        "& .FeatureBox2CardWrapper": {
          height: "250px",
          width: "48% !important",
          borderRadius: theme.borderRadius.value,
          textAlign: "left",
          boxShadow: "none",
          float: "left",
          margin: "0 1% 2% 1%",
          [theme.breakpoints.down("md")]: {
            height: "300px",
          },
          [theme.breakpoints.down("sm")]: {
            height: "290px",
            width: "100% !important",
          },
          background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
          "& .featureTitle": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
          },
          "& .cardFeatureDescription": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
          },
        },
        "& .FeatureBox2CardContent": {
          height: "100%",
          width: "100%",
          padding: "0 16px 16px 16px",
          float: "right",
          [theme.breakpoints.down("md")]: {
            width: "100%",
            padding: "0 10px",
          },
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            padding: "0 10px 10px 10px",
          },
          [theme.breakpoints.down("xs")]: {
            width: "100%",
            padding: "10px 0px",
          },
        },
        "& .heightAuto": {
          height: "auto",
        },
        "& .heightHalf": {
          height: "50%",
        },
        "& .ReplaceWrapper": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
        },
        "& .replaceIconWrapper": {
          width: "70px",
          height: "70px",
          color: theme.palette.autoRenewIcon,
          margin: "auto",
          [theme.breakpoints.down("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
        "& .WrapperBoxIcons": {
          cursor: "pointer",
          textAlign: "center",
        },
      },
    },
  };
});
