import AnalyticsIcon from '@mui/icons-material/Analytics';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Box, Divider, Grid, Typography } from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../theme/variable';
import VodAnalytics from './vodAnalytics/VodAnalytics';
import VodSEO from './vodSEO/VodSEO';
import { Accordions, useStyles } from './vodSettings.styles';
import VodSocialShare from './vodSocialShare/VodSocialShare';

const VodSettings = ({
  handleClose,
  toggleGallery,
  selectedImage,
  handleDelete,
  confirmImageOrVideoDelete,
  selectedVod,
  setSelectedVod,
  vodSettingsPanelState,
}) => {
  const classes = useStyles();
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
      <Grid container className={classes.settingsContainer}>
        <Grid item xs={12} md={8} className={classes.settingsContainerLeft}>
          {/* to show Structured data for desktop */}
        </Grid>
        <Grid item xs={12} md={4} className={classes.settingsContainerRight}>
          <Typography variant='subtitle1' className={classes.containerHead}>
            {`${t('vod')} ${t('setting')}`}
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
          </Typography>
          <Box className={classes.accordionContainer}>
            <Accordions
              expanded={expanded === 'social-share'}
              onChange={handleChange('social-share')}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
                }
                aria-controls='social-share-content'
                id='social-share-header'
              >
                <Typography variant='h6' className={classes.accordionText}>
                  <PeopleAltIcon className={classes.icons} />
                  {t('social_share')}
                </Typography>
              </AccordionSummary>
              <Divider />
              {selectedVod && (
                <VodSocialShare
                  handleImageDelete={handleImageDelete}
                  handleGallery={handleGallery}
                  selectedImage={selectedImage}
                  selectedSection={selectedSection}
                  confirmImageDelete={
                    selectedOperation == 'delete'
                      ? confirmImageOrVideoDelete
                      : false
                  }
                  selectedVod={selectedVod}
                  setSelectedVod={setSelectedVod}
                  vodSettingsPanelState={vodSettingsPanelState}
                />
              )}
            </Accordions>
            <Divider />
            <Accordions
              expanded={expanded == 'analytics'}
              onChange={handleChange('analytics')}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
                }
                aria-controls='analytics-content'
                id='analytics-header'
              >
                <Typography variant='h6' className={classes.accordionText}>
                  <AnalyticsIcon className={classes.icons} />
                  {t('analytics')}
                </Typography>
              </AccordionSummary>
              <Divider />
              {selectedVod && (
                <VodAnalytics
                  selectedVod={selectedVod}
                  setSelectedVod={setSelectedVod}
                />
              )}
            </Accordions>
            <Divider />
            <Accordions
              expanded={expanded == 'seo'}
              onChange={handleChange('seo')}
            >
              <AccordionSummary
                expandIcon={
                  <ExpandMoreIcon sx={{ color: ThemeConstants.BLACK_COLOR }} />
                }
                aria-controls='seo-content'
                id='seo-header'
              >
                <Typography variant='h6' className={classes.accordionText}>
                  <FindInPageIcon className={classes.icons} />
                  {t('seo')}
                </Typography>
              </AccordionSummary>
              <Divider />
              {selectedVod && (
                <VodSEO
                  selectedVod={selectedVod}
                  setSelectedVod={setSelectedVod}
                />
              )}
            </Accordions>
            <Divider />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default VodSettings;
