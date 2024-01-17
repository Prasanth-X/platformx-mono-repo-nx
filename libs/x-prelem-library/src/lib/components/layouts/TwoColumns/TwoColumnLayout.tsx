import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import useTheme from "@mui/material/styles/useTheme";

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    secondColumn: {
      "&.second-col": {
        display: "flex",
        alignItems: "center",
        padding: "0px 0px  0px 0px",
        [theme.breakpoints.down("md")]: {
          textAlign: "center",
        },
        [theme.breakpoints.up("md")]: {
          textAlign: "left",
          padding: "0px 0px 0px 40px",
        },
        width: "100%",
        "&.noGap": {
          [theme.breakpoints.between("xs", "em")]: {
            textAlign: "left",
            padding: 0,
          },
        },
        "&.noPadding": {
          padding: 0,
        },
        "&.alignStart": {
          alignItems: "start",
        },
        "&.alignBottom": {
          alignItems: "end",
        },
        "&.alignCenter": {
          alignItems: "center",
        },
        "& .rounderCardImages": {
          borderRadius: theme.borderRadius.value1,
        },
      },
    },
    firstColumn: {
      "&.first-col": {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
          textAlign: "center",
        },
        width: "100%",
        "&.alignStart": {
          alignItems: "start",
        },
        "&.alignBottom": {
          alignItems: "end",
        },
        "&.alignCenter": {
          alignItems: "center",
        },
        "& .rounderCardImages": {
          borderRadius: theme.borderRadius.value1,
        },
      },
    },
  };
});

const TwoColumnLayout = ({
  firstColumnContent,
  secondColumnContent,
  gridVal,
  customClassName,
  noGap,
  col1Align,
  col2Align,
  noPadding,
}: any) => {
  const classes = useCustomStyle();
  const getAlingment = (align: string) => {
    if (align === "start") {
      return "alignStart";
    } else if (align === "end") {
      return "alignBottom";
    } else if (align === "center") {
      return "alignCenter";
    }
  };
  return (
    <Grid container className={`two-column-layout ${customClassName}`}>
      <Grid
        item
        xs={gridVal?.xs ? gridVal.xs[0] : 12}
        sm={gridVal?.sm ? gridVal.sm[0] : 12}
        md={gridVal?.md ? gridVal.md[0] : 6}
        em={gridVal?.em ? gridVal.em[0] : 6}
        lg={gridVal?.lg ? gridVal.lg[0] : 6}
        className={`first-col ${classes["firstColumn"]} 
      ${col1Align ? getAlingment(col2Align) : ""}`}>
        {firstColumnContent}
      </Grid>
      <Grid
        item
        xs={gridVal?.xs ? gridVal.xs[1] : 12}
        sm={gridVal?.sm ? gridVal.sm[1] : 12}
        md={gridVal?.md ? gridVal.md[1] : 6}
        em={gridVal?.em ? gridVal.em[1] : 6}
        lg={gridVal?.lg ? gridVal.lg[1] : 6}
        className={`second-col ${classes["secondColumn"]} ${
          col2Align ? getAlingment(col2Align) : ""
        } ${noGap ? "noGap" : ""} ${noPadding ? "noPadding" : ""}`}>
        {secondColumnContent}
      </Grid>
    </Grid>
  );
};

export default TwoColumnLayout;
