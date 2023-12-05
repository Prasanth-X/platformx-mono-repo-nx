import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  // Design is Image will at Left and text will in Right for all breakpoint.
  return {
    XCard2Wrapper: {
      "&.XCard2Box": {
        background: "transparent",
        "& .XCard2innderBox": {
          background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
          border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
          borderRadius: theme.borderRadius.value,
          display: "flex",
          transition: "all 0.3s",
          overflow: "hidden",
          [theme.breakpoints.up("md")]: {
            maxHeight: "403px",
            minHeight: "403px",
          },
          "&:hover": {
            border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR_HOVER}`,
            boxShadow: theme.palette.prelemType1.CARDS.VARIANT1.BOX_SHADOW,
            "&:hover button": {
              transform: "translateX(0%)",
              marginLeft: 0,
            },
          },
          "& .imgWrapper": {
            position: "relative",
            minHeight: "240px",
            display: "flex",
            alignItems: "center",
            height: "100%",
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
            padding: "12px 20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            "& .topWrapper": {
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
                WebkitLineClamp: "5",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              },
            },
            "& .buttonRapper": {
              overflow: "hidden",
              "& button": {
                marginLeft: "14px",
                padding: 0,
                background: "transparent",
                transform: "translateX(-100%)",
                textTransform: "none",
                [theme.breakpoints.down("md")]: {
                  transform: "translateX(0%)",
                  marginLeft: "0px",
                },
                transition: "transform 0.25s ease",
                "& svg": {
                  fontSize: "initial",
                },
                "&:hover": {
                  textDecoration: "none",
                  borderColor: "transparent",
                },
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
          },
        },
      },
    },
  };
});
