import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    contentDisplayWithCategories: {
      "&.contentDisplayWithCategoriesBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .leftSlider": {
          [theme.breakpoints.up("xs")]: {
            paddingRight: 0,
          },
          [theme.breakpoints.up("em")]: {
            paddingRight: "10px",
          },
          [theme.breakpoints.up("lg")]: {
            paddingRight: "14px",
          },
          "& .leftImageWrapper": {
            position: "relative",
            [theme.breakpoints.up("xs")]: {
              height: "261px",
            },
            [theme.breakpoints.up("sm")]: {
              height: "270px",
            },
            [theme.breakpoints.up("md")]: {
              height: "349px",
            },
            [theme.breakpoints.up("em")]: {
              height: "361px",
            },
            width: "100%",
            objectFit: "cover",
            borderRadius: theme.borderRadius.value1,
            overflow: "hidden",
            "& .imageCard": {
              objectFit: "cover",
              borderRadius: theme.borderRadius.value1,
            },
            "& .cardTextWrapper": {
              background: "linear-gradient(to bottom,  rgba(0,0,0,0) 0%,rgba(0,0,0,1) 100%)",
              position: "absolute",
              bottom: "0px",
              left: "0px",
              width: "100%",
              display: "flex",
              alignItems: "end",
              minHeight: "161px",
              [theme.breakpoints.up("xs")]: {
                padding: "20px 15px",
              },
              [theme.breakpoints.up("md")]: {
                padding: "35px 30px",
              },
              [theme.breakpoints.up("em")]: {
                padding: "42px 28px",
              },
            },
          },
        },
        "& .contentDisplayWithCategories": {
          borderRadius: theme.borderRadius.value,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
        },
        "& .add-content-overlay": {
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
        /*for right sidebar */
        "& .hotcategoryheading": {
          [theme.breakpoints.up("xs")]: {
            paddingLeft: 0,
            marginTop: "20px",
          },
          [theme.breakpoints.up("md")]: {
            marginTop: "30px",
          },
          [theme.breakpoints.up("em")]: {
            paddingLeft: "10px",
            marginTop: 0,
          },
          [theme.breakpoints.up("lg")]: {
            paddingLeft: "14px",
          },
        },
        "& .hotcategoryWrapper": {
          display: "flex",
          flexWrap: "wrap",
          "& .hotcatmn": {
            width: "100%",
            height: "51px",
            margin: "0px 0 11px 0",
            padding: "7px 12px",
            borderRadius: theme.borderRadius.value,
            border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "all 0.3s",
            cursor: "pointer",
            [theme.breakpoints.up("md")]: {
              width: "48%",
              marginRight: ".5%",
              marginLeft: ".5%",
            },
            [theme.breakpoints.up("em")]: {
              width: "100%",
            },
            "&:hover, &.active": {
              border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR_HOVER}`,
              background: theme.palette.textColor1,
              color: theme.palette.textColor,
            },
            "&:hover p, &.active p": {
              color: theme.palette.textColor,
            },
            "& .icon": {
              background: theme.palette.prelemType1.ACCENTS.VARIANT1.BACKGROUND,
            },
          },
        },
        "& .marginZero": {
          margin: 0,
        },
        "& .contentDisplayWithCategories .slick-prev, .contentDisplayWithCategories .slick-next": {
          background: `rgba(0, 0, 0, 0.5)`,
          borderRadius: theme.borderRadius.value,
          "&:before": {
            color: theme.palette.textColor,
          },
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
      },
    },
  };
});
