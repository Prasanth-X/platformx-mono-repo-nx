import { Grid, Box, Typography } from '@mui/material';
import TextBox from '../../../components/Common/TextBox';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import AutoTextArea from '../../../components/Common/AutoTextArea';
import React from 'react';
import { t } from 'i18next';
import { useStyles } from './CookieSetting.style';
import CookieTextBox from './CookieTextBox';
import CookieTextArea from './CookieTextArea';

const CookieFormControl = ({
  name = '',
  type = '',
  maxLength = null,
  placeHolder = '',
  title = '',
  subTitle = '',
  titleVarient = '',
  subTitleVarient = '',
  value,
  handleChange,
  skeleton = '',
  skeletonTitle = '',
  isShowPreview = false,
  index = 0,
}) => {
  const classes = useStyles();
  const isLimitChar =
    title === 'manage_save_setting_consent_button_text' ||
    title === 'cookie_manage_setting_consent_button_text' ||
    title === 'cookie_manage_settings_cookie_button_text' ||
    title === 'cookie_accept_consent_cookie_button_text';

  const renderControl = (controlType) => {
    switch (controlType) {
      case 'textbox':
        return (
          <CookieTextBox
            name={name}
            maxCharLength={isLimitChar ? maxLength : null}
            placeHolder={t(placeHolder)}
            state={value}
            handleChange={handleChange}
            textBoxStyle={{
              background: '#EFF0F7',
              borderRadius: '5px',
              fontFamily: 'Inter !important',
              fontStyle: 'normal',
              padding: '5px 20px',
              height: '57px',
            }}
            placeHolderStyle={{
              top: '4px',
              left: '9px',
              fontFamily: 'Inter',
              fontSize: '14px',
              fontWeight: '400',
              color:'#6E7191'
            }}
          />
        );
      case 'textarea':
        return (
          <CookieTextArea
            name={name}
            placeHolder={t(placeHolder)}
            // maxCharLength={maxLength}
            state={value}
            handleChange={handleChange}
          />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        className={index > 0 ? classes.leftGridItem : ''}
      >
        <TitleSubTitle
          title={t(title)}
          subTitle={t(subTitle)}
          titleVarient={titleVarient}
          subTitleVarient={subTitleVarient}
          subTitleColor='#89909A'
          titleColor='#14142B'
        />
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        // sx={{ marginTop: { sm: "40px", xs: "14px" } }}
        className={classes.rightGridItem}
      >
        {renderControl(type)}
      </Grid>
      {isShowPreview && skeleton && (
        <Box className={classes.previewContainer}>
          <Typography className={classes.informativeSkeletonTitle}>
            {t(skeletonTitle)}
          </Typography>
          {skeleton}
        </Box>
      )}
    </>
  );
};
export default React.memo(CookieFormControl);
