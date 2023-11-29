import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    articleDetailPageWrapper: {
      "&.articleDetailPage": {
        "& .articleHeroImage": {
          overflow: "hidden",
        },
        "& .articleDescription": {
          background: theme.palette.prelemType1.BACKGROUND,
        },
        "& .articleCardDescription": {
          background: theme.palette.prelemType1.BACKGROUND,
          "& .avtartIcon": {
            color: theme.palette.prelemType1.TITLE,
          },
        },
        "& .noMarginTop": {
          marginTop: 0,
        },
        "& .noMarginBottom": {
          marginBottom: 0,
        },
        "& .noMarginBoth": {
          marginBottom: 0,
          marginTop: 0,
        },
      },
    },
  };
});

export default useCustomStyle;
