import useTheme from "@mui/material/styles/useTheme";
import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ExitModalWrapper: {
      "&.DialogBg": {
        "& .Platform-x-Paper-root": {
          background: theme.palette.prelemType1.BACKGROUND,
        },
        "& .BoxImage": {
          textAlign: "center",
          color: "#fd0c0d",
          margin: { xs: 0, md: "71px 0 4px" },
          height: "120px",
        },
        "& .BoxDialogTitle": {
          margin: "0px",
          textAlign: "center",
          padding: "19px 0 24px 0px",
        },
        "& .BoxDialogAction": {
          display: "flex",
          justifyContent: "center",
          margin: { xs: "10px 0", md: "61px 0 74px" },
        },
        "& .BoxDialogContent": {
          textAlign: "center",
          padding: "0px 20px 0px 20px",
          maxWidth: 420,
          margin: "auto",
          marginTop: "0px",
          marginBottom: "0px",
        },
        "& .BoxTypography": {
          fontFamily: "inter",
        },
      },
    },
  };
});
