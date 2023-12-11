import React from 'react';
import './ProductColorList.css';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';
import '../../../../service/i18n';
import { nullToArray, nullToObject } from '../lib/utils/helperFns';
import { useCustomStyle } from './ProductColorList.style';

type ProductColorListProps = {
  variantsHandle: any;
  productFullDetails: any;
};
const ProductColorList = (_props: ProductColorListProps) => {
  const { productFullDetails = {}, variantsHandle = () => {} } =
    nullToObject(_props);
  const { attribute = {} } = nullToObject(productFullDetails);
  const classes = useCustomStyle();
  const { colour = [] } = nullToObject(attribute);
  const { t } = useTranslation();

  return (
    <Box
      className={`product-color-options-wrapper ${classes.productColorlistWrapper} productColorlist`}
    >
      <Typography variant="p4regular">{t('color')}</Typography>
      <Box className="boxWrapper">
        {nullToArray(colour).map((color: any, i: number) => (
          <Box key={'' + i.toString() + 'colour-dj-jd'}>
            <Box className="product-color-options colorBox">
              <Button className="transparentButton">
                <Box
                  className="product-color productColorOptions"
                  sx={{ backgroundColor: color }}
                  onClick={() =>
                    variantsHandle({
                      key: 'colour',
                      value: color,
                    })
                  }
                />
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductColorList;
