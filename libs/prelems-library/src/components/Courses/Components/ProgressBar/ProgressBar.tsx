import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import { Typography } from "@mui/material";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 5,
  borderRadius: 5,
  "&.colorPrimary": {
    backgroundColor: "green",
  },
}));

export interface Props {
  value: number;
}

export default function ProgressBar({ value }: Props) {
  return (
    <Box className='progressbarWp'>
      <Box className='progressBox'>
        <BorderLinearProgress variant='determinate' value={value} />
      </Box>
      <Box className='ratingtextBox'>
        <Typography variant='p4regular'>{value}%</Typography>
      </Box>
    </Box>
  );
}
