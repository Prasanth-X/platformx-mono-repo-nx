import { Box, Button, Dialog, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PopupImage from '../../assets/images/createPagePopupImage.png';
import LanguageDropDownCheckBox from '../../Common/LanguageDropDownCheckBox';
import { Store } from '../../store/ContextStore';
import { ThemeConstants } from '@platformx/utilities';
import { formatPageUrl } from '../../utils/helper';
import '../articles/DuplicateContentPopup.css';
import { nameLength } from '../editPage/utils/constants';
import { useStyles } from './CreatePage.styles';
import { DialogList } from './CreatePage.types';

export const CreatePage = ({
  isDialogOpen,
  title,
  pageNameInitial,
  isDuplicate = false,
  confirmButtonHandle,
  closeButtonHandle,
  language,
  setLanguage,
}: DialogList) => {
  const { t } = useTranslation();
  const copiedPageName = pageNameInitial
    ? `${t('page_duplicate_placeholder')} ${pageNameInitial}`
    : '';
  const [pageName, setPageName] = useState(copiedPageName);
  const [pageUrl, setPageUrl] = useState(
    pageNameInitial ? formatPageUrl(copiedPageName) : ''
  );
  const [showPageNameError, setShowPageNameError] = useState(false);
  const [showPageUrlError, setShowPageUrlError] = useState(false);
  const { state } = useContext(Store);
  const { page } = state;

  const handleConfirm = () => {
    const pgName = pageName.trim();
    const pgUrl = pageUrl.trim();

    if (pgName.length == 0) {
      setShowPageNameError(true);
    }
    if (pgUrl.length == 0) {
      setShowPageUrlError(true);
    }
    //if no error in entered page name and url field call create page
    if (pgName.length != 0 && pgUrl.length != 0) {
      confirmButtonHandle(pgName, pgUrl, isDuplicate);
    }
  };

  const handleClose = (event, reason) => {
    if (reason && (reason == 'backdropClick' || reason == 'escapeKeyDown'))
      return;
    closeButtonHandle();
  };

  const handleUrlChange = (event) => {
    if (showPageUrlError) {
      setShowPageUrlError(false);
    }
    setPageUrl(formatPageUrl(event.target.value));
  };

  const handlePgNameChange = (event) => {
    const pgName = event.target.value.replace(/^\s+/g, '');
    if (showPageNameError) {
      setShowPageNameError(false);
      setShowPageUrlError(false);
    }
    setPageName(pgName);
    setPageUrl(formatPageUrl(event.target.value));
  };
  const classes = useStyles();
  useEffect(() => {
    const keyDownHandler = (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        handleConfirm();
      }
    };
    document.addEventListener('keydown', keyDownHandler);
    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    };
  });
  return (
    <Dialog
      fullWidth
      open={isDialogOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '.Platform-x-Dialog-paper': {
          padding: 0,
          width: { xs: '100%' },
          borderRadius: '5px',
          maxWidth: { sx: '100%', md: '700px', em: '800px' },
          margin: '15px',
        },
      }}
    >
      <Grid container>
        <Grid xs={12} md={6}>
          <Box className={classes.createPagePopupLeft}>
            <Box>
              <Box className={classes.createPagePopuprowBox}>
                {title && (
                  <Typography
                    id="alert-dialog-title"
                    component="h2"
                    variant="h3semibold"
                  >
                    {title}
                  </Typography>
                )}
              </Box>
              <Box className={classes.createPagePopuprowBox}>
                <Typography variant="h5regular">
                  {t('page_title_label')}
                </Typography>
                <TextField
                  autoFocus
                  value={pageName}
                  placeholder={t('page_title_placeholer')}
                  margin="dense"
                  id="name"
                  type="text"
                  onChange={(e) => handlePgNameChange(e)}
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  inputProps={{ maxLength: nameLength }}
                  sx={{
                    '.Platform-x-Input-root:after': {
                      borderBottom: `1px solid ${ThemeConstants.BLACK_COLOR}`,
                    },
                  }}
                />
                {showPageNameError && (
                  <Typography variant="h7regular" style={{ color: 'red' }}>
                    Page name cant be blank!
                  </Typography>
                )}
              </Box>
              <Box className={classes.createPagePopuprowBox}>
                <Typography variant="h5regular">
                  {t('page_url_label')}
                </Typography>
                <TextField
                  margin="dense"
                  id="name"
                  type="text"
                  placeholder={t('page_url_placeholder')}
                  onChange={(e) => handleUrlChange(e)}
                  value={pageUrl}
                  fullWidth
                  variant="outlined"
                  autoComplete="off"
                  sx={{
                    '.Platform-x-Input-root:after': {
                      borderBottom: `1px solid ${ThemeConstants.BLACK_COLOR}`,
                    },
                  }}
                />
                {showPageUrlError && (
                  <Typography variant="h7regular" style={{ color: 'red' }}>
                    Page URL cant be blank!
                  </Typography>
                )}
              </Box>
              {isDuplicate && (
                <Box className={classes.createPagePopuprowBox}>
                  <Typography variant="h5regular">
                    {t('page_language_label')}
                  </Typography>
                  <LanguageDropDownCheckBox
                    language={language}
                    setLanguage={setLanguage}
                  />
                </Box>
              )}
            </Box>
            <Box className={classes.createPagePopupButtonWp}>
              <Button
                disableElevation
                variant="outlined"
                onClick={() => closeButtonHandle()}
              >
                {t('close')}
              </Button>
              <Button
                variant="contained"
                disabled={
                  isDuplicate &&
                  (pageName.trim().length == 0 ||
                  pageUrl.trim().length == 0 ||
                  language.length == 0
                    ? true
                    : false)
                }
                disableElevation
                onClick={() => handleConfirm()}
              >
                {t('done')}
              </Button>
              <p>{page?.errorMessage}</p>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} md={6} className={classes.createPagePopupRight}>
          <Box className={classes.popupRightImage}>
            <img src={PopupImage} alt="create Page Popup Image" />
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
};
