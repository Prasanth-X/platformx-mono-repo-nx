import React from "react";

const ImageWithWebp = ({ imgWebp, imgOther, height, width, alt }: any) => {
  return (
    <picture>
      {/* Webp format for browsers that support it */}
      <source srcSet={imgWebp} />
      {/* Fallback for browsers that do not support webp */}
      <source srcSet={imgOther} />
      {/* Fallback for browsers that do not support the picture element */}
      <img src={imgOther} alt={alt} height={height} width={width} />
    </picture>
  );
};

export default ImageWithWebp;
