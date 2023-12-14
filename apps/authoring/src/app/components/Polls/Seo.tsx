import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BasicSwitchText from '../Common/BasicSwitchText';
import ContentSeoStructureData from '../Common/ContentSeoStructureData';
import TitleSubTitle from '../Common/TitleSubTitle';
import { showToastSuccess } from '../toastNotification/toastNotificationReactTostify';
import { useCustomStyle } from './Poll.style';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
// import QuizSeoStructureData from "./QuizSeoStructureData";
const Seo = ({
  state,
  setState,
  setEditedSD,
  pollInstance,
  unsavedChanges,
  updateStructureData,
  answers,
}) => {
  const { t } = useTranslation();
  const [isDisable, setIsDisable] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [copyStatus, setICopyStatus] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);
  const [seoInfo, setSeoInfo] = useState<any>({
    showContent: true,
    share: false,
    structureData: '',
  });
  interface TogggleProps {
    seo_enable: boolean;
    seo_shared: boolean;
  }
  const [seoToggle, setSeoToggle] = useState<TogggleProps>({
    seo_enable: false,
    seo_shared: false,
  });
  const openStructureData = () => {
    let structureData;
    if (!isEdit) {
      structureData =
        pollInstance?.poll_title !== state.poll_title ||
        pollInstance?.poll_description !== state?.poll_description ||
        answers?.length !== pollInstance?.options_compound_fields?.length
          ? updateStructureData(pollInstance?.page_state)
          : state?.structure_data
          ? JSON.parse(state?.structure_data)
          : updateStructureData();
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
      structureData =
        pollInstance?.poll_title !== state.poll_title ||
        pollInstance?.poll_description !== state?.poll_description ||
        answers?.length !== pollInstance?.options_compound_fields?.length
          ? updateStructureData(pollInstance?.page_state)
          : state?.structure_data
          ? JSON.parse(state?.structure_data)
          : updateStructureData();
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
  }, [state?.poll_title, state?.poll_description, answers]);
  const classes = useCustomStyle();
  return (
    <Box id='seo' className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number='09'
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
        <Box className='textFiled'>
          <BasicSwitchText
            state={seoToggle.seo_shared}
            isDisable={isDisable}
            handleChange={handleChange}
            title={t('page_prelem_share')}
            subtitle={t('quiz_ss_subtitle')}
            keyName='seoShared'
          />
        </Box>
        <Grid container>
          <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={t('page_structure_data')}
              subTitle={t('click_to_sd')}
              titleVarient='h6medium'
              subTitleVarient='h7regular'
            />
          </Grid>
          <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
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
