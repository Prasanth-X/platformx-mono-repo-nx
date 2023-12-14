import CodeIcon from '@mui/icons-material/Code';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import EditNote from '../../assets/EditNote.png';
import useAccess from '../../hooks/usePermissions/useAccess';
import { CATEGORY_PAGE } from '../../utils/constants';
import { Category, ContentAction } from '../../utils/Enums/ContentType';

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function ContentMoreDialog({
  iconType,
  filterValue,
  handleChange,
  onDuplicatePage,
  openSettingsPanel,
  handleUnpublish,
  handleDelete,
  handleCopy,
  handlePublishedPageView,
  data,
  handleEditContentType,
  contentType,
  handleSocialShare,
  handleEmbed,
}) {
  const { t } = useTranslation();
  const { canAccessAction } = useAccess();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const styles = `
  .singlebr_vod {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
     
     h2.singlebr_vod{
      margin: 16px 24px;
      padding: 0;
     }`;

  const handleClickOpen = () => {
    setOpen(true);
  };
  // const handleSocialShare = () => {
  //   alert("shared!!");
  // };
  const handleClose = () => {
    setOpen(false);
  };
  const handleStartBlog = (path) => {
    navigate(`/content/create-blog?path=${path}`);
  };
  const handleOpenVod = (path) => {
    handleClose();
    navigate(`/content/create-vod?path=${path}`);
  };

  return (
    <div>
      <style>{styles}</style>
      {iconType === 'MoreVertIcon' ? (
        <>
          <MoreVertIcon onClick={handleClickOpen} />
          <Dialog
            sx={{
              display: { sm: 'none' },
              '.Platform-x-Dialog-paper': {
                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                borderRadius: '10px 10px 0 0',
                width: '100%',
                margin: 0,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 999,
              },
            }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle className='singlebr_vod'>{data?.title} </DialogTitle>
            {/* {contentType === 'Event' &&
            (data?.page_state === 'published' ||
              (data?.page_state === 'draft' && data?.is_published)) ? (
              <Box
                sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
                onClick={() => {
                  handleClose();
                  handleStartBlog(data?.page);
                }}
              >
                <Box sx={{ marginRight: '10px' }}>
                  <img src={EditNote} alt='N/A' />
                </Box>
                <Box sx={{ fontSize: '16px' }}>{t('write_a_blog')}</Box>
              </Box>
            ) : null} */}
            {(data?.page_state === 'published' ||
              (data?.page_state === 'draft' && data?.is_published)) && (
              <Box
                onClick={() => {
                  handleClose();
                  handlePublishedPageView(data, true);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'stretch',
                  margin: '10px',
                }}
              >
                <Box sx={{ marginRight: '10px' }}>
                  <VisibilityIcon />
                </Box>
                <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                  {' '}
                  {t('view')}
                </Box>
              </Box>
            )}
            {data.page_state === 'draft' ||
            data.page_state === 'unpublished' ? (
              <Box
                onClick={() => {
                  handleClose();
                  handlePublishedPageView(data, false);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'stretch',
                  margin: '10px',
                }}
              >
                <Box sx={{ marginRight: '10px' }}>
                  <VisibilityIcon />
                </Box>
                <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                  {' '}
                  {t('preview')}
                </Box>
              </Box>
            ) : null}
            {/* {data.page_state == "draft" && data.modificationDate ? (
              <Box
                onClick={() => {
                  handleClose();
                  handlePublishedPageView({
                    page_state: "published",
                    current_page_url: data.current_page_url,
                  });
                }}
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  margin: "10px",
                }}
              >
                <Box sx={{ marginRight: "10px" }}>
                  <VisibilityIcon />
                </Box>
                <Box sx={{ fontSize: "16px" }}>View</Box>
              </Box>
            ) : null} */}
            <Box
              className={
                !canAccessAction(
                  Category.Content,
                  contentType,
                  ContentAction.Update
                ) && 'disable'
              }
              sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
              onClick={() => handleEditContentType(data.page)}
            >
              <Box sx={{ marginRight: '10px' }}>
                <EditIcon />
              </Box>
              <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                {t('edit')}
              </Box>
            </Box>

            <Box
              className={
                !canAccessAction(
                  Category.Content,
                  contentType,
                  ContentAction.Update
                ) && 'disable'
              }
              sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
              onClick={() => {
                handleClose();
                onDuplicatePage(data.page);
              }}
            >
              <Box sx={{ marginRight: '10px' }}>
                <ContentCopyRoundedIcon />
              </Box>
              <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                {t('duplicate')}
              </Box>
            </Box>
            <Box
              sx={{
                display:
                  data?.page_state === 'published' ||
                  (data?.page_state === 'draft' && data?.is_published)
                    ? 'flex'
                    : 'none',
                alignItems: 'stretch',
                margin: '12px',
              }}
              onClick={() => {
                handleClose();
                handleCopy(data?.current_page_url);
              }}
            >
              <Box sx={{ marginRight: '10px' }}>
                <LinkRoundedIcon />
              </Box>
              <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                {t('copy_url')}
              </Box>
            </Box>
            <Box
              sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
              onClick={() => {
                handleClose();
                openSettingsPanel(data?.page);
              }}
            >
              <Box sx={{ marginRight: '10px' }}>
                <SettingsIcon />
              </Box>
              <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                {t('settings')}
              </Box>
            </Box>
            {data.page_state === 'published' ? (
              <Box
                className={
                  !canAccessAction(
                    Category.Content,
                    contentType,
                    ContentAction.UnPublish
                  ) && 'disable'
                }
                sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
                onClick={() => {
                  handleClose();
                  handleUnpublish();
                }}
              >
                <Box sx={{ marginRight: '10px' }}>
                  <VisibilityOffIcon />
                </Box>
                <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                  {t('unpublish')}
                </Box>
              </Box>
            ) : null}
            {/* {data.page_state == 'published' ? (
              <Box
                sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
                onClick={() => {
                  handleSocialShare();
                }}
              >
                <Box sx={{ marginRight: '10px' }}>
                  <ShareIcon />
                </Box>
                <Box sx={{ fontSize: '16px' }}>Social Share</Box>
              </Box>
            ) : null} */}
            <Box
              className={
                !canAccessAction(
                  Category.Content,
                  contentType,
                  ContentAction.Delete
                ) && 'disable'
              }
              sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
              onClick={() => {
                handleClose();
                handleDelete();
              }}
            >
              <Box sx={{ marginRight: '10px' }}>
                <DeleteIcon />
              </Box>
              <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                {t('delete')}
              </Box>
            </Box>

            {data.page_state === 'published' ||
            (data.page_state === 'draft' && data.is_published) ? (
              <Box
                sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
                onClick={() => {
                  handleClose();
                  handleSocialShare();
                }}
              >
                <Box sx={{ marginRight: '10px' }}>
                  <ShareIcon />
                </Box>
                <Box sx={{ fontSize: '16px' }}> Social Share</Box>
              </Box>
            ) : null}

            {data.page_state === 'published' ||
            (data.page_state === 'draft' && data.is_published) ? (
              <Box
                sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
                onClick={() => {
                  handleClose();
                  handleEmbed();
                }}
              >
                <Box sx={{ marginRight: '10px' }}>
                  <CodeIcon />
                </Box>
                <Box sx={{ fontSize: '16px' }}>Embed</Box>
              </Box>
            ) : null}
          </Dialog>
        </>
      ) : (
        <>
          <FilterAltIcon
            onClick={handleClickOpen}
            fontSize='medium'
            sx={{ verticalAlign: 'middle', color: '#2d2d39' }}
          />

          <Dialog
            sx={{
              display: { sm: 'none' },
              '.Platform-x-Dialog-paper': {
                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                borderRadius: '10px 10px 0 0',
                margin: 0,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
              },
            }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby='alert-dialog-slide-description'
          >
            <DialogTitle>Filter</DialogTitle>
            <Box sx={{ margin: '0 0 20px 20px' }}>
              <FormControl>
                <RadioGroup value={filterValue} onChange={handleChange}>
                  <FormControlLabel
                    onClick={handleClose}
                    value='ALL'
                    control={<Radio />}
                    label='All'
                  />
                  <FormControlLabel
                    onClick={handleClose}
                    value='PUBLISHED'
                    control={<Radio />}
                    label='Published'
                  />
                  <FormControlLabel
                    onClick={handleClose}
                    value='DRAFT'
                    control={<Radio />}
                    label='Draft'
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Dialog>
        </>
      )}
    </div>
  );
}
