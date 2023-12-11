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
} from '../../../../../components/toastNotification/toastNotificationReactTostify';
import {
  publish_article,
  update_article,
} from '../../../../../services/article/article.api';
import ThemeConstants from '../../../../../theme/variable';
import BasicSwitch from '../../../../editPage/Switch';
import type {
  ArticleSEOProps,
  ArticleSeoInfo,
} from '../../../Utils/Article.types';

const ArticleSEO: React.FC<ArticleSEOProps> = ({
  selectedArticle,
  setSelectedArticle,
  getArticle,
}) => {
  const { t } = useTranslation();
  const [publishsavedmutate] = useMutation(publish_article);
  const [updateMutate] = useMutation(update_article);
  const seoEnabled = selectedArticle?.SeoEnable;
  const structureData = selectedArticle?.StructureData;
  const [copyStatus, setICopyStatus] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [seoInfo, setSeoInfo] = useState<ArticleSeoInfo>({
    showContent: seoEnabled,
    share: false,
    structureData:
      structureData && typeof structureData === 'string'
        ? JSON.parse(structureData)
        : '',
  });
  const [seoInstance, setSeoInstance] = useState<ArticleSeoInfo>({
    showContent: seoEnabled,
    share: false,
    structureData:
      structureData && typeof structureData === 'string'
        ? JSON.parse(structureData)
        : '',
  });
  const [disabledState, setDiabledState] = useState(true);

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
    setSelectedArticle(() => ({
      ...selectedArticle,
      SeoEnable: event.target.checked,
    }));
  };

  const handleStructureData = (event, fieldType) => {
    setDiabledState(false);
    if (event.jsObject !== undefined) {
      const contentNew = { ...seoInfo };
      contentNew[fieldType] = event.jsObject;
      setSeoInfo(contentNew);
      setICopyStatus(false);
      setSelectedArticle(() => ({
        ...selectedArticle,
        StructureData: JSON.stringify(event.jsObject),
      }));
    }
  };
  const publishArticle = () => {
    const articleToSend = {
      Page: selectedArticle.Page,
      ParentPageURL: selectedArticle.ParentPageURL,
      CurrentPageURL: selectedArticle.CurrentPageURL,
      // Page_LastModifiedBy: username
    };
    publishsavedmutate({
      variables: {
        input: articleToSend,
      },
    })
      .then((resp) => {
        showToastSuccess(`${t('article')} ${t('updated_toast')}`);
        getArticle(0, 10);
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
    const updatedArticle = {
      ...selectedArticle,
      creationDate: new Date().toISOString(),
      modificationDate: new Date().toISOString(),
      ArticleSettings: { ...selectedArticle?.ArticleSettings, SeoKeywords: [] },
    };
    updateMutate({
      variables: {
        input: updatedArticle,
      },
    }).then((resp) => {
      if (
        selectedArticle.Page_State &&
        selectedArticle.Page_State === 'DRAFT'
      ) {
        showToastSuccess(`${t('article')} ${t('updated_toast')}`);
      } else {
        publishArticle();
      }
    });
  };

  useEffect(() => {
    setSeoInstance({
      showContent: seoEnabled,
      share: false,
      structureData:
        structureData && typeof structureData === 'string'
          ? JSON.parse(structureData)
          : '',
    });
  }, [structureData, seoEnabled]);

  useEffect(() => {
    setSeoInfo(seoInstance);
  }, [seoInstance]);

  return (
    <AccordionDetails>
      <Typography
        variant='subtitle1'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={2}
        mb={1}
      >
        {t('page_prelem_find')}
        <BasicSwitch
          checked={seoInfo.showContent}
          onChange={(e: any) => handleToggleChange(e, 'showContent')}
          color={ThemeConstants.BLACK_COLOR}
        />
      </Typography>
      <Typography
        variant='subtitle1'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          textTransform: 'capitalize',
        }}
        mt={2}
        mb={1}
      >
        {t('share')}
        <BasicSwitch
          disabled
          checked={seoInfo.share}
          onChange={(e: any) => handleToggleChange(e, 'share')}
          color={ThemeConstants.BLACK_COLOR}
        />
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        mt={2}
        mb={1}
      >
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            textTransform: 'capitalize',
          }}
          className='drawer-label'
          variant='subtitle1'
        >
          {t('page_structure_data')}
          <Tooltip
            title={
              <Box m={1}>
                <Typography
                  sx={{ fontSize: ThemeConstants.FONTSIZE_XS }}
                  mb={1}
                >
                  {t('structre_data_tp')}
                </Typography>
              </Box>
            }
            placement='right'
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
        {seoInfo.showContent == false ? (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              color: ThemeConstants.BLACK_COLOR,
              opacity: 0.7,
              textTransform: 'capitalize',
            }}
          >
            <EditIcon sx={{ marginRight: '2px' }} /> {t('edit')}
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
                sx={{
                  marginRight: '2px',
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
export default ArticleSEO;
