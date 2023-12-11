import { Box, Typography, LinearProgress } from "@mui/material";
import React from "react";

type PropsData = {
  progressText: string;
  progress: number;
};

export default function ProgressBar(props: PropsData) {
  return (
    <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1, mt: "6px" }}>
        <LinearProgress
          sx={{
            height: "2px",
            color: "#fff",
            background: "rgba(230, 234, 237, 0.4)",
            "& .Platform-x-LinearProgress-barColorPrimary": {
              backgroundColor: "#fff",
            },
            borderRadius: 5,
          }}
          variant='determinate'
          value={props.progress}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='h6medium' color="textColor">{props.progressText}</Typography>
      </Box>
    </Box>
  );
}
