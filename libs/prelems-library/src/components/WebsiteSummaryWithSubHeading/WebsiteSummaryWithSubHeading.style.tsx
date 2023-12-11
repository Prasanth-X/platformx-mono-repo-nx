import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    websiteSummaryWithSubHeadingWrapper: {
      "&.websiteSummaryWithSubHeadingBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .title": {
          borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
        },
        "& .imageWrapper": {
          paddingRight: 0,
          [theme.breakpoints.up("em")]: {
            paddingRight: "24px",
          },
        },
        "& .headingWrapper": {
          maxWidth: "80%",
          [theme.breakpoints.up("md")]: {
            maxWidth: "350px",
          },
          [theme.breakpoints.up("lg")]: {
            maxWidth: "420px",
          },
        },
        "& .secondColumnContentWrapper": {
          paddingRight: 0,
          paddingTop: "24px",
          width: "100%",
          [theme.breakpoints.down("md")]: {
            textAlign: "left",
            paddingTop: 0,
          },
        },
      },
    },
  };
});
