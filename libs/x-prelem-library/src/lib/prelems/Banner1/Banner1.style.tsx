import { makeStyles } from "@mui/styles";

export const useCustomStyle = makeStyles(() => {
  return {
    banner1Wrapper: {
      "&.banner1Props": {
        position: "relative",
        display: "flex",
        "& img": { height: "100%" },
      },

      "& .banner1Overlay": {
        position: "absolute",
        top: "0",
        bottom: "0",
        background: "rgba(0, 0, 0, 0.5)",
        width: "100%",
        height: "100%",
      },
      "& .banner1ContentWrapper": {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "94%",
        "& .contentText": {
          display: "-webkit-box",
          WebkitLineClamp: "8",
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        },
      },
    },
  };
});
