import { Typography } from "@mui/material";
import "../../../../Style.css";
import { useCustomStyle } from "./Reviews.style";
import * as React from "react";
import DOMPurify from "isomorphic-dompurify";

const Reviews = ({ content }: any) => {
  const classes = useCustomStyle();

  return (
    <div id='Course_type' className={`${classes.ReviewsWrapper} Reviews`}>
      <Typography variant='h4medium'>Course Type</Typography>
      <Typography
        variant='p3regular'
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content?.r_identifier),
        }}></Typography>
    </div>
  );
};

export default Reviews;
