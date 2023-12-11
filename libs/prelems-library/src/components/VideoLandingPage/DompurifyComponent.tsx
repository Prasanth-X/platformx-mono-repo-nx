import React from "react";
import { Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";

const DompurifyComponent = ({ content, variant, styling }: any) => {
  return (
    <Typography
      variant={variant}
      sx={{ ...styling }}
      dangerouslySetInnerHTML={{ __html: DOMPurify?.sanitize(content || "") }}
    />
  );
};

export default DompurifyComponent;
