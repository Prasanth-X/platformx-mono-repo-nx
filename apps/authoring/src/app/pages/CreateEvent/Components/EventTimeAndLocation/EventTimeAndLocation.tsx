import { Box, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../../../components/Common/DatePicker';
import TextBox from '../../../../components/Common/TextBox';
import TitleSubTitle from '../../../../components/Common/TitleSubTitle';
import { useCustomStyle } from '../../CreateEvent.styles';
import CommonBoxWithNumber from '../../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { ComponentProp } from './TimeAndLocation.types';

const EventTimeAndLocation = ({
  state,
  setState,
  unsavedChanges,
}: ComponentProp) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();

  const handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
    unsavedChanges.current = true;
  };

  const startHandleValChange = (event) => {
    setState({
      ...state,
      event_start_date: event?.toISOString(),
    });
    unsavedChanges.current = true;
  };

  const endHandleDateChange = (event) => {
    setState({
      ...state,
      event_end_date: event?.toISOString(),
    });
    unsavedChanges.current = true;
  };

  const handleDateChangeRaw = (e: React.ChangeEvent<HTMLElement>) => {
    e.preventDefault();
  };
  const rightEmptySpace = () => {
    return <Grid item xs={12} sm={5} md={5} lg={5} className='grid'></Grid>;
  };

  return (
    <>
      <Box id='eventTimeAndLocation' className={classes.mainStyleWrapper}>
        <CommonBoxWithNumber
          number='03'
          title={t('event_timing_head')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
          <Grid container>
            {/* Start Date & Time */}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={t('event_start_time')}
                subTitle={t('event_start_subtime')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <DatePicker
                time={state?.event_start_date ? state?.event_start_date : ''}
                handleValChange={startHandleValChange}
                handleDateChangeRaw={handleDateChangeRaw}
                isDisabled={false}
                disablePast={false}
              />
            </Grid>

            {/* End Date & Time */}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={t('event_end_time')}
                subTitle={t('event_end_subtime')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <DatePicker
                time={state?.event_end_date ? state?.event_end_date : ''}
                handleValChange={endHandleDateChange}
                handleDateChangeRaw={handleDateChangeRaw}
                isDisabled={false}
                disablePast={false}
              />
            </Grid>

            {/* Web Link*/}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={t('event_link_')}
                subTitle={t('event_sublink')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <TextBox
                name='webLink'
                state={state.webLink}
                handleOnBlur={handleOnBlur}
                placeHolder={t('event_link_placeholder')}
                maxCharLength={500}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              <TitleSubTitle
                title={t('event_address')}
                subTitle={t('event_subaddress')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <TextBox
                name='address'
                state={state.address}
                handleOnBlur={handleOnBlur}
                placeHolder={t('event_address_placeholder')}
                maxCharLength={200}
              />
            </Grid>

            {/* address local */}

            {rightEmptySpace()}

            <Grid
              item
              xs={12}
              sm={5}
              md={5}
              lg={5}
              className='textFiled'
              sx={{
                paddingRight: '13px',
              }}
            >
              <TextBox
                name='locality'
                state={state.locality}
                handleOnBlur={handleOnBlur}
                placeHolder={t('locality')}
                maxCharLength={200}
              />
            </Grid>
            <Grid item xs={12} sm={2} md={2} lg={2} className='textFiled'>
              <TextBox
                name='postalCode'
                state={state.postalCode}
                handleOnBlur={handleOnBlur}
                placeHolder={t('postal_code')}
                maxCharLength={10}
              />
            </Grid>

            {/* address state */}
            {rightEmptySpace()}

            <Grid
              item
              xs={12}
              sm={4}
              md={4}
              lg={4}
              className='textFiled'
              sx={{
                paddingRight: '13px',
              }}
            >
              <TextBox
                name='regionState'
                state={state.regionState}
                handleOnBlur={handleOnBlur}
                placeHolder={t('region_state')}
                maxCharLength={200}
              />
            </Grid>
            <Grid item xs={12} sm={3} md={3} lg={3} className='textFiled'>
              <TextBox
                name='country'
                state={state.country}
                handleOnBlur={handleOnBlur}
                placeHolder={t('country')}
                maxCharLength={200}
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </Box>
    </>
  );
};

export default React.memo(EventTimeAndLocation);
