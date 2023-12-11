import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type ColourAttributeProps = {
  ele: any;
  objKey: any;
  iindex: any;
  classes: any;
  isActive: any;
  theme: any;
  attribute: any;
  handleAttribute: any;
};
const ColourAttribute = (_props: ColourAttributeProps) => {
  const {
    ele = {},
    theme = {},
    objKey = "",
    attribute = {},
    handleAttribute = () => {},
    isActive = false,
  } = _props;
  const selectedEle = attribute[objKey]?.selected === ele;

  return (
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
            // outline: selectedEle ? `1px solid ${theme.palette.bgDark}` : "",
            outlineOffset: selectedEle ? "3px" : "",
            height: "45px",
            width: "50px !important",
            color: isActive ? theme.palette.darkText : theme.palette.lightDarkText,
            backgroundColor: `${ele} !important`,
          }}
        />
      </Box>
    </Box>
  );
};
export default ColourAttribute;
