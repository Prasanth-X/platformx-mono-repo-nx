import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    paragraphWithHeadlineAndCTAWrapper: {
      "&.paragraphWithHeadlineAndCTABg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .firstColumnContentWrapper": {
          paddingRight: 0,
          width: "100%",
          [theme.breakpoints.up("md")]: {
            paddingRight: "40px",
          },
          [theme.breakpoints.up("em")]: {
            paddingRight: "116px",
          },
          [theme.breakpoints.up("xl")]: {
            paddingRight: "116px",
          },
          [theme.breakpoints.down("md")]: {
            textAlign: "left",
          },
        },
        "& .borderBottom": {
          borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
          maxWidth: "80%",
          [theme.breakpoints.up("md")]: {
            maxWidth: "350px",
          },
          [theme.breakpoints.up("lg")]: {
            maxWidth: "420px",
          },
        },
        "& .secondColumnContentWrapper": {
          width: "100%",
          [theme.breakpoints.down("md")]: {
            textAlign: "left",
          },
        },
      },
    },
  };
});
