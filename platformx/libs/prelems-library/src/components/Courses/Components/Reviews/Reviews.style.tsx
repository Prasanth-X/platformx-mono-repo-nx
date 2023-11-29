import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    ReviewsWrapper: {
      "&.Reviews": {
        "& .profileReviewsWp": {
          margin: "10px 0",
          borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
          paddingBottom: "10px",
          "& .imgContentWp": {
            display: "flex",
            justifyContent: "flex-end",
            "& .avtarimg": {
              minWidth: "50px",
              height: "50px",
              maxWidth: "50px",
              marginRight: "15px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
            },
            "& .rightWp": {
              "& .lightsmall": {
                fontSize: "12px",
                fontWeight: "400",
              },
              "& .bottomWp": {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                "& .lightblue ": {
                  color: theme.palette.prelemType1.LINK,
                  marginRight: "15px",
                },
                "& button": {
                  minWidth: "auto",
                },
              },
            },
          },
        },
        "& .bottomLink": {
          textAlign: "center",
          "& button": {
            fontSize: "14px",
            color: theme.palette.prelemType1.LINK,
            position: "relative",
            "& span": {
              marginLeft: 0,
            },
          },
        },
      },
    },
  };
});
