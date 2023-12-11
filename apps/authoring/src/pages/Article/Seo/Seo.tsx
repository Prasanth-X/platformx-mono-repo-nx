import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import { showToastSuccess } from '../../../components/toastNotification/toastNotificationReactTostify';
import ThemeConstants from '../../../theme/variable';
import BasicSwitch from '../../editPage/Switch';
import StructureData from '../StructureData/StructureData';
import { useStyles } from './Seo.styles';

const Seo = ({ state, setState, updateStructureDataArticle }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [openSD, setOpenSD] = useState<boolean>(false);
  const [seoState, setSeoState] = useState({ find: true, share: true });
  const openStructureData = () => {
    setOpenSD(!openSD);
  };
  const structure_data =
    state?.CommonFields?.structure_data !== ''
      ? JSON.parse(state.CommonFields.structure_data)
      : updateStructureDataArticle();

  const copyStructureData = (structureData = structure_data) => {
    navigator.clipboard.writeText(JSON.stringify(structureData, undefined, 2));
    showToastSuccess(`${t('page_structure_data')} ${t('copied')}`);
  };
  const handleSeoChange = () => {
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        seo_enable: !state?.CommonFields?.seo_enable,
      },
    });
  };
  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.width40}>
          <TitleSubTitle
            title={t('page_prelem_find')}
            subTitle={t('subheading_description')}
            titleVarient='h6medium'
            subTitleVarient='h7regular'
          />
        </Box>
        <Box className={classes.width60}>
          <BasicSwitch
            onChange={handleSeoChange}
            checked={state?.CommonFields?.seo_enable}
            // disabled={isDisable}
            color={ThemeConstants.BLACK_COLOR}
          />
        </Box>
      </Box>

      {/* <Box className={classes.container}>
        <Box className={classes.width40}>
          <TitleSubTitle
            title={t('page_prelem_share')}
            subTitle={t('quiz_ss_subtitle')}
            titleVarient='h6medium'
            subTitleVarient='h7regular'
          />
        </Box>
        <Box className={classes.width60}>
          <BasicSwitch
            onChange={() =>
              setSeoState({ ...seoState, share: !seoState.share })
            }
            checked={seoState.share}
            // disabled={isDisable}
            color={ThemeConstants.BLACK_COLOR}
          />
        </Box>
      </Box> */}
      <Box className={classes.sdContainer}>
        <Box className={classes.width40}>
          <TitleSubTitle
            title={t('page_structure_data')}
            subTitle={t('click_to_sd')}
            titleVarient='h6medium'
            subTitleVarient='h7regular'
          />
        </Box>
        <Box className={classes.flexBox}>
          <Typography
            variant='h6medium'
            className={classes.typo}
            onClick={() => openStructureData()}
          >
            <u>{t('see_sd')}</u>
          </Typography>
          <Box className={classes.typoDivider}></Box>
          <Typography
            variant='h6medium'
            className={classes.typo}
            onClick={() => copyStructureData()}
          >
            {t('copy_sd')}
          </Typography>
        </Box>
      </Box>
      {openSD && (
        <StructureData
          state={state}
          setState={setState}
          structure_data={structure_data}
          openStructureData={openStructureData}
          copyStructureData={copyStructureData}
        />
      )}
    </>
  );
};

export default Seo;
