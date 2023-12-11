import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import BasicSwitch from '../../editPage/Switch';
import { useStyles } from '../Seo/Seo.styles';

const Analytics = ({ state, setState }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [analyticsState, setAnalyticsState] = useState({
    analytics: true,
    impression: true,
    insight: false,
  });
  const handleAnalyticsChange = () => {
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        analytics_enable: !state?.CommonFields?.analytics_enable,
      },
    });
  };
  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.width40}>
          <TitleSubTitle
            title={t('analytics')}
            subTitle={t('subheading_description')}
            titleVarient="h6medium"
            subTitleVarient="h7regular"
          />
        </Box>
        <Box className={classes.width60}>
          <BasicSwitch
            onChange={
              handleAnalyticsChange
              // setAnalyticsState({
              //   ...analyticsState,
              //   analytics: !analyticsState.analytics,
              // })
            }
            checked={state?.CommonFields?.analytics_enable}
            // disabled={isDisable}
            color={ThemeConstants.BLACK_COLOR}
          />
        </Box>
      </Box>
      <Box className={classes.container}>
        <Box className={classes.width40}>
          <TitleSubTitle
            title={t('impression')}
            subTitle={t('subheading_description')}
            titleVarient="h6medium"
            subTitleVarient="h7regular"
          />
        </Box>
        <Box className={classes.width60}>
          <BasicSwitch
            onChange={() =>
              setAnalyticsState({
                ...analyticsState,
                impression: !analyticsState.impression,
              })
            }
            checked={analyticsState.impression}
            // disabled={isDisable}
            color={ThemeConstants.BLACK_COLOR}
          />
        </Box>
      </Box>
      {/* <Box className={classes.container}>
        <Box className={classes.width40}>
          <TitleSubTitle
            title={t('content_insight')}
            subTitle={t('subheading_description')}
            titleVarient='h6medium'
            subTitleVarient='h7regular'
          />
        </Box>
        <Box className={classes.width60}>
          <BasicSwitch
            onChange={() =>
              setAnalyticsState({
                ...analyticsState,
                insight: !analyticsState.insight,
              })
            }
            checked={analyticsState.insight}
            // disabled={isDisable}
            color={ThemeConstants.BLACK_COLOR}
          />
        </Box>
      </Box> */}
    </>
  );
};

export default Analytics;
