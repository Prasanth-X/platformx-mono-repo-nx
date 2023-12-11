import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    XCard4Wrapper: {
      "&.XCard4Box": {
        "& .XCard4innderBox": {
          height: "403px",
          [theme.breakpoints.down("xs")]: {
            marginBottom: theme.spacing(2),
          },
          [theme.breakpoints.down("lg")]: {
            marginBottom: theme.spacing(4),
          },
          "& .imgWrapper": {
            position: "relative",
            height: "calc(100% - 56px)",
            "& img": {
              borderRadius: theme.borderRadius.value,
              objectFit: "cover",
            },
            "& .IconTopRight": {
              position: "absolute",
              top: "15px",
              right: "15px",
              width: "44px",
              height: "45px",
              borderRadius: "50%",
            },
            "& .mainContentBox": {
              width: "100%",
              padding: "0 15px",
              position: "relative",
              marginTop: "-40px",
              "& .InnerWrapper": {
                background: theme.palette.prelemType1.BACKGROUND,
                padding: "12px 15px 20px",
                borderRadius: theme.borderRadius.value1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "& .contentWrapperBox": {
                  paddingRight: "10px",
                  width: "100%",
                  "& h4": {
                    marginTop: 0,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "1",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  },
                  "& .dateWrapper": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    "& .publishTime": {
                      color: theme.palette.prelemType1.PARAGRAPH,
                    },
                    "& .iconWrapper": {
                      marginRight: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      "& svg": {
                        fill: theme.palette.prelemType1.TITLE,
                      },
                    },
                    "& p": {
                      margin: 0,
                    },
                  },
                },
                "& .ButtonWrapper": {
                  "& button": {
                    minWidth: "auto",
                    margin: 0,
                  },
                },
              },
            },
          },
        },
      },
    },
  };
});
