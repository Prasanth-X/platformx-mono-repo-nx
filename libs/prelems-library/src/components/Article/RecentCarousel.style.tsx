import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    recentCarouselWrapper: {
      "&.recentCarouselBg": {
        width: "100%",
        [theme.breakpoints.up("xs")]: {
          marginBottom: 0,
        },
        [theme.breakpoints.up("md")]: {
          marginBottom: "30px",
        },
        "& .title": {
          color: theme.palette.prelemType1.CARDS.VARIANT1.TITLE,
        },
        "& .actionBar": {
          justifyContent: "space-between",
          padding: "6px 10px 6px 10px",
          backgroundColor: theme.palette.prelemType1.CARDS.VARIANT1.ALTERNET_BACKGROUND,
          minHeight: "56px",
        },
      },
    },
  };
});
