import { Box, Checkbox, FormControlLabel, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import DatePicker from '../../../../components/Common/DatePicker';
import TitleSubTitle from '../../../../components/Common/TitleSubTitle';
import { useCustomStyle } from '../../CreateEvent.styles';
import CommonBoxWithNumber from '../../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { ComponentProp } from './Schedule.types';

const EventScheduleDate = ({
  state,
  setState,
  unsavedChanges,
}: ComponentProp) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();

  const publishHandleValChange = (newValue) => {
    setState({ ...state, schedule_publish_datetime: newValue?.toISOString() });
    unsavedChanges.current = true;
  };

  const unPublishHandleValChange = (newValue) => {
    setState({
      ...state,
      schedule_unpublish_datetime: newValue?.toISOString(),
    });
    unsavedChanges.current = true;
  };
  const handlePublishChange = (event) => {
    if (event.target.checked === false) {
      setState({
        ...state,
        is_schedule_publish: event.target.checked,
        schedule_publish_datetime: null,
      });
    } else {
      setState({ ...state, is_schedule_publish: event.target.checked });
    }
    unsavedChanges.current = true;
  };
  const handleUnpublishChange = (event) => {
    if (event.target.checked === false) {
      setState({
        ...state,
        is_schedule_unpublish: event.target.checked,
        schedule_unpublish_datetime: null,
      });
    } else {
      setState({ ...state, is_schedule_unpublish: event.target.checked });
    }
    unsavedChanges.current = true;
  };
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <Box id='schedulePublish' className={classes.mainStyleWrapper}>
        <CommonBoxWithNumber
          number='04'
          title={t('quiz_schedule_header')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
          <Grid container>
            {/* Start Date & Time */}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
              {/* <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox
                  checked={state?.is_schedule_publish}
                  sx={{ pt: 0, pl: 0 }}
                  onChange={handlePublishChange}
                />
                <TitleSubTitle
                  title={t('schedule_publish')}
                  subTitle=''
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Box> */}
              <FormControlLabel
                style={{ marginLeft: 0 }}
                control={
                  <Checkbox
                    sx={{ padding: '5px', margin: 0, width: '34px', height: '34px' }}
                    checked={state?.is_schedule_publish}
                    onChange={handlePublishChange}
                  />
                }
                label={
                  <TitleSubTitle
                    title={t('schedule_publish')}
                    subTitle=''
                    titleVarient='h6medium'
                    subTitleVarient='h7regular'
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
              <DatePicker
                time={state.schedule_publish_datetime}
                handleValChange={publishHandleValChange}
                handleDateChangeRaw={handleDateChangeRaw}
                isDisabled={!state?.is_schedule_publish}
              />
            </Grid>

            {/* End Date & Time */}
            <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiledLast'>
              {/* <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Checkbox
                  checked={state?.is_schedule_unpublish}
                  sx={{ pt: 0, pl: 0 }}
                  onChange={handleUnpublishChange}
                />
                <TitleSubTitle
                  title={t('quiz_unpublish_title')}
                  subTitle=''
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Box> */}
              <FormControlLabel
                style={{ marginLeft: 0 }}
                control={
                  <Checkbox
                    sx={{ padding: '5px', margin: 0, width: '34px', height: '34px' }}
                    checked={state?.is_schedule_unpublish}
                    onChange={handleUnpublishChange}
                  />
                }
                label={
                  <TitleSubTitle
                    title={t('quiz_unpublish_title')}
                    subTitle=''
                    titleVarient='h6medium'
                    subTitleVarient='h7regular'
                  />
                }
              />
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7} className='textFiledLast'>
              <DatePicker
                time={state.schedule_unpublish_datetime}
                handleValChange={unPublishHandleValChange}
                handleDateChangeRaw={handleDateChangeRaw}
                isDisabled={!state?.is_schedule_unpublish}
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </Box>
    </>
  );
};

export default React.memo(EventScheduleDate);
