import React from 'react';
import './AddessPreview.css';
import { Box, Typography } from '@mui/material';
import { nullToObject } from '../lib/utils/helperFns';
import { useTranslation } from 'react-i18next';
import '../../../../service/i18n';
import { useCustomStyle } from './AddressPreview.style';

type ecomAddessPreviewProps = {
  stateManage?: any;
  preViewAddress?: any;
};

const AddessPreview = (_props: ecomAddessPreviewProps) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const { stateManage = {}, preViewAddress = () => {} } = nullToObject(_props);
  const {
    city = '',
    state = '',
    email = '',
    pincode = '',
    address = '',
    landmark = '',
    lastName = '',
    firstName = '',
    alterNumber = '',
    contactNumber = '',
  } = nullToObject(stateManage);

  const renderData = (label = '', valueData = '') => {
    return (
      <Box
        className={`shipping-detail-content ${classes.addressPreviewWrapper} addressPreviewScreen`}
      >
        <Box className="items">
          <Typography variant="p4medium" className="item name">
            {label}
          </Typography>
          <Typography variant="p4regular" className="item detail-text">
            {valueData}
          </Typography>
        </Box>
        <Box className="item action">
          <Typography
            onClick={() => preViewAddress()}
            variant="p4regular"
            className="pointer"
          >
            {t('Change')}
          </Typography>
        </Box>
      </Box>
    );
  };

  const commaAdded = (val: string | number) => {
    if (val) {
      return val + ', ';
    }
    return '';
  };

  return (
    <Box className={`${classes.addressPreviewWrapper} addressdetailScreen`}>
      <Typography variant="h4bold">{t('shipping_details')}</Typography>
      <Box className={`shipping-detail-section shippingOuterBorder`}>
        <Box className="card-content-container">
          {renderData(t('Name'), firstName + ' ' + lastName)}
          {renderData(t('email_id'), email)}
          {renderData(
            t('ship_to'),
            commaAdded(address) +
              commaAdded(city) +
              commaAdded(state) +
              commaAdded(pincode) +
              ' ' +
              landmark
          )}
          {renderData(`${t('contact_no')}`, contactNumber)}
          {renderData(`${t('alternate_no')}`, alterNumber)}
        </Box>
      </Box>
    </Box>
  );
};

export default AddessPreview;
