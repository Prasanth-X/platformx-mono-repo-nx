import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Tooltip, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PrelemAnalyticsSave } from '../../store/Actions';
import { Store } from '../../store/ContextStore';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import BasicSwitch from './Switch';

const PrelemAnalytics = ({ analyticsInfo, prelemIndex }) => {
  const { t } = useTranslation();
  const { dispatch } = useContext(Store);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(analyticsInfo);
  const handlePrelemAnalyticsChange = (event) => {
    dispatch(PrelemAnalyticsSave(event.target.checked, prelemIndex));
  };

  useEffect(() => {
    setAnalyticsEnabled(analyticsInfo);
  }, [analyticsInfo]);
  return (
    <AccordionDetails>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={1}
        mb={1}
      >
        <Typography
          variant="subtitle1"
          sx={{
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
          }}
          className="drawer-label"
        >
          {t('prelem_analytics')}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  mb={1}
                >
                  {t('prelem_analytics_tp')}
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
          onChange={(e: any) => handlePrelemAnalyticsChange(e)}
          checked={analyticsEnabled}
          color={ThemeConstants.BLACK_COLOR}
        />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={1}
        mb={1}
      >
        {t('impression')}
        <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={1}
        mb={1}
      >
        {t('button_click')}
        <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={2}
        mb={1}
      >
        {t('link_click')}
        <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={1}
        mb={1}
      >
        {t('content_insight')}
        <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
      </Typography>
    </AccordionDetails>
  );
};
export default PrelemAnalytics;
