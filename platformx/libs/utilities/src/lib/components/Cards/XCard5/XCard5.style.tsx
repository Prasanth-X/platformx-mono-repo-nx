import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    XCard5Wrapper: {
      "&.XCard5Box": {
        cursor: "pointer",
        background: theme.palette.prelemType1.BACKGROUND,
        borderRadius: theme.borderRadius.value,
        marginBottom: theme.spacing(2),
        "& .XCard5innderBox": {
          borderRadius: theme.borderRadius.value,
          transition: "all 0.3s",
          overflow: "hidden",
          "& .imgWrapper": {
            position: "relative",
            height: "403px",
            "& img": {
              objectFit: "cover",
            },
            "& .mainContentBox": {
              position: "absolute",
              left: "0",
              bottom: "0",
              width: "100%",
              background: "linear-gradient(to bottom,  rgba(0,0,0,0) 21%,rgba(0,0,0,0.84) 100%)",
              height: "100%",
              display: "flex",
              alignItems: "flex-end",
              "& .contentWrapperCard5Box": {
                padding: "30px 20px 18px 20px ",
                width: "100%",
                "& .iconWrapper": {
                  width: "44px",
                  height: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                },
                "& .titleWrapper": {
                  "& p": {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    WebkitLineClamp: "1",
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                  },
                },
              },
            },
          },
        },
      },
    },
  };
});
