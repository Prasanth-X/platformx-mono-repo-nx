import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productSummaryViaVideoWrapper: {
      "&.productSummaryViaVideoBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .wrapperVideo": {
          marginBottom: "0px",
          height: "500px",
          width: "100%",
          borderRadius: theme.borderRadius.value1,
          overflow: "hidden",
          [theme.breakpoints.up("md")]: {
            marginBottom: "20px",
            height: "400px",
          },
          [theme.breakpoints.down("sm")]: {
            marginBottom: "20px",
            height: "300px",
          },
        },
      },
    },
  };
});
