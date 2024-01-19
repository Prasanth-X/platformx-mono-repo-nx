import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Box, Button, TextField, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageDropDownCheckBox from '../LanguageDropDownCheckBox/LanguageDropDownCheckBox';
import './DuplicateContentPopup.css';

interface DialogList {
  titledata: string;
  isDialogOpen: boolean;
  closeButtonHandle: () => void;
  doneButtonHandle: (pageExist: boolean, currTitle: string) => void;
  contentType?: string;
  language?: any;
  setLanguage?: any;
}

export default function DuplicateContentPopup({
  titledata = '',
  isDialogOpen,
  closeButtonHandle,
  doneButtonHandle,
  contentType,
  language = [],
  setLanguage,
}: DialogList) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(titledata);

  return (
    <div>
      <Dialog
        fullWidth
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="duplicateContentPopupModal"
        sx={{
          '.Platform-x-Dialog-paper': {
            margin: { xs: '0', md: '20px', xl: '30px' },
            alignSelf: { xs: 'flex-end', md: 'center' },
            padding: { xs: '20px 15px', md: '25px' },
            width: { xs: '100%' },
            borderBottomLeftRadius: { xs: 0, md: '4px' },
            borderBottomRightRadius: { xs: 0, md: '4px' },
          },
        }}
      >
        <Box className="mainBox">
          <DialogTitle
            id="alert-dialog-title"
            component="h2"
            variant="h2medium"
          >
            {t('duplicate')} {contentType}
          </DialogTitle>
          <Box className="inputesBox">
            <TextField
              autoFocus
              value={title}
              onChange={(e: any) => setTitle(e.target.value)}
              placeholder="Enter Title"
              margin="dense"
              id="name"
              type="text"
              variant="outlined"
              autoComplete="off"
              inputProps={{ maxLength: 100 }}
            />
          </Box>
          <Box className="inputesBox">
            <Typography variant="h5regular">
              {t('content_language_label')}
              {contentType}
            </Typography>
            <LanguageDropDownCheckBox
              language={language}
              setLanguage={setLanguage}
            />
          </Box>
          <DialogActions className="actionsButtons">
            <Button
              variant="outlined"
              className="buttonsBottom"
              sx={{
                marginRight: '8px',
              }}
              startIcon={<ClearRoundedIcon />}
              onClick={closeButtonHandle}
            >
              {t('cancel')}
            </Button>
            <Button
              disabled={title?.length > 0 && language.length > 0 ? false : true}
              variant="contained"
              className="buttonsBottom"
              onClick={() => doneButtonHandle(false, title)}
              autoFocus
              startIcon={<CheckRoundedIcon />}
            >
              {t('done')}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </div>
  );
}
