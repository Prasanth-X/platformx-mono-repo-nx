import { Box, Grid, Tooltip, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RedBlinkingDot from '../../../assets/RedBlinkingDot.gif';
import useAccess from '../../../hooks/usePermissions/useAccess';
import { Dashboard_Keys } from '../../../pages/Dashboard/utils/constant';
import CardMenu from '../../../pages/PageList/Components/CardMenu/CardMenu';
import { CourseMenu } from '../../../pages/QuizPollEvents/Components/QuizPollEventsMenu/CourseMenu';
import { QuizPollEventMenu } from '../../../pages/QuizPollEvents/Components/QuizPollEventsMenu/QuizPollEventsMenu';
import {
  default as PlateformXDialog,
  default as PlateformXDialogDelete,
} from '../../../pages/articles/deletePopup';
import { authInfo } from '../../../utils/authConstants';
import {
  CATEGORY_CONTENT,
  CATEGORY_PAGE,
  CONTENT_TYPES,
} from '../../../utils/constants';
import { convertToLowerCase } from '../../../utils/helperFunctions';
import { iconsList, statusIcons } from '../Utils/Constants';
import { CardProps } from '../Utils/List.types';
import CardOption from './CardOption';
import CommunityOption from './CommunityOption';
import './List.css';
import { PublishInformation } from './PublishInformation';

export const Card = ({
  dataList,
  deleteContent,
  duplicate,
  preview,
  unPublish,
  view,
  edit,
  editPage,
  viewPage,
  previewPage,
  handleDuplicatePopup,
  duplicatePage,
  unPublishPage,
  handleReschedulePopup,
  reschedulePublishPage,
  rescheduleUnPublishPage,
  handleCancelTriggerPopup,
  cancelPublishUnpublishTrigger,
  handleDeleteData,
  handlePageDelete,
  fetchContentDetails,
  sitelist,
  duplicateToSite,
  contentType,
}: CardProps) => {
  const { canAccessAction } = useAccess();
  const tagName =
    dataList?.tagName?.toLowerCase() || dataList?.tags?.toLowerCase();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [subTitle, setSubTitle] = useState('');
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isDelete, setDelete] = useState(false);
  const date = new Date().toJSON();
  const handleConfirmation = async () => {
    if (tagName == 'sitepage') {
      handlePageDelete();
    } else if (
      tagName === 'quiz' ||
      tagName === 'poll' ||
      tagName === 'event' ||
      tagName === 'vod' ||
      tagName == 'article'
    ) {
      await deleteContent(dataList);
    }
    setDelete(false);
  };

  const renderConfirmation = () => {
    switch (tagName) {
      case 'sitepage':
        return (
          <PlateformXDialog
            isDialogOpen
            title={t('page_delete_title')}
            subTitle={subTitle}
            closeButtonText={t('no')}
            confirmButtonText={t('yes')}
            closeButtonHandle={() => {
              setDelete(false);
            }}
            confirmButtonHandle={handleConfirmation}
          />
        );
      case 'vod':
      case 'quiz':
      case 'poll':
      case 'event':
      case 'article':
        return (
          <PlateformXDialogDelete
            isDialogOpen
            title={t('delete_title')}
            subTitle={subTitle}
            closeButtonText={t('no_keep_it')}
            confirmButtonText={t('yes_delete_it')}
            closeButtonHandle={() => {
              setDelete(false);
            }}
            confirmButtonHandle={handleConfirmation}
          />
        );
      default:
        return;
    }
  };

  const handlePageView = async () => {
    const { page_state, current_page_url } = dataList;
    if (page_state === 'published') {
      window.open(
        `${authInfo.publishUri + i18n.language}/` + `video${current_page_url}`
      );
    } else if (page_state === 'unpublished') {
      // const vodData = await fetchContentDetails(listItemDetails);
      // dispatch(previewVod(vodData));
      navigate('/vod-preview');
    } else if (page_state === 'draft') {
      // handleOpenVod(listItemDetails);
    }
  };
  const handleCardClick = () => {
    const sitePage = {
      draft: editPage,
      published: viewPage,
      unpublished: previewPage,
    };
    const ContentAction = {
      draft: edit,
      published: view,
      unpublished: preview,
    };
    switch (tagName) {
      // case 'vod':
      //   handlePageView();
      //   break;
      case 'sitepage':
        sitePage[dataList.status](dataList);
        break;
      case 'quiz':
      case 'poll':
      case 'event':
      case 'article':
      case 'courses':
      case 'vod':
        ContentAction[dataList.status](dataList);
        break;
    }
  };

  const handleEdit = () => {
    switch (tagName) {
      // case 'vod':
      // handleOpenVod(listItemDetails);
      // break;
      case 'sitepage':
        editPage(dataList);
        break;
      case 'quiz':
      case 'vod':
      case 'poll':
      case 'event':
      case 'article':
        edit(dataList);
        break;
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDeleteButton = () => {
    switch (tagName) {
      case 'sitepage':
        setSubTitle(t('page_delete_subtitle'));
        handleDeleteData(dataList);
        break;
      case 'vod':
      case 'quiz':
      case 'poll':
      case 'event':
      case 'article':
        setSubTitle(
          `${t('delete_confirm')} ${t(tagName)}?. ${t('process_undone')}`
        );
        break;
      default:
        setSubTitle(t('page_delete_subtitle'));
    }
    setDelete(true);
  };

  const getContentCategory = () => {
    return tagName.toLowerCase() === Dashboard_Keys.SITE_PAGE.toLowerCase()
      ? CATEGORY_PAGE
      : CATEGORY_CONTENT;
  };

  const getContentSubCategory = () => {
    return tagName.toLowerCase() === Dashboard_Keys.SITE_PAGE.toLowerCase()
      ? ''
      : tagName;
  };

  return (
    <>
      {isDelete && renderConfirmation()}
      <Box className='listbox'>
        <Grid container className='d-flex align-items-center'>
          <Grid item xs={11} md={11} em={5} lg={7} xl={8} pr='20px'>
            <Box
              //  sx={{ display: 'flex', justifyContent: 'space-between' }}
              className='d-flex align-items-center'
              onClick={handleCardClick}
            >
              {/* content type icon */}
              <Box className='img'>
                <img src={iconsList[dataList.tagName]} />
              </Box>

              <Box className="rightspace">
                <Grid container>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      height: '24px',
                    }}
                  >
                    <Tooltip title={dataList.title} placement='right-end'>
                      <Typography
                        variant='h5bold'
                        sx={{
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: '1',
                          WebkitBoxOrient: 'vertical',
                          wordBreak: 'break-all',
                        }}
                      >
                        {dataList.title}
                      </Typography>
                    </Tooltip>
                    {tagName === 'event' &&
                      dataList.page_state === 'published' &&
                      date > dataList.eventStartDate &&
                      date < dataList.eventEndDate && (
                        <img
                          style={{ height: '43px', width: '43px' }}
                          src={RedBlinkingDot}
                        />
                      )}
                    <Box component='div' className='mobstatusIcon'>
                      <Typography sx={{ marginLeft: '10px' }}>
                        <img src={statusIcons[dataList.status]} />
                      </Typography>
                      <Typography sx={{ marginLeft: '10px' }}>
                        {dataList.scheduledPublishTriggerDateTime &&
                          tagName == 'sitepage' && (
                            <img src={statusIcons['schedulePublish']} />
                          )}
                      </Typography>
                      <Typography sx={{ marginLeft: '10px' }}>
                        {dataList.scheduledUnPublishTriggerDateTime &&
                          tagName == 'sitepage' && (
                            <img src={statusIcons['scheduleUnpublish']} />
                          )}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    flexWrap: { xs: 'wrap', em: 'inherit' },
                    display: { xs: 'none', em: 'flex' },
                  }}
                >
                  <Typography
                    variant='h7regular'
                    sx={{
                      color: '#89909a',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: '1',
                      WebkitBoxOrient: 'vertical',
                      wordBreak: 'break-all',
                      order: { xs: 2, em: 1 },
                    }}
                  >
                    {dataList.description}
                  </Typography>
                </Box>
                <Box className='datetimemob'>
                  <Typography variant='h7regular' component='div'>
                    {dataList.lastModifiedBy}
                  </Typography>
                  <Typography variant='h7regular' component='div'>
                    {dataList.lastModifiedDate &&
                      format(
                        new Date(dataList.lastModifiedDate),
                        'MMM d, yyyy | hh:mm a'
                      )}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} md={1} em={7} lg={5} xl={4}>
            <Box className='d-flex align-items-center justify-content-end'>
              {/* publish icon */}
              <PublishInformation
                tagName={tagName}
                dataList={dataList}
                contentType={contentType}
                handleCardClick={handleCardClick}
              />

              {convertToLowerCase(contentType) === 'community' ? (
                <>
                  <CommunityOption dataList={dataList} />
                </>
              ) : (
                <>
                  <CardOption
                    tagName={tagName}
                    dataList={dataList}
                    handleEdit={handleEdit}
                    handleClick={handleClick}
                    canAccessAction={canAccessAction}
                    handleDeleteButton={handleDeleteButton}
                    getContentCategory={getContentCategory}
                    getContentSubCategory={getContentSubCategory}
                  />
                </>
              )}
              {/* card option */}

              {tagName === 'sitepage' && (
                <CardMenu
                  listItemDetails={dataList}
                  open={open}
                  anchorEl={anchorEl}
                  handleMenuClose={() => {
                    setAnchorEl(null);
                  }}
                  category={CATEGORY_PAGE}
                  subCategory=''
                  editPage={editPage}
                  viewPage={viewPage}
                  previewPage={previewPage}
                  handleDuplicatePopup={handleDuplicatePopup}
                  duplicatePage={duplicatePage}
                  unPublishPage={unPublishPage}
                  handleReschedulePopup={handleReschedulePopup}
                  reschedulePublishPage={reschedulePublishPage}
                  rescheduleUnPublishPage={rescheduleUnPublishPage}
                  handleCancelTriggerPopup={handleCancelTriggerPopup}
                  cancelPublishUnpublishTrigger={cancelPublishUnpublishTrigger}
                  handleDeleteData={handleDeleteData}
                  handlePageDelete={handlePageDelete}
                ></CardMenu>
              )}

              {(tagName === 'quiz' ||
                tagName === 'poll' ||
                tagName === 'event' ||
                tagName === 'vod' ||
                tagName === 'article') && (
                <QuizPollEventMenu
                  deleteContent={deleteContent}
                  duplicate={duplicate}
                  preview={preview}
                  unPublish={unPublish}
                  view={view}
                  edit={edit}
                  anchorEl={anchorEl}
                  open={open}
                  handleClose={() => {
                    setAnchorEl(null);
                  }}
                  contentType={tagName}
                  listItemDetails={dataList}
                  category={CATEGORY_CONTENT}
                  subCategory={CONTENT_TYPES}
                  fetchContentDetails={fetchContentDetails}
                  sitelist={sitelist}
                  duplicateToSite={duplicateToSite}
                />
              )}
              {tagName === 'courses' && (
                <CourseMenu
                  deleteContent={deleteContent}
                  duplicate={duplicate}
                  preview={preview}
                  unPublish={unPublish}
                  view={view}
                  edit={edit}
                  anchorEl={anchorEl}
                  open={open}
                  handleClose={() => {
                    setAnchorEl(null);
                  }}
                  contentType={tagName}
                  listItemDetails={dataList}
                  category={CATEGORY_CONTENT}
                  subCategory={CONTENT_TYPES}
                  fetchContentDetails={fetchContentDetails}
                />
              )}
              {/* {tagName === 'vod' && (
                <VodMenu
                  anchorEl={anchorEl}
                  open={open}
                  handleClose={() => {
                    setAnchorEl(null);
                  }}
                  listItemDetails={dataList}
                  category={CATEGORY_CONTENT}
                  subCategory={CONTENT_TYPES}
                />
              )} */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};