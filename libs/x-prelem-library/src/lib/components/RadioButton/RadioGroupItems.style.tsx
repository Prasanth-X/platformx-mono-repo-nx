import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    radioGroupWrapperOuter: {
      "&.radioGroupItems": {
        "& .item": {
          borderBottom: `solid 1px ${theme.palette.prelemType1.LINE}`,
        },
        "& .item:last-child": {
          borderBottom: "none",
        },
      },
    },
  };
});
