import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    leftAlignParagraphWithHeadlineWrapper: {
      "&.leftAlignParagraphWithHeadlineBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .discription": {
          marginBottom: 0,
        },
      },
    },
  };
});
