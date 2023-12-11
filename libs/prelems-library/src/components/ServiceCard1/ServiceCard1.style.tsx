import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceCard1Wrapper: {
      "&.serviceCard1WrapperBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .cardBoxWrapper": {
          background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
          borderColor: theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR,
          borderRadius: "0px",
          boxShadow: "none",
          height: "100%",
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          textAlign: "center",
          padding: "15px",
          "& .description": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
          },
          "& .cardMediaWrapper": {
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            margin: "20px auto 25px",
            height: "75px",
            width: "60px",
            [theme.breakpoints.down("md")]: {
              margin: "10px auto 15px",
              height: "50px",
              width: "40px",
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
