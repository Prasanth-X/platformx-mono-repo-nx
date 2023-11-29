import React, { useState } from "react";
import "../../../../service/i18n";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useCustomStyle } from "./ProductSizeList.style";
import TextAttribute from "./AttributeVariant/TextAttribute";
import ImageAttribute from "./AttributeVariant/ImageAttribute";
import ColourAttribute from "./AttributeVariant/ColourAttribute";
import { convertToLowerCase, nullToObject } from "../../../../utils/helperFns";

type ProductAttributeProps = {
  variantsHandle: any;
  productFullDetails: any;
};

const ProductAttribute = (_props: ProductAttributeProps) => {
  const { productFullDetails = {}, variantsHandle = () => {} } = nullToObject(_props);

  const theme = useTheme();
  const classes = useCustomStyle();
  const { attribute = {} } = nullToObject(productFullDetails);

  const [isActive, setIsactive] = useState(true);

  const handleAttribute = (e: any) => {
    setIsactive(true);
    variantsHandle(e);
  };

  return (
    <>
      {Object.keys(nullToObject(attribute)).map((objKey, i: number) => {
        Object.keys(productFullDetails).forEach((el) => {
          if (objKey === el) {
            attribute[objKey].selected = productFullDetails[el];
          }
        });

        return (
          <Box
            key={convertToLowerCase(i) + "attribute-jdjd-jdjd"}
            className={`${classes.productAllAttributesWrapper} productAllAttributes`}>
            <Typography variant='p4regular'>{attribute[objKey]?.label}</Typography>
            <Box className='childAttributeRow'>
              {attribute[objKey]?.value?.map((ele: any, iindex: number) => {
                if (ele.slice(0, 1) === "#") {
                  return (
                    <Box
                      key={convertToLowerCase(iindex) + "attribute-ColourAttribute-jdjd"}
                      className='productWrapperOuter'>
                      {/* color component */}
                      <ColourAttribute
                        ele={ele}
                        theme={theme}
                        iindex={iindex}
                        objKey={objKey}
                        classes={classes}
                        isActive={isActive}
                        attribute={attribute}
                        handleAttribute={handleAttribute}
                      />
                    </Box>
                  );
                } else if (ele.indexOf("http://") === 0 || ele.indexOf("https://") === 0) {
                  return (
                    <Box
                      key={convertToLowerCase(iindex) + "attribute-ImageAttribute-jdjd"}
                      className='productWrapperOuter'>
                      {/* image component */}
                      <ImageAttribute
                        ele={ele}
                        theme={theme}
                        iindex={iindex}
                        objKey={objKey}
                        classes={classes}
                        isActive={isActive}
                        attribute={attribute}
                        handleAttribute={handleAttribute}
                      />
                    </Box>
                  );
                } else {
                  return (
                    <Box
                      key={convertToLowerCase(iindex) + "attribute-TextAttribute-jdjd"}
                      className='productWrapperOuter'>
                      {/* text component */}
                      <TextAttribute
                        ele={ele}
                        theme={theme}
                        iindex={iindex}
                        objKey={objKey}
                        classes={classes}
                        isActive={isActive}
                        attribute={attribute}
                        handleAttribute={handleAttribute}
                      />
                    </Box>
                  );
                }
              })}
            </Box>
          </Box>
        );
      })}
    </>
  );
};
export default ProductAttribute;
