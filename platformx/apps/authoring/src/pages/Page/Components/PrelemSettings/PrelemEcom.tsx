import { Box, Button, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BackButton from '../BackButton/BackButton';
import '../PageSettings/PageSettings.css';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';

interface Props {
  index: string;
  EcomHandle: IEcomHandle;
  handleSave(sectionToUpdate: string, data: SavedData, index: string): void;
  sectionToUpdate?: string;
  setPageId: () => void;
}
interface IEcomHandle {
  ApiEndPoint: string;
  OauthEndPoint: string;
  Username: string;
  Password: string;
}
interface SavedData {
  apiEndPoint: string;
  oauthEndPoint: string;
  userName: string;
  password: string;
}

const PrelemEcom: React.FC<Props> = ({
  index,
  EcomHandle,
  handleSave,
  setPageId,
  sectionToUpdate = 'EcomHandle',
}) => {
  const { ApiEndPoint, OauthEndPoint, Username, Password } = EcomHandle;
  const [apiEndPoint, setApiEndPoint] = useState(ApiEndPoint);
  const [oauthEndPoint, setOuthEndPoint] = useState(OauthEndPoint);
  const [userName, setUserName] = useState(Username);
  const [password, setPassword] = useState(Password);

  const savedData = {
    apiEndPoint: apiEndPoint,
    oauthEndPoint: oauthEndPoint,
    userName: userName,
    password: password,
  };
  const { t } = useTranslation();
  return (
    <Box key={`${index}_content`} className='pageSettingmainWp'>
      <Box className='rowBox'>
        <BackButton
          setPageId={setPageId}
          Title='Data Source'
          backTo='prelemSetting'
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('ecom_prelem_setting_text1')}
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('ecom_prelem_setting_text2')}
        </Typography>
        <TextField
          multiline
          value={apiEndPoint}
          error={apiEndPoint?.length === 0}
          onChange={(e: any) => setApiEndPoint(e.target.value)}
          variant='outlined'
          size='small'
          placeholder='API Endpoint'
          inputProps={{ maxLength: 250 }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('ecom_prelem_setting_text4')}
        </Typography>
        <TextField
          multiline
          value={oauthEndPoint}
          error={oauthEndPoint?.length === 0}
          onChange={(e: any) => setOuthEndPoint(e.target.value)}
          variant='outlined'
          size='small'
          placeholder='O Auth Endpoint'
          inputProps={{ maxLength: 250 }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('ecom_prelem_setting_text5')}
        </Typography>
        <TextField
          multiline
          value={userName}
          error={userName?.length === 0}
          onChange={(e: any) => setUserName(e.target.value)}
          variant='outlined'
          size='small'
          placeholder='User Name'
          inputProps={{ maxLength: 100 }}
        />
      </Box>
      <Box className='rowBox'>
        <Typography className='labelbox' variant='p4regular'>
          {t('ecom_prelem_setting_text6')}
        </Typography>
        <TextField
          type='password'
          value={password}
          error={password?.length === 0}
          onChange={(e: any) => setPassword(e.target.value)}
          variant='outlined'
          size='small'
          placeholder='Password'
          inputProps={{ maxLength: 100 }}
        />
      </Box>
      <Box className='rowBox'>
        <Button
          variant='contained'
          disabled={
            apiEndPoint?.length === 0 ||
            oauthEndPoint?.length === 0 ||
            userName?.length === 0 ||
            password?.length === 0
          }
          sx={{ width: '100%' }}
          onClick={() => {
            handleSave(sectionToUpdate, savedData, index);
            showToastSuccess(`${t('prelem_ecom_info_toast')} ${t('saved_toast')}`);
          }}
        >
          {t('ecom_prelem_setting_text7')}
        </Button>
      </Box>
    </Box>
  );
};
export default PrelemEcom;
