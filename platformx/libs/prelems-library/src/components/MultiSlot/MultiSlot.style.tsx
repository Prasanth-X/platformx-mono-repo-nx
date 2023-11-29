import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    MultiSlotWrapper: {
      "&.MultiSlot": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .topContentWrapper": {
          textAlign: "center",
          margin: "auto",
          maxWidth: "85%",
          [theme.breakpoints.down("md")]: {
            maxWidth: "100%",
          },
        },
        "& .expertise-show-case-wrapper": {
          height: "455px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          borderRadius: theme.borderRadius.value,
          boxShadow: "none",
          border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR}`,
          "&:hover": {
            border: `solid 1px ${theme.palette.prelemType1.CARDS.VARIANT1.BORDER_COLOR_HOVER}`,
            boxShadow: theme.palette.prelemType1.CARDS.VARIANT1.BOX_SHADOW,
          },
          [theme.breakpoints.down("sm")]: {
            height: "400px",
          },
          background: theme.palette.prelemType1.CARDS.VARIANT2.BACKGROUND,
          "& .refIconWrapper": {
            position: "absolute",
            zIndex: 1,
            "& .iconBox": {
              borderRadius: "50%",
              backgroundColor: theme.palette.prelemType1.CARDS.VARIANT1.BACKGROUND,
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "1rem",
              cursor: "pointer",
            },
          },
        },
      },
    },
  };
});
