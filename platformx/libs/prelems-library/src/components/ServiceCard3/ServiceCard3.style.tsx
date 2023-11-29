import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceCard3Wrapper: {
      "&.serviceCard3WrapperBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .gridMainWrapper": {
          paddingTop: "10px",
          justifyContent: "center",
          "& .ServiceCardWrapperBox": {
            height: "100%",
            textAlign: "center",
            "& .imageContentWrapper": {
              width: "116px",
              height: "116px",
              marginTop: "0px",
              marginBottom: "21px",
              overflow: "hidden",
              textAlign: "center",
              display: "inline-block",
              [theme.breakpoints.down("sm")]: {
                width: "79px",
                height: "79px",
                marginTop: "25px",
                marginBottom: "15px",
              },
            },
            "& .ServiceCard3CardContent": {
              padding: "10px",
              [theme.breakpoints.down("sm")]: {
                padding: "2px",
              },
            },
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
