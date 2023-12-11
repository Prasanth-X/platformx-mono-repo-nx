import React from "react";
import { Box } from "@mui/material";
import loadergif from "../../../assets/Data-loader.gif";
import { useCustomStyle } from "./ProductLoader.style";

const ProductLoader = () => {
  const classes = useCustomStyle();
  return (
    <Box className={`${classes.circularLoaderDivWrapper} loadingImgWrapperLoader`}>
      <img alt='loader' src={loadergif} className='loaderImg' />
    </Box>
  );
};

export default ProductLoader;
