import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type ImageAttributeProps = {
  ele: any;
  theme: any;
  objKey: any;
  iindex: any;
  classes: any;
  isActive: any;
  attribute: any;
  handleAttribute: any;
};

const ImageAttribute = (_props: ImageAttributeProps) => {
  const {
    ele = "",
    theme = {},
    objKey = "",
    attribute = {},
    handleAttribute = () => {},
    isActive = false,
  } = _props;

  const selectedEle = attribute[objKey]?.selected === ele;
  return (
    <>
      <Box className='productWrapperInner'>
        <Box>
          <Button
            className='transparentButtonvariant'
            onClick={
              selectedEle
                ? () => {}
                : () =>
                    handleAttribute({
                      key: objKey,
                      value: ele,
                    })
            }
            sx={{
              outline: selectedEle ? `1px solid ${theme.palette.bgDark}` : "",
              outlineOffset: selectedEle ? "3px" : "",
              color: isActive ? theme.palette.darkText : theme.palette.lightDarkText,
            }}>
            <img
              alt='img'
              src={ele}
              style={{
                width: "40px",
                height: "100%",
                objectFit: "cover",
                display: "flex",
              }}
            />
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default ImageAttribute;
