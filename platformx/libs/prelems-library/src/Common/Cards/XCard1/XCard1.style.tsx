import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  // Design is Image will at top and text will in bottom for all breakpoint.
  const theme = useTheme();
  return {
    XCard1Wrapper: {
      "&.XCard1Box": {
        background: "transparent",
        "& .XCard1innderBox": {
          background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
          border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
          borderRadius: theme.borderRadius.value,
          transition: "all 0.3s",
          overflow: "hidden",
          cursor: "pointer",
          minHeight: "403px",
          maxHeight: "403px",
          "&:hover": {
            border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR_HOVER}`,
            boxShadow: theme.palette.prelemType1.CARDS.VARIANT1.BOX_SHADOW,
            "&:hover button": {
              transform: "translateX(0%)",
              marginLeft: 0,
            },
          },
          "& .title": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
          },
          "& .description": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
          },
          "& .publish": {
            color: theme.palette.prelemType1.CARDS.VARIANT1.LABEL,
          },
          "& .imgWrapper": {
            position: "relative",
            minHeight: "220px",
            display: "flex",
            alignItems: "center",
            height: "220px",
            overflow: "hidden",
            "& .iconWrapper": {
              position: "absolute",
              bottom: "0px",
              left: "0px",
              width: "100%",
              minHeight: "72px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-end",
              padding: "20px",
              background: "linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.00) 100%)",
              "& .imgIconBox": {
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "left",
              },
            },
          },
          "& .contentBox": {
            padding: "0px 15px 12px",
            "& .topWrapper": {
              borderTop: `1px solid ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
              padding: "10px 0px 0px 0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              "& .nameWrapper": {
                marginRight: "10px",
                paddingRight: "12px",
                position: "relative",
                maxWidth: "70%",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: "1",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                "& :before": {
                  position: "absolute",
                  content: '""',
                  right: 0,
                  top: "0",
                  bottom: 0,
                  margin: "auto",
                  height: "16px",
                  width: "1px",
                  background: theme.palette.prelemType1.CARDS.VARIANT1.LABEL,
                },
              },
              "& p": {
                margin: 0,
                // color: theme.palette.lightDarkText,
              },
            },
            "& .titleWrapper": {
              "& h4": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: "1",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              },
              "& p": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: "3",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                minHeight: "72px",
              },
            },
            "& .buttonRapper": {
              overflow: "hidden",
              "& button": {
                marginLeft: "14px",
                transform: "translateX(-100%)",
                transition: "transform 0.25s ease",
                textTransform: "none",
                [theme.breakpoints.down("md")]: {
                  transform: "translateX(0%)",
                  marginLeft: "0px",
                },
                "& svg": {
                  fontSize: "16px",
                },
                "&:hover": {
                  textDecoration: "none",
                  borderColor: "transparent",
                },
              },
            },
          },
        },
      },
    },
  };
});
