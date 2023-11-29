import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    CourseDetailsContentBox: {
      scrollBehavior: "smooth",
      "&.CourseDetailsContentWp": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .linksButtons": {
          display: "flex",
          margin: "25px 0",
          position: "sticky",
          top: 0,
          background: theme.palette.prelemType1.BACKGROUND,
          zIndex: 9,
          "& ul": {
            margin: "0",
            padding: "0",
            display: "flex",
            width: "100%",
            borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
            "& li": {
              display: "inline-block",
              marginRight: "20px",
              "&.active": {
                borderBottom: `2px solid ${theme.palette.prelemType1.LINK}`,
              },
              "& a": {
                textDecoration: "none",
              },
            },
          },
        },
      },
      "& p": {
        "& p": {
          margin: 0,
        },
      },
    },
  };
});
