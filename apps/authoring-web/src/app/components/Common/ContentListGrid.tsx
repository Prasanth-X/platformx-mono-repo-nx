import { useLazyQuery } from '@apollo/client';
import CodeIcon from '@mui/icons-material/Code';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkRoundedIcon from '@mui/icons-material/LinkRounded';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ShareIcon from '@mui/icons-material/Share';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Box, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RedBlinkingDot from '../../assets/RedBlinkingDot.gif';
import placeholder from '../../assets/placeholder.png';
import Constants from '../../components/Common/Constants/Constants';
import useAccess from '../../hooks/usePermissions/useAccess';
import { fetchContentByPath } from '../../services/contentTypes/contentTypes.api';
import { Store } from '../../store/ContextStore';
import { Category, ContentAction } from '../../utils/Enums/ContentType';
import { dateFormat } from '../../utils/helperFunctions';
import { previewContent } from '../Common/contentTypes/store/ContentAction';
import PageStatus from '../contentList/pageStatus';
import { showToastError } from '../toastNotification/toastNotificationReactTostify';
import { ErrorTooltip } from './ErrorTooltip';

export const ContentListGrid = ({
  listItem,
  index,
  setSelectedItem,
  handleDelete,
  handleCopy,
  handleDuplicate,
  handleUnpublish,
  handlePublishedPageView,
  openItemSettingsPanel,
  contentType,
  handleSocialShare,
  handleEmbed,
  icon,
}) => {
  const { t } = useTranslation();
  const { canAccessAction } = useAccess();
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const { dispatch } = useContext(Store);
  const openListMenu = Boolean(listMenu);
  const navigate = useNavigate();
  const [runFetchContentByPath] = useLazyQuery(fetchContentByPath);
  const handleListClick = (
    event: React.MouseEvent<HTMLElement>,
    selectedContent
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (selectedContent?.page) {
      setListMenu(event.currentTarget);
      runFetchContentByPath({
        variables: { contentType: contentType, path: selectedContent?.page },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsContentByPath) {
            const contentObj = res?.data?.authoring_getCmsContentByPath;
            setSelectedItem(contentObj);
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
    if (!listMenu) {
      //null means option not open nill navigate
      const pageState = listItem?.page_state;
      if (pageState === 'unpublished') {
        if (selectedContent?.page) {
          runFetchContentByPath({
            variables: {
              contentType: contentType,
              path: selectedContent?.page,
            },
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
    }
  };
  //=========== For date =========//

  const date = new Date().toJSON();
  console.log(date);

  //const startDate = '2023-02-10T04:27:59.797Z';
  //const endDate = '2023-04-10T07:27:59.797Z';

  //============ For date =========//
  return (
    <Box
      sx={{
        width: {
          xs: 'calc(100%/2 - 20px)',
          sm: 'calc(100%/3 - 20px)',
          lg: 'calc(100%/4 - 20px)',
          xl: 'calc(100%/5 - 20px)',
        },
        margin: '10px',
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
        onClick={(event) => checkClickNavigation(event, listItem)}
      >
        <Box
          sx={{
            // height: { xs: '200px', md: '240px' }
            height: 'auto',
            aspectRatio: '1/1',
          }}
        >
          <img
            src={
              listItem?.background_content?.Url != ''
                ? listItem?.background_content?.Url
                : placeholder
            }
            alt=''
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '4px',
              display: 'block',
              pointerEvents: 'all',
              objectFit: 'cover',
            }}
          />
        </Box>
        <Box
          id='text'
          sx={{
            borderRadius: '4px',
            position: 'absolute',
            top: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            flexDirection: 'column',
            padding: { xs: '12px 10px 10px', md: '10px' },
            cursor: 'pointer',
          }}
        >
          <Box
            id={String(index)}
            onClick={(event) => handleListClick(event, listItem)}
            sx={{
              margin: '10px',
              zIndex: 999,
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <MoreHorizIcon
              sx={{
                verticalAlign: 'middle',
                transition: 'transform 0.2s',
                color: '#fff',
                transform: 'rotate(90deg)',
                cursor: 'pointer',
              }}
            />
          </Box>
          <Box
            sx={{
              margin: '10px',
              zIndex: 1,
              position: 'absolute',
              top: '-10px',
              left: 0,
            }}
          >
            <PageStatus
              pageType={listItem?.page_state.toLowerCase()}
              gridView
            />
          </Box>

          <Typography
            sx={{
              color: '#fff',
              paddingBottom: '2px',
              textTransform: 'capitalize',
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid #fff',
              marginBottom: '2px',
              maxWidth: '70px',
            }}
            variant='h7medium'
          >
            {icon}
            {t(contentType?.toLowerCase())}
            {contentType === 'Event' &&
            listItem.page_state === 'published' &&
            date > listItem.event_start_date &&
            date < listItem.event_end_date ? (
              <img
                src={RedBlinkingDot}
                style={{ height: '43px', width: '43px', marginLeft: '4px' }}
              />
            ) : null}
          </Typography>
          <Typography
            sx={{
              color: '#fff',
              textTransform: 'capitalize',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              wordBreak: 'break-all',
            }}
            variant='h6medium'
          >
            {listItem.title}
          </Typography>

          {/* <Box sx={{ display: { xs: 'none', md: 'block' } }}> */}
          <Box>
            <Typography
              sx={{
                color: '#ced3d9',
                paddingBottom: '0',
                textTransform: 'capitalize',
                // fontWeight: 500,

                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '1',
                WebkitBoxOrient: 'vertical',
              }}
              variant='h7regular'
            >
              {listItem.author}
            </Typography>
            <Typography
              sx={{
                color: '#ced3d9',
                paddingBottom: '0',
                textTransform: 'capitalize',
              }}
              variant='h7regular'
            >
              {dateFormat(listItem.modificationDate)}
            </Typography>
          </Box>
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
                padding: '15px 0',
              },
              '.Platform-x-MenuItem-root': {
                '.Platform-x-SvgIcon-root': {
                  fontSize: 20,
                  marginRight: '10px',
                },
                paddingLeft: '18px',
                fontSize: '14px',
                zIndex: 999,
              },
            }}
          >
            {/* {contentType === 'Event' &&
            (listItem?.page_state === 'published' ||
              (listItem?.page_state === 'draft' && listItem?.is_published)) ? (
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

            <MenuItem
              disableRipple
              onClick={() => {
                handleListClose();
                handlePublishedPageView(listItem, false);
              }}
            >
              <VisibilityIcon />
              {listItem.page_state === 'published' ? 'View' : 'Preview'}
            </MenuItem>

            {listItem.page_state === 'draft' && listItem.is_published ? (
              <MenuItem
                disableRipple
                onClick={() => {
                  handleListClose();
                  handlePublishedPageView(listItem, true);
                }}
              >
                <VisibilityIcon />
                {t('view')}
              </MenuItem>
            ) : null}
            {/* {listItem.page_state == "draft" && listItem.published_date ? (
               <MenuItem
                 disableRipple
                 onClick={() => {
                   handleListClose();
                   handlePublishedPageView({
                     page_state: "published",
                     CurrentPageURL: listItem.current_page_url,
                   });
                 }}
               >
                 <VisibilityIcon /> View
               </MenuItem>
             ) : null} */}

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
            (listItem.page_state === 'draft' && listItem.is_published) ? (
              <MenuItem
                disableRipple
                onClick={() => {
                  handleListClose();
                  handleCopy(listItem?.current_page_url);
                }}
              >
                <LinkRoundedIcon /> {t('copy_url')}
              </MenuItem>
            ) : null}

            {/* <MenuItem
              disableRipple
              onClick={() => {
                handleListClose();
                openItemSettingsPanel();
              }}
            >
              <SettingsIcon /> Settings
            </MenuItem> */}
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
            (listItem.page_state === 'draft' && listItem.is_published) ? (
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
            (listItem.page_state === 'draft' && listItem.is_published) ? (
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
      </Box>
    </Box>
  );
};
