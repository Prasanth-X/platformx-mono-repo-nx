import { Box, Checkbox, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  saveSchedulePublishDateTime,
  saveScheduleUnpublishDateTime,
} from '../../../store/Actions';
import { Store } from '../../../store/ContextStore';
const Schedule = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const {
    SchedulePublishDateTime,
    ScheduleUnpublishDateTime,
    IsSchedulePublish,
    IsScheduleUnpublish,
  } = page.pageSettings;
  const initialPublishRender = useRef(true);
  const initialUnpublishRender = useRef(true);
  const initialScheduleAt = SchedulePublishDateTime
    ? new Date(SchedulePublishDateTime)
    : null;
  const initialUnscheduleAt = ScheduleUnpublishDateTime
    ? new Date(ScheduleUnpublishDateTime)
    : null;
  const [publishTime, setPublishTime] = useState(initialScheduleAt);
  const [unpublishTime, setunpublishTime] = useState(initialUnscheduleAt);
  const [schedulePagePublish, setSchedulePagePublish] = useState<
    boolean | null
  >(IsSchedulePublish);
  const [schedulePageUnpublish, setSchedulePageUnpublish] = useState<
    boolean | null
  >(IsScheduleUnpublish);

  const handlePublishDateChange = (newValue: any) => {
    setPublishTime(newValue);
  };
  const handleUnpublishValChange = (newValue) => {
    setunpublishTime(newValue);
  };
  const handlePublishChange = (event) => {
    setSchedulePagePublish(event.target.checked);
  };
  const handleUnpublishChange = (event) => {
    setSchedulePageUnpublish(event.target.checked);
  };
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    if (initialPublishRender.current) {
      initialPublishRender.current = false;
    } else {
      dispatch(
        saveSchedulePublishDateTime(
          schedulePagePublish,
          publishTime?.toISOString()
        )
      );
    }
  }, [publishTime, schedulePagePublish]);
  useEffect(() => {
    if (initialUnpublishRender.current) {
      initialUnpublishRender.current = false;
    } else {
      dispatch(
        saveScheduleUnpublishDateTime(
          schedulePageUnpublish,
          unpublishTime?.toISOString()
        )
      );
    }
  }, [unpublishTime, schedulePageUnpublish]);

  return (
    <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }} mb={2}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={schedulePagePublish || false}
                onChange={handlePublishChange}
              />
            }
            label={t('page_schedule_publish')}
          />
          <DateTimePicker
            disabled={!schedulePagePublish}
            value={publishTime}
            onAccept={handlePublishDateChange}
            onChange={() => undefined}
            renderInput={(params) => (
              <TextField
                disabled={true}
                variant='outlined'
                onKeyDown={handleDateChangeRaw}
                InputProps={{ readOnly: true }}
                {...params}
                placeholder={t('page_schedule_publish_placeholder')}
              />
            )}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={schedulePageUnpublish || false}
                onChange={handleUnpublishChange}
              />
            }
            label={t('page_schedule_unpublish')}
          />
          <DateTimePicker
            value={unpublishTime}
            disabled={!schedulePageUnpublish}
            onAccept={handleUnpublishValChange}
            onChange={() => undefined}
            renderInput={(params) => (
              <TextField
                disabled={true}
                variant='outlined'
                onKeyDown={handleDateChangeRaw}
                InputProps={{ readOnly: true }}
                {...params}
                placeholder={t('page_schedule_unpublish_placeholder')}
              />
            )}
          />
        </FormGroup>
      </LocalizationProvider>
    </Box>
  );
};
export default Schedule;
