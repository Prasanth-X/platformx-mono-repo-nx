import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    websiteintroWrapper: {
      "&.websiteintrobg": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .imageWrapper": {
          [theme.breakpoints.down("md")]: {
            paddingTop: "12px",
          },
        },
      },
    },
  };
});
