import { useMutation } from '@apollo/client';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import {
  showToastError,
  showToastSuccess,
} from '../../../../components/toastNotification/toastNotificationReactTostify';
import { publish_vod, update_vod } from '../../../../services/vod/vod.api';
import ThemeConstants from '../../../../theme/variable';
import BasicSwitch from '../../../editPage/Switch';
import { useStyles } from './vodSEO.styles';
import { SeoInfo, SeoProps } from './vodSEO.types';

const VodSEO: React.FC<SeoProps> = ({ selectedVod, setSelectedVod }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [updateMutate] = useMutation(update_vod);
  const [publishsavedmutate] = useMutation(publish_vod);
  const [disabledState, setDiabledState] = useState(true);
  const seoEnabled = selectedVod?.SeoEnable;
  const structureData = selectedVod?.StructureData;
  const [copyStatus, setICopyStatus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [seoInfo, setSeoInfo] = useState<SeoInfo>({
    showContent: true,
    share: false,
    structureData:
      structureData && typeof structureData === 'string'
        ? JSON.parse(structureData)
        : '',
  });
  const [seoInstance, setSeoInstance] = useState<SeoInfo>({
    showContent: selectedVod?.SeoEnable,
    share: false,
    structureData:
      structureData && typeof structureData === 'string'
        ? JSON.parse(structureData)
        : '',
  });

  const openStructureData = () => {
    setIsOpen(true);
  };

  const closeStructureData = () => {
    setIsOpen(false);
    setICopyStatus(false);
  };

  const copyStructureData = () => {
    navigator.clipboard.writeText(
      JSON.stringify(seoInfo.structureData, undefined, 2)
    );
    setICopyStatus(true);
  };

  const handleToggleChange = (event, fieldType) => {
    setDiabledState(false);
    const contentNew = { ...seoInfo };
    contentNew[fieldType] = event.target.checked;
    setSeoInfo(contentNew);
    setSelectedVod(() => ({ ...selectedVod, SeoEnable: event.target.checked }));
  };

  const handleStructureData = (event, fieldType) => {
    setDiabledState(false);
    const contentNew = { ...seoInfo };
    contentNew[fieldType] = event.jsObject;
    setSeoInfo(contentNew);
    setICopyStatus(false);
    setSelectedVod(() => ({
      ...selectedVod,
      StructureData: JSON.stringify(event.jsObject),
    }));
  };

  const updatePublishVodSeoSetting = () => {
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
  const updateDraftVodSeoSetting = () => {
    updateMutate({
      variables: {
        input: selectedVod,
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

  const saveSeoInfo = () => {
    setDiabledState(true);
    if (selectedVod.Page_State && selectedVod.Page_State === 'DRAFT') {
      updateDraftVodSeoSetting();
    }
    if (selectedVod.Page_State && selectedVod.Page_State === 'PUBLISH') {
      updatePublishVodSeoSetting();
    }
  };

  useEffect(() => {
    setSeoInstance({
      showContent: selectedVod?.SeoEnable,
      share: false,
      structureData:
        structureData && typeof structureData === 'string'
          ? JSON.parse(structureData)
          : '',
    });
  }, [structureData, selectedVod?.SeoEnable]);

  useEffect(() => {
    setSeoInfo(seoInstance);
  }, [seoInstance]);

  return (
    <AccordionDetails>
      <Typography variant='subtitle1' className={classes.switchText}>
        {t('page_prelem_find')}
        <BasicSwitch
          checked={seoInfo.showContent}
          onChange={(e: any) => handleToggleChange(e, 'showContent')}
          color={ThemeConstants.BLACK_COLOR}
        />
      </Typography>
      <Typography variant='subtitle1' className={classes.switchText}>
        {t('page_prelem_share')}
        <BasicSwitch
          disabled
          checked={seoInfo.share}
          onChange={(e: any) => handleToggleChange(e, 'share')}
          color={ThemeConstants.BLACK_COLOR}
        />
      </Typography>
      <Box className={classes.sdContainer}>
        <Typography
          className={`${classes.sdText} drawer-label`}
          variant='subtitle1'
        >
          {t('page_structure_data')}
          <Tooltip
            title={
              <Box m={1}>
                <Typography variant='h7regular' mb={1}>
                  {t('page_structure_data_tp')}
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
        {seoInfo.showContent == false ? (
          <span className={classes.span}>
            <EditIcon className={classes.editIcon} /> {t('edit')}
          </span>
        ) : (
          <>
            <Typography
              sx={{
                display: {
                  xs: isOpen ? 'none' : 'flex',
                  md: 'flex',
                },
                alignItems: 'center',
                color: ThemeConstants.BLACK_COLOR,
                cursor: 'pointer',
                pointerEvents:
                  Object.keys(seoInfo.structureData).length != 0
                    ? 'visible'
                    : 'none',
                opacity:
                  Object.keys(seoInfo.structureData).length != 0 ? 1 : 0.7,
                textTransform: 'capitalize',
              }}
              onClick={openStructureData}
            >
              <EditIcon
                className={classes.editIcon}
                sx={{
                  color: isOpen
                    ? ThemeConstants.NOTIFICATION_ERROR
                    : ThemeConstants.BLACK_COLOR,
                }}
              />{' '}
              {t('edit')}
            </Typography>
            {isOpen && (
              <Box
                sx={{
                  display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' },
                  cursor: 'pointer',
                  justifyContent: 'end',
                  textTransform: 'capitalize',
                }}
                onClick={closeStructureData}
              >
                <DoneIcon
                  sx={{
                    marginRight: '2px',
                    color: isOpen
                      ? ThemeConstants.NOTIFICATION_ERROR
                      : ThemeConstants.BLACK_COLOR,
                  }}
                />
                {t('done')}
              </Box>
            )}
          </>
        )}
      </Box>
      {isOpen && (
        <Box>
          <Box
            sx={{
              position: {
                md: 'absolute',
              },
              display: 'flex',
              justifyContent: 'flex-end',
              right: {
                lg: '45%',
                md: '47%',
              },
              top: '10%',
              padding: {
                xs: '20px 0 0 0',
                md: '0 30px',
              },
            }}
          >
            <Typography
              sx={{
                display: 'flex',
                color: copyStatus
                  ? ThemeConstants.RED_COLOR
                  : ThemeConstants.BLACK_COLOR,
                fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                alignItems: 'center',
                cursor: 'pointer',
                zIndex: { xs: 1 },
                '&:hover': {
                  backgroundColor: ThemeConstants.WHITE_COLOR,
                },
                textTransform: 'capitalize',
              }}
              onClick={copyStructureData}
            >
              <ContentCopyIcon fontSize='small' sx={{ marginRight: '2px' }} />
              {copyStatus ? t('copied') : t('copy')}
            </Typography>
          </Box>
          <Box
            sx={{ display: { xs: 'none', sm: 'none', md: 'flex', lg: 'flex' } }}
          >
            <Box
              sx={{
                position: 'absolute',
                right: '35%',
                top: '10%',
              }}
            >
              <Button
                variant='contained'
                sx={{
                  backgroundColor: ThemeConstants.WHITE_COLOR,
                  color: ThemeConstants.BLACK_COLOR,
                  padding: '15px 0px',
                  fontSize: ThemeConstants.FONTSIZE_MD,
                  zIndex: { xs: 1 },
                  '&:hover': {
                    backgroundColor: ThemeConstants.WHITE_COLOR,
                    color: ThemeConstants.BLACK_COLOR,
                  },
                  textTransform: 'capitalize',
                }}
                onClick={closeStructureData}
              >
                <DoneIcon sx={{ marginRight: '10px' }} /> {t('done')}
              </Button>
            </Box>
            <Box
              sx={{
                borderRadius: '7px',
                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                backgroundColor: '#fff',
                position: 'absolute',
                width: '50%',
                right: {
                  lg: '45%',
                  md: '47%',
                },
                height: '90%',
                top: '5%',
                padding: '10px 0px 10px 10px',
                overflow: 'hidden',
                paddingBottom: '30px',
                paddingLeft: '30px',
              }}
            >
              <JSONInput
                id='json-editor'
                confirmGood={false}
                placeholder={seoInfo.structureData}
                onChange={(e) => handleStructureData(e, 'structureData')}
                theme='light_mitsuketa_tribute'
                locale={locale}
                height='100%'
                width='100%'
                colors={{
                  string: '#1984bc',
                  keys: '#000000',
                  colon: '#000000',
                  default: '#000000',
                }}
                style={{
                  body: { fontSize: '20px' },
                }}
              />
            </Box>
          </Box>
          <Box>
            <Box
              sx={{
                display: { xs: 'flex', sm: 'flex', md: 'none', lg: 'none' },
              }}
            >
              <JSONInput
                id='json-editor'
                confirmGood={false}
                placeholder={seoInfo.structureData}
                onChange={(e) => handleStructureData(e, 'structureData')}
                theme='light_mitsuketa_tribute'
                locale={locale}
                height='100%'
                width='100%'
                colors={{
                  string: '#1984bc',
                  keys: '#000000',
                  colon: '#000000',
                  default: '#000000',
                }}
                style={{
                  body: { fontSize: '20px' },
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
      <Box sx={{ textAlign: 'right' }} mb={2} mt={2}>
        <Button
          variant='contained'
          disabled={disabledState}
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
            },
            textTransform: 'capitalize',
          }}
          onClick={saveSeoInfo}
        >
          {t('done')}
        </Button>
      </Box>
    </AccordionDetails>
  );
};
export default VodSEO;
