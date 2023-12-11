import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    MultiSlotCardWrapper: {
      "&.MultiSlotCard": {
        height: "100%",
        width: "100%",
        "& .overlay-wrapper": {
          position: "relative",
          height: "100%",
          width: "100%",
          borderRadius: theme.borderRadius.value,
          "&:hover": {
            cursor: "pointer",
          },
          "& .imageWrapper": {
            position: "relative",
            display: "flex",
            height: "100%",
            width: "100%",
            borderRadius: theme.borderRadius.value,
            padding: 0,
            overflow: "hidden",
            "& img": {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "flex",
            },
            "& .bottomButtomWrapper": {
              position: "absolute",
              width: "100%",
              padding: "0px 10px",
              bottom: "-2px",
              "& button": {
                width: "100%",
                margin: 0,
              },
            },
          },
          "& .image-button-text": {
            position: "absolute",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: theme.borderRadius.value,
            top: 0,
            "& .topButtomWrapper": {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              borderRadius: "0px",
              width: "100%",
              padding: "10px 20px",
              "& button": {
                width: "100%",
                margin: 0,
              },
            },
          },
          "& .cardContentBox": {
            boxShadow: "none",
            borderRadius: theme.borderRadius.value,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            background: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
            "& .cardTitle": {
              color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1",
              overflow: "hidden",
              minHeight: "30px",
            },
            "& .cardDescription": {
              color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "2",
              overflow: "hidden",
            },
            "& .imgBox": {
              height: "234px",
              position: "relative",
              [theme.breakpoints.down("sm")]: {
                height: "204px",
              },
              "& img": {
                height: "100%",
              },
              "& .imgboxOverlay": {
                position: "absolute",
                background: `rgba(${theme.palette.overlay["cardOverlay"]})`,
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: "100%",
                height: "100%",
              },
            },
            "& .IconBox": {
              position: "absolute",
              top: "38%",
              left: "7%",
              fontSize: "40px",
              width: "1em",
            },
            "& .IconBoxWrapper": {
              position: "absolute",
              top: "20%",
              left: 0,
              right: 0,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "40px",
              width: "1em",
              "& svg": {
                fontSize: "40px",
                color: theme.palette.textColor,
              },
            },
            "& .BottomButtonBox": {
              padding: "10px",
              justifyContent: "space-between",
              position: "absolute",
              bottom: 0,
              width: "100%",
              borderTop: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
              "& button": {
                width: "100%",
                margin: 0,
              },
              "& .adminDatdWrapper": {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                "& p": {
                  margin: 0,
                  color: theme.palette.prelemType1.CARDS.VARIANT1.PARAGRAPH,
                },
              },
              "& .authorName": {
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: "1",
                overflow: "hidden",
                maxWidth: "150px",
                [theme.breakpoints.up("sm")]: {
                  maxWidth: "120px",
                },
                [theme.breakpoints.up("em")]: {
                  maxWidth: "70px",
                },
                [theme.breakpoints.up("lg")]: {
                  maxWidth: "120px",
                },
              },
            },
          },
        },
      },
    },
  };
});
