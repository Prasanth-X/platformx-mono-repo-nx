import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productSummaryViaImageWrapper: {
      "&.productSummaryViaImageBg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .wrapperImg": {
          marginBottom: "0px",
          [theme.breakpoints.down("sm")]: {
            marginBottom: "20px",
          },
        },
      },
    },
  };
});
