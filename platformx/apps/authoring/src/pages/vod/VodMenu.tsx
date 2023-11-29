import CodeIcon from '@mui/icons-material/Code';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Slide } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { ErrorTooltip } from '../../components/Common/ErrorTooltip';
import EmbedDialog from '../../components/Embed/embedPostModal';
import PlateformXDialog from '../../components/Modal';
import PlateformXSocialDialog from '../../components/SocialShareModal/socialShareModal';
import useAccess from '../../hooks/usePermissions/useAccess';
import useVod from '../../hooks/useVod/useVod';
import { Store } from '../../store/ContextStore';
import { authInfo } from '../../utils/authConstants';
import Gallery from '../Gallery/Gallery';
import DuplicateContentPopup from '../articles/DuplicateContentPopup';
import VodSettings from './VodSetting/VodSetting';
import { previewVod } from './store/Actions';
import { useStyles } from './vodListing/vodListing.styles';
import { MenuActions } from './vodListing/vodListing.types';

export const VodMenu = (props) => {
  const {
    anchorEl,
    open,
    handleClose,
    listItemDetails,
    category,
    subCategory,
  } = props;

  const { canAccessAction } = useAccess();
  const classes = useStyles();
  const { dispatch } = useContext(Store);
  const {
    deleteVod,
    unPublish,
    onCopy,
    handleOpenVod,
    fetchContentDetails,
    duplicate,
  } = useVod();

  const [vodSettingsPanelState, setVodSettingsPanelState] =
    useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });

  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [galleryType, setGalleryType] = useState<string>('Images');

  const [, setSelectedVideo] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [, setIsImageOrVideoDeletePopup] = useState(false);
  const [confirmImageOrVideoDelete, setConfirmImageOrVideoDelete] =
    useState<boolean>(false);
  const [arr, setArr] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);
  const [selectedVod, setSelectedVod] = useState<any>();
  const [language, setLanguage] = useState<string[]>([]);
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);

  const [menuActions, setMenuActions] = useState({
    duplicate: false,
    delete: false,
    embed: false,
    socialShare: false,
    unpublish: false,
  });
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [existLangContent, setLangContent] = useState('');

  const pageExistPopup = {
    saveAsDraftTitle: `${t('vod')} ${t('duplicate_exists')} ${t(
      'for'
    )} ${existLangContent.substring(0, existLangContent.length - 1)}`,
  };

  const onClose = () => {
    setMenuActions({
      duplicate: false,
      delete: false,
      embed: false,
      socialShare: false,
      unpublish: false,
    });
  };

  const createVod = (IsDuplicate = false, title = '', isCalled = false) => {
    duplicate({
      IsDuplicate,
      title,
      language,
      listItemDetails,
      isCalled,
      arr,
      setArr,
      setOpenPageExistModal,
      setLangContent,
    });
    onClose();
  };

  const handlePublishedPageView = async (vodPayload) => {
    const { page_state, currentPageUrl } = vodPayload;
    if (page_state === 'published') {
      window.open(
        `${authInfo.publishUri + i18n.language}/` + `video${currentPageUrl}`
      );
    } else if (page_state === 'draft' || page_state === 'unpublished') {
      const vodData = await fetchContentDetails(listItemDetails);
      dispatch(previewVod(vodData));
      navigate('/vod-preview');
    }
  };

  const getSelectedVod = async () => {
    const vodData = await fetchContentDetails(listItemDetails);
    setSelectedVod(vodData);
  };

  const deleteConfirmButtonHandle = async () => {
    if (listItemDetails && Object.keys(listItemDetails).length > 0) {
      if (listItemDetails?.page_state == 'publish') {
        await unPublish(listItemDetails, true);
      } else {
        await deleteVod(listItemDetails);
      }
      onClose();
    }
  };

  const pageExistNoButtonHandle = () => {
    setOpenPageExistModal(false);
  };
  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    createVod(true, '', true);
  };
  const pageExistCrossButtonHandle = () => {
    setOpenPageExistModal(false);
  };

  const unpublishConfirmButtonHandle = async () => {
    await unPublish(listItemDetails);
    onClose();
  };

  const getDuplicateTitle = () => {
    const newVal = `${t('copy_of')} ${listItemDetails.title}`.trim();
    const duplicateVodTitle =
      newVal.length > 100 ? newVal.slice(0, 100) : newVal;
    return duplicateVodTitle.trim();
  };

  const handleImageOrVedioDelete = (type) => {
    setGalleryType(type);
    setIsImageOrVideoDeletePopup(true);
    setConfirmImageOrVideoDelete(false);
  };

  const toggleGallerySettings = (toggleState, type) => {
    setSelectedImage({ Title: '', Description: '', Thumbnail: '' });
    setGalleryState(toggleState);
    setGalleryType(type);
  };

  const closeVodSettingsPanel = () => {
    setVodSettingsPanelState(false);
  };

  const setImageOrVideoToDefault = () => {
    setSelectedImage({
      Title: '',
      Thumbnail: '',
      Description: '',
    });
    setSelectedVideo({
      Title: '',
      Thumbnail: '',
      Description: '',
    });
  };

  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
    if (type == 'cancel') {
      setImageOrVideoToDefault();
    }
  };

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
  };

  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
  };

  const onHandleMenuActions = (action) => {
    switch (action) {
      case MenuActions.EDIT:
        handleOpenVod(listItemDetails);
        break;
      case MenuActions.DELETE:
        setMenuActions({ ...menuActions, delete: true });
        break;
      case MenuActions.DUPLICATE:
        setMenuActions({ ...menuActions, duplicate: true });
        break;
      case MenuActions.SOCIAL_SHARE:
        getSelectedVod();
        setMenuActions({ ...menuActions, socialShare: true });
        break;
      case MenuActions.EMBED:
        getSelectedVod();
        setMenuActions({ ...menuActions, embed: true });
        break;
      case MenuActions.UNPUBLISH:
        setMenuActions({ ...menuActions, unpublish: true });
        break;
      case MenuActions.VIEW_PREVIEW:
        handlePublishedPageView(listItemDetails);
        break;
      case MenuActions.COPY_URL:
        onCopy(listItemDetails.current_page_url);
        break;
      case MenuActions.SETTINGS:
        getSelectedVod();
        setVodSettingsPanelState(true);
        break;
    }
  };

  return (
    <>
      {menuActions.delete && (
        <PlateformXDialog
          isDialogOpen={menuActions.delete}
          title={`${t('delete')} ${t('vod')}?`}
          subTitle={t('delete_confirm')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={onClose}
          confirmButtonHandle={deleteConfirmButtonHandle}
        />
      )}
      {menuActions.embed && (
        <EmbedDialog
          isDialogOpen={menuActions.embed}
          closeEmbedButtonHandle={onClose}
          setSelectedItem={selectedVod}
          contentType='video'
        />
      )}
      {menuActions.socialShare && (
        <PlateformXSocialDialog
          isDialogOpen={menuActions.socialShare}
          closeButtonHandle={onClose}
          setSelectedItem={selectedVod}
          contentType='video'
        />
      )}
      {menuActions.duplicate && (
        <DuplicateContentPopup
          titledata={`${getDuplicateTitle()}`}
          isDialogOpen={menuActions.duplicate}
          closeButtonHandle={onClose}
          doneButtonHandle={createVod}
          contentType={t('vod')}
          language={language}
          setLanguage={setLanguage}
        />
      )}
      {openPageExistModal && (
        <PlateformXDialog
          isDialogOpen={openPageExistModal}
          title={pageExistPopup.saveAsDraftTitle}
          subTitle={t('conformation')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={pageExistNoButtonHandle}
          confirmButtonHandle={pageExistYesButtonHandle}
          crossButtonHandle={pageExistCrossButtonHandle}
          modalType=''
        />
      )}
      {menuActions.unpublish && (
        <PlateformXDialog
          isDialogOpen={menuActions.unpublish}
          title={`${t('unpublish')} ${t('vod')}?`}
          subTitle={`${t('unpublish_confirm')} ${t('vod')}?`}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={onClose}
          confirmButtonHandle={unpublishConfirmButtonHandle}
        />
      )}

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          '.Platform-x-Menu-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '7px',
            marginTop: '5px',
          },
          '.Platform-x-Menu-list': {
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
            border: 'solid 1px rgba(112, 112, 112, 0.1)',
          },
          '.Platform-x-MenuItem-root': {
            '.Platform-x-SvgIcon-root': {
              fontSize: 20,
              marginRight: '10px',
            },
            paddingLeft: '18px',
            fontSize: '16px',
            zIndex: 999,
          },
          textTransform: 'capitalize',
        }}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
            onHandleMenuActions('view_preview');
          }}
        >
          <VisibilityIcon />{' '}
          {listItemDetails.page_state == 'published' ? t('view') : t('preview')}
        </MenuItem>
        {listItemDetails.page_state == 'draft' &&
          listItemDetails.lastPublishedDate && (
            <MenuItem
              disableRipple
              onClick={() => {
                handleClose();
                handlePublishedPageView({
                  page_state: 'published',
                  currentPageUrl: listItemDetails.currentPageUrl,
                });
              }}
            >
              <VisibilityIcon /> {t('view')}
            </MenuItem>
          )}
        <ErrorTooltip
          component={
            <MenuItem
              style={{
                cursor:
                  listItemDetails.page_state === 'pending'
                    ? 'not-allowed'
                    : 'pointer',
              }}
              disableRipple
              disabled={!canAccessAction(category, subCategory, 'Update')}
              onClick={() => {
                onHandleMenuActions('edit');
              }}
            >
              <EditIcon /> {t('edit')}
            </MenuItem>
          }
          doAccess={!canAccessAction(category, subCategory, 'Update')}
        />
        <ErrorTooltip
          component={
            <MenuItem
              disableRipple
              disabled={!canAccessAction(category, subCategory, 'duplicate')}
              onClick={() => {
                handleClose();
                onHandleMenuActions('duplicate');
              }}
            >
              <ContentCopyRoundedIcon /> {t('duplicate')}
            </MenuItem>
          }
          doAccess={!canAccessAction(category, subCategory, 'duplicate')}
        />
        {listItemDetails.page_state == 'published' ||
        (listItemDetails.page_state == 'draft' &&
          listItemDetails.lastPublishedDate) ? (
          <MenuItem
            disableRipple
            onClick={() => {
              handleClose();
              onHandleMenuActions('copy_url');
            }}
          >
            <LinkRoundedIcon sx={{ transform: 'rotate(-45deg)' }} />{' '}
            {t('copy_url')}
          </MenuItem>
        ) : null}
        <MenuItem
          disableRipple
          onClick={() => {
            handleClose();
            onHandleMenuActions('settings');
          }}
        >
          <SettingsIcon /> {t('settings')}
        </MenuItem>
        {listItemDetails.page_state == 'published' ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={!canAccessAction(category, subCategory, 'unpublish')}
                onClick={() => {
                  handleClose();
                  onHandleMenuActions('unpublish');
                }}
              >
                <VisibilityOffIcon /> {t('unpublish')}
              </MenuItem>
            }
            doAccess={!canAccessAction(category, subCategory, 'unpublish')}
          />
        ) : null}
        {listItemDetails.page_state == 'published' ||
        (listItemDetails.page_state == 'draft' &&
          listItemDetails.lastPublishedDate) ? (
          <MenuItem
            onClick={() => {
              handleClose();
              onHandleMenuActions('social_share');
            }}
          >
            <ShareIcon />
            {t('social_share')}
          </MenuItem>
        ) : null}
        {listItemDetails.page_state == 'published' ||
        (listItemDetails.page_state == 'draft' &&
          listItemDetails.lastPublishedDate) ? (
          <MenuItem
            onClick={() => {
              handleClose();
              onHandleMenuActions('embed');
            }}
          >
            <CodeIcon />
            {t('embed')}
          </MenuItem>
        ) : null}
        <ErrorTooltip
          component={
            <MenuItem
              disableRipple
              disabled={!canAccessAction(category, subCategory, 'delete')}
              onClick={() => {
                handleClose();
                onHandleMenuActions('delete');
              }}
            >
              <DeleteIcon /> {t('delete')}
            </MenuItem>
          }
          doAccess={!canAccessAction(category, subCategory, 'delete')}
        />
      </Menu>
      {galleryState && (
        <Box className={classes.galleryContainer}>
          <Gallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            galleryMode={galleryType}
            handleVideoSelected={handleSelectedVideo}
          />
        </Box>
      )}
      <Slide direction='left' in={vodSettingsPanelState} timeout={300}>
        <Box className={classes.settingsContainer}>
          <VodSettings
            handleDelete={handleImageOrVedioDelete}
            confirmImageOrVideoDelete={confirmImageOrVideoDelete}
            handleClose={closeVodSettingsPanel}
            toggleGallery={toggleGallerySettings}
            selectedImage={selectedImage}
            selectedVod={selectedVod}
            setSelectedVod={setSelectedVod}
            vodSettingsPanelState={vodSettingsPanelState}
          />
        </Box>
      </Slide>
    </>
  );
};
