import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCustomStyle } from '../../pages/quiz/quiz.style';
import { BasicSwitchText, CommonBoxWithNumber } from '@platformx/utilities';


const Analytics = ({ state, setState, number, unsavedChanges }) => {
  const { t } = useTranslation();
  const [isDisable, setIsDisable] = useState(false);
  const [state1, setState1] = useState({
    analytics_enable: true,
    impression: true,
    contentInsight: false,
  });
  const handleChange = (event, keyName) => {
    setState({ ...state, [keyName]: event.target.checked });
    setState1({ ...state1, [keyName]: event.target.checked });
    unsavedChanges.current = true;
  };
  useEffect(() => {
    setState1({
      analytics_enable: state?.analytics_enable,
      impression: state?.impression,
      contentInsight: state?.contentInsight,
    });
  }, [state]);
  const classes = useCustomStyle();
  return (
    <Box id='Analytics' className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number={number}
        title={t('analytics')}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t('subhead')}
      >
        <Box className='textFiled'>
          <BasicSwitchText
            state={state1.analytics_enable}
            isDisable={isDisable}
            handleChange={handleChange}
            title={`${t('quiz')} ${t('analytics')}`}
            subtitle=''
            keyName='analytics_enable'
          />
        </Box>
        <Box className='textFiledLast'>
          <BasicSwitchText
            state={state1.impression}
            isDisable={isDisable}
            handleChange={handleChange}
            title={t('impression')}
            subtitle=''
            keyName='impression'
          />
        </Box>
      </CommonBoxWithNumber>
    </Box>
  );
};
export default Analytics;
