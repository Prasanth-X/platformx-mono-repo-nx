import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    serviceCard5Wrapper: {
      "&.serviceCard5Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .topTitle": {
          textTransform: "uppercase",
        },
        "& .bottomBoxWrapper": {
          justifyContent: "space-between",
          marginTop: "30px",
          gridGap: 0,
          display: "flex",
          overflowX: "scroll",
          overflowY: "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          "& .gridBoxWrapper": {
            height: "500px",
            width: "100%",
            [theme.breakpoints.down("em")]: {
              height: "300px",
            },
            [theme.breakpoints.down("md")]: {
              height: "220px",
            },
            [theme.breakpoints.down("sm")]: {
              height: "338px",
            },
            position: "relative",
            "&:hover": {
              filter: "grayscale(100%)",
              "& #img": {
                display: "block",
              },
            },
            "& .ArrowIconWrapper": {
              display: "none",
              transition: "10s",
              "& img": {
                objectFit: "cover",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "50%",
                height: "60%",
              },
            },
            "& .titleBox": {
              position: "absolute",
              top: "0",
              left: "0",
              width: "70%",
              color: "#fff",
              bottom: "0",
              right: 0,
              alignItems: "center",
              margin: "auto",
              textAlign: "center",
              justifyContent: "center",
              display: "flex",
              [theme.breakpoints.down("sm")]: {
                width: "90%",
              },
            },
          },
        },
      },
    },
  };
});
