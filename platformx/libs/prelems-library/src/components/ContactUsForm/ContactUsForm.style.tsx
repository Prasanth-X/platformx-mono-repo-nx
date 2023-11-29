import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    contactUsFormScreenWrapper: {
      "&.contactUsFormScreenBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .contactUsPageWrapper": {
          width: "740px",
          margin: "0px auto",
          "& .profileForm": {
            display: "flex",
            "& .formContainer": {
              marginTop: 0,
              "& .gap": {
                padding: 0,
              },
            },
            "& .custom-textbox.date-textbox input": {
              padding: "16px 10px 16px 8px",
              textAlign: "right",
              cursor: "pointer",
              WebkitTextFillColor: theme.palette.prelemType1.INPUT.LABEL,
              color: theme.palette.prelemType1.INPUT.LABEL,
              "&.Mui-disabled": {
                opacity: 0.5,
                "& svg": {
                  fill: theme.palette.prelemType1.INPUT.LABEL,
                },
              },
            },
          },
        },
        "& .marginZero": {
          margin: 0,
        },
        "& .marginBottomZero": {
          marginBottom: 0,
        },
        "& .flagImage": {
          objectFit: "cover",
          width: "24px",
          height: "24px",
        },
        "& .flagWrapper": {
          marginTop: "0 !important",
        },
        "& .mobileTxtBox": {
          marginLeft: "10px",
          width: `calc(100% - 170px)`,
        },
        "& .gridContentWrapper": {
          padding: theme.spacing(4),
          paddingTop: 0,
          paddingRight: 0,
          paddingBottom: theme.spacing(2.5),
        },
        "& .buttonWrapper": {
          float: "right",
          marginTop: "20px",
          [theme.breakpoints.down("sm")]: {
            minWidth: "100%",
            display: "flex",
            flexDirection: "column-reverse",
          },
          "& button": {
            [theme.breakpoints.down("sm")]: {
              minWidth: "100%",
            },
          },
        },
        "& .policyWrapper": {
          display: "flex",
          "& label": {
            [theme.breakpoints.down("sm")]: {
              alignItems: "flex-start",
            },
          },
        },
        "& .mobileWithIsdcode": {
          display: "flex",
          "& .smallTxtBox": {
            width: "100%",
          },
        },
        "& .customCalender": {
          width: "100%",
          "& .Platform-x-InputLabel-formControl, & label, & .MuiInputLabel-formControl": {
            color: theme.palette.prelemType1.SELECT.TEXT,
            "&.Mui-disabled": {
              opacity: 0.5,
              color: theme.palette.prelemType1.SELECT.TEXT,
            },
            "&.Mui-focused": {
              color: "green",
            },
            "&.Platform-x-InputLabel-shrink, &.MuiInputLabel-shrink": {
              paddingTop: theme.spacing(4),
              color: theme.palette.prelemType1.SELECT.TEXT,
            },
          },
        },
        "& .defaultCode": {
          width: "auto",
        },
      },
    },
  };
});
