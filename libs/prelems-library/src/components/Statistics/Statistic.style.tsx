import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    statisticsWrapper: {
      "&.statisticsBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .gridItem": {
          textAlign: "center",
          padding: "0 15px",
        },
        "& .counternumberBox": {
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          borderRadius: theme.borderRadius.value1,
          padding: "25px",
          minHeight: "210px",
          [theme.breakpoints.up("md")]: {
            minHeight: "230px",
          },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
        },
        "& .gap": {
          marginTop: "20px",
          marginBottom: "20px",
          [theme.breakpoints.up("md")]: {
            margin: 0,
          },
        },
        "& .title": {
          marginBottom: "10px",
          fontSize: "40px",
          [theme.breakpoints.up("md")]: {
            marginBottom: "15px",
            fontSize: "30px",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "48px",
          },
        },
        "& .description": {
          padding: "0",
          [theme.breakpoints.up("md")]: {
            padding: "0 15px",
          },
          [theme.breakpoints.up("lg")]: {
            padding: "0 30px",
          },
        },
      },
    },
  };
});
