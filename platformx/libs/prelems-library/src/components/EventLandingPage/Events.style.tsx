import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    eventPageWrapper: {
      "&.eventPageContent": {
        "& .eventDetailsPanel": {
          background: theme.palette.prelemType1.BACKGROUND,
          padding: "15px",
          width: "100%",
          marginTop: "20px",
          [theme.breakpoints.up("md")]: {
            marginTop: "-40px",
            width: "320px",
            borderRadius: theme.borderRadius.value1,
          },
          [theme.breakpoints.up("em")]: {
            padding: "20px",
          },
          "& svg": {
            fill: theme.palette.prelemType1.TITLE,
          },
          "& .addressArea, & .eventlinkaddress": {
            color: theme.palette.prelemType1.LINK,
          },
        },
        "& .eventDetailsWrapper": {
          [theme.breakpoints.up("em")]: {
            paddingBottom: "16px",
          },
          "& .eventTitle": {
            wordWrap: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginTop: 0,
          },
          "& .eventDetailButton": {
            margin: 0,
            "&:hover": {
              "& svg": {
                fill: theme.palette.textColor1,
              },
            },
          },
        },
        "& .eventsummaryWrapper": {
          backgroundColor: theme.palette.prelemType1.BACKGROUND,
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.up("md")]: {
            padding: "20px",
            height: `calc(100vh - ${theme.palette.header.HEADER_HEIGHT})`,
          },
          [theme.breakpoints.up("em")]: {
            padding: "30px",
            paddingBottom: "16px",
          },
          "& .headingWrapper": {
            display: "flex",
            flexDirection: "column",
          },
          "& .headingWrapText": {
            color: theme.palette.prelemType1.TITLE,
            wordWrap: "break-word",
          },
          "& .cardSummaryWrapper": {
            margin: "3% 0 4%",
            display: "inline-block",
            width: "100%",
            flexGrow: 1,
            [theme.breakpoints.up("md")]: {
              margin: "2% 0 2%",
            },
            "& .cardHeaderWrapper": {
              width: "100%",
              color: theme.palette.prelemType1.TITLE,
              [theme.breakpoints.up("sm")]: {
                width: "68%",
                float: "left",
              },
            },
            "& .socialSharewrapper": {
              marginTop: "18px",
              width: "100%",
              float: "left",
              [theme.breakpoints.up("sm")]: {
                marginTop: 0,
                width: "auto",
                float: "right",
              },
            },
          },
          "& .descriptionSummary": {
            wordWrap: "break-word",
            whiteSpace: "pre-wrap",
            display: "-webkit-box",
            "-webkitBoxOrient": "vertical",
            overflow: "hidden",
          },
          "& .eventsummaryButton": {
            margin: 0,
            "&:hover": {
              // background: "transparent",
              // color: "red"
            },
          },
        },
        "& .widthAuto": {
          width: "auto",
        },
        "& .marginZero": {
          margin: 0,
        },
        "& .marginZeroTop": {
          marginTop: 0,
        },
        "& .marginZeroBottom": {
          marginBottom: 0,
        },
        "& .badgeButton": {
          marginTop: "1%",
          marginRight: "6px",
          backgroundColor: theme.palette.prelemType1.ACCENTS.VARIANT1.BACKGROUND,
          borderRadius: theme.borderRadius.value,
          border: "none",
          fontWeight: "normal",
          float: "left",
          opacity: 0.8,
        },
        "& .eventsParent": {
          [theme.breakpoints.up("md")]: {
            height: `calc(100vh - ${theme.palette.header.HEADER_HEIGHT})`,
          },
        },
        "& .completionList": {
          "& svg": {
            fill: theme.palette.textColor,
          },
        },
        "& .title": {
          color: theme.palette.textColor,
        },
        "& .countDownTimer": {
          paddingTop: theme.spacing(1),
          "& h2": {
            color: theme.palette.textColor,
          },
        },
      },
    },
  };
});
