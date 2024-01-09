import { Box, Checkbox, Grid, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Typography from '@mui/material/Typography';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { AutoTextArea } from '@platformx/utilities';

const SocialShareStep2 = ({
  selectedItems,
  caption,
  checked,
  setCaption,
  setChecked,
  scheduleDate,
  setScheduleDate,
  isReschedule,
}: any) => {
  const { t } = useTranslation();
  const [selectFacebook, setSelectFacebook] = React.useState(true);
  const handleCheckboxChange = (event: any) => {
    setChecked(event.target.checked);
  };
  const handleChange = (event: any) => {
    setCaption(event.target.value);
  };
  const handleDateChangeRaw = (e: any) => {
    e.preventDefault();
  };

  const inlineCss = `
 .Platform-x-FormControlLabel-label{
  font-size: 14px;
 }

@media screen and (max-height: 600px) and (orientation: landscape) {
   #eventDescription{
    height: 125px !important;
    overflow-y: auto !important;
  }}
 `;
  return (
    <Box>
      <style>{inlineCss}</style>
      <Grid>
        {/* <Grid item xs={6}></Grid> */}
        <Grid item xs={12} md={12}>
          <Box
            sx={{
              // padding: {xs: '34px 0px 0px 0px',md: '45px 0px 0px 0px'},
              width: { xs: '100%', md: '100%', xl: '100%' },
              // margin: { xs: '20px 70px 80px 60px',md: '15px', em: '0px 0px 0px 60px' },
              // position: {xs:'static',md: 'relative', em: 'relative' },
              // top: {md: '50px', em: '-35px'},
            }}
          >
            <Box sx={{ display: 'flex', paddingBottom: '10px' }}>
              <Box
                sx={{
                  // marginRight: '25px',
                  padding: '12px 18px 12px 18px',
                  color: selectFacebook ? '#000' : '#89909a',
                  backgroundColor: selectFacebook ? '#f5f6f8' : '#fff',
                  // cursor: 'pointer',
                }}
              >
                {t('facebook')}
              </Box>
            </Box>
            <Box sx={{ marginBottom: { xs: '0', md: '0' } }}>
              <Typography
                sx={{
                  maxHeight: '56px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                variant="h3medium"
              >
                {selectedItems?.PageSettings
                  ? selectedItems?.PageSettings?.SocialOgTitle
                  : selectedItems?.ArticleSettings?.SocialOgTitle}
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="h6medium"
                component="h6"
                sx={{
                  color: '#2d2d39',
                  marginTop: '10px',
                  marginBottom: '10px',
                }}
              >
                {t('caption')}
              </Typography>
              {/* <TextareaAutosize
                disabled={isReschedule}
                aria-label="minimum height"
                minRows={7}
                maxRows={7}
                placeholder={t('caption_placeholder')}
                name={t('caption')}
                value={caption}
                onChange={(e) => handleChange(e)}
                maxLength={500}
                style={{
                  width: '100%',
                  resize: 'none',
                  padding: '20px',
                  borderColor: '#ced3d9',
                }}
              /> */}
              <AutoTextArea
                name="eventDescription"
                minRows={8}
                placeHolder={t('caption_placeholder')}
                handleChange={handleChange}
                maxCharLength={500}
                state={caption}
                isDisabled={isReschedule}
              />
              <FormGroup>
                <FormControlLabel
                  sx={{ marginTop: '8px' }}
                  value={t('schedule_post')}
                  control={
                    <Checkbox
                      disabled={isReschedule}
                      checked={checked}
                      onClick={(e) => handleCheckboxChange(e)}
                    />
                  }
                  label={t('schedule_post')}
                  labelPlacement="end"
                />
                <Typography
                  variant="h6medium"
                  component="h6"
                  sx={{
                    color: '#2d2d39',
                    marginTop: '10px',
                    marginBottom: '10px',
                  }}
                >
                  {t('pick_time')}
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    disabled={checked ? false : true}
                    inputFormat="MM/DD/YYYY | H:mm a"
                    renderInput={(params) => <TextField {...params} />}
                    value={scheduleDate}
                    disablePast
                    onChange={(newValue) => {
                      setScheduleDate(newValue);
                    }}
                  />
                </LocalizationProvider>
              </FormGroup>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default SocialShareStep2;
