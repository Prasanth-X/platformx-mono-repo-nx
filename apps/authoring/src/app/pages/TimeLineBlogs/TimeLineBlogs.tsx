import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import $ from 'jquery';
import React, { useEffect, useState } from 'react';
import ReactDomServer from 'react-dom/server';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { EventHeader } from '../../components/Header/EventHeader';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../hooks/useUserSession/useUserSession';
import { commonPostApiCall } from '../../services/config/request';
import { authInfo } from '../../utils/authConstants';
import { defaultFalBackImage } from '../../utils/helper';
import {
  formCroppedUrl,
  nullToArray,
  nullToObject,
  nullToString,
} from '../../utils/helperFunctions';
import BlogEvents from './BlogEvents/BlogEvents';
import BlogHeaderTabMobileView from './BlogHeaderFooderTab/BlogHeaderTabMobileView';
import BlogTimeline from './BlogTimeline/BlogTimeline';
import Blogs from './Blogs/Blogs';
import ContentTypeCard from './Blogs/ContentTypeCard';
import './TimeLineBlogs.css';
import { timeLineBlogsConstDesign } from './blogCss';
import { updateBlogApiCall } from './helperBlogs';

const styles = timeLineBlogsConstDesign();

const assetArrayMake = (selectedImage, selectedVideo) => {
  let newArray = [];
  if (Object.values(nullToObject(selectedImage)).length > 0) {
    newArray = [...newArray, selectedImage];
  }

  if (Object.values(nullToObject(selectedVideo)).length > 0) {
    newArray = [...newArray, selectedVideo];
  }
  return newArray;
};

const removeHTML = (str) => {
  const without_Html = $(str).find('.removeContentDescription').remove().end();
  return without_Html[0]?.outerHTML;
};

const assetDescMake = (selectedImage, selectedVideo, contentHtml = '') => {
  let newDesc = '';
  if (Object.values(nullToObject(selectedImage)).length > 0) {
    const imgHtml = `<div class='removeContentDescription'><img src='${selectedImage.Thumbnail}' class='blogImage' style='border-radius: 5px; display:block; object-fit:cover'/></br></div>`;
    newDesc = newDesc + ' ' + imgHtml;
  }

  if (Object.values(nullToObject(selectedVideo)).length > 0) {
    const vidHtml = `<div class='removeContentDescription'><video class='blogVideo' controls playsinline style="border-radius: 5px; object-fit: cover; display: block" poster='${selectedVideo.Thumbnail}' 
  disablepictureinpicture controlslist="nodownload noplaybackrate">
        <source src='${selectedVideo.Url}' type="video/mp4" /></video></br></div>`;
    newDesc = newDesc + ' ' + vidHtml;
  }

  if (contentHtml) {
    newDesc =
      newDesc +
      ' ' +
      `<div class='removeContentDescription'>${contentHtml}</div>`;
  }

  return newDesc;
};

