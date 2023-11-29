import React from "react";
import { Box } from "@mui/material";
import { useCustomStyle } from "./SkeletonLoader.style";

const SkeletonLoader = () => {
  const classes = useCustomStyle();
  return (
    <Box className={`${classes.skeltonLoaderItemWrapper} skeltonPreLoaderSection`}>
      <Box className='skeleton skeltonType1'></Box>
      <Box className='skeltonWrapper'>
        <Box className='skeleton skeltonType2'></Box>
        <Box className='skeleton skeltonType2'></Box>
      </Box>
    </Box>
  );
};

export default SkeletonLoader;
