import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  return {
    CDOverviewWrapper: {
      "&.CDOverview": {
        margin: "20px 0",
        "& button": {
          position: "relative",
          "& span": {
            marginLeft: 0,
            marginTop: "4px",
          },
        },
      },
    },
  };
});