const TimeLineBlogs = () => {
  const navigate = useNavigate();
  const rows = 20;
  const { t } = useTranslation();
  const [getSession] = useUserSession();
  const { userInfo = {} } = getSession() || {};

  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventPath = urlParams.get('path') || '';
  const apiUrl = `${process.env.NX_BLOG_API_URI}blogging/fetch`;
  const createApiUrl = `${process.env.NX_BLOG_API_URI}blogging/create`;

  const [apiCountCall, setApiCountCall] = useState(0);
  const [selectedTabvalue, setValue] = useState('1');
  const [savedBlogId, setSavedBlogId] = useState('');
  const [savedBlogData, setSavedBlogData] = useState<any>();
  const [isBlogLoad, setIsBlogLoad] = useState<boolean>(false);
  const [isBlogCreate, setIsBlogCreate] = useState<boolean>(false);
  const [isStarOpen, setIsStarOpen] = useState(false);
  const [isCodeOpen, setIsCodeOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const [contentTypeData, setContentTypeData] = useState<any>({});
  const { contentHtml = '', contentItem = {} } = contentTypeData;
  const [publishButton, setPublishButton] = useState(false);
  const [blogData, setBlogData] = useState<any>({
    BlogTitle: '',
    BlogEmbed: '',
    BlogTextArea: '',
    BlogAuthorName: '',
    BlogKeyHighlighter: '',
    BlogTimeStamp: null,
  });

  const [selectedImage, setSelectedImage] = useState({});
  const [selectedVideo, setSelectedVideo] = useState({});

  const commonBlogDataDefault = () => {
    const newObj = {
      BlogTitle: '',
      BlogEmbed: '',
      BlogTextArea: '',
      BlogAuthorName: '',
      BlogKeyHighlighter: '',
      BlogTimeStamp: null,
    };
    setBlogData(newObj);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const starClickHandel = () => {
    setIsStarOpen(!isStarOpen);
    commonBlogDataDefault();
    if (isQuoteOpen) {
      setIsQuoteOpen(false);
    }
  };

  const quoteClickHandel = () => {
    setIsQuoteOpen(!isQuoteOpen);
    commonBlogDataDefault();
    if (isStarOpen) {
      setIsStarOpen(false);
    }
  };

  // Update blog data while typing
  const handleBlogChange = (event: any = {}) => {
    const { target: { name = '', value = '' } = {} } = event;
    switch (name) {
      case 'BlogTitle':
        setBlogData({ ...blogData, [name]: value });
        break;
      case 'BlogTextArea':
        setBlogData({ ...blogData, [name]: value });
        break;
      case 'BlogEmbed':
        setBlogData({ ...blogData, [name]: value });
        break;
      case 'BlogKeyHighlighter':
        setBlogData({ ...blogData, [name]: value });
        break;
      case 'BlogAuthorName':
        setBlogData({ ...blogData, [name]: value });
        break;
      case 'BlogTimeStamp':
        setBlogData({ ...blogData, [name]: value });
        break;
      default:
        break;
    }
  };

  const onRemoveImage = () => {
    showToastSuccess('Image removed.');
    setSelectedImage({});
  };

  const onRemoveVideo = () => {
    showToastSuccess('Video removed.');
    setSelectedVideo({});
  };

  /**\
   * after success empty media types
   */
  const setImageOrVideoToDefault = () => {
    setSelectedImage({});
    setSelectedVideo({});
    setContentTypeData({});
  };

  /**\
   * content type
   */
  const onRemoveContentType = () => {
    showToastSuccess('Content removed.');
    setContentTypeData({});
  };

  const handleSelectedVideo = (video, showToast) => {
    if (!showToast) {
      showToastSuccess('Video added.');
    }
    setSelectedVideo({ ...video, media: 'video' });
  };

  const handleSelectedImage = (image, showToast) => {
    if (!showToast) {
      showToastSuccess('Image added.');
    }
    setSelectedImage({ ...image, media: 'image' });
  };

  const handleContentType = (contentEvent) => {
    setContentTypeData(contentEvent);
  };

  /**
   * save and edit have common func
   * @param resArray array
   */
  const commonSaveData = (resArray: any = []) => {
    const savedCustomerData = {
      BlogTitle: resArray[0]?.title,
      BlogAuthorName: resArray[0]?.authors[0],
      BlogEmbed: resArray[0]?.embeded[0]?.code,
      BlogTimeStamp: resArray[0]?.key_highlighter[0]?.time,
      BlogKeyHighlighter: resArray[0]?.key_highlighter[0]?.highlighter,
      BlogTextArea: removeHTML(nullToString(resArray[0]?.description))
        .replace('\n', '')
        .replace(' ', ''),
    };
    if (nullToArray(resArray[0]?.assets).length > 0) {
      resArray[0]?.assets.forEach((ele) => {
        if (ele?.media === 'image') {
          handleSelectedImage(ele, true);
        }

        if (ele?.media === 'video') {
          handleSelectedVideo(ele, true);
        }
      });
    }

    if (nullToArray(resArray[0]?.item_path).length > 0) {
      const item = resArray[0]?.item_path[0]?.item_Details;
      const newObj = {
        background_content: item.background_content || {},
        Thumbnail: {
          ...item?.Thumbnail,
          Title: nullToString(item.title),
          Description: nullToString(item.description),
          Url:
            formCroppedUrl(
              item?.original_image?.original_image_relative_path,
              item?.original_image?.ext
            ) || defaultFalBackImage(),
        },
        ContentType: nullToString(resArray[0]?.item_path[0]?.content_type),
        path: nullToString(resArray[0]?.item_path[0]?.path),
        PublishedDate: nullToString(item.publishedDate),
      };

      const secondaryArgs = {
        gcpUrl: authInfo.gcpUri,
        bucketName: authInfo.gcpBucketName,
      };

      const contentAdded = ReactDomServer.renderToString(
        <Box className="contentTypeBox">
          <ContentTypeCard
            content={newObj}
            secondaryArgs={secondaryArgs}
          ></ContentTypeCard>
        </Box>
      );

      handleContentType({
        contentItem: newObj,
        contentHtml: contentAdded,
      });
    }

    if (
      resArray[0]?.key_highlighter[0]?.time ||
      resArray[0]?.key_highlighter[0]?.highlighter
    ) {
      setIsStarOpen(true);
    } else {
      setIsStarOpen(false);
    }

    if (resArray[0]?.embeded[0]?.code) {
      setIsCodeOpen(true);
    } else {
      setIsCodeOpen(false);
    }

    if (resArray[0]?.authors[0]) {
      setIsQuoteOpen(true);
    } else {
      setIsQuoteOpen(false);
    }

    setBlogData(savedCustomerData);
    setSavedBlogData(resArray[0]);
    setSavedBlogId(resArray[0]?._id);
  };

  const handleEditContent = async (Id: any) => {
    const data = {
      _id: Id,
    };
    setIsBlogLoad(true);
    const response = await commonPostApiCall(apiUrl, data);
    setImageOrVideoToDefault(); //remove exist image from image state

    setIsBlogLoad(false);

    const { data: { success = false } = {} } = response;

    if (success && response?.data?.data != 'No data found!') {
      const { data: { data: resArray = [] } = {} } = nullToObject(response);
      commonSaveData(resArray); //common
    } else {
      showToastError(t('api_error_toast'));
    }
  };

  /**
   * save data fetch
   */
  const fetchSavedBlogData = async () => {
    const data = {
      event_path: eventPath,
      is_published: false,
      is_soft_delete: false,
      start: 0,
      rows: rows,
      sortOrder: 'desc',
      isSuggestive: false,
      pageSearch: '',
    };

    setIsBlogLoad(true);
    const response = await commonPostApiCall(apiUrl, data);
    setIsBlogLoad(false);

    if (response?.data?.data && response?.data?.data != 'No data found!') {
      const { data: { data: resArray = [] } = {} } = nullToObject(response);
      commonSaveData(resArray); //common
    } else {
      showToastError(t('api_error_toast'));
    }
  };

  // Update Blog function
  const updateBlog = async () => {
    setIsBlogLoad(true);
    const mediaUrl = assetDescMake(selectedImage, selectedVideo, contentHtml);
    const response = await updateBlogApiCall({
      ...blogData,
      mediaUrl: mediaUrl,
      username: username,
      eventPath: eventPath,
      savedBlogId: savedBlogId,
      savedBlogData: savedBlogData,
      contentTypeData: [
        {
          content_type: contentItem?.ContentType,
          path: contentItem?.EditorialItemPath,
        },
      ],
      assetstosend: assetArrayMake(selectedImage, selectedVideo),
    });
    setIsBlogLoad(false);

    const { data: { success = false } = {} } = response;
    if (success) {
      setImageOrVideoToDefault(); //default image set

      setPublishButton(false);
      showToastSuccess('Blog published successfully.');
      setApiCountCall(apiCountCall + 1); //fetch blog reload
      const emptyCustomerData = {
        BlogTitle: '',
        BlogEmbed: '',
        BlogTextArea: '',
        BlogKeyHighlighter: '',
        BlogAuthorName: '',
        BlogTimeStamp: '',
      };
      setBlogData(emptyCustomerData);
      setSavedBlogId('');
    } else {
      showToastError(t('api_error_toast'));
    }
  };
  // Publish Blog function
  let embeddURLValue;
  let newValue;

  const publishBlog = async () => {
    //embed url validation//
    const iframeRegex = /<iframe.*?>.*?<\/iframe>/g;
    if (
      (!blogData.BlogTitle ||
        !blogData.BlogTextArea ||
        !blogData.BlogTimeStamp ||
        blogData.BlogKeyHighlighter ||
        !blogData.BlogAuthorName) &&
      blogData.BlogEmbed
    ) {
      if (iframeRegex.test(blogData?.BlogEmbed)) {
        newValue = blogData?.BlogEmbed;
        const srcAttr = newValue.match(/src\s*=\s*"([^"]+)"/gm);
        if (srcAttr != null) {
          const embeddUrl = srcAttr[0]?.split('"')[1];
          embeddURLValue = embeddUrl;
          setBlogData({
            ...blogData,
            BlogTextArea: `${blogData?.BlogTextArea} ${blogData?.BlogEmbed}`,
          });
        }
      } else {
        showToastError('Please enter a valid Embed url');
        return false;
      }
    }

    //embed url validation//

    //  setIsBlogLoad(true);
    //  setIsBlogCreate(true);
    const mediaUrl =
      assetDescMake(selectedImage, selectedVideo, contentHtml) || '';

    const data = {
      title: blogData?.BlogTitle,
      // description: `<span class="onlydesc">${blogData?.BlogTextArea}</span> ${description}`,
      description: `<span style="word-wrap: break-word" class="onlydesc">${
        nullToString(blogData?.BlogTextArea) + mediaUrl
      } </span>`,
      content_type: 'Blog',
      event_path: eventPath,
      page: eventPath,
      assets: assetArrayMake(selectedImage, selectedVideo),
      item_path: [
        {
          content_type: contentItem?.ContentType,
          path: contentItem?.EditorialItemPath,
        },
      ],
      embeded: [{ code: blogData?.BlogEmbed }],
      authors: blogData?.BlogAuthorName ? [blogData?.BlogAuthorName] : [],
      key_highlighter: [
        {
          highlighter: blogData?.BlogKeyHighlighter,
          time: blogData?.BlogTimeStamp,
        },
      ],
      is_published: true,
      created_date: new Date(),
      is_soft_delete: false,
      created_by: username,
      last_published_date: new Date(),
      last_published_by: username,
      modified_date: new Date(),
      modified_by: username,
    };
    const response = await commonPostApiCall(createApiUrl, data);
    setIsBlogLoad(false);
    setIsBlogCreate(false);
    setPublishButton(false);

    const { data: { success = false } = {} } = nullToObject(response);
    if (success) {
      setImageOrVideoToDefault(); //default image set

      showToastSuccess('Blog published successfully.');
      //fetchBlogData('');
      setApiCountCall(apiCountCall + 1); //fetch blog reload
      const emptyCustomerData = {
        BlogTitle: '',
        BlogEmbed: '',
        BlogTextArea: '',
        BlogKeyHighlighter: '',
        BlogAuthorName: '',
        BlogTimeStamp: '',
      };
      setBlogData(emptyCustomerData);
    } else {
      showToastError(t('api_error_toast'));
    }
  };
  // Save Blog function
  const saveButtonHandle = async () => {
    const data = {
      title: blogData?.BlogTitle,
      description: blogData?.BlogTextArea,
      content_type: 'Blog',
      event_path: eventPath,
      page: eventPath,
      assets: assetArrayMake(selectedImage, selectedVideo),
      item_path: [
        {
          content_type: contentItem?.ContentType,
          path: contentItem?.EditorialItemPath,
        },
      ],
      embeded: [{ code: blogData?.BlogEmbed }],
      authors: blogData?.BlogAuthorName ? [blogData?.BlogAuthorName] : [],
      key_highlighter: [
        {
          highlighter: blogData?.BlogKeyHighlighter,
          time: blogData?.BlogTimeStamp,
        },
      ],
      is_published: false,
      created_date: new Date(),
      is_soft_delete: false,
      created_by: username,
      last_published_date: '',
      last_published_by: '',
      modified_date: new Date(),
      modified_by: username,
    };

    try {
      setIsBlogLoad(true);
      const response = await commonPostApiCall(createApiUrl, data);
      setIsBlogLoad(false);

      const { data: { success = false } = {} } = response;

      if (success) {
        showToastSuccess('Blog saved successfully.');
      } else {
        showToastError(t('api_error_toast'));
      }
    } catch (err) {
      setIsBlogLoad(false);
      showToastError(t('api_error_toast'));
    }
  };

  // Publish Button handel function
  const savePublishHandle = () => {
    setPublishButton(true);
    if (savedBlogId) {
      updateBlog();
    } else {
      publishBlog();
    }
  };

  const handleBack = () => {
    navigate('/content/event');
  };

  useEffect(() => {
    if (eventPath) {
      fetchSavedBlogData();
    }
  }, []);

  return (
    <>
      <style>{styles}</style>
      <Grid
        className="liveBlogger"
        container
        sx={{ backgroundColor: '#f5f6f8' }}
      >
        <Grid
          item
          xs={12}
          lg={12}
          sx={{
            backgroundColor: '#fff',
            borderRadius: '4px',
            padding: '10px 13px 10px 13px',
            display: 'flex',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              flex: '0%',
            }}
          >
            <ArrowBackIosNewIcon
              fontSize="small"
              onClick={handleBack}
              sx={{ color: '#5c6574', cursor: 'pointer' }}
            />
            <Typography
              align="center"
              variant="h6regular"
              onClick={handleBack}
              sx={{ color: '#5c6574', cursor: 'pointer' }}
            >
              Back to Events
            </Typography>
          </Box>
          <Box>
            <EventHeader title="X" />
          </Box>
        </Grid>
      </Grid>
      <Grid
        container
        sx={{
          display: {
            xs: 'block',
            md: 'block',
            lg: 'none',
            background: '#F5F6F8',
            paddingTop: '15px',
          },
        }}
      >
        <TabContext value={selectedTabvalue}>
          <BlogHeaderTabMobileView handleTabChange={handleTabChange} />

          <Grid
            container
            className="test-tab"
            sx={{ display: { xs: 'unset' } }}
          >
            <TabPanel
              value="3"
              className="platx-tab-event-section"
              sx={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: 'calc(100vh - 180px)',
                padding: '0px 14px',
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ borderRadius: '4px' }}
                className="platx-event"
              >
                <BlogEvents eventPath={eventPath} />
              </Grid>
            </TabPanel>

            <TabPanel
              value="1"
              className="platx-tab-blog-section"
              style={{ padding: '14px 0 !important' }}
              sx={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: 'calc(100vh - 180px)',
                paddingTop: '0px',
              }}
            >
              <Grid item xs={12} className="platx-blog">
                {/* mobile view */}
                <Blogs
                  onRemoveImage={onRemoveImage}
                  onRemoveVideo={onRemoveVideo}
                  selectedImage={selectedImage}
                  selectedVideo={selectedVideo}
                  quoteClickHandel={quoteClickHandel}
                  starClickHandel={starClickHandel}
                  handleBlogChange={handleBlogChange}
                  blogData={blogData}
                  setBlogData={setBlogData}
                  saveButtonHandle={saveButtonHandle}
                  savePublishHandle={savePublishHandle}
                  isBlogLoad={isBlogLoad}
                  setImageOrVideoToDefault={setImageOrVideoToDefault}
                  handleSelectedImage={handleSelectedImage}
                  handleSelectedVideo={handleSelectedVideo}
                  handleContentType={handleContentType}
                  embeddURLValue={embeddURLValue}
                  isCodeOpen={isCodeOpen}
                  isQuoteOpen={isQuoteOpen}
                  isStarOpen={isStarOpen}
                  publishButton={publishButton}
                />
              </Grid>
            </TabPanel>
            <TabPanel
              value="2"
              className="platx-tab-timeline-section"
              sx={{
                overflowY: 'auto',
                overflowX: 'hidden',
                height: 'calc(100vh - 180px)',
                paddingTop: '0px 14px',
              }}
            >
              <Grid
                item
                xs={12}
                sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                className="platx-blog-timeline"
              >
                <BlogTimeline
                  eventPath={eventPath}
                  isBlogLoad={isBlogCreate}
                  apiCountCall={apiCountCall}
                  handleEdit={handleEditContent}
                  embeddURLValue={embeddURLValue}
                  className="platx-blog-timeline-wrapper"
                />
              </Grid>
            </TabPanel>
          </Grid>
        </TabContext>
      </Grid>
      <Grid
        container
        sx={{
          backgroundColor: '#f5f6f8',
          p: 2,
          display: { xs: 'none', sm: 'none', em: 'none', lg: 'flex' },
        }}
      >
        <Grid
          item
          xs={12}
          lg={3}
          sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
          className="platx-event"
        >
          <BlogEvents eventPath={eventPath} />
        </Grid>

        {/* web view */}
        <Grid item xs={12} lg={5} className="platx-blog">
          <Blogs
            contentItem={contentItem}
            onRemoveContentType={onRemoveContentType}
            onRemoveImage={onRemoveImage}
            onRemoveVideo={onRemoveVideo}
            selectedImage={selectedImage}
            selectedVideo={selectedVideo}
            quoteClickHandel={quoteClickHandel}
            starClickHandel={starClickHandel}
            handleBlogChange={handleBlogChange}
            blogData={blogData}
            setBlogData={setBlogData}
            saveButtonHandle={saveButtonHandle}
            savePublishHandle={savePublishHandle}
            isBlogLoad={isBlogLoad}
            setImageOrVideoToDefault={setImageOrVideoToDefault}
            handleSelectedImage={handleSelectedImage}
            handleSelectedVideo={handleSelectedVideo}
            handleContentType={handleContentType}
            embeddURLValue={embeddURLValue}
            isCodeOpen={isCodeOpen}
            isQuoteOpen={isQuoteOpen}
            isStarOpen={isStarOpen}
            publishButton={publishButton}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
          sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
          className="platx-blog-timeline"
        >
          <BlogTimeline
            isBlogLoad={isBlogCreate}
            handleEdit={handleEditContent}
            embeddURLValue={embeddURLValue}
            eventPath={eventPath}
            apiCountCall={apiCountCall}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default React.memo(TimeLineBlogs);
