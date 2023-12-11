import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    dynamicPrelemWrapper: {
      "&.dynamicPrelemBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .topContent": {
          textAlign: "center",
          "& p": {
            width: "57%",
            marginLeft: "auto",
            marginRight: "auto",
            [theme.breakpoints.down("em")]: {
              width: "100%",
            },
          },
        },
        "& .CardBoxWp": {
          height: "430px",
          border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
          borderRadius: theme.borderRadius.value1,
          "&:hover": {
            border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR_HOVER}`,
          },
        },
        "& .overlay-wrapper": {
          position: "relative",
          height: "100%",
          width: "100%",
          borderRadius: theme.borderRadius.value,
          "&:hover": {
            cursor: "pointer",
          },
          "& .imageWrapper": {
            position: "relative",
            display: "flex",
            height: "100%",
            width: "100%",
            borderRadius: theme.borderRadius.value,
            padding: 0,
            overflow: "hidden",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "flex",
            },
            "& .bottomButtomWrapper": {
              position: "absolute",
              width: "100%",
              padding: "0px 10px",
              bottom: "-2px",
              "& button": {
                width: "100%",
                margin: 0,
              },
            },
          },
          "& .image-button-text": {
            position: "absolute",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.borderRadius.value,
            top: 0,
            "& .topButtomWrapper": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "0px",
              width: "100%",
              padding: "10px 20px",
              "& button": {
                width: "100%",
                margin: 0,
              },
            },
          },
          "& .cardContentBox": {
            boxShadow: "none",
            borderRadius: theme.borderRadius.value1,
            background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            "& .cardTitle": {
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1",
              overflow: "hidden",
              margin: 0,
            },
            "& .cardDescription": {
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "2",
              overflow: "hidden",
              // marginBottom: 0,
            },
            "& .imgBox": {
              height: "234px",
              position: "relative",
              [theme.breakpoints.down("sm")]: {
                height: "204px",
              },
              "& img": {
                height: "100%",
              },
              "& .imgboxOverlay": {
                position: "absolute",
                background: `rgba(${theme.palette.overlay["cardOverlay"]})`,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
              },
            },
            "& .IconBox": {
              position: "absolute",
              bottom: "20px",
              left: "20px",
              width: "1em",
            },
            "& .IconBoxWrapper": {
              position: "absolute",
              top: "20%",
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "40px",
              width: "1em",
              "& svg": {
                fontSize: "40px",
              },
            },
            "& .devider": {
              margin: "0 10px",
              height: "1px",
            },
            "& .BottomButtonBox": {
              padding: "10px",
              justifyContent: "space-between",
              position: "absolute",
              bottom: "5px",
              width: " 100%",
              "& button": {
                width: "100%",
                margin: 0,
              },
              "& .adminDatdWrapper": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                [theme.breakpoints.between("sm", "md")]: {
                  alignItems: "start",
                  flexDirection: "column",
                },
                "& p": {
                  margin: 0,
                },
              },
            },
            "& .childCard": {
              "& .cardTitle": {
                color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
              },
              "& .cardDescription": {
                color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
              },
              "&.BottomButtonBox p": {
                color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
              },
            },
          },
        },
        "& .pointer": {
          cursor: "pointer",
          textAlign: "center",
        },
        "& .noDataFoundWrapper": {
          display: "flex",
          justifyContent: "center",
          width: "100%",
          [theme.breakpoints.up("xs")]: {
            height: "185px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "100%",
          },
        },
        "& .noDataFound": {
          margin: "0 auto 20px",
          textAlign: "center",
          [theme.breakpoints.up("xs")]: {
            width: "100%",
          },
          [theme.breakpoints.up("lg")]: {
            width: "80%%",
          },
        },
        "& .card2Content": {
          width: "100%",
          borderRadius: theme.borderRadius.value1,
          background: "linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)",
          [theme.breakpoints.up("xs")]: {
            padding: "20px 19px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "20px 80px 20px 19px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "20px 150px 20px 19px",
          },
          position: "absolute",
          bottom: 0,
          left: 0,
        },
        "& .card2ContentInnerWrapper": {
          height: "40px",
          display: "inline-flex",
          alignItems: "flex-end",
        },
        "& .card2bottomButtonBox": {
          paddingLeft: "0 !important",
          paddingRight: "0 !important",
        },
        "& .add-content-overlay": {
          background: "rgba(55,79,213,0.9)",
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
        "& .title button": {
          height: "100%",
        },
        "& .expertise-show-case button": {
          padding: 0,
        },
        "& .button-name button": {
          width: "250px",
          height: "49px",
          [theme.breakpoints.up("sm")]: {
            width: "100%",
          },
        },
        "& .authorName": {
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: "1",
          overflow: "hidden",
          [theme.breakpoints.up("sm")]: {
            maxWidth: "120px",
          },
          [theme.breakpoints.up("em")]: {
            maxWidth: "70px",
          },
          [theme.breakpoints.up("lg")]: {
            maxWidth: "125px",
          },
        },
      },
    },
  };
});
