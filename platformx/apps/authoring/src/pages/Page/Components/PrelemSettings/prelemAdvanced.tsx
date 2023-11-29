import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../theme/variable';
import BackButton from '../BackButton/BackButton';
import '../PageSettings/PageSettings.css';
import BasicSwitch from '../Switch';

const PrelemAdvanced = ({ setPageId }) => {
  const { t } = useTranslation();
  return (
    <Box className='pageSettingmainWp'>
      <BackButton
        setPageId={setPageId}
        Title='Advanced'
        backTo='prelemSetting'
      />
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t('prelem_advanced_user')}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t('prelem_advanced_pay')}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
      <Box className='rowBox'>
        <Typography className='switchbox' variant='p4regular'>
          {t('prelem_geo')}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
    </Box>
  );
};
export default PrelemAdvanced;
