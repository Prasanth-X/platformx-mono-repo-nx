import { Typography, Box } from "@mui/material";
import React from "react";

type VoteData = {
  text: string | number;
  progress: string;
};
const VoteProgress = (props: VoteData) => {
  const cssStyle = `
    .active {
      color: #5cb85b;
    }
    .active .bgGreen {
      background-color: #5cb85b;
    }
  `;
  return (
    <>
      <style>{cssStyle}</style>
      <Box className='active' sx={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
        <Box
          className='bgGreen'
          sx={{
            width: `${props.progress}`,
            height: "14px",
            marginRight: "15px",
            borderRadius: "3px",
            display: "inline-block",
            background: "#fff",
          }}></Box>
        <Typography variant='h6medium' color="textColor" sx={{ whiteSpace: "nowrap" }}>
          {props.text}
        </Typography>
      </Box>
    </>
  );
};

export default VoteProgress;
