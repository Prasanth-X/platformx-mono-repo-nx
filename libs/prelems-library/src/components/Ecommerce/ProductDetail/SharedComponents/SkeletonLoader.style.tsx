import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    skeltonLoaderItemWrapper: {
      "&.skeltonPreLoaderSection": {
        marginBottom: "20px",
        "& .skeltonType1": {
          width: "25%",
          height: "24px",
          marginBottom: "20px",
        },
        "& .skeltonWrapper": {
          flexGrow: 1,
          flexDirection: "row",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        },
        "& .skeltonType2": {
          minWidth: "45px !important",
          height: "45px !important",
          borderRadius: theme.borderRadius.value,
          marginRight: "10px !important",
        },
      },
    },
  };
});
