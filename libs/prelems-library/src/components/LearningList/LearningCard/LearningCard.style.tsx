import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    learningCardWrapper: {
      "&.learningCard": {
        background: theme.palette.prelemType1.BACKGROUND,
        textAlign: "center",
        "& .CardMainWp": {
          maxWidth: "700px",
          border: `1px solid ${theme.palette.prelemType1.LINE}`,
          margin: "8px auto",
          padding: "15px",
          borderRadius: "5px",
          display: "inline-block",
          textAlign: "left",
          "& .leftImgWrapper": {
            margin: "0 15px 0 0",
            display: "flex",
            [theme.breakpoints.down("sm")]: {
              margin: "0 0 15px 0",
            },
            "& img": {
              width: "100%",
            },
          },
          "& .RightContentWrapper": {
            "& .topWrapper": {
              borderBottom: `1px solid ${theme.palette.prelemType1.LINE}`,
              "& .learningCardDescription": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitLineClamp: "5",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
              },
            },
            "& .bottomWrapper": {
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: "10px",
              [theme.breakpoints.down("lg")]: {
                display: "block",
              },
              "& .botLeftWp": {
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                [theme.breakpoints.down("sm")]: {
                  display: "block",
                },
                "& ul": {
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                  margin: "0 10px",
                  [theme.breakpoints.down("sm")]: {
                    margin: "0 0 10px 0",
                  },
                  "& li": {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginRight: "10px",
                    "& svg": {
                      fontSize: "16px",
                      color: theme.palette.prelemType1.LINK,
                      marginRight: "10px",
                    },
                  },
                },
              },
              "& .botRightWp": {
                "& button": {
                  margin: 0,
                  minWidth: "auto",
                },
              },
            },
          },
        },
      },
    },
  };
});
