import { Box, Typography } from "@mui/material";
import "../../../../Style.css";
import { useCustomStyle } from "./CDCourseContent.style";
import React from "react";
import DOMPurify from "isomorphic-dompurify";

const CDCourseContent = ({ content }: any) => {
  const classes = useCustomStyle();
  return (
    <div id='Requirements' className={`${classes.CDCourseContentWrapper} CDCourseContent`}>
      <Typography variant='h4medium'>Requirements</Typography>
      <Box className='accordianWrapper'>
        <Box className='topWrapper'>
          <Typography
            variant='p4regular'
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(content?.requirements),
            }}></Typography>
        </Box>
      </Box>
    </div>
  );
};

export default CDCourseContent;
