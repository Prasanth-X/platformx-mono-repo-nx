import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    CDInstructorsWrapper: {
      "&.CDInstructors": {
        "& .profileWp": {
          display: "flex",
          margin: "10px 0",
          "& .avtarimg": {
            width: "80px",
            height: "80px",
            marginRight: "15px",
            borderRadius: "50%",
            overflow: "hidden",
            minWidth: "80px",
          },
          "& .rightContentWp": {
            width: "100%",
            "& p": {
              marginTop: 0,
              marginBottom: 0,
            },
            "& ul": {
              margin: "5px 0 0 0",
              padding: "0",
              display: "flex",
              [theme.breakpoints.down("em")]: {
                display: "block",
              },
              "& li": {
                display: "flex",
                alignItems: "center",
                marginRight: "15px",
                [theme.breakpoints.down("em")]: {
                  margin: "5px 0 0 0",
                },
                "& label": {
                  textTransform: "capitalize",
                  paddingBottom: 0,
                },
                "& .icon": {
                  marginRight: "6px",
                  height: "20px",
                  "& svg": {
                    fontSize: "17px",
                  },
                },
              },
            },
          },
        },
        "& .feedbackWp": {
          marginBottom: "40px",
          "& .GrayBox": {
            background: theme.palette.prelemType3.BACKGROUND,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            marginRight: "15px",
            textAlign: "center",
            justifyContent: "center",
            "& .progressbarWp": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              "& .progressBox": {
                width: "67%",
              },
              "& .ratingtextBox": {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                width: "30%",
                "& p": {
                  margin: "5px 0",
                },
              },
            },
          },
        },
      },
    },
  };
});
