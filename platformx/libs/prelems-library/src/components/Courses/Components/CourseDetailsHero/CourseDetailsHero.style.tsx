import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    CourseDetailsHeroWrapper: {
      "&.CourseDetailsHero": {
        background: theme.palette.prelemType3.BACKGROUND,
        paddingTop: "66px",
        "& .bottomBlackWrapper": {
          backgroundColor: theme.palette.prelemType2.BACKGROUND,
          color: theme.palette.prelemType2.TITLE,
          display: "inline-block",
          marginTop: "70px",
          padding: "15px",
          "& ul": {
            padding: 0,
            margin: 0,
            display: "flex",
            "& li": {
              marginRight: "20px",
              color: theme.palette.prelemType2.TITLE,
              display: "flex",
              "& svg": {
                marginRight: "10px",
                fontSize: "17px",
              },
              "& label": {
                textTransform: "capitalize",
                color: theme.palette.prelemType2.TITLE,
                padding: 0,
              },
              "&:last-child": {
                marginRight: 0,
              },
            },
          },
        },
      },
    },
  };
});
