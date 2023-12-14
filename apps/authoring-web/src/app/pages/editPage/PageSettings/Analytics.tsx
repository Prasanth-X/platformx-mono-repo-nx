import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateContentForCard, updatePageModel } from '../../../store/Actions';
import { Store } from '../../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import BasicSwitch from '../Switch';
import { AnalyticsInfo } from '../utils/editTypes';
const Analytics = () => {
  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const { AnalyticsEnable, EventBasedAnalytics } = state.page.pageModel;

  const initialAnalytics = useRef<AnalyticsInfo>({
    PageAnalytics: AnalyticsEnable === undefined ? false : AnalyticsEnable,
    EventBasedAnalytics:
      EventBasedAnalytics === undefined ? false : EventBasedAnalytics,
  });
  const [analyticsInfo, setAnalyticsInfo] = useState<AnalyticsInfo>(
    initialAnalytics.current
  );

  useEffect(() => {
    initialAnalytics.current = {
      PageAnalytics: AnalyticsEnable === undefined ? false : AnalyticsEnable,
      EventBasedAnalytics:
        EventBasedAnalytics === undefined ? false : EventBasedAnalytics,
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
  };
  return (
    <Box sx={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={2}
      >
        <Typography
          variant="subtitle1"
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
          className="drawer-label"
        >
          {t('page_view_analytics')}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  mb={1}
                >
                  {t('page_view_analytics_tp')}
                </Typography>
              </Box>
            }
            placement="right"
          >
            <Box>
              <InfoOutlinedIcon
                sx={{
                  marginLeft: '10px',
                  '&:hover': {
                    color: ThemeConstants.NOTIFICATION_ERROR,
                  },
                }}
              />
            </Box>
          </Tooltip>
        </Typography>
        <BasicSwitch
          color={ThemeConstants.BLACK_COLOR}
          onChange={(e: any) => handleControlsChange(e, 'PageAnalytics')}
          checked={analyticsInfo.PageAnalytics}
        />
      </Box>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={2}
        mb={1}
      >
        {t('page_based_analytics')}
        <BasicSwitch
          color={ThemeConstants.BLACK_COLOR}
          disabled
          onChange={(e: any) => handleControlsChange(e, 'EventBasedAnalytics')}
          checked={analyticsInfo.EventBasedAnalytics}
        />
      </Typography>
      <Box sx={{ textAlign: 'right' }} mb={2} mt={2}>
        <Button
          variant="contained"
          disabled={initialAnalytics.current === analyticsInfo}
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
            },
            textTransform: 'capitalize',
          }}
          onClick={saveAnalytics}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default Analytics;
