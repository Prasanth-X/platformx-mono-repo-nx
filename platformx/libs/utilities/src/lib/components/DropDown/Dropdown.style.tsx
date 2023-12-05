import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    customDropDownWrapper: {
      "&.allCustomTypeDropdown": {
        backgroundColor: theme.palette.prelemType1.SELECT.PLACEHOLDER,
        color: theme.palette.prelemType1.SELECT.TEXT_SELECTED,
        "& .custom-dropdown": {
          "& svg": {
            color: theme.palette.prelemType1.SELECT.TEXT,
          },
        },
      },
    },
  };
});
