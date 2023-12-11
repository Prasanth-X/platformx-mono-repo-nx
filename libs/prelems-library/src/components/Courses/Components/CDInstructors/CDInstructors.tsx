import { Typography } from "@mui/material";
import "../../../../Style.css";
import { useCustomStyle } from "./CDInstructors.style";
import * as React from "react";
import DOMPurify from "isomorphic-dompurify";

const CDInstructors = ({ content }: any) => {
  const classes = useCustomStyle();

  return (
    <div id='Credits' className={`${classes.CDInstructorsWrapper} CDInstructors`}>
      <Typography variant='h4medium'>Credits</Typography>
      <Typography
        variant='p3regular'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content?.credits),
        }}></Typography>
    </div>
  );
};

export default CDInstructors;
