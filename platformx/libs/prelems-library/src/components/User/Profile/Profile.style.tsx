import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    profileScreenWrapper: {
      "&.profileScreenBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .profilePageWrapper": {
          "& .profileHeader": {
            background: theme.palette.prelemType3.BACKGROUND,
            borderRadius: theme.borderRadius.value1,
            padding: theme.spacing(3),
            display: "flex",
            alignItems: "center",
            "& .profileDetailWrapper": {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              paddingLeft: theme.spacing(2),
            },
            "& .actionButton": {
              minWidth: "90px",
            },
            "& .avtarImg": {
              width: "90px",
              height: "90px",
            },
            "& .profileImageWrapper": {
              position: "relative",
              width: "90px",
              height: "90px",
              "& .uploadIcon": {
                cursor: "pointer",
                width: "40px",
                height: "40px",
                position: "absolute",
                zIndex: 1,
                left: "28%",
                top: "50%",
                borderRadius: "50%",
                background: theme.palette.prelemType1.ACCENTS.VARIANT1.BACKGROUND,
                "& svg": {
                  width: "40px",
                  marginTop: theme.spacing(1),
                },
              },
            },
          },
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
        "& .leftSideBar": {
          marginTop: theme.spacing(2),
          height: "100%",
          marginRight: theme.spacing(2),
          [theme.breakpoints.up("sm")]: {
            minHeight: "500px",
            borderRight: `solid 1px ${theme.palette.prelemType1.LINE}`,
          },
          [theme.breakpoints.up("em")]: {
            marginRight: theme.spacing(4),
          },
          "& .menuItem": {
            cursor: "pointer",
          },
          "& .activeItem": {
            color: theme.palette.primaryAnchorLink,
          },
        },
        "& .rightSideBar": {
          marginTop: theme.spacing(2),
          marginBottom: theme.spacing(2),
          "& .coinImg": {
            objectFit: "cover",
            marginRight: "30px",
            [theme.breakpoints.down("sm")]: {
              height: "40px",
            },
          },
          "& .coinBox": {
            display: "flex",
          },
          "& .divider": {
            display: "flex",
          },
          "& .coinWrapperBox": {
            [theme.breakpoints.down("md")]: {
              border: `solid 1px ${theme.palette.prelemType1.LINE}`,
              padding: theme.spacing(2),
              marginBottom: theme.spacing(2),
              borderRadius: theme.borderRadius.value1,
            },
          },
        },
        "& .redeemWrapper": {
          "& .tabTopBox": {
            width: "100%",
            "& .tabItem": {
              color: theme.palette.prelemType1.TITLE,
              border: "none",
            },
          },
          "& .itemGap": {
            paddingBottom: theme.spacing(2.5),
            paddingRight: theme.spacing(0),
          },
          "& .redeemTabs": {
            paddingTop: theme.spacing(2),
          },
          "& .blockItem": {
            display: "block",
          },
          "& .noneItem": {
            display: "none",
          },
        },
        "& .myProfileWrapper": {
          maxWidth: "820px",
        },
        "& .marginZero": {
          margin: 0,
        },
        "& .marginBottomZero": {
          marginBottom: 0,
        },
        "& .marginTopZero": {
          marginTop: 0,
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
        "& .mobileWithIsdcode": {
          display: "flex",
          "& .smallTxtBox": {
            width: "170px",
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
