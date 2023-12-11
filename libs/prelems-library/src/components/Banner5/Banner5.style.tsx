import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    slideShowWrapper: {
      "&.banner5Bgwrapper": {
        "& .slider-dot .itemText": {
          width: "auto",
        },
        "& .linkButton": {
          "& button": {
            display: "flex",
            cursor: "pointer",
            paddingRight: "5px",
            color: theme.palette.textColor,
            "&:hover": {
              color: theme.palette.textColor,
            },
          },
        },
        "& .itemText": {
          color: theme.palette.textColor,
          "&:hover": {
            color: theme.palette.textColor,
          },
        },
        "& .gradient": {
          position: "absolute",
          top: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.4)",
          width: "100%",
        },
        "& .caption": {
          display: "flex",
          flexDirection: "column",
          width: "85%",
        },
      },
    },
  };
});
