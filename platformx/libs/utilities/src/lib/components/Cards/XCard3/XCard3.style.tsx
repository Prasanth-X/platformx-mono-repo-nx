import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  //Design is Image will at full(12) grid and on top of it image text will visible.
  return {
    XCard3Wrapper: {
      "&.XCard3Box": {
        background: "transparent",
        "& .XCard3innderBox": {
          background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
          borderRadius: theme.borderRadius.value,
          transition: "all 0.3s",
          overflow: "hidden",
          "& .imgWrapper": {
            position: "relative",
            maxHeight: "403px",
            "& .mainContentBox": {
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "100%",
              background: "linear-gradient(to bottom,  rgba(0,0,0,0) 21%,rgba(0,0,0,0.84) 100%)",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              "&:hover .contentBox": {
                marginBottom: 0,
                "& .titleWrapper p": {
                  height: "inherit",
                },
              },
              "& .contentBox": {
                padding: "24px 20px 12px",
                transition: "all 0.3s",
                width: "85%",
                marginBottom: "-20px",
                [theme.breakpoints.down("md")]: {
                  width: "100%",
                  marginBottom: "0px",
                },
                "& .iconWrapper": {
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "left",
                },
                "& .topWrapper": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  "& .nameWrapper": {
                    marginRight: "10px",
                    paddingRight: "12px",
                    position: "relative",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "1",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    "& :before": {
                      position: "absolute",
                      content: '""',
                      right: "-2px",
                      top: "0",
                      bottom: 0,
                      margin: "auto",
                      height: "16px",
                      width: "1px",
                      // background: theme.palette.line,
                    },
                  },
                  // "& p": {
                  //   color: theme.palette.lightText,
                  // },
                },
                "& .titleWrapper": {
                  "& h4": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "1",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    marginTop: 0,
                    [theme.breakpoints.up("md")]: {
                      margin: 0,
                    },
                  },
                  "& p": {
                    // color: theme.palette.lightText,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "2",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    height: 0,
                    [theme.breakpoints.down("md")]: {
                      display: "none",
                    },
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
