import React from "react";
import Radio from "@mui/material/Radio";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useTranslation } from "react-i18next";
import useTheme from "@mui/material/styles/useTheme";
import "../../../../service/i18n";
import { useCustomStyle } from "./Shipping.style";

type ecommerceShippingProps = {
  shipType: string;
};
const Shipping = (_props: ecommerceShippingProps) => {
  const classes = useCustomStyle();
  const theme = useTheme();
  const { shipType = "" } = _props;
  const { t } = useTranslation();

  return (
    <FormControl className={`${classes.radioBackground} shippingRadioItems`}>
      <FormLabel id='shipping-radio-buttons-group-label'>
        <Typography variant='p3regular' color='tertiaryParagraph'>
          {t("shipping")}
        </Typography>
      </FormLabel>
      <RadioGroup
        value={shipType}
        // onChange={handleUrlChange}
        aria-labelledby='shipping-radio-buttons-group-label'
        name='radio-buttons-group'
        className={classes.radioBackground}>
        <FormControlLabel
          value={"freeShipping"}
          className='radioLabelItem'
          control={
            <Radio
              className='shippingRadioButton'
              sx={{
                color: theme.palette.prelemType3.RADIO.BOX_COLOR,
                "&.Mui-checked": {
                  color: theme.palette.prelemType3.RADIO.BOX_COLOR_ACTIVE,
                },
                "&.Mui-disabled": {
                  color: theme.palette.prelemType3.RADIO.BOX_COLOR,
                  opacity: 0.4,
                },
              }}
            />
          }
          label={
            <Typography
              variant='p3regular'
              color='tertiaryParagraph'
              component='span'
              className='radioTextGap'>
              {t("free_shipping_in_city")}
            </Typography>
          }
        />
        <FormControlLabel
          value='pickup'
          className='radioLabelItem'
          disabled={true}
          control={
            <Radio
              className='shippingRadioButton'
              sx={{
                color: theme.palette.prelemType3.RADIO.BOX_COLOR,
                "&.Mui-checked": {
                  color: theme.palette.prelemType3.RADIO.BOX_COLOR_ACTIVE,
                },
                "&.Mui-disabled": {
                  color: theme.palette.prelemType3.RADIO.BOX_COLOR,
                  opacity: 0.4,
                },
              }}
            />
          }
          label={
            <Typography
              variant='p3regular'
              color='tertiaryParagraph'
              component='span'
              className='radioTextGap'>
              {t("pickup")}
            </Typography>
          }
        />
        <FormControlLabel
          value='courierCharges'
          className='radioLabelItem'
          disabled={true}
          control={
            <Radio
              className='shippingRadioButton'
              sx={{
                color: theme.palette.prelemType3.RADIO.BOX_COLOR,
                "&.Mui-checked": {
                  color: theme.palette.prelemType3.RADIO.BOX_COLOR_ACTIVE,
                },
                "&.Mui-disabled": {
                  color: theme.palette.prelemType3.RADIO.BOX_COLOR,
                  opacity: 0.4,
                },
              }}
            />
          }
          label={
            <Typography
              variant='p3regular'
              color='tertiaryParagraph'
              component='span'
              className='radioTextGap'>
              {`${t("courier_charges")} $ 5`}
            </Typography>
          }
        />
      </RadioGroup>
    </FormControl>
  );
};

export default Shipping;
