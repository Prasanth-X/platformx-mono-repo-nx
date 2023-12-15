import CachedIcon from '@mui/icons-material/Cached';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { Box, Divider, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import CloudIcon from '../../../../assets/CloudIcon.png';
import { Tags } from '../../../../components/Common/tags/Tags';
import Submit from '../../../../components/Submit/Submit';
import { ThemeConstants } from '@platformx/utilities';
import CommonImageRender from '../../../Gallery/CommonImageRender';
import { useStyles } from './PublishModal.styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
    height: '-webkit-fill-available',
    maxWidth: 'none',
    width: '-webkit-fill-available',
    [`@media (min-width:${ThemeConstants.XS}px)`]: {
      margin: '0px',
      maxHeight: 'calc(100vh - 0px)',
    },
    [`@media (min-width:${ThemeConstants.SM}px)`]: {
      margin: '20px',
      maxHeight: 'calc(100vh - 40px)',
    },
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  onPublish: () => void;
  category: any;
  subCategory: any;
  onSave: () => void;
  workflow: object;
  createComment: () => void;
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const {
    children,
    onClose,
    onPublish,
    category,
    subCategory,
    onSave,
    workflow,
    createComment,
    ...other
  } = props;
  const { t } = useTranslation();

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...other}
    >
      <Button
        onClick={onClose}
        variant="outlined"
        sx={{
          position: 'absolute',
          left: 15,
        }}
      >
        {t('resend_text_left_button')}
      </Button>
      {children}
      <Box
        sx={{
          position: 'absolute',
          right: 15,
        }}
      >
        <Submit
          category={category}
          subCategory={subCategory}
          workflow={workflow}
          handlePublish={onPublish}
          handleSave={onSave}
          createComment={createComment}
        />
      </Box>
    </DialogTitle>
  );
};

export default function PublishModal({
  open,
  handleClose,
  content,
  tagData,
  selectedTag,
  handleTagOnChange,
  onPublish,
  onUploadClick,
  selectedImage,
  state,
  operationType,
  resetSelectedImage,
  updateImageField,
  isUploadArticle,
  count,
  imageCropHandle,
  category,
  subCategory,
  workflow,
  handleClickOpen,
  onSave,
  createComment,
}) {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box sx={{ width: '100%' }}>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{ margin: '0px' }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
          onPublish={onPublish}
          category={category}
          subCategory={subCategory}
          workflow={workflow}
          onSave={onSave}
          createComment={createComment}
        >
          {t('submit_text')}
        </BootstrapDialogTitle>

        <DialogContent dividers className={classes.dialogContentStyle}>
          <Box className={classes.innerBoxContent}>
            <Typography variant="h5medium">{t('better_engagement')}</Typography>
            <Box
              className={classes.publishImgUploadBox}
              sx={{
                width: { sm: '610px', xs: '100%' },
                height: { sm: '343px', xs: '187px' },
              }}
            >
              {content?.Url ? (
                <>
                  <CommonImageRender
                    content={selectedImage}
                    imgOrder={{
                      1440: 'hero',
                      1280: 'landscape',
                      1024: 'card2',
                      768: 'square',
                      600: 'card1',
                      320: 'portrait',
                    }}
                    updateField={updateImageField}
                    originalImage={state?.ObjectFields?.original_image}
                    publishedImages={state?.ObjectFields?.published_images}
                    operationType={operationType}
                    resetSelectedImage={resetSelectedImage}
                    isCropLoading={true}
                    isUploadArticle={isUploadArticle}
                    count={count}
                  />

                  <Box className={classes.imgBox}>
                    <Box sx={{ display: 'flex' }}>
                      <Box
                        sx={{ cursor: 'pointer', pr: '7px' }}
                        onClick={() => {
                          handleClose();
                          onUploadClick('Images', 'replace');
                        }}
                      >
                        <Box className={classes.cachedIconBox}>
                          <CachedIcon sx={{ color: '#626060' }} />
                        </Box>
                      </Box>
                      <Box
                        sx={{ cursor: 'pointer', pl: '7px' }}
                        onClick={imageCropHandle}
                      >
                        <Box className={classes.editIconBox}>
                          <ModeEditOutlinedIcon sx={{ color: '#626060' }} />
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </>
              ) : (
                <Box className={classes.cloudIconBox}>
                  <Box
                    onClick={() => {
                      handleClose();
                      onUploadClick('Images', 'choose');
                    }}
                    sx={{ cursor: 'pointer' }}
                  >
                    <img src={CloudIcon} />
                  </Box>
                  <Typography
                    variant="h4regular"
                    sx={{ textAlign: 'center', padding: '15px' }}
                  >
                    {t('drag_drop')}
                  </Typography>
                  <Button
                    sx={{
                      backgroundColor: '#4B9EF9',
                      border: 'inherit',
                      ':hover': { backgroundColor: '#4B9EF9' },
                    }}
                    variant="contained"
                    onClick={() => {
                      handleClose();
                      onUploadClick('Images', 'choose');
                    }}
                  >
                    {t('browse_to_upload')}
                  </Button>
                </Box>
              )}
            </Box>

            <Typography variant="h7medium">
              {t('article_banner_note')}
            </Typography>
            <Box className={classes.dividerStyle}>
              <Divider />
            </Box>
            <Box className={classes.publishTagsWp}>
              <Tags
                tagData={tagData}
                isPublishModal={true}
                selectedTag={selectedTag}
                handleTagOnChange={handleTagOnChange}
              />
            </Box>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </Box>
  );
}
