import { Edit } from '@mui/icons-material';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Button, Typography } from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';
import { showToastSuccess } from '../../../../components/toastNotification/toastNotificationReactTostify';
import { Store } from '../../../../store/ContextStore';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { PrelemSeoProps, SeoInfo } from '../../utils/editTypes';
import BackButton from '../BackButton/BackButton';
import '../PageSettings/PageSettings.css';
import BasicSwitch from '../Switch';

const PrelemSEO: React.FC<PrelemSeoProps> = ({
  setPageId,
  selectedPrelemIndex,
  handleSave,
}) => {
  const { state, dispatch } = useContext(Store);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { page } = state;
  const { SeoEnabled, StructuredData } =
    page.prelemMetaArray[selectedPrelemIndex];
  const { t } = useTranslation();
  const [seoInfo, setSeoInfo] = useState<SeoInfo>({
    showContent: SeoEnabled,
    share: false,
    structureData:
      StructuredData && typeof StructuredData === 'string'
        ? JSON.parse(StructuredData)
        : {},
  });
  const [seoInstance, setSeoInstance] = useState<SeoInfo>({
    showContent: SeoEnabled,
    share: false,
    structureData:
      StructuredData && typeof StructuredData === 'string'
        ? JSON.parse(StructuredData)
        : {},
  });

  const handleToggleChange = (event, fieldType) => {
    const contentNew = { ...seoInfo };
    contentNew[fieldType] = event.target.checked;
    setSeoInfo(contentNew);
  };

  const [handleImpression] = usePlatformAnalytics();
  const saveSeoInfo = () => {
    handleSave('StructuredData', JSON.stringify(seoInfo.structureData));
    handleSave('SeoEnabled', seoInfo.showContent);
    const pageDataObj = {
      eventType: 'Prelem SEO Setting Saved',
      SeoPrelemSaved: true,
    };
    handleImpression(pageDataObj.eventType, pageDataObj);
    showToastSuccess(`${t('prelem_seo_info_toast')} ${t('saved_toast')}`);
  };

  const handleStructureData = (event, fieldType) => {
    const contentNew = { ...seoInfo };
    contentNew[fieldType] = event.jsObject;
    setSeoInfo(contentNew);
  };

  const toggleStructureData = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const { SeoEnabled, StructuredData } =
      page.prelemMetaArray[selectedPrelemIndex];
    setSeoInstance({
      showContent: SeoEnabled,
      share: false,
      structureData:
        StructuredData && typeof StructuredData === 'string'
          ? JSON.parse(StructuredData)
          : {},
    });
  }, [selectedPrelemIndex, page]);

  const copyStructureData = () => {
    navigator.clipboard.writeText(
      JSON.stringify(seoInfo.structureData, undefined, 2)
    );
    showToastSuccess(`${t('page_structure_data')} ${t('copied')}`);
  };

  useEffect(() => {
    setSeoInfo(seoInstance);
  }, [seoInstance]);

  return (
    <Box className="pageSettingmainWp">
      <BackButton setPageId={setPageId} Title="SEO" backTo="prelemSetting" />
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('page_prelem_find')}
          <BasicSwitch
            checked={seoInfo?.showContent}
            onChange={(e: any) => handleToggleChange(e, 'showContent')}
            color={ThemeConstants.BLACK_COLOR}
          />
        </Typography>
      </Box>
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('page_prelem_share')}
          <BasicSwitch
            disabled
            checked={seoInfo?.share}
            onChange={(e: any) => handleToggleChange(e, 'share')}
            color={ThemeConstants.BLACK_COLOR}
          />
        </Typography>
      </Box>
      <Box className="rowBox">
        <Typography className="switchbox" variant="p4regular">
          {t('page_structure_data')}
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              color: ThemeConstants.BLACK_COLOR,
              textTransform: 'capitalize',
              cursor: 'pointer',
              pointerEvents:
                Object.keys(seoInfo.structureData).length != 0
                  ? 'visible'
                  : 'none',
              opacity: Object.keys(seoInfo.structureData).length != 0 ? 1 : 0.3,
            }}
            onClick={toggleStructureData}
          >
            <Edit
              sx={{
                marginRight: '2px',
                opacity:
                  Object.keys(seoInfo.structureData).length != 0 ? 1 : 0.3,
              }}
            />{' '}
            {t('edit')}
          </span>
        </Typography>
      </Box>
      {isOpen && (
        <Box
          sx={{
            borderRadius: { md: '7px' },
            boxShadow: { md: '0 3px 6px 0 rgba(0, 0, 0, 0.16)' },
            backgroundColor: ThemeConstants.WHITE_COLOR,
            position: {
              md: 'absolute',
            },
            width: {
              md: '50%',
            },
            top: '25%',
            left: {
              md: '40%',
              em: '30%',
              lg: '25%',
            },
            zIndex: '999',
            height: '70%',
            padding: '10px 0px 10px 10px',
            paddingBottom: '30px',
            paddingLeft: '30px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '20px',
              padding: '0 20px',
            }}
          >
            <ContentCopyIcon
              onClick={copyStructureData}
              sx={{ cursor: 'pointer' }}
            />
            <CheckIcon
              onClick={toggleStructureData}
              sx={{ cursor: 'pointer' }}
            />
          </Box>
          <JSONInput
            id="json-editor"
            confirmGood={false}
            placeholder={seoInfo.structureData}
            onChange={(e) => handleStructureData(e, 'structureData')}
            theme="light_mitsuketa_tribute"
            locale={locale}
            height="100%"
            width="100%"
            colors={{
              string: '#1984bc',
              keys: ThemeConstants.BLACK_COLOR,
              colon: ThemeConstants.BLACK_COLOR,
              default: ThemeConstants.BLACK_COLOR,
            }}
            style={{
              body: { fontSize: '20px' },
            }}
          />
        </Box>
      )}
      <Box className="rowBox">
        <Button
          variant="contained"
          disabled={JSON.stringify(seoInstance) === JSON.stringify(seoInfo)}
          sx={{ width: '100%' }}
          onClick={saveSeoInfo}
        >
          {t('done')}
        </Button>
      </Box>
    </Box>
  );
};
export default PrelemSEO;
