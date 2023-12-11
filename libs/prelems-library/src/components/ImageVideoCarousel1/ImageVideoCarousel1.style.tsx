import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    imageVideoCarousel1Wrapper: {
      "&.imageVideoCarousel1Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .centerText": {
          textAlign: "center",
        },
        "& .gridWrapper": {
          margin: "0 auto",
          position: "relative",
          padding: "24px 0px 0px",
          [theme.breakpoints.up("md")]: {
            padding: "24px 0px 0px 0px",
          },
          "&:hover": {
            "& .overlay": {
              display: "flex",
            },
          },
        },
        "& .leftSideBarWrapper": {
          maxHeight: "470px",
          overflowX: "auto",
          overflowY: "hidden",
          position: "relative",
          whiteSpace: "nowrap",
          display: "flex",
          [theme.breakpoints.up("em")]: {
            overflowX: "hidden",
            display: "block",
          },
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        "& .leftsideBar": {
          marginBottom: "16px",
          paddingBottom: "16px",
          maxWidth: "100%",
          position: "relative",
          float: "left",
          marginRight: "25px",
          [theme.breakpoints.up("em")]: {
            marginBottom: "41px",
            paddingBottom: "16px",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            float: "none",
            marginRight: "0",
          },
          "&:hover": {
            cursor: "pointer",
          },
        },
        "& .afterHeading": {
          "&::after": {
            content: '""',
            position: "inherit",
            left: "0",
            display: "block",
            width: "49px",
            height: "2px",
          },
          "&.active::after": {
            backgroundColor: theme.palette.prelemType1.TITLE,
            bottom: "-16px",
            [theme.breakpoints.up("em")]: {
              bottom: "-13px",
            },
          },
        },
        "& .thumbnail": {
          height: "184px",
          [theme.breakpoints.up("md")]: {
            height: "341px",
          },
          [theme.breakpoints.up("em")]: {
            height: "475px",
          },
          "& video": {
            borderRadius: theme.borderRadius.value1,
            objectFit: "cover",
            boxShadow: "0 4px 54px 0 rgba(0, 0, 0, 0.15)",
            border: `solid 1px ${theme.palette.prelemType1.LINE}`,
          },
        },
        "& .imgWrapper": {
          position: "relative",
          padding: "0 !important",
          height: "184px",
          width: "100%",
          [theme.breakpoints.up("md")]: {
            height: "341px",
          },
          [theme.breakpoints.up("em")]: {
            height: "475px",
          },
          "& video": {
            objectFit: "cover",
          },
        },
        "& .imgProp": {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: theme.borderRadius.value1,
          boxShadow: "0 4px 54px 0 rgba(0, 0, 0, 0.15)",
          border: `solid 1px ${theme.palette.prelemType1.LINE}`,
        },
        "& .imgProp2": {
          width: "100%",
          objectFit: "cover",
          borderRadius: theme.borderRadius.value1,
          boxShadow: "0 4px 54px 0 rgba(0, 0, 0, 0.15)",
          border: `solid 1px ${theme.palette.prelemType1.LINE}`,
          height: "184px",
          [theme.breakpoints.up("md")]: {
            height: "341px",
          },
          [theme.breakpoints.up("em")]: {
            height: "475px",
          },
        },
        "& .videoEnable": {
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          background: "transparent",
          padding: "0 35px 35px !important",
          margin: "0",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "flex-start",
          cursor: "pointer",
          "& .Platform-x-Box-root": {
            padding: "0 !important",
          },
        },
        "& .iconWrapper": {
          width: "34px",
          height: "34px",
          borderRadius: "50%",
          // background: theme.palette.bgDefault,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          [theme.breakpoints.up("md")]: {
            width: "50px",
            height: "50px",
          },
        },
        "& .playIcon": {
          width: "25px",
          height: "25px",
          [theme.breakpoints.up("md")]: {
            width: "35px",
            height: "35px",
          },
        },
        "& .imageWrapper1": {
          height: "184px",
          [theme.breakpoints.up("md")]: {
            height: "341px",
          },
          [theme.breakpoints.up("em")]: {
            height: "475px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `rgba(${theme.palette.overlay["bgOverlay"]})`,
          zIndex: 1,
        },
        "& .imgWrapper2": {
          height: "184px",
          paddingBottom: "20px",
          [theme.breakpoints.up("md")]: {
            height: "341px",
            paddingBottom: "25px",
          },
          [theme.breakpoints.up("em")]: {
            height: "475px",
            paddingBottom: "40px",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: `rgba(${theme.palette.overlay["bgOverlay"]})`,
          zIndex: 1,
        },
        "& .hideElementClass": {
          display: "none",
        },
        "& .overlay": {
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
          "& .overLaytextgap": {
            marginTop: "0px",
          },
        },
        "& .pointer": {
          cursor: "pointer",
          textAlign: "center",
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
  };
});

export default useCustomStyle;
