import { useLazyQuery } from '@apollo/client';
import { Box, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import RedBlinkingDot from '../../assets/RedBlinkingDot.gif';
import Constants from '../../components/Common/Constants/Constants';
import PageStatus from '../../pages/page-list-view/pageStatus';
import { fetchContentByPath } from '../../services/contentTypes/contentTypes.api';
import { Store } from '../../store/ContextStore';
import { dateFormat } from '../../utils/helperFunctions';
import { previewContent } from '../Common/contentTypes/store/ContentAction';
import { showToastError } from '../toastNotification/toastNotificationReactTostify';
import ContentMoreDialog from './ContentMoreDialog';

export const ContentListMobile = ({
  listItem,
  handleChange,
  openItemSettingsPanel,
  handleUnpublish,
  handleDelete,
  handleCopy,
  handleDuplicate,
  setSelectedItem,
  handlePublishedPageView,
  contentType,
  handleSocialShare,
  handleEmbed,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dispatch } = useContext(Store);
  const [runFetchContentByPath] = useLazyQuery(fetchContentByPath);
  // const handleSocialShare = () => { };
  const handleEditContentType = (path) => {
    // const pageState = listItem?.page_state;
    // if (pageState == "pending"){
    //   return
    // }
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
    const pageState = listItem?.page_state;
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
  const handleListClick = (
    event: React.MouseEvent<HTMLElement>,
    selectedContent
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (selectedContent?.page) {
      runFetchContentByPath({
        variables: { contentType: contentType, path: selectedContent?.page },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsContentByPath) {
            const contentObj = res?.data?.authoring_getCmsContentByPath;
            if (contentObj?.title !== '') {
              setSelectedItem(contentObj);
            } else {
              setSelectedItem({});
              showToastError(t('please_try_again'));
            }
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    }
  };

  //=========== For date =========//
  const date = new Date().toJSON();

  // const startDate = '2023-02-10T04:27:59.797Z';
  //const endDate = '2023-04-10T07:27:59.797Z';
  //============ For date =========//

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '0px',
          borderBottom: '1px solid #e6eaed',
          padding: '10px 0',
          marginTop: '10px',
        }}
        //
      >
        <Box
          sx={{ paddingLeft: '14px', width: '85%', cursor: 'pointer' }}
          onClick={(event) => checkClickNavigation(event, listItem)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 600,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                maxWidth: {
                  xs: '100%',
                },
              }}
            >
              {listItem?.title}
            </Typography>
            {contentType === 'Event' &&
            listItem.page_state === 'published' &&
            date > listItem.event_start_date &&
            date < listItem.event_end_date ? (
              <img src={RedBlinkingDot} />
            ) : null}
            <PageStatus pageType={listItem?.page_state}></PageStatus>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', color: '#89909a' }}>
            <Typography sx={{ fontSize: '12px', textTransform: 'capitalize' }}>
              By {listItem?.author}
            </Typography>
            <span style={{ margin: '0 2px', fontSize: '12px' }}>|</span>
            <Typography sx={{ fontSize: '12px', textTransform: 'capitalize' }}>
              {dateFormat(listItem?.modification_date)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            // paddingRight: '16px',
            width: '8%',
            '> div': { display: 'flex', alignItems: 'center', zIndex: 9999 },
          }}
          // onClick={() => {
          //   setSelectedItem(listItem);
          // }}
          onClick={(event) => handleListClick(event, listItem)}
        >
          <ContentMoreDialog
            iconType='MoreVertIcon'
            filterValue=''
            handleChange={handleChange}
            onDuplicatePage={handleDuplicate}
            openSettingsPanel={openItemSettingsPanel}
            handleDelete={handleDelete}
            handleCopy={handleCopy}
            handleUnpublish={handleUnpublish}
            handlePublishedPageView={handlePublishedPageView}
            data={listItem}
            handleEditContentType={handleEditContentType}
            contentType={contentType}
            handleSocialShare={handleSocialShare}
            handleEmbed={handleEmbed}
          />
        </Box>
      </Box>
    </>
  );
};
