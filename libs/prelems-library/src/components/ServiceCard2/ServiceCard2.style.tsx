import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";
import ServiceCard2Background from "../../assets/ServiceCard2Background.svg";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceCard2Prelem: {
      "&.serviceCard2PrelemBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .sliderWrapperLarge": {
          width: "100%",
          alignItems: "center",
          [theme.breakpoints.up("xs")]: {
            display: "none",
          },
          [theme.breakpoints.up("md")]: {
            display: "flex",
            flexDirection: "column"
          },
          [theme.breakpoints.up("em")]: {
            flexDirection: "row"
          },
          "& .allCardItemsWrapper": {
            [theme.breakpoints.up("xs")]: {
              padding: "10px 10px 10px 10px",
              display: "none",
            },
            [theme.breakpoints.up("xs")]: {
              display: "flex",
            },
            [theme.breakpoints.up("md")]: {
              padding: 0,
              marginLeft: "-15px",
              display: "flex",
            },
            [theme.breakpoints.up("em")]: {
              marginLeft: 0,
            },
            [theme.breakpoints.up("lg")]: {
              padding: "90px 0px 10px 40px",
              display: "flex",
            },
            [theme.breakpoints.up("xl")]: {
              padding: "10px 0px 10px 40px",
              display: "flex",
            },
            backgroundImage: `url(${ServiceCard2Background})`,
            overflowX: "auto",
            "& .indicisualCard": {
              height: "auto",
              width: "42.33%",
              minWidth: "42%",
              [theme.breakpoints.up("lg")]: {
                width: "33.33%",
                minWidth: "33%",
              }
            },
            "& .titleWrapper": {
              [theme.breakpoints.up("md")]: {
                width: "100%",
              },
              [theme.breakpoints.up("em")]: {
                width: "30%",
              },
              display: "inline-block",
            }
          },
          "& .overlayWrapper": {
            [theme.breakpoints.up("md")]: {
              width: "100%",
            },
            [theme.breakpoints.up("em")]: {
              width: "70%"
            },
            display: "inline-block",
            position: "relative",
            paddingBottom: "10px",
          }
        },
        "& .serviceCardsItems": {
          height: "100%",
          background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
          border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
          borderRadius: theme.borderRadius.value,
          boxShadow: "none",
          marginLeft: theme.spacing(2),
        },
        "& .sliderWrapperSmall": {
          backgroundImage: `url(${ServiceCard2Background})`,
          "& .textWrapper": {
            paddingBottom: "10px",
            textAlign: "center",
            [theme.breakpoints.up("xs")]: {
              display: "block",
            },
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
            backgroundColor: theme.palette.prelemType1.BACKGROUND,
          },
          "& .sliderInnerWrapper": {
            paddingTop: "10px",
            [theme.breakpoints.up("xs")]: {
              display: "block",
            },
            [theme.breakpoints.up("md")]: {
              display: "none",
            },
          }
        },
        "& .autorenewIcon": {
          width: "70px",
          height: "70px",
          color: theme.palette.autoRenewIcon,
          margin: "auto",
          [theme.breakpoints.down("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
        "& .add-content-overlay": {
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
        },
        "& .title": {
          color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
          marginTop: 0,
         },
         "& .description": {
          color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
          marginTop: 0,
         },
      },
    },
  };
});
