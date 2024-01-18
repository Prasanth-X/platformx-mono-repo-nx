import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productSummaryViaVideo2Wrapper: {
      "&.productSummaryViaVideo2Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .rightWrapper": {
          width: "100%",
          padding: "0px 0 0px 70px",
          [theme.breakpoints.down("lg")]: {
            padding: "0px 0 0px 50px",
          },
          [theme.breakpoints.down("em")]: {
            padding: "0 0 0 0",
          },
        },
        "& .videoBoxColorWrapper": {
          border: `1.5px solid ${theme.palette.prelemType1.NOTIFICATION.ERROR.BACKGROUND}`,
          position: "relative",
          width: "100%",
          height: "455px",
          marginBottom: "0px",
          borderRadius: theme.borderRadius.value1,
          [theme.breakpoints.down("lg")]: {
            height: "430px",
          },
          [theme.breakpoints.down("em")]: {
            marginBottom: "30px",
            height: "400px",
          },
          [theme.breakpoints.down("md")]: {
            height: "330px",
          },
          [theme.breakpoints.down("sm")]: {
            height: "380px",
          },
          [theme.breakpoints.down("xs")]: {
            height: "245px",
          },
        },
        "& .VideoBoxWrapper": {
          position: "absolute",
          width: "100%",
          height: "455px",
          marginBottom: "0px",
          [theme.breakpoints.down("lg")]: {
            height: "430px",
          },
          [theme.breakpoints.down("em")]: {
            marginBottom: "30px",
            height: "400px",
          },
          [theme.breakpoints.down("md")]: {
            height: "330px",
          },
          [theme.breakpoints.down("sm")]: {
            height: "380px",
            width: "100%",
          },
          [theme.breakpoints.down("xs")]: {
            height: "245px",
          },
          [theme.breakpoints.up("em")]: {
            marginTop: "20px",
            marginLeft: "20px",
          },
          "& video": {
            objectFit: "cover",
            borderRadius: theme.borderRadius.value1,
          },
        },
      },
    },
  };
});
