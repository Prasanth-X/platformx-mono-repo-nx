import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    contactInformationWrapper: {
      "&.contactInformationPanel": {
        paddingRight: 0,
        paddingBottom: 0,
        [theme.breakpoints.up("em")]: {
          paddingRight: "15px",
        },
      },
    },
  };
});
