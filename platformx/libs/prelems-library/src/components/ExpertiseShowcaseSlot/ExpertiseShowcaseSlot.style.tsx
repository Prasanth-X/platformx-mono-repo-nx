import { makeStyles } from "@mui/styles";
// import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  // const theme = useTheme();
  return {
    expertiseShowcaseSlotWrapper: {
      "&.expertiseShowcaseSlot": {
        "& .imgWrapper": {
          position: "relative",
          display: "flex",
          height: "100%",
          width: "100%",
          padding: 0,
          overflow: "hidden",
          "& img": {
            width: "100%",
            height: "100%",
          },
          "& .bottomButton": {
            position: "absolute",
            width: "100%",
            padding: "0px 10px",
            bottom: "-2px",
            "& button": {
              width: "100%",
            },
          },
        },
        "& .image-button-text": {
          position: "absolute",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          top: "0",
        },
      },
    },
  };
});
