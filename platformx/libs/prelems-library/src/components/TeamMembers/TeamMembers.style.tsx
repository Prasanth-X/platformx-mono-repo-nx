import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    teamMembersWrapper: {
      "&.teamMembersBG": {
        background: theme.palette.prelemType3.BACKGROUND,
        "& .overlayWrapper": {
          position: "relative",
          width: "100%",
        },
        "& .add-content-overlay": {
          background: `rgba(${theme.palette.overlay["editOverlay"]})`,
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0",
          left: "",
          display: "none",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "1",
          "& .overLaytextgap": {
            marginTop: "0px",
          },
        },
        "& .pointer": {
          cursor: "pointer",
          textAlign: "center",
        },
        "& .autorenewIcon": {
          fill: theme.palette.autoRenewIcon,
          [theme.breakpoints.up("xs")]: {
            width: "50px",
            height: "50px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "50px",
            height: "50px",
          },
        },
        "& .marginZero": {
          margin: 0,
        },
        "& .marginTopZero": {
          marginTop: 0,
        },
        "& .imagecard": {
          width: "100%",
          [theme.breakpoints.up("xs")]: {
            padding: "8px",
            paddingBottom: "15px",
          },
          [theme.breakpoints.up("md")]: {
            padding: "8px",
          },
          "& .imgbox": {
            transition: "all 0.3s",
            display: "flex",
            [theme.breakpoints.up("xs")]: {
              marginBottom: "5px",
              height: "236px",
            },
            [theme.breakpoints.up("md")]: {
              height: "283px",
            },
            [theme.breakpoints.up("md")]: {
              marginBottom: "10px",
              height: "234px",
            },
            [theme.breakpoints.up("em")]: {
              height: "331px",
            },
            [theme.breakpoints.up("lg")]: {
              height: "279px",
            },
            [theme.breakpoints.up("xl")]: {
              height: "324px",
            },
            width: "100%",
            overflow: "hidden",
            borderRadius: theme.borderRadius.value1,
          },
          "&:hover": {
            "& .imgbox": {
              transition: "all 0.3s",
              marginTop: "-15px",
              marginBottom: "25px",
            },
          },
          "& .teamMemberImg": {
            objectFit: "cover",
            width: "100%",
          },
        },
        "& .teamMemberContainer": {
          justifyContent: "center",
          // [theme.breakpoints.up("xs")]: {
          //   margin: "0px 0px",
          //   width: "calc(100% + 30px)",
          // },
          [theme.breakpoints.up("md")]: {
            margin: "0px 0px",
            width: "calc(100% + 0px)",
          },
        },
        "& .itemGap": {
          [theme.breakpoints.up("xs")]: {
            margin: "5px 0 7px 8px",
          },
          [theme.breakpoints.up("md")]: {
            margin: "7px 0 14px 8px",
          },
        },
        "& .borderLine": {
          borderColor: theme.palette.prelemType3.LINE,
          maxWidth: "250px",
        },
      },
    },
  };
});
