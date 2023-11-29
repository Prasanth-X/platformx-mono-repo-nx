import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, Divider, Grid, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import PlateformXLoader from '../../../../../components/Loader/loader';
import ThemeConstants from '../../../../../theme/variable';
import ArticleAnalytics from './ArticleAnalytics';
import ArticleSEO from './ArticleSEO';
import ArticleSocialShare from './ArticleSocialShare';

const ArticleSettings = ({
  handleClose,
  toggleGallery,
  selectedImage,
  handleDelete,
  confirmImageOrVideoDelete,
  selectedArticle,
  setSelectedArticle,
  articleSettingsPanelState,
  getArticle,
}) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = React.useState<string | false>(
    'social-share'
  );
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
      <Grid container sx={{ marginTop: '0' }}>
        <Grid item xs={12} md={8} sx={{ backgroundColor: 'transparent' }}>
          {/* to show Structured data for desktop */}
        </Grid>
        <Grid item xs={12} md={4} sx={{ backgroundColor: '#f5f5f5' }}>
          <Typography
            variant='subtitle1'
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
            {`${t('article')} ${t('setting')}`}
            <CloseIcon
              sx={{ color: ThemeConstants.WHITE_COLOR, cursor: 'pointer' }}
              onClick={handleClose}
            />
          </Typography>
          <Box
            sx={{
              height: 'calc(100vh - 45px)',
              overflowX: 'hidden',
              overflowY: 'scroll',
            }}
          >
            {selectedArticle && Object.keys(selectedArticle).length > 0 ? (
              <>
                <Accordion
                  expanded={expanded === 'social-share'}
                  onChange={handleChange('social-share')}
                  sx={{
                    boxShadow: 'none',
                    borderRadius: '0px',
                    '&.Mui-expanded': {
                      margin: '0px',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{ color: ThemeConstants.BLACK_COLOR }}
                      />
                    }
                    aria-controls='social-share-content'
                    id='social-share-header'
                  >
                    <Typography
                      variant='h6'
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
                      {t('social_share')}
                    </Typography>
                  </AccordionSummary>
                  <Divider />
                  {selectedArticle && (
                    <ArticleSocialShare
                      handleImageDelete={handleImageDelete}
                      handleGallery={handleGallery}
                      selectedImage={selectedImage}
                      selectedSection={selectedSection}
                      confirmImageDelete={
                        selectedOperation == 'delete'
                          ? confirmImageOrVideoDelete
                          : false
                      }
                      selectedArticle={selectedArticle}
                      setSelectedArticle={setSelectedArticle}
                      articleSettingsPanelState={articleSettingsPanelState}
                      getArticle={getArticle}
                    />
                  )}
                </Accordion>
                <Divider />
                <Accordion
                  expanded={expanded == 'analytics'}
                  onChange={handleChange('analytics')}
                  sx={{
                    boxShadow: 'none',
                    borderRadius: '0px',
                    '&.Mui-expanded': {
                      margin: '0px',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{ color: ThemeConstants.BLACK_COLOR }}
                      />
                    }
                    aria-controls='analytics-content'
                    id='analytics-header'
                  >
                    <Typography
                      variant='h6'
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
                        }}
                      />
                      {t('analytics')}
                    </Typography>
                  </AccordionSummary>
                  <Divider />
                  {selectedArticle && (
                    <ArticleAnalytics
                      // analyticsInfo={selectedArticle?.AnalyticsEnable}
                      selectedArticle={selectedArticle}
                      setSelectedArticle={setSelectedArticle}
                      getArticle={getArticle}
                    />
                  )}
                </Accordion>
                <Divider />
                <Accordion
                  expanded={expanded == 'seo'}
                  onChange={handleChange('seo')}
                  sx={{
                    boxShadow: 'none',
                    borderRadius: '0px',
                    '&.Mui-expanded': {
                      margin: '0px',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <ExpandMoreIcon
                        sx={{ color: ThemeConstants.BLACK_COLOR }}
                      />
                    }
                    aria-controls='seo-content'
                    id='seo-header'
                  >
                    <Typography
                      variant='h6'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: {
                          xs: ThemeConstants.FONTSIZE_DEFAULT,
                          xl: ThemeConstants.FONTSIZE_MD,
                        },
                        textTransform: 'uppercase',
                      }}
                    >
                      <FindInPageIcon
                        sx={{
                          color: ThemeConstants.BLACK_COLOR,
                          cursor: 'pointer',
                          marginRight: '10px',
                        }}
                      />
                      {t('seo')}
                    </Typography>
                  </AccordionSummary>
                  <Divider />
                  {selectedArticle && (
                    <ArticleSEO
                      selectedArticle={selectedArticle}
                      setSelectedArticle={setSelectedArticle}
                      getArticle={getArticle}
                    />
                  )}
                </Accordion>
                <Divider />
              </>
            ) : (
              <PlateformXLoader />
            )}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ArticleSettings;
