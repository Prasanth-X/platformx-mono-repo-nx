import { useMutation } from '@apollo/client';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  showToastError,
  showToastSuccess,
} from '../../../../components/toastNotification/toastNotificationReactTostify';
import { publish_vod, update_vod } from '../../../../services/vod/vod.api';
import ThemeConstants from '../../../../theme/variable';
import BasicSwitch from '../../../editPage/Switch';
import { useStyles } from './vodAnanlytics.styles';

const VodAnalytics = ({ selectedVod, setSelectedVod }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [disabledState, setDiabledState] = useState(true);
  const [publishsavedmutate] = useMutation(publish_vod);
  const [updateMutate] = useMutation(update_vod);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [impressionEnabled, setImpressionEnabled] = useState(true);
  // Function to handle checkbox changes
  const handlePrelemAnalyticsChange = (event, fieldType) => {
    setDiabledState(!disabledState);
    setAnalyticsEnabled(event.target.checked);
    setSelectedVod(() => ({
      ...selectedVod,
      AnalyticsEnable: event.target.checked,
    }));
  };
  const publishArticle = () => {
    const requestdto = {
      page: selectedVod.Page,
      parentpageurl: selectedVod.ParentPageURL,
      currentpageurl: selectedVod.CurrentPageURL,
    };
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
    publishsavedmutate({
      variables: {
        input: requestdto,
        vodRequest: selectedVod,
        timeZone: timeZone,
      },
    })
      .then((resp) => {
        showToastSuccess(`${t('vod')} ${t('updated_toast')}`);
      })
      .catch((error) => {
        if (error.graphQLErrors[0]) {
          showToastError(error.graphQLErrors[0].message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };
  const saveAnalytics = () => {
    setDiabledState(!disabledState);
    updateMutate({
      variables: {
        input: selectedVod,
      },
    }).then((resp) => {
      if (selectedVod.Page_State && selectedVod.Page_State === 'DRAFT') {
        showToastSuccess(`${t('vod')} ${t('updated_toast')}`);
      } else {
        publishArticle();
      }
    });
  };

  return (
    <AccordionDetails>
      <Box className={classes.analyticsContainer}>
        <Typography
          variant='subtitle1'
          className={`${classes.analyticsText} drawer-label`}
        >
          {`${t('vod')} ${t('analytics')}`}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  mb={1}
                >
                  {t('vod_analytic_tp')}
                </Typography>
              </Box>
            }
            placement='right'
          >
            <Box>
              <InfoOutlinedIcon className={classes.iconHover} />
            </Box>
          </Tooltip>
        </Typography>
        <BasicSwitch
          onChange={(e: any) =>
            handlePrelemAnalyticsChange(e, 'AnalyticsEnabled')}
          checked={analyticsEnabled}
          color={ThemeConstants.BLACK_COLOR}
          disabled
        />
      </Box>
      <Typography variant='subtitle1' className={classes.analyticsContainer}>
        {t('impression')}
        <BasicSwitch
          checked={impressionEnabled}
          color={ThemeConstants.BLACK_COLOR}
          disabled
        />
      </Typography>
      <Typography variant='subtitle1' className={classes.analyticsContainer}>
        {t('content_insight')}
        <BasicSwitch disabled color={ThemeConstants.BLACK_COLOR} />
      </Typography>

      <Box className={classes.doneButton}>
        <Button
          variant='contained'
          disabled={disabledState}
          onClick={saveAnalytics}
        >
          {t('done')}
        </Button>
      </Box>
    </AccordionDetails>
  );
};
export default VodAnalytics;
