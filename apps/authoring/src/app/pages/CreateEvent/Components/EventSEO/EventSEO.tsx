import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import BasicSwitchText from '../../../../components/Common/BasicSwitchText';
import ContentSeoStructureData from '../../../../components/Common/ContentSeoStructureData';
import TitleSubTitle from '../../../../components/Common/TitleSubTitle';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';

import { SeoInfo } from '../../Utils/helper';
import { useCustomStyle } from '../../CreateEvent.styles';
import CommonBoxWithNumber from '../../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { EventSEOProp } from './Event.types';
const EventSEO = ({
  state,
  setState,
  seoEvenDataHandle,
  updateStructureData,
  eventInstance,
  unsavedChanges,
  setEditedSD,
  isEdited,
}: EventSEOProp) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [, setICopyStatus] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState(false);

  const [seoInfo, setSeoInfo] = useState(SeoInfo);

  const [state1, setState1] = useState({
    seo_enable: false,
    seoShared: false,
  });

  const openStructureData = () => {
    let structureData;
    if (!isEdit && !isEdited) {
      structureData =
        eventInstance?.short_title !== state?.short_title ||
        eventInstance?.short_description !== state?.short_description ||
        eventInstance?.event_start_date !== state?.event_start_date ||
        eventInstance?.event_end_date !== state?.event_end_date ||
        eventInstance?.webLink !== state?.webLink ||
        eventInstance?.address !== state?.address ||
        eventInstance?.locality !== state?.locality ||
        eventInstance?.postalCode !== state?.postalCode ||
        eventInstance?.regionState !== state?.regionState ||
        eventInstance?.country !== state?.country ||
        eventInstance?.imageUrl !== state?.imageUrl
          ? updateStructureData(state, eventInstance?.page_state)
          : state?.structure_data
          ? JSON.parse(state?.structure_data)
          : updateStructureData(state, eventInstance?.CommonFields?.page_state);
      setSeoInfo({ ...seoInfo, structureData: structureData });
    }
    setIsOpen(true);
  };

  const closeStructureData = (doneClick: boolean) => {
    if (doneClick && isEdit) {
      setEditedSD(seoInfo.structureData);
      showToastSuccess(`${t('page_structure_data')} ${t('saved_toast')}`);
    }
    setIsOpen(false);
    setICopyStatus(false);
  };

  const copyStructureData = () => {
    let { structureData } = seoInfo;
    if (!isEdit && !isEdited) {
      structureData =
        eventInstance?.short_title !== state?.short_title ||
        eventInstance?.short_description !== state?.short_description ||
        eventInstance?.event_start_date !== state?.event_start_date ||
        eventInstance?.event_end_date !== state?.event_end_date ||
        eventInstance?.webLink !== state?.webLink ||
        eventInstance?.address !== state?.address ||
        eventInstance?.locality !== state?.locality ||
        eventInstance?.postalCode !== state?.postalCode ||
        eventInstance?.regionState !== state?.regionState ||
        eventInstance?.country !== state?.country ||
        eventInstance?.imageUrl !== state?.imageUrl
          ? updateStructureData(state, eventInstance?.page_state)
          : state?.structure_data
          ? JSON.parse(state?.structure_data)
          : updateStructureData(state, eventInstance?.CommonFields?.page_state);
      setSeoInfo({ ...seoInfo, structureData });
    }
    navigator.clipboard.writeText(JSON.stringify(structureData, undefined, 2));
    setICopyStatus(true);

    showToastSuccess(
      `${t('page_structure_data')} ${t('copied')} ${t('successfully')}`
    );
  };

  const handleChange = (event, keyName) => {
    const newObj = {
      ...state1,
      [keyName]: event.target.checked,
    };
    setState1(newObj);
    setState({ ...state, [keyName]: event.target.checked });
    seoEvenDataHandle({ seoInput: newObj }); //pass data

    unsavedChanges.current = true;
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setState1({
        seo_enable: state?.seo_enable,
        seoShared: true,
      });
      setIsEdit(false);
      setEditedSD({});
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [state]);
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
            state={state1.seo_enable}
            isDisable={false}
            handleChange={handleChange}
            title={t('page_prelem_find')}
            subtitle={''}
            keyName='seo_enable'
          />
        </Box>
        <Box className='textFiled'>
          <BasicSwitchText
            state={state1.seoShared}
            isDisable
            handleChange={handleChange}
            title={t('page_prelem_share')}
            subtitle=''
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
          <Grid item xs={12} sm={7} md={7}>
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
export default React.memo(EventSEO);
