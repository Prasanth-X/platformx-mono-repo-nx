import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { TwitterProps } from '../../utils/editTypes';
import BackButton from '../BackButton/BackButton';
import '../PageSettings/PageSettings.css';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
import { useTranslation } from 'react-i18next';

const PrelemTwitter: React.FC<TwitterProps> = ({
  index,
  twitterHandle,
  handleSave,
  sectionToUpdate = 'TwitterHandle',
  setPageId,
}) => {
  const {t} = useTranslation();
  const [handle, setHandle] = useState(twitterHandle);
  return (
    <Box key={`${index}_content`} className='pageSettingmainWp'>
      <Box className='rowBox'>
        <BackButton
          setPageId={setPageId}
          Title='Images'
          backTo='prelemSetting'
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          Please enter twitter handle to fetch tweets
        </Typography>
        <TextField
          multiline
          value={handle}
          error={handle?.length === 0}
          onChange={(e: any) => setHandle(e.target.value)}
          variant='outlined'
          size='small'
          placeholder='hcltech'
          inputProps={{ maxLength: 15 }}
        />
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={handle?.length === 0}
          sx={{ width: '100%' }}
          onClick={() => {
            handleSave(sectionToUpdate, handle, index);
            showToastSuccess(`${t('prelem_twitter_info_toast')} ${t('saved_toast')}`);
          }
        }
        >
          Done
        </Button>
      </Box>
    </Box>
  );
};
export default PrelemTwitter;
