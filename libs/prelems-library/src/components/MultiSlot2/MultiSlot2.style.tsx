import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    multiSlot2Wrapper: {
      "&.multiSlot2BG": {
        background: theme.palette.prelemType3.BACKGROUND,
        "& .multiSlotHeading": {
          marginLeft: "8px",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          flexWrap: "wrap",
        },
        "& #Title": {
          textAlign: "justify",
        },
        "& .paperCard": {
          [theme.breakpoints.up("xs")]: {
            height: "350px",
            width: "250px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "unset",
          },
          [theme.breakpoints.up("lg")]: {
            height: "455px",
          },
          background: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          borderRadius: theme.borderRadius.value1,
          boxShadow: "none",
          border: `solid 1px ${theme.palette.prelemType3.CARDS.VARIANT1.BORDER_COLOR}`,
        },
        "& .paperCardInnerWrapper": {
          position: "absolute",
          zIndex: 1,
        },
        "& .addCardsIcon": {
          borderRadius: "50%",
          backgroundColor: theme.palette.textColor,
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: theme.spacing(2),
          cursor: "pointer",
        },
        "& .iconRefresh": {
          fill: theme.palette.prelemType3.CARDS.VARIANT1.PARAGRAPH,
        },
        "& .slick-prev, & .slick-next": {
          background: theme.palette.textColor1,
          color: theme.palette.textColor,
        },
        /* card css*/

        "& .multiSlotCard2": {
          boxShadow: "none !important",
          position: "relative",
          height: "100%",
          width: "100%",
          "&:hover": {
            "& img.bgimage": {
              transform: "scale(1.2)",
            },
            cursor: "pointer",
          },
          "& .cardItem": {
            boxShadow: "none",
            cursor: "pointer",
            height: "100%",
            display: "flex!important",
            flexDirection: "column",
            background: "transparent",
          },
          "& .cardItemInner": {
            position: "relative",
            display: "flex",
            height: "100%",
            width: "100%",
            borderRadius: theme.borderRadius.value1,
            padding: 0,
            overflow: "hidden",
            "& .bgimage": {
              transition: "all 0.5s ease",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            },
            "& .gradientWrapper": {
              position: "absolute",
              width: "100%",
              height: "100%",
              background: "linear-gradient(0deg, #000000 16.86%, rgba(0, 0, 0, 0) 94.86%)",
              opacity: 0.7,
            },
            "& .expertise-show-case": {
              position: "absolute",
              width: "100%",
              bottom: 0,
              padding: "0 20px 23px 20px",
              display: "flex",
              flexDirection: "column",
              "& .textUnderline": {
                display: "inline-block",
                paddingRight: theme.spacing(1),
                paddingBottom: theme.spacing(1),
                marginBottom: theme.spacing(1),
                borderBottom: `solid 1px ${theme.palette.textColor}`,
              },
              "& .contentTypeName": {
                marginBottom: 0,
                marginTop: 0,
                marginLeft: theme.spacing(0.5),
              },
              "& .title": {
                marginBottom: 0,
                marginTop: 0,
              },
              "& .viewMoreText": {
                marginBottom: 0,
                marginTop: 0,
                marginRight: theme.spacing(1),
              },
              "& .eastIcon": {
                fontSize: "16px",
                position: "absolute",
                left: "100%",
                top: "50%",
                transform: "translateY(-50%)",
                color: theme.palette.textColor,
              },
            },
          },
        },
      },
    },
  };
});
