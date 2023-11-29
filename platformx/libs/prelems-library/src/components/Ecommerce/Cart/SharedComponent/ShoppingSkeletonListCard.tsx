import React from "react";
import { Box } from "@mui/material";
import { useCustomStyle } from "./ShoppingSkeletonListCard.style";

const ShoppingSkeletonListCard = () => {
  const classes = useCustomStyle();
  return (
    <Box className={`${classes.shoppingSkeltonWrapper} shoppingSkeltonPreLoader`}>
      <Box className='skeleton skelton1'></Box>
      <Box className='skeltonInner'>
        <Box className='skeleton skeltonLine'></Box>
        <Box className='skeleton skeltonLine'></Box>
        <Box className='skeleton skeltonLine'></Box>
        <Box className='skeleton skeltonLine1'></Box>

        <Box className='skeltonWrapper2'>
          <Box className='skeleton skeltopType2'></Box>
          <Box className='skeleton skeltopType3'></Box>
        </Box>
      </Box>
      <Box className='skeleton skeltonType4'></Box>
      <Box className='skeleton skeltonType5'></Box>
      <Box className='boxWrapper'>
        <Box className='skeleton skeltonType6'></Box>
        <Box className='skeleton skeltonType7'></Box>
      </Box>
    </Box>
  );
};

export default ShoppingSkeletonListCard;
