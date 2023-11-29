import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceShowcaseWrapper: {
      "&.serviceShowcaseBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .textellipsis": {
          [theme.breakpoints.down("lg")]: {
            WebkitBoxOrient: "vertical",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "normal",
          },
        },
        "& .serviceShowcaseManiWrapper": {
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "nowrap",
          [theme.breakpoints.down("sm")]: {
            flexWrap: "wrap",
          },
          "& .rounderCardImages": {
            borderRadius: theme.borderRadius.value1,
          },
        },
        "& .LeftColWrapper": {
          width: "67%",
          marginBottom: 0,
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          minHeight: "534px",
          borderRadius: theme.borderRadius.value1,
          overflow: "hidden",
          [theme.breakpoints.down("md")]: {
            width: "67%",
          },
          [theme.breakpoints.down("sm")]: {
            marginBottom: "25px",
            width: "100%",
            minHeight: "534px",
          },
        },
        "& .RightColWrapper": {
          width: "31%",
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          [theme.breakpoints.down("md")]: {
            width: "31%",
          },
          [theme.breakpoints.down("sm")]: {
            width: "100%",
          },
        },
        "& .RightColWrapperInner": {
          position: "relative",
          zIndex: "1",
          padding: "89px 25px 25px 25px",
          [theme.breakpoints.down("md")]: {
            padding: "50px 15px 15px 15px",
          },
        },
        "& .RightColImageInner": {
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
          borderRadius: theme.borderRadius.value1,
        },
        "& .LeftSecondColWrapper": {
          position: "relative",
          zIndex: "1",
          padding: "25px",
          [theme.breakpoints.down("md")]: {
            padding: "15px",
          },
        },
        "& .topBoxWrapper": {
          position: "absolute",
          bottom: "0",
          background: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
          left: "0",
          zIndex: "-1",
          "&::after": {
            content: '""',
            display: "block",
            marginLeft: "25px",
            width: "148px",
            height: "6px",
            backgroundColor: theme.palette.prelemType1.NOTIFICATION.ERROR.BACKGROUND,
            [theme.breakpoints.down("md")]: {
              marginLeft: "20px",
            },
          },
        },
        "& .LeftImageWrapper": {
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
        },
        "& .rightInnerShadowBox": {
          borderRadius: theme.borderRadius.value1,
          position: "absolute",
          top: "0",
          bottom: "0",
          background: "rgba(0, 0, 0, 0.5)",
          width: "100%",
          height: "100%",
        },
      },
    },
  };
});
