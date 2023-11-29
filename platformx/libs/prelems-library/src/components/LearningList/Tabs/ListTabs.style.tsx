import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    TabMainWrapper: {
      "&.TabWrapper": {
        background: theme.palette.prelemType1.BACKGROUND,
        "& .tabTopBox": {
          borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
          display: "flex",
          alignItems: "center",
          margin: "30px 0",
          justifyContent: "center",
          "& .tabItemWrapper": {
            minWidth: "auto",
            border: 0,
            "& button.tabItem": {
              background: theme.palette.prelemType1.TAB.VARIANT1.TITLE_BACKGROUND,
              color: theme.palette.prelemType1.TAB.VARIANT1.TITLE,
              border: "none",
              marginRight: theme.spacing(1),
            },
            "& button.tabItem.Mui-selected": {
              backgroundColor: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE_BACKGROUND,
              color: theme.palette.prelemType1.TAB.VARIANT1.TITLE_ACTIVE,
            },
          },
        },
        "& .tabDetailWrapper": {
          minHeight: "60px",
        },
      },
    },
    noResults: {
      display: "flex",
      justifyContent: "center",
    },
  };
});
