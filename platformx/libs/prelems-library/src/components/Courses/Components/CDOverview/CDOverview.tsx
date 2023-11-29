import { Button, Typography } from "@mui/material";
import "../../../../Style.css";
import { useCustomStyle } from "./CDOverview.style";
import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { handleHtmlTags } from "../../../../utils/helperFns";

const CDOverview = ({ content }: any) => {
  const classes = useCustomStyle();
  const limit = 200;
  const [description, setDescription] = useState("");
  const [readState, setReadState] = useState("");
  const getDescription = () => {
    return handleHtmlTags(content?.description);
  };
  useEffect(() => {
    if (content?.description) {
      setDescription(getDescription().substr(0, limit) + "...");
      if (getDescription().length > limit) {
        setReadState("more");
      }
    }
  }, [content]);
  const readMore = () => {
    setDescription(getDescription());
    setReadState("less");
  };
  const readLess = () => {
    setDescription(getDescription().substr(0, limit) + "...");
    setReadState("more");
  };
  return (
    <div id='Description' className={`${classes.CDOverviewWrapper} CDOverview`}>
      <Typography variant='h4medium'>Description</Typography>
      <Typography variant='p3regular'>{description}</Typography>
      <Button
        variant='primaryButton4'
        endIcon={<KeyboardArrowRightIcon />}
        sx={{ display: readState === "more" ? "flex" : "none" }}
        onClick={() => readMore()}>
        Read More
      </Button>
      <Button
        variant='primaryButton4'
        endIcon={<KeyboardArrowRightIcon />}
        sx={{ display: readState === "less" ? "flex" : "none" }}
        onClick={() => readLess()}>
        Read Less
      </Button>
    </div>
  );
};

export default CDOverview;
