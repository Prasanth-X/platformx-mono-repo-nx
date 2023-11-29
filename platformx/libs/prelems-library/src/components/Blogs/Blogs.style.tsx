import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    blogPageWrapper: {
      "&.blogPageWrapperBg": {
        display: "flex",
        background: theme.palette.prelemType3.BACKGROUND,
        [theme.breakpoints.up("xs")]: {
          padding: 0,
          flexDirection: "column !important",
        },
        [theme.breakpoints.up("md")]: {
          padding: "10px",
          flexDirection: "row !important",
        },
        [theme.breakpoints.up("em")]: {
          padding: "20px",
        },
        "& .blogContent": {
          backgroundColor: theme.palette.prelemType1.BACKGROUND,
          [theme.breakpoints.up("xs")]: {
            borderRadius: 0,
          },
          [theme.breakpoints.up("xs")]: {
            borderRadius: theme.borderRadius.value1,
          },
          "& .contentArea": {
            "& .horizontalDivider": {
              borderColor: theme.palette.prelemType1.LINE,
            },
            "& .removeContentDescription": {
              marginTop: theme.spacing(2),
            },
            "& ul.listItemWrapper": {
              "& li": {
                "& svg": {
                  fill: theme.palette.prelemType1.TITLE,
                },
              },
              "& .lastLine": {
                display: "none",
              },
            },
          },
        },
        "& .blogTimelineSection": {
          backgroundColor: theme.palette.prelemType1.BACKGROUND,
          [theme.breakpoints.up("xs")]: {
            padding: "16px 0px 0px 16px !important",
            borderRadius: 0,
          },
          [theme.breakpoints.up("md")]: {
            marginRight: "10px",
            padding: "16px 0 16px 16px",
            borderRadius: theme.borderRadius.value1,
          },
          [theme.breakpoints.up("em")]: {
            marginRight: theme.spacing(2.5),
          },
          "& .infinite-scroll-component": {
            marginTop: theme.spacing(2),
          },
          "& .arrowIcon": {
            opacity: 0.6,
            color: theme.palette.prelemType1.TITLE,
            "&.activeColor": {
              opacity: 1,
            },
          },
          "& .Platform-x-FormControl-root .Platform-x-InputBase-root": {
            color: theme.palette.prelemType1.PARAGRAPH,
            border: theme.palette.prelemType1.INPUT.BORDER,
            padding: 0,
            "& input#asynchronousSearch": {
              padding: "14px 20px 14px 20px",
              textAlign: "left",
            },
            "&.Mui-focused": {
              backgroundColor: theme.palette.prelemType1.INPUT.BACKGROUND_FOCUSED,
              border: theme.palette.prelemType1.INPUT.BORDER_ACTIVE,
              borderRadius: theme.borderRadius.value,
              "& svg": {
                fill: theme.palette.prelemType1.INPUT.TEXT,
              },
            },
            "& svg": {
              fill: theme.palette.prelemType1.INPUT.TEXT,
            },
          },
          "& .listTypographyTime": {
            width: "auto",
          },
          "& .listTimelineConnector": {
            width: "2px",
            background: theme.palette.prelemType1.LINE,
          },
          "& .eventTimeline": {
            marginTop: theme.spacing(0.5),
            marginBottom: 0,
          },
        },
        "& .noresultFound": {
          display: "flex",
          justifyContent: "center",
          minHeight: "40px",
          "& .message": {
            textAlign: "center",
          },
        },
      },
    },
  };
});
