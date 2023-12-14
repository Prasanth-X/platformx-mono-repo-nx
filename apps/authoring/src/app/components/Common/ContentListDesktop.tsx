import { useLazyQuery } from '@apollo/client';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SettingsIcon from '@mui/icons-material/Settings';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RedBlinkingDot from '../../assets/RedBlinkingDot.gif';
import Constants from '../../components/Common/Constants/Constants';
import useAccess from '../../hooks/usePermissions/useAccess';
import { fetchContentByPath } from '../../services/contentTypes/contentTypes.api';
import { Store } from '../../store/ContextStore';
import { Category, ContentAction } from '../../utils/Enums/ContentType';
import { dateFormat, handleHtmlTags } from '../../utils/helperFunctions';
import { previewContent } from '../Common/contentTypes/store/ContentAction';
import PageStatus from '../contentList/pageStatus';
import { showToastError } from '../toastNotification/toastNotificationReactTostify';
import { ErrorTooltip } from './ErrorTooltip';

const ContentListDesktop = ({
  listItem,
  index,
  setSelectedItem,
  handleUnpublish,
  handleDelete,
  handleCopy,
  handleDuplicate,
  handlePublishedPageView,
  openItemSettingsPanel,
  handleSocialShare,
  handleEmbed,
  contentType,
}) => {
  const { t } = useTranslation();
  const { dispatch } = useContext(Store);
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const openListMenu = Boolean(listMenu);
  const navigate = useNavigate();
  const [runFetchContentByPath] = useLazyQuery(fetchContentByPath);
  const { canAccessAction } = useAccess();

  const handleListClick = (
    event: React.MouseEvent<HTMLElement>,
    selectedContent
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (selectedContent?.page) {
      setListMenu(event.currentTarget);
      runFetchContentByPath({
        variables: { contentType: contentType, path: selectedContent?.page },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsContentByPath !== null) {
            const contentObj = res?.data?.authoring_getCmsContentByPath;
            if (contentObj?.title !== '') {
              setSelectedItem(contentObj);
            } else {
              setSelectedItem({});
              showToastError(t(Constants.API_ERROR_MESSAGE));
            }
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    }
  };

  const handleListClose = () => {
    setListMenu(null);
  };
  const handleStartBlog = (path) => {
    navigate(`/content/create-blog?path=${path}`);
  };
  const handleEditContentType = (path) => {
    navigate(`/content/create-${contentType?.toLowerCase()}?path=${path}`);
  };

  const handleUnPublishedPagePreView = (
    contentPayload: any,
    contentObj: any
  ) => {
    if (contentPayload?.page_state?.toLowerCase() == 'unpublished') {
      const qusArry = [];
      if (contentObj?.questions?.length && contentType === 'Quiz') {
        contentObj?.questions?.map((qus) => {
          runFetchContentByPath({
            variables: { contentType: 'Question', path: qus },
          })
            .then((res) => {
              if (res?.data?.authoring_getCmsContentByPath) {
                const qusObj = res?.data
                  ?.authoring_getCmsContentByPath as never;
                qusArry.push(qusObj);
              }
            })
            .catch((err) => {
              console.log(JSON.stringify(err, null, 2));
            });
        });
        const tempObj = { ...contentObj, questions: qusArry, contentType };
        dispatch(previewContent(tempObj));
        navigate('/content-preview');
      } else if (contentType === 'Poll') {
        dispatch(previewContent({ ...contentObj, contentType }));
        navigate('/content-preview');
      } else if (contentType === 'Event') {
        const eventtoPreview = {
          ...contentObj,
          settings: contentObj?.settingsProperties,
          PageTags: contentObj?.tags,
          lastModifiedDate: contentObj?.modificationDate,
          last_modification_date: contentObj?.modificationDate,
          AnalyticsEnable: contentObj?.analytics_enable,
        };
        dispatch(previewContent({ ...eventtoPreview, contentType }));
        navigate('/content-preview');
      } else {
        showToastError(t('preview_toast'));
      }
    }
  };

  const checkClickNavigation = (event, selectedContent: any) => {
    const pageState = selectedContent?.page_state;
    if (pageState === 'unpublished') {
      if (selectedContent?.page) {
        runFetchContentByPath({
          variables: { contentType: contentType, path: selectedContent?.page },
        })
          .then((res) => {
            if (res?.data?.authoring_getCmsContentByPath !== null) {
              const contentObj = res?.data?.authoring_getCmsContentByPath;
              if (contentObj?.title !== '') {
                handleUnPublishedPagePreView(listItem, contentObj);
              } else {
                showToastError(t(Constants.API_ERROR_MESSAGE));
              }
            }
          })
          .catch((err) => {
            console.log(JSON.stringify(err, null, 2));
          });
      }
    }
    if (pageState === 'published') {
      handlePublishedPageView(listItem);
    }
    if (pageState === 'draft') {
      handleEditContentType(listItem?.page);
    }
  };

  //=========== For date =========//

  const date = new Date().toJSON();

  /*const startDate = '2023-02-10T04:27:59.797Z';
  const endDate = '2023-04-10T07:27:59.797Z';*/

  //============ For date =========//

  return (
    <Box>
      <Grid
        key={index}
        container
        sx={{
          background: '#ffffff',
          height: '60px',
          alignItems: 'center',
          padding: '0 25px',
          marginBottom: '10px',
          borderRadius: '0px',
          cursor: 'pointer',
          borderBottom: '1px solid #e6eaed',
        }}
        onClick={(event) => checkClickNavigation(event, listItem)}
      >
        <Grid
          item
          xs={2.2}
          sx={{ display: 'flex', alignItems: 'center', marginRight: '25px' }}
        >
          <Typography
            variant='h6regular'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-all',
              fontWeight: '500',
              color: '#2d2d39',
            }}
          >
            {listItem.title}
          </Typography>
          {contentType === 'Event' &&
          listItem.page_state === 'published' &&
          date > listItem.event_start_date &&
          date < listItem.event_end_date ? (
            <img
              style={{ height: '43px', width: '43px' }}
              src={RedBlinkingDot}
            />
          ) : null}
        </Grid>
        <Grid item xs={2.3} sx={{ marginRight: '2.8%' }}>
          <Typography
            variant='h6regular'
            sx={{
              color: '#2d2d39',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-all',
            }}
          >
            {contentType === 'Article'
              ? handleHtmlTags(listItem.description)
              : listItem.description}
          </Typography>
        </Grid>
        <Grid item xs={1} sx={{ marginRight: '3.2%' }}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '1',
              WebkitBoxOrient: 'vertical',
              textTransform: 'capitalize',
              wordBreak: 'break-all',
              color: '#2d2d39',
            }}
            variant='h6regular'
          >
            {listItem.author}
          </Typography>
        </Grid>
        <Grid item xs={2.6} sx={{ marginRight: '3%' }}>
          <Typography
            variant='h6regular'
            sx={{ textTransform: 'capitalize', color: '#2d2d39' }}
          >
            {dateFormat(listItem.modification_date)}
          </Typography>
        </Grid>
        <Grid item xs={1.4} sx={{ marginRight: '3.1%', display: 'flex' }}>
          {/* <Typography variant="h6regular" sx={{ textTransform: 'capitalize' }}>
            {listItem.Status}
          </Typography> */}

          <PageStatus pageType={listItem?.page_state}></PageStatus>
        </Grid>
        <Grid item xs={0.5}>
          <Box
            id={String(index)}
            onClick={(event) => handleListClick(event, listItem)}
            sx={{
              margin: '10px',
            }}
          >
            <MoreHorizIcon
              sx={{
                verticalAlign: 'middle',
                transition: 'transform 0.2s',
                // transform: 'rotate(90deg)',
                cursor: 'pointer',
              }}
            />
          </Box>
        </Grid>
      </Grid>
      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={listMenu}
        open={openListMenu}
        onClose={handleListClose}
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
        {/* {contentType === 'Event' &&
        (listItem.page_state === 'published' ||
          (listItem.page_state === 'draft' && listItem?.is_published)) ? (
          <MenuItem
            disableRipple
            onClick={() => {
              handleListClose();
              handleStartBlog(listItem?.page);
            }}
          >
            <img src={EditNote} alt='N/A' style={{ marginRight: '6px' }} />{' '}
            {t('write_a_blog')}
          </MenuItem>
        ) : null} */}
        {listItem.page_state === 'published' ||
        (listItem.page_state === 'draft' && listItem.is_published) ? (
          <MenuItem
            disableRipple
            onClick={() => {
              handleListClose();
              handlePublishedPageView(listItem, true);
            }}
            // disabled={listItem.page_state == 'published' ? false : true}
          >
            <VisibilityIcon />
            {t('view')}
          </MenuItem>
        ) : null}
        {listItem.page_state === 'draft' ||
        listItem.page_state === 'unpublished' ? (
          <MenuItem
            disableRipple
            onClick={() => {
              handleListClose();
              handlePublishedPageView(listItem, false);
            }}
          >
            <VisibilityIcon /> {t('preview')}
          </MenuItem>
        ) : null}
        <ErrorTooltip
          component={
            <MenuItem
              disableRipple
              disabled={
                !canAccessAction(
                  Category.Content,
                  contentType,
                  ContentAction.Update
                )
              }
              onClick={() => handleEditContentType(listItem.page)}
            >
              <EditIcon /> {t('edit')}
            </MenuItem>
          }
          doAccess={
            !canAccessAction(
              Category.Content,
              contentType,
              ContentAction.Update
            )
          }
        />
        <ErrorTooltip
          component={
            <MenuItem
              disableRipple
              disabled={
                !canAccessAction(
                  Category.Content,
                  contentType,
                  ContentAction.Update
                )
              }
              onClick={() => {
                handleListClose();
                handleDuplicate(listItem.page);
              }}
            >
              <ContentCopyRoundedIcon /> {t('duplicate')}
            </MenuItem>
          }
          doAccess={
            !canAccessAction(
              Category.Content,
              contentType,
              ContentAction.Update
            )
          }
        />

        {listItem.page_state === 'published' ||
        (listItem.page_state === 'draft' && listItem?.is_published) ? (
          <MenuItem
            disableRipple
            onClick={() => {
              handleListClose();
              handleCopy(listItem?.current_page_url);
            }}
          >
            <LinkRoundedIcon sx={{ transform: 'rotate(-45deg)' }} />{' '}
            {t('copy_url')}
          </MenuItem>
        ) : null}

        <MenuItem
          disableRipple
          onClick={() => {
            handleListClose();
            openItemSettingsPanel(listItem?.page);
          }}
        >
          <SettingsIcon /> {t('settings')}
        </MenuItem>
        {listItem.page_state === 'published' ? (
          <ErrorTooltip
            component={
              <MenuItem
                disableRipple
                disabled={
                  !canAccessAction(
                    Category.Content,
                    contentType,
                    ContentAction.UnPublish
                  )
                }
                onClick={() => {
                  handleListClose();
                  handleUnpublish();
                }}
              >
                <VisibilityOffIcon /> {t('unpublish')}
              </MenuItem>
            }
            doAccess={
              !canAccessAction(
                Category.Content,
                contentType,
                ContentAction.UnPublish
              )
            }
          />
        ) : null}
        {/* <MenuItem
          disableRipple
          onClick={() => {
            handleListClose();
            handleUnpublish();
          }}
        >
           Unpublish
        </MenuItem> */}

        <ErrorTooltip
          component={
            <MenuItem
              disableRipple
              disabled={
                !canAccessAction(
                  Category.Content,
                  contentType,
                  ContentAction.Delete
                )
              }
              onClick={() => {
                handleListClose();
                handleDelete();
              }}
            >
              <DeleteIcon /> {t('delete')}
            </MenuItem>
          }
          doAccess={
            !canAccessAction(
              Category.Content,
              contentType,
              ContentAction.Delete
            )
          }
        />

        {listItem.page_state === 'published' ||
        (listItem.page_state === 'draft' && listItem?.is_published) ? (
          <MenuItem
            disableRipple
            onClick={() => {
              handleListClose();
              handleSocialShare();
            }}
          >
            <ShareIcon /> {t('social_share')}
          </MenuItem>
        ) : null}
        {listItem.page_state === 'published' ||
        (listItem.page_state === 'draft' && listItem?.is_published) ? (
          <MenuItem
            disableRipple
            onClick={() => {
              handleListClose();
              handleEmbed();
            }}
          >
            <CodeIcon /> {t('embed')}
          </MenuItem>
        ) : null}
      </Menu>
    </Box>
  );
};

export default ContentListDesktop;
