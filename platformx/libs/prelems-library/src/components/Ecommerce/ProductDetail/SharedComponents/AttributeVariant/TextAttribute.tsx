import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type TextAttributeProps = {
  ele: any;
  theme: any;
  objKey: any;
  iindex: any;
  classes: any;
  isActive: any;
  attribute: any;
  handleAttribute: any;
};

const TextAttribute = (_props: TextAttributeProps) => {
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
            className='transparentButton'
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
              fontWeight: selectedEle ? "600 !important" : "400",
              color: isActive ? theme.palette.darkText : theme.palette.lightDarkText,
            }}>
            {ele}
          </Button>
        </Box>
      </Box>
    </>
  );
};
export default TextAttribute;
