import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    productAllAttributesWrapper: {
      "&.productAllAttributes": {
        display: "flex",
        flexDirection: "column",
        marginBottom: "12px",
        "& .childAttributeRow": {
          display: "flex",
          gap: "7px",
        },
        "& .productWrapperOuter": {
          display: "flex",
          flexDirection: "row",
        },
        "& .productWrapperInner": {
          flexGrow: 1,
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        },
        "& .transparentButton": {
          background: "transparent",
          marginRight: "10px !important",
          minWidth: "45px !important",
          outline: `1px solid ${theme.palette.prelemType1.LINE}`,
          color: theme.palette.prelemType1.PARAGRAPH,
          borderRadius: "3px",
          padding: "5px !important",
          width: "100% !important",
        },
        "& .transparentButtonvariant": {
          background: "transparent",
          marginRight: "10px !important",
          minWidth: "35px !important",
          outline: `1px solid ${theme.palette.prelemType1.TITLE}`,
          borderRadius: "50% ",
          padding: "5px !important",
          height: "35px !important",
          width: "35px !important",
        },
      },
    },
    // wrapperGap: { },
  };
});
