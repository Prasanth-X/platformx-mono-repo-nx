import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productSummary3Wrapper: {
      "&.productSummary3Bg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .imageWrapper": {
          display: "flex",
          borderRadius: `${theme.borderRadius.value1} ${theme.borderRadius.value1} 0 0`,
          [theme.breakpoints.down("md")]: {
            borderRadius: `${theme.borderRadius.value1} ${theme.borderRadius.value1} 0  0`,
          },
          [theme.breakpoints.up("em")]: {
            borderRadius: `${theme.borderRadius.value1} 0  0 ${theme.borderRadius.value1}`,
          },
          overflow: "hidden",
        },
        "& .outerBox": {
          display: "initial",
        },
        "& .ProductSummary3": {},
        "& .title": {
          borderBottom: `1px solid ${theme.palette.prelemType3.LINE}`,
          maxWidth: "80%",
          [theme.breakpoints.up("md")]: {
            maxWidth: "350px",
          },
          [theme.breakpoints.up("lg")]: {
            maxWidth: "420px",
          },
        },
        "& .imageProp": {
          width: "100%",
          height: "100%",
        },
        "& .secondColumnContentWrapper": {
          background: theme.palette.prelemType3.BACKGROUND,
          borderBottomRightRadius: theme.borderRadius.value1,
          borderTopRightRadius: theme.borderRadius.value1,
          width: "100%",
          padding: "40px",
          [theme.breakpoints.down("em")]: {
            padding: "15px",
            borderBottomRightRadius: theme.borderRadius.value1,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: theme.borderRadius.value1,
            borderTopLeftRadius: 0,
          },
        },
      },
    },
  };
});
