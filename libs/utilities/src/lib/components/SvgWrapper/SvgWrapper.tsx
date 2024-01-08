import React from "react";

const SvgWrapper = ({ svgPath, ...props }) => {
    return <img src={svgPath} alt="SVG" {...props} />;
};

export default SvgWrapper;
