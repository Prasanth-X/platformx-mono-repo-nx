import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, TextField, Typography } from '@mui/material';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { makeStyles } from '@material-ui/core';

import { useState } from 'react';
import ThemeConstants from '../../theme/variable';

interface DialogList {
  isDialogOpen: boolean;
  skipPublish: () => void;
  publish: (any) => void;
  closeButtonHandle?: () => void;
  tagsList: any;
  //updateTagsParent: any;
}
const useStyles = makeStyles({
  customTextField: {
    '& .MuiChip-root': {
      borderRadius: '3px !important',
      backgroundColor: '#e6eaed',
      padding: '6px 8px 6px 12px',
      height: '32px',
    },
  },
});
export default function PublishArticle({
  isDialogOpen,
  skipPublish,
  publish,
  closeButtonHandle,
  tagsList,
}: DialogList) {
  const classes = useStyles();
  const [tags, setTags] = useState<string[]>([...tagsList]);
  const [currentTag, setCurrentTag] = useState<string>('');
  const handleDelete = (index) => {
    if (index === 0) {
      setTags(tags.slice(index + 1));
    } else {
      let tg: any = [];
      if (index === tags.length - 1) {
        tg = tags.slice(0, index);
      }
      tg = [...tags.slice(0, index), ...tags.slice(index + 1)];
      setTags(tg);
    }
  };

  const updateTags = (e) => {
    if (e.key === 'Enter' && currentTag.trim().length !== 0) {
      let tgs;
      if (tags[0] == '') {
        tgs = [currentTag];
      } else {
        tgs = [...tags];
        tgs.push(currentTag);
      }
      setTags(tgs);
      setCurrentTag('');
    } else {
      setCurrentTag(e.target.value);
    }
  };
  return (
    <div>
      <Dialog
        fullWidth
        open={isDialogOpen}
        maxWidth='sm'
        onClose={closeButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          '.Platform-x-Dialog-paper': {
            // maxWidth: { xs: '500px', xl: '600px' },
            margin: { xs: '20px', xl: '30px' },
          },
          textAlign: 'center',
        }}
      >
        {/* <Box
            sx={{ textAlign: 'right', cursor: 'pointer' }}
            mt={1}
            mr={3}
            onClick={
              modalType == 'save' || modalType == 'unsavedChanges'
                ? crossButtonHandle
                : closeButtonHandle
            }
          >
            <CloseIcon />
          </Box> */}
        {/* {modalType == 'save' || modalType == 'publish' ? (
          <Box sx={{ textAlign: 'center' }} mt={2}>
            <CheckCircleIcon sx={{ color: '#198753', fontSize: '50px' }} />
          </Box>
        ) : (
          ''
        )} */}

        <DialogTitle
          id='alert-dialog-title'
          sx={{
            fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
            textAlign: 'center',
            padding: '70px 195px 24px', //modalType ? '0px 0px' : '0px 0px 5px 0px',
          }}
        >
          Tags
        </DialogTitle>

        <DialogContent
          sx={{
            textAlign: 'center',
            padding: '30px 25px',
            overflowY: 'hidden',
          }}
        >
          <Typography
            sx={{ fontSize: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT }}
          >
            Add Tags so readers know what your story is about
          </Typography>
        </DialogContent>
        <Box sx={{ textAlign: 'center' }} mb={3}>
          <TextField
            autoFocus
            value={currentTag}
            //defaultValue={pageUrl}
            onKeyPress={(e: any) => updateTags(e)}
            onChange={(e: any) => setCurrentTag(e.target.value)}
            placeholder='Enter Tags'
            margin='dense'
            id='name'
            type='text'
            variant='outlined'
            autoComplete='off'
            sx={{
              '.Platform-x-Input-root:after': {
                borderBottom: '10px solid #000000',
              },
              '.Platform-x-FormControl-root': {
                marginTop: '0px',
              },
              width: '65%',
              marginTop: '60px',
            }}
          />
        </Box>
        {/* <Stack direction="row" spacing={1} margin={'10px 156px 63px'}> */}
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row wrap',
            margin: '10px 110px 63px',
          }}
        >
          {tags.length > 0
            ? tags?.map((tagInstance, index) => {
                if (tagInstance.trim() != '') {
                  return (
                    <Chip
                      sx={{ marginRight: '10px', marginBottom: '10px' }}
                      key={index}
                      className={classes.customTextField}
                      label={tagInstance}
                      onDelete={() => handleDelete(index)}
                      deleteIcon={<CloseIcon />}
                    />
                  );
                }
              })
            : null}
        </Box>
        {/* </Stack> */}
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'center',
            paddingBottom: '73px',
          }}
        >
          <Button
            variant='outlined'
            sx={{
              marginRight: '20px',
            }}
            onClick={skipPublish}
          >
            Skip and Publish
          </Button>
          <Button variant='contained' onClick={() => publish(tags)} autoFocus>
            Publish
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
