import { Box, Button, Typography } from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  updateContentForCard,
  updatePageModel,
} from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { AnalyticsInfo } from '../../utils/editTypes';
import BackButton from '../BackButton/BackButton';
import BasicSwitch from '../Switch';
import './PageSettings.css';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';

const Analytics = ({ setPageId }) => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const { AnalyticsEnable, EventBasedAnalytics } = state.page.pageModel;
  const initialAnalytics = useRef<AnalyticsInfo>({
    PageAnalytics: AnalyticsEnable === undefined ? false : AnalyticsEnable,
    EventBasedAnalytics: false,
  });
  const [analyticsInfo, setAnalyticsInfo] = useState<AnalyticsInfo>(
    initialAnalytics.current
  );

  useEffect(() => {
    initialAnalytics.current = {
      PageAnalytics: AnalyticsEnable === undefined ? false : AnalyticsEnable,
      EventBasedAnalytics: false,
    };
    setAnalyticsInfo(initialAnalytics.current);
  }, [state.page.pageModel]);
  // Function to handle switch changes
  const handleControlsChange = (event, fieldType) => {
    const analyticsInfoUpdated = { ...analyticsInfo };
    analyticsInfoUpdated[fieldType] = event.target.checked;
    setAnalyticsInfo(analyticsInfoUpdated);
  };
  // Function to close toast notification
  const [handleImpression] = usePlatformAnalytics();
  //save analytics info
  const saveAnalytics = () => {
    const pageModelNew = { ...page?.pageModel };
    pageModelNew.AnalyticsEnable = analyticsInfo.PageAnalytics;
    dispatch(updatePageModel(pageModelNew));
    page?.prelemMetaArray?.map((item, index) => {
      dispatch(
        updateContentForCard(
          index,
          'AnalyticsEnabled',
          analyticsInfo.PageAnalytics,
          undefined
        )
      );
    });
    const pageDataObj = {
      eventType: 'Analytics PageSetting Saved',
      AnalyticsSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
    showToastSuccess(`${t('analytics_info_toast')} ${t('saved_toast')}`);
  };
  return (
    <Box className="pageSettingmainWp">
      <Box className="rowBox">
        <BackButton setPageId={setPageId} Title="Analytics" />
      </Box>
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('page_view_analytics')}
          <BasicSwitch
            color={ThemeConstants.BLACK_COLOR}
            onChange={(e: any) => handleControlsChange(e, 'PageAnalytics')}
            checked={analyticsInfo.PageAnalytics}
          />
        </Typography>
      </Box>
      <Box className="rowBox">
        <Button
          variant="contained"
          disabled={initialAnalytics.current === analyticsInfo}
          sx={{ width: '100%' }}
          onClick={saveAnalytics}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default Analytics;
