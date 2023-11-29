import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productColorlistWrapper: {
      "&.productColorlist": {
        display: "flex",
        flexDirection: "column",
        "& .boxWrapper": {
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        },
        "& .colorBox": {
          marginRight: "10px",
          [theme.breakpoints.down("md")]: {
            marginRight: "12px",
          },
        },
        "& .productColorOptions": {
          width: "100%",
          height: "100%",
          borderRadius: theme.borderRadius.value,
        },
        "& .transparentButton": {
          background: "transparent",
          minWidth: "45px !important",
          height: "45px !important",
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          padding: "0 !important",
          borderRadius: theme.borderRadius.value,
          "&:hover": {
            borderColor: theme.palette.prelemType1.TITLE,
          },
        },
      },
    },
  };
});
