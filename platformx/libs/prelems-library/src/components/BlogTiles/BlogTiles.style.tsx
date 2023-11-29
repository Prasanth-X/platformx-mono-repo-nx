import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    blogTilesWrapper: {
      "&.blogTilesBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .blogTitleWrapper": {
          display: "flex",
          justifyContent: "space-between",
          [theme.breakpoints.up("xs")]: {
            alignItems: "flex-start",
            flexDirection: "column",
          },
          [theme.breakpoints.up("md")]: {
            alignItems: "center",
            flexDirection: "row",
          },
        },
        "& .blogTilesInnerWrapper": {
          position: "relative",
          marginLeft: "-12px",
          marginRight: "-12px",
          width: "calc(100% + 24px)",
          "& .fivecardswp": {
            "& .blogTilesCardContent": {
              minHeight: "0",
            },
          },
        },
        "& .blogTilesCardWrapper": {
          boxShadow: "none!important",
          position: "relative",
          height: "100%",
          width: "100%",
          "&:hover": {
            cursor: "pointer",
          },
        },
        "& .blogTilesCard": {
          background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
          border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
          boxShadow: "none",
          cursor: "pointer",
          height: "100%",
          display: "flex!important",
          flexDirection: "column",
          position: "relative",
          borderRadius: theme.borderRadius.value1,
          "&:hover": {
            border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR_HOVER}`,
            boxShadow: theme.palette.prelemType1.CARDS.VARIANT1.BOX_SHADOW,
          },
          "& .blogTilesCardMediaWrapper": {
            display: "inline-block",
            position: "relative",
          },
          "& .blogTilesCardMedia": {
            [theme.breakpoints.up("xs")]: {
              // height:"204px",
              marginBottom: "25px",
            },
            [theme.breakpoints.up("sm")]: {
              // height: "382px",
            },
            [theme.breakpoints.up("md")]: {
              // height: "245px",
              marginBottom: 0,
            },
            [theme.breakpoints.up("em")]: {
              // height: "310px",
            },
            [theme.breakpoints.up("lg")]: {
              // height: "411px",
            },
            position: "relative",
            "& .cardOverlay": {
              position: "absolute",
              background: `rgba(${theme.palette.overlay["cardOverlay"]})`,
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
            },
            "& .contentIcons": {
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: "16px",
              left: "16px",
            },
          },
          "& .blogTilesCardContent": {
            padding: "0 16px 8px 16px",
            minHeight: "190px",
            "& .actions": {
              justifyContent: "space-between",
              padding: 0,
              marginBottom: "12px",
              "& .centerItem": {
                display: "flex",
                alignItems: "center",
                "& .gap": {
                  marginLeft: "5px !important",
                  marginBottom: 0,
                  marginTop: 0,
                },
                "& .blockItem": {
                  display: "inline-block",
                  marginRight: "5px",
                  position: "relative",
                  top: "-3px",
                },
              },
            },
            "& .gap": {
              marginLeft: "5px !important",
            },
            "& .doublebr, & .fiveline": {
              color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
              "&.title": {
                color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
              },
            },
            "& .title": {
              color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
            },
            "& .publishedBy": {
              color: theme.palette.prelemType1.CARDS.VARIANT1.LABEL,
            },
            "& .marginZero": {
              margin: 0,
            },
          },
        },
        "& .replaceWrapper": {
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
            height: "100%",
          },
        },
        "& .noDataAlingment": {
          margin: "0 auto 20px",
          textAlign: "center",
          [theme.breakpoints.up("xs")]: {
            width: "100%",
          },
          [theme.breakpoints.up("sm")]: {
            width: "100%",
          },
          [theme.breakpoints.up("md")]: {
            width: "80%",
          },
          [theme.breakpoints.up("lg")]: {
            width: "80%",
          },
        },
        "& .fullwidth": {
          width: "100%",
        },
        "& .rightGrid": {
          "& .blogTilesCardContent .actions": {
            "& .Boxdivcontent.centerItem": {
              "& div:first-child": {
                [theme.breakpoints.up("xl")]: {
                  maxWidth: "95px",
                },
              },
              [theme.breakpoints.up("em")]: {
                display: "block",
                "& .gap": {
                  marginLeft: "0 !important",
                },
              },
              [theme.breakpoints.up("xl")]: {
                display: "flex",
                "& .gap": {
                  marginLeft: "5px !important",
                },
              },
            },
          },
        },
        /* for card2 */
        "& .blogTilesCard2Type2": {
          boxShadow: "none!important",
          position: "relative",
          height: "100%",
          width: "100%",
          borderRadius: theme.borderRadius.value1,
          "& .noShadow": {
            boxShadow: "none",
            cursor: "pointer",
          },
          "& .alignText": {
            display: "flex",
            alignItems: "center",
          },
          "& .blogTilesCardMedia1": {
            overflow: "hidden",
            position: "relative",
          },
          "& .cardOverlay1": {
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "45%",
            background: "linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)",
          },
          "& .contentIcons1": {
            width: "47px",
            position: "absolute",
            left: "42px",
            bottom: "39px",
            display: "inline-flex",
            alignItems: "flex-end",
          },
          "& .blogTilesCardContent.extraGap": {
            width: "100%",
            [theme.breakpoints.up("xs")]: {
              padding: "25px 0",
            },
            [theme.breakpoints.up("md")]: {
              padding: "0 0 0 35px",
            },
            [theme.breakpoints.up("lg")]: {
              padding: "0 0 0 46px",
            },
          },
        },
      },
    },
  };
});
