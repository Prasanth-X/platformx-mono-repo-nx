import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import InfoIcon from '@mui/icons-material/Info';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Box, Divider, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import AdvancedSeo from './AdvancedSeo';
import Analytics from './Analytics';
import PageInfo from './PageInfo';
import SEOBasics from './SEOBasics';
import Schedule from './Schedule';
import SocialShare from './SocialShare';
const PageSettings = ({
  handleClose,
  toggleGallery,
  selectedImage,
  handleDelete,
  confirmImageOrVideoDelete,
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<string | false>('page-info');
  const [selectedOperation, setSelectedOperation] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };
  const handleGallery = (toggleState, galleryType, settingsSection) => {
    toggleGallery(toggleState, galleryType);
    setSelectedOperation('replace');
    setSelectedSection(settingsSection);
  };
  const handleImageDelete = (settingsSection) => {
    handleDelete('Images');
    setSelectedOperation('delete');
    setSelectedSection(settingsSection);
  };

  return (
    <>
      <Typography
        variant="subtitle1"
        sx={{
          padding: '10px 25px 10px 25px',
          backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          textTransform: 'uppercase',
          color: ThemeConstants.WHITE_COLOR,
          fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
        }}
      >
        {t('page_setting')}
        <CloseIcon
          sx={{ color: ThemeConstants.WHITE_COLOR, cursor: 'pointer' }}
          onClick={handleClose}
        />
      </Typography>
      <Box
        sx={{
          height: 'calc(100vh - 150px)',
          overflowX: 'hidden',
          overflowY: 'scroll',
        }}
      >
        <Accordion
          expanded={expanded === 'page-info'}
          onChange={handleChange('page-info')}
          sx={{
            boxShadow: 'none',
            '&.Mui-expanded': {
              margin: '0px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
            }
            aria-controls="page-info-content"
            id="page-info-header"
          >
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: {
                  xs: ThemeConstants.FONTSIZE_DEFAULT,
                  xl: ThemeConstants.FONTSIZE_MD,
                },
                textTransform: 'capitalize',
              }}
            >
              <InfoIcon
                sx={{
                  color: ThemeConstants.BLACK_COLOR,
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              />
              {t('page_info')}
            </Typography>
          </AccordionSummary>
          <Divider />
          <PageInfo />
        </Accordion>
        <Divider />
        <Accordion
          expanded={expanded === 'seo-basics'}
          onChange={handleChange('seo-basics')}
          sx={{
            boxShadow: 'none',
            '&.Mui-expanded': {
              margin: '0px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
            }
            aria-controls="seo-basics-content"
            id="seo-basics-header"
          >
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: {
                  xs: ThemeConstants.FONTSIZE_DEFAULT,
                  xl: ThemeConstants.FONTSIZE_MD,
                },
                textTransform: 'capitalize',
              }}
            >
              <FindInPageIcon
                sx={{
                  color: ThemeConstants.BLACK_COLOR,
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              />
              {t('page_seo')}
            </Typography>
          </AccordionSummary>
          <Divider />
          {expanded === 'seo-basics' && <SEOBasics />}
        </Accordion>
        <Divider />
        <Accordion
          expanded={expanded === 'social-share'}
          onChange={handleChange('social-share')}
          sx={{
            boxShadow: 'none',
            '&.Mui-expanded': {
              margin: '0px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
            }
            aria-controls="social-share-content"
            id="social-share-header"
          >
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: {
                  xs: ThemeConstants.FONTSIZE_DEFAULT,
                  xl: ThemeConstants.FONTSIZE_MD,
                },
                textTransform: 'capitalize',
              }}
            >
              <PeopleAltIcon
                sx={{
                  color: ThemeConstants.BLACK_COLOR,
                  cursor: 'pointer',
                  marginRight: '10px',
                  fontSize: {
                    xs: ThemeConstants.FONTSIZE_DEFAULT,
                    xl: ThemeConstants.FONTSIZE_MD,
                  },
                }}
              />
              {t('page_social_share')}
            </Typography>
          </AccordionSummary>
          <Divider />
          {expanded === 'social-share' && (
            <SocialShare
              handleImageDelete={handleImageDelete}
              handleGallery={handleGallery}
              selectedImage={selectedImage}
              selectedSection={selectedSection}
              confirmImageDelete={
                selectedOperation == 'delete'
                  ? confirmImageOrVideoDelete
                  : false
              }
            />
          )}
        </Accordion>
        <Divider />
        <Accordion
          expanded={expanded === 'analytics'}
          onChange={handleChange('analytics')}
          sx={{
            boxShadow: 'none',
            '&.Mui-expanded': {
              margin: '0px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
            }
            aria-controls="analytics-content"
            id="analytics-header"
          >
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: {
                  xs: ThemeConstants.FONTSIZE_DEFAULT,
                  xl: ThemeConstants.FONTSIZE_MD,
                },
                textTransform: 'capitalize',
              }}
            >
              <AnalyticsIcon
                sx={{
                  color: ThemeConstants.BLACK_COLOR,
                  cursor: 'pointer',
                  marginRight: '10px',
                  fontSize: {
                    xs: ThemeConstants.FONTSIZE_DEFAULT,
                    xl: ThemeConstants.FONTSIZE_MD,
                  },
                }}
              />
              {t('page_analytics')}
            </Typography>
          </AccordionSummary>
          <Divider />
          {expanded === 'analytics' && <Analytics />}
        </Accordion>
        <Divider />
        <Accordion
          expanded={expanded === 'publish'}
          onChange={handleChange('publish')}
          sx={{
            boxShadow: 'none',
            '&.Mui-expanded': {
              margin: '0px',
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
            }
            aria-controls="publish-content"
            id="publish-header"
          >
            <Typography
              variant="h6"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontSize: {
                  xs: ThemeConstants.FONTSIZE_DEFAULT,
                  xl: ThemeConstants.FONTSIZE_MD,
                },
                textTransform: 'capitalize',
              }}
            >
              <TelegramIcon
                sx={{
                  color: ThemeConstants.BLACK_COLOR,
                  cursor: 'pointer',
                  marginRight: '10px',
                }}
              />
              {t('page_schedule')}
            </Typography>
          </AccordionSummary>
          <Divider />
          {expanded === 'publish' && <Schedule />}
        </Accordion>
        <Divider />
      </Box>
    </>
  );
};

export default PageSettings;
