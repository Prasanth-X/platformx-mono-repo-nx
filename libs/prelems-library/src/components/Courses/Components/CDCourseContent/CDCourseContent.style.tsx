import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    CDCourseContentWrapper: {
      "&.CDCourseContent": {
        "& .accordianWrapper": {
          "& .topWrapper": {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            "& button": {
              position: "relative",
              "& span": {
                marginLeft: 0,
              },
            },
          },
          "& .toptitlebox": {
            width: "100%",
            paddingLeft: "20px",
            "& p": {
              margin: "8px 0",
              [theme.breakpoints.down("md")]: {
                margin: "0",
              },
            },
          },
          "& .videoortime": {
            "& .light": {
              color: theme.palette.prelemType1.LINK,
              [theme.breakpoints.down("md")]: {
                margin: "0 0 10px 30px",
              },
            },
            "& .texticonWp": {
              display: "flex",
              alignItems: "center",
              "& p": {
                [theme.breakpoints.down("md")]: {
                  margin: "0",
                },
              },
              "& .icon": {
                display: "flex",
                marginRight: "10px",
              },
            },
          },
          "& .accoridanHeading": {
            borderRadius: theme.borderRadius.value,
          }
        },
      },
    },
  };
});
