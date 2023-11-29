import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { updateStructureData } from '../../utils/helperFunctions';
import BasicSwitchText from '../Common/BasicSwitchText';
import ContentSeoStructureData from '../Common/ContentSeoStructureData';
import TitleSubTitle from '../Common/TitleSubTitle';
import { showToastSuccess } from '../toastNotification/toastNotificationReactTostify';
import { TogggleProps } from './utils/quizTypes';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { useCustomStyle } from './Quiz.style';

const Seo = ({
  state,
  setState,
  setEditedSD,
  quizInstance,
  unsavedChanges,
}) => {
  const { t } = useTranslation();
  const [isDisable, setIsDisable] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [seoInfo, setSeoInfo] = useState<any>({
    showContent: true,
    share: false,
    structureData: '',
  });

  const [seoToggle, setSeoToggle] = useState<TogggleProps>({
    seo_enable: false,
    seo_shared: false,
  });
  const [isEdit, setIsEdit] = useState(false);
  const openStructureData = () => {
    let structureData;
    if (!isEdit) {
      structureData =
        quizInstance?.title !== state.title ||
        quizInstance?.description !== state?.description ||
        quizInstance?.questions?.length !== state?.questions?.length
          ? updateStructureData(state)
          : state?.structure_data
          ? JSON.parse(state?.structure_data)
          : updateStructureData(state);
      setSeoInfo({ ...seoInfo, structureData: structureData });
    }
    setIsOpen(true);
  };
  const closeStructureData = (doneClick) => {
    if (doneClick && isEdit) {
      setEditedSD(seoInfo.structureData);
      showToastSuccess(`${t('page_structure_data')} ${t('saved')}`);
    }
    setIsOpen(false);
  };

  const copyStructureData = () => {
    let { structureData } = seoInfo;
    if (!structureData) {
      structureData = structureData =
        quizInstance?.title !== state.title ||
        quizInstance?.description !== state?.description ||
        quizInstance?.questions?.length !== state?.questions?.length
          ? updateStructureData(state)
          : state?.structure_data
          ? JSON.parse(state?.structure_data)
          : updateStructureData(state);
      setSeoInfo({ ...seoInfo, structureData });
    }
    navigator.clipboard.writeText(JSON.stringify(structureData, undefined, 2));
    showToastSuccess(`${t('page_structure_data')} ${t('copied')}`);
  };

  const handleChange = (event, keyName) => {
    setState({ ...state, [keyName]: event.target.checked });
    setSeoToggle({ ...seoToggle, [keyName]: event.target.checked });
    unsavedChanges.current = true;
  };
  useEffect(() => {
    setSeoToggle({ seo_enable: state?.seo_enable, seo_shared: true });
    setIsEdit(false);
    setEditedSD('');
  }, [state?.title, state?.description, state?.questions]);
  const classes = useCustomStyle();
  return (
    <Box id='seo' className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number='08'
        title={t('SEO')}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t('subhead')}
      >
        <Box className='textFiled'>
          <BasicSwitchText
            state={seoToggle.seo_enable}
            isDisable={isDisable}
            handleChange={handleChange}
            title={t('page_prelem_find')}
            subtitle={t('subheading_description')}
            keyName='seo_enable'
          />
        </Box>
        <Grid container>
          <Grid item xs={12} sm={12} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={t('page_structure_data')}
              subTitle={t('click_to_sd')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={12} md={7}>
            <Box className='bottomLinksWp'>
              <Typography
                variant='h6medium'
                className='blueLink'
                onClick={() => openStructureData()}
              >
                <u>{t('see_sd')}</u>
              </Typography>
              <Box className='seoLinkDevider'></Box>
              <Typography
                variant='h6medium'
                className='blueLink'
                onClick={() => copyStructureData()}
              >
                {t('copy_sd')}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
      {isOpen && (
        <ContentSeoStructureData
          closeStructureData={closeStructureData}
          seoInfo={seoInfo}
          setSeoInfo={setSeoInfo}
          setIsEdit={setIsEdit}
          isOpen={isOpen}
          copyStructureData={copyStructureData}
        />
      )}
    </Box>
  );
};
export default Seo;
