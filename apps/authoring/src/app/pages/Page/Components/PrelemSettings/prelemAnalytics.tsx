import { Box, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PrelemAnalyticsSave } from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import BackButton from '../BackButton/BackButton';
import '../PageSettings/PageSettings.css';
import BasicSwitch from '../Switch';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';

const PrelemAnalytics = ({ setPageId, selectedPrelemIndex }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  const handlePrelemAnalyticsChange = (event) => {
    setAnalyticsEnabled(!analyticsEnabled);
    dispatch(PrelemAnalyticsSave(event.target.checked, selectedPrelemIndex));
    showToastSuccess(`${t('prelem_advance_info_toast')} ${t('saved_toast')}`);
  };

  useEffect(() => {
    const { AnalyticsEnabled } = page.prelemMetaArray[selectedPrelemIndex];
    setAnalyticsEnabled(AnalyticsEnabled);
  }, [selectedPrelemIndex]);

  return (
    <Box className="pageSettingmainWp">
      <BackButton
        setPageId={setPageId}
        Title="Analytics"
        backTo="prelemSetting"
      />
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('prelem_analytics')}
          <BasicSwitch
            onChange={(e: any) => handlePrelemAnalyticsChange(e)}
            checked={analyticsEnabled}
            color={ThemeConstants.BLACK_COLOR}
          />
        </Typography>
      </Box>
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('impression')}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('button_click')}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('link_click')}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('content_insight')}
          <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
        </Typography>
      </Box>
    </Box>
  );
};
export default PrelemAnalytics;
