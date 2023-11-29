import { Box } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../Common/Loader';
import { previewArticle } from '../../../articles/Actions';
// import { previewContent } from '../../QuizPollEvents/store/ContentAction';

import Constants from '../../../components/Common/Constants/Constants';
import {
  showToastError,
  showToastSuccess,
} from '../../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import articleApi from '../../../services/article/article.api';
import { Store } from '../../../store/ContextStore';
import ThemeConstants from '../../../theme/variable';
import Gallery from '../../Gallery/Gallery';
import { ArticleActionDialog } from '../Components/ArticleActionDialog/ArticleActionDialog';
import { ArticleDetails } from '../Components/ArticleDetails';
import PublishModal from '../Components/PublishModal/PublishModal';
import TopBar from '../Components/TopBar';

import { workflowKeys } from '../../../components/Submit/Utils/contstants';
import WorkflowHistory from '../../../components/WorkflowHistory/WorkflowHistory';
import { useCommentContext } from '../../../context/CommentsContext/CommentsContext';
import useWorkflow from '../../../hooks/useWorkflow/useWorkflow';
import i18n from '../../../service/i18n';
import commentsApi from '../../../services/comments/comments.api';
import { ContentType } from '../../../utils/Enums/ContentType';
import { authInfo } from '../../../utils/authConstants';
import { CATEGORY_CONTENT } from '../../../utils/constants';
import {
  capitalizeFirstLetter,
  getCurrentLang,
  onBackButtonEvent,
  unloadCallback,
} from '../../../utils/helperFunctions';
import {
  articleInitialObj,
  handleTagOnChange,
  requestToSendArticle,
  resetImageSelected,
  updateImageData,
  updateStructureData,
  validateDetails,
} from '../Utils/helperFunction';
import { useStyles } from './CreateArticle.styles';

export const CreateArticle = () => {
  const classes = useStyles();
  const [onHover, setOnHover] = useState(false);
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState<any>({});
  const [tagData, setTagData] = useState<any>({});
  const [tagArr, setTagArr] = useState<any>([]);
  const tagArrRef = useRef({ tags: [] });
  const [socialOgTags, setSocialOgTags] = useState({ tagsSocialShare: [] });
  const [articleInstance, setArticleInstance] = useState<any>({});
  const [getSession] = useUserSession();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const { state, dispatch } = useContext(Store);
  const { article } = state;
  const [checkDesc, setCheckDesc] = useState('');
  const compareInstance = useRef({});
  const { t } = useTranslation();
  const [previewButton, setPreviewButton] = useState(true);
  const { userInfo, role } = getSession();
  const params = useParams();
  const articlePageUrl = new URL(window.location.href);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>('Images');
  const [operationType, setOperationType] = useState<string>('');
  const [showMediaOption, setShowMediaOption] = useState(true);
  const [isClickedPublish, setIsClickedPublish] = useState(false);
  const count = useRef(0);
  const [onSavedModal, setOnSavedModal] = useState(false);
  const unsavedChanges = useRef<boolean>(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showWorkflowSubmit, setShowWorkflowSubmit] = useState(false);
  const [timerState, setTimerState] = useState(
    localStorage.getItem('articleTimerState') == 'true' ? true : false
  );
  const [lastmodifiedDate, setLastmodifiedDate] = useState(
    new Date().toISOString()
  );
  const [key, setKey] = useState('');
  const navigate = useNavigate();
  const path = useRef();
  const currentArticleData = useRef(
    articlePageUrl.searchParams.get('path')
      ? (articlePageUrl.searchParams.get('path') as string)
      : ''
  );
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const login_user_id = userInfo?.user_id;
  const [isDraft, setIsDraft] = useState<boolean>(true);

  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
    bitStreamId: '',
  });
  const [workflow, setWorkflow] = useState({});
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const [isArticleCrop, setIsArticleCrop] = useState(0);
  const [enableWorkflowHistory, setEnableWorkflowHistory] =
    useState<boolean>(false);
  const { selectedComment, comments, clearComment } = useCommentContext();
  const [isReload, setIsReload] = useState(false);
  useEffect(() => {
    setIsReload(!isReload);
  }, [comments]);
  const imageCropHandle = () => {
    setIsArticleCrop(() => isArticleCrop + 1);
  };
  const handleSelectedImage = (image, keyName) => {
    if (keyName === 'social_img') {
      setShow(true);
      // setIsClickedPublish(false);
      setArticleInstance({
        ...articleInstance,
        CommonFields: {
          ...articleInstance.CommonFields,
          settings: {
            ...articleInstance.CommonFields.settings,
            socialog_image: image.Thumbnail,
          },
        },
      });
    } else {
      setSelectedImage(image);
      console.log('call 123', image);
      setContent({
        Url: image.Thumbnail,
        Title: image.Title,
        Description: image.Description,
        bitStreamId: image.bitStreamId,
      });

      setShowMediaOption(true);
    }
  };
  useEffect(() => {
    if (timerState) {
      localStorage.setItem('articleTimerState', 'true');
    }
  }, [timerState]);

  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
  };
  const setImageToDefault = () => {
    setSelectedImage({
      Thumbnail: '',
      Title: '',
      Description: '',
      bitStreamId: '',
    });
  };
  const toggleGallery = (toggleState, type, keyName) => {
    setGalleryState(toggleState);
    setShowMediaOption(true);
    setOperationType('');
    keyName !== 'social_img' && isClickedPublish && handleClickOpen();
    if (type == 'cancel') {
      // setImageToDefault();
    }
  };
  const showGallery = (gType, keyName = '') => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
    setShowMediaOption(false);
    setKey(keyName);
  };
  const onUploadClick = (type, action) => {
    showGallery(type);
    count.current = 0;
    setOperationType(action);
  };

  useEffect(() => {
    if (Object.keys(articleInstance).length === 0 && !params.id) {
      const newArticle = articleInitialObj(username);
      setArticleInstance(newArticle);
      compareInstance.current = newArticle;
    }
    if (currentArticleData.current === '') {
      getWorkflowDetails(
        role,
        login_user_id,
        setWorkflow,
        capitalizeFirstLetter(ContentType.Article)
      );
    }
  }, []);
  const handleClickOpen = () => {
    setOpen(!open);
    setIsClickedPublish(!isClickedPublish);
  };
  const handleClose = () => {
    setOpen(false);
    // setIsClickedPublish(false);
  };

  const getTags = async () => {
    try {
      const res: any = await articleApi.getTags({
        start: 0,
        rows: 1000,
      });
      if (res?.authoring_getTagsList) {
        setTagData(res?.authoring_getTagsList);
      }
    } catch (err: any) {
      console.log(JSON.stringify(err, null, 2));
    }
  };

  useEffect(() => {
    getTags();
  }, []);
  const handleTags = (event) => {
    handleTagOnChange(
      event,
      tagArr,
      setTagArr,
      tagArrRef,
      socialOgTags,
      setSocialOgTags
    );
  };

  const requestToSend = (pageState, pageUrl, IsDuplicate) => {
    const createArticleRequest = requestToSendArticle(
      pageState,
      pageUrl,
      IsDuplicate,
      articleInstance,
      tagArrRef,
      socialOgTags,
      updateStructureDataArticle,
      username
    );
    return createArticleRequest;
  };
  //create comment
  const createComment = async () => {
    const currentLanguage = getCurrentLang();
    const createCommentRequest = {
      document_path: `/content/documents/hclplatformx/${currentLanguage}/article/${currentArticleData.current}`,
      status: false,
      document_type: 'Article',
      created_by: username, //articleInstance.CommonFields.createdBy,
      last_modified_by: username,
      reviewer_comments: [comments],
    };

    return commentsApi.createOrUpdateComment({
      input: createCommentRequest,
    });
  };
  const createArticle = async (pageState, pageUrl, IsDuplicate = false) => {
    const createArticleRequest = requestToSend(pageState, pageUrl, IsDuplicate);
    return articleApi.createArticle({
      contentType: 'Article',
      input: createArticleRequest,
    });
  };
  const updateArticle = async (pageState, pageUrl, IsDuplicate = false) => {
    const updateArticleRequest = requestToSend(pageState, pageUrl, IsDuplicate);
    return articleApi.updateArticle({
      contentType: 'Article',
      input: updateArticleRequest,
    });
  };
  const publishArticle = async (pageUrl) => {
    const publishedRequest = {
      page: pageUrl,
    };
    return articleApi.publishArticle({
      contentType: 'Article',
      input: publishedRequest,
    });
  };
  const articleDetails = async () => {
    return articleApi.fetchArticleDetails({
      contentType: 'Article',
      path: currentArticleData.current,
    });
  };
  const getArticleData = async () => {
    setIsLoading(true);
    try {
      const detailsRes: any = await articleDetails();
      setIsLoading(false);
      if (detailsRes?.authoring_getCmsContentByPath !== null) {
        const articleObj = detailsRes?.authoring_getCmsContentByPath;
        const {
          title,
          description,
          banner,
          published_images,
          original_image,
          tags,
          settingsProperties,
          sub_title,
          structure_data,
          createdBy,
          lastModifiedBy,
          seo_enable,
          analytics_enable,
          path,
          workflow_status,
          stages,
          tag_name,
          last_modifiedBy,
          page,
          task_status,
          user_id,
          user_name,
        } = articleObj;
        const instance = {
          ...articleInstance,
          CommonFields: {
            ...articleInstance.CommonFields,
            title,
            description,
            tags,
            settings: settingsProperties,
            structure_data: structure_data,
            createdBy,
            seo_enable,
            analytics_enable,
            lastModifiedBy,
          },
          ObjectFields: {
            ...articleInstance.ObjectFields,
            banner,
            published_images,
            original_image,
            sub_title,
          },
        };
        setWorkflow({
          title,
          description,
          path,
          workflow_status,
          stages,
          tag_name,
          last_modifiedBy,
          createdBy,
          role,
          page,
          enable: stages?.length > 0 ? true : false,
          login_user_id,
          task_status,
          task_user_id: user_id,
          task_user_name: user_name,
        });
        setArticleInstance({ ...instance });
        compareInstance.current = { ...instance };
        setSocialOgTags({
          ...socialOgTags,
          tagsSocialShare: settingsProperties.keywords,
        });
        setContent({
          ...content,
          Url: banner,
          Title: sub_title,
          bitStreamId: original_image.bitStreamId,
        });
        setCheckDesc(description);
        tagArrRef.current = {
          ...tagArrRef.current,
          tags: tags,
        };
        setTagArr(tags);
      }
    } catch (err: any) {
      setIsLoading(false);
      showToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast')
      );
    }
  };
  // console.log('data', article);
  useEffect(() => {
    if (Object.keys(article?.currentArticle)?.length > 0) {
      console.log('data', article?.currentArticle);
      const {
        title,
        description,
        banner,
        published_images,
        original_image,
        tags,
        settings,
        sub_title,
        structure_data,
        createdBy,
        article_settings,
        seo_enable,
        analytics_enable,
        creationDate,
      } = article.currentArticle;
      setCheckDesc(description);
      const instance = {
        ...articleInstance,
        CommonFields: {
          ...articleInstance.CommonFields,
          title,
          description,
          tags,
          settings,
          structure_data,
          createdBy,
          seo_enable,
          analytics_enable,
          creationDate,
        },
        ObjectFields: {
          ...articleInstance.ObjectFields,
          banner,
          published_images,
          original_image,
          sub_title,
        },
      };
      setArticleInstance({ ...instance });
      compareInstance.current = { ...instance };
      setSocialOgTags({
        ...socialOgTags,
        tagsSocialShare: article_settings.keywords,
      });
      setContent({
        ...content,
        Url: banner, //original_image.Thumbnail,
        Title: sub_title,
        bitStreamId: original_image.bitStreamId,
      });

      tagArrRef.current = {
        ...tagArrRef.current,
        tags: tags,
      };
      setTagArr(tags);
      // setTagArr(content?.currentContent?.tagsSocialShare);
    } else if (currentArticleData.current) {
      getArticleData();
    }
  }, []);
  const validateArticleDetails = (isPublish = false) => {
    return validateDetails(isPublish, articleInstance, tagArrRef);
  };
  const onSave = async (isWorkflow = true, props = {}, event_step = '') => {
    if (!validateArticleDetails()) {
      setIsLoading(true);
      setOpen(false);
      try {
        const articleCommonFields = articleInstance?.CommonFields || {};
        const { title, page_createdby, page_lastmodifiedby } =
          articleCommonFields;
        const pageURL =
          !isDraft || currentArticleData.current
            ? path.current || currentArticleData.current
            : title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();

        if (currentArticleData.current || !isDraft) {
          const detailsRes: any = await updateArticle(Constants.DRAFT, pageURL);
          if (
            detailsRes.authoring_updateContent.message ===
            'Successfully updated!!!'
          ) {
            if (!isWorkflow) {
              showToastSuccess(`${t('article')} ${t('updated_toast')}`);
              getArticleData();
            } else {
              const { workflow_status, success } = await workflowRequest(
                props,
                event_step
              );
              if (success) {
                workflow_status === workflowKeys.publish.toLowerCase() &&
                event_step === workflowKeys.approve
                  ? setShowPublishConfirm(true)
                  : setShowWorkflowSubmit(true);
              }
            }
            path.current = detailsRes.authoring_updateContent?.path.substring(
              detailsRes.authoring_updateContent?.path.lastIndexOf('/') + 1
            );
            setIsLoading(false);
            setTimerState(true);

            setLastmodifiedDate(new Date().toISOString());

            unsavedChanges.current = false;
          } else {
            showToastSuccess(detailsRes.authoring_updateContent.message);
          }
        } else {
          console.log('isWorkflow else', isWorkflow);

          const detailsRes: any = await createArticle(Constants.DRAFT, pageURL);
          if (
            detailsRes.authoring_createContent.message ===
            'Successfully created!!!'
          ) {
            if (!isWorkflow) {
              showToastSuccess(`${t('article')} ${t('saved_toast')}`);
            }
            // setOnSavedModal(true);
            setIsDraft(false);
            setTimerState(true);
            setLastmodifiedDate(new Date().toISOString());
            path.current = detailsRes.authoring_createContent?.path.substring(
              detailsRes.authoring_createContent?.path.lastIndexOf('/') + 1
            );
            const { createdBy, title, description } =
              articleInstance.CommonFields;
            const workflowObj = {
              createdBy,
              title,
              description,
              path: detailsRes.authoring_createContent?.path,
              workflow_status: workflowKeys.draft,
              tag_name: capitalizeFirstLetter(ContentType.Article),
              last_modifiedBy: createdBy,
            };
            if (isWorkflow) {
              const { success } = await workflowRequest(
                workflowObj,
                workflowKeys.approve
              );
              if (success) {
                setShowWorkflowSubmit(true);
              }
            }
            setWorkflow({ ...workflow, ...workflowObj });
            setIsLoading(false);
            unsavedChanges.current = false;
          } else {
            showToastSuccess(detailsRes.authoring_createContent.message);
          }
        }
      } catch (err: any) {
        console.log('err', err);
        setIsLoading(false);
        setTimerState(false);
        setLastmodifiedDate('');

        showToastError(
          err.graphQLErrors.length > 0
            ? err.graphQLErrors[0].message
            : t('api_error_toast')
        );
      }
    }
  };
  const onPublish = async () => {
    if (!validateArticleDetails(true)) {
      try {
        setIsLoading(true);
        setOpen(false);
        const articleCommonFields = articleInstance?.CommonFields || {};
        const { title } = articleCommonFields;
        const pageURL =
          currentArticleData.current || !isDraft
            ? currentArticleData.current || path.current
            : title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
        const detailsRes: any =
          currentArticleData.current || !isDraft
            ? await updateArticle(Constants.PUBLISHED, pageURL)
            : await createArticle(Constants.PUBLISHED, pageURL);
        if (
          currentArticleData.current || !isDraft
            ? detailsRes.authoring_updateContent.message ===
              'Successfully updated!!!'
            : detailsRes.authoring_createContent.message ===
              'Successfully created!!!'
        ) {
          try {
            //call Publish api for article
            const response: any = await publishArticle(pageURL);
            if (
              response.authoring_publishContent.message ===
              'Article published successfully'
            ) {
              // showToastSuccess(`${t('article')} ${t('published_toast')}`);
              setShowPublishConfirm(true);
              setIsLoading(false);
              setTimerState(true);
              setLastmodifiedDate(new Date().toISOString());
            } else {
              showToastSuccess(response.authoring_publishContent.message);
            }
          } catch (err: any) {
            setShowPublishConfirm(false);
            setTimerState(false);
            setLastmodifiedDate('');

            showToastError(
              err.graphQLErrors.length > 0
                ? err.graphQLErrors[0].message
                : t('api_error_toast')
            );
          }
        } else {
          showToastSuccess(
            currentArticleData.current
              ? detailsRes.authoring_updateContent.message
              : detailsRes.authoring_createContent.message
          );
        }
      } catch (err: any) {
        console.log('err', err);
        showToastError(
          err.graphQLErrors.length > 0
            ? err.graphQLErrors[0].message
            : t('api_error_toast')
        );
      }
    }
  };
  const resetSelectedImage = () => {
    resetImageSelected(setContent, setSelectedImage);
  };
  const updateImageField = (obj) => {
    updateImageData(
      obj,
      content,
      setArticleInstance,
      articleInstance,
      selectedImage
    );
  };
  const handelPreview = () => {
    const {
      title,
      description,

      lastModifiedBy: page_lastmodifiedby,
      creationDate: developed_date,
      settings,
    } = articleInstance.CommonFields;
    const pageUrl = currentArticleData.current
      ? currentArticleData.current
      : title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
    const article_settings = {
      socialog_url:
        `${authInfo.publishUri + i18n.language}/` + `article` + `/${pageUrl}`,
      keywords: socialOgTags.tagsSocialShare,
    };
    const current_page_url = `/${pageUrl}`;
    const banner = content?.Url;
    const sub_title = content?.Title;
    const tags = tagArrRef.current.tags;
    const articlePreview = {
      ...articleInstance.CommonFields,
      ...articleInstance.ObjectFields,
      // title,
      // description,
      tags,
      page_lastmodifiedby: username,
      developed_date,
      banner,
      current_page_url,
      article_settings,
      sub_title,
    };
    console.log('preview', articlePreview, content);

    dispatch(previewArticle(articlePreview));

    navigate('/article-preview');
  };
  const updateStructureDataArticle = () => {
    const content = articleInstance?.CommonFields || {};
    const { title } = content;
    const pageURL = currentArticleData.current
      ? currentArticleData.current
      : title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase();
    const articleObjectFields = articleInstance?.ObjectFields || {};
    const { banner } = articleObjectFields || {};
    const tags = JSON.parse(JSON.stringify(tagArrRef.current));
    return updateStructureData(content, banner, tags.tags, pageURL);
  };
  const crossButtonHandle = () => {
    setShowPublishConfirm(false);
    // navigate(`?path=${path.current}`);
  };
  useEffect(() => {
    if (
      JSON.stringify(articleInstance) ===
      JSON.stringify(compareInstance.current)
    ) {
      unsavedChanges.current = false;
    } else {
      unsavedChanges.current = true;
    }
    const { title, description } = articleInstance?.CommonFields || {};
    const { banner } = articleInstance?.ObjectFields || {};
    console.log('test desc', checkDesc);
    if (title === '' || banner === '' || checkDesc === '') {
      setPreviewButton(true);
    } else {
      setPreviewButton(false);
    }
  }, [articleInstance, checkDesc]);
  const closeButtonHandle = () => {
    unsavedChanges.current = false;
    //clearComment();
    setShowPublishConfirm(false);
    setOnSavedModal(false);
    setShowExitWarning(false);
    setShowWorkflowSubmit(false);
    navigate('/content/article');
  };
  const returnBack = () => {
    if (unsavedChanges.current) {
      setShowExitWarning(true);
    } else {
      navigate('/content/article');
    }
  };
  const navigateTo = () => {
    unsavedChanges.current = false;
    navigate('/content/article');
    //clearComment();
    dispatch(previewArticle({}));
  };
  useEffect(() => {
    if (unsavedChanges.current == true) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + location?.search
      );
      window.addEventListener('beforeunload', (e) =>
        unloadCallback(e, unsavedChanges.current)
      );
      window.addEventListener('popstate', (e) =>
        onBackButtonEvent(
          e,
          unsavedChanges.current,
          setShowExitWarning,
          navigateTo
        )
      );
    }
    return () => {
      window.removeEventListener('beforeunload', (e) =>
        unloadCallback(e, unsavedChanges.current)
      );
      window.removeEventListener('popstate', (e) =>
        onBackButtonEvent(
          e,
          unsavedChanges.current,
          setShowExitWarning,
          navigateTo
        )
      );
    };
  }, [unsavedChanges.current, articleInstance]);
  return (
    <Box
      className={classes.containerStyle}
      onClick={() => setOnHover(false)}
      sx={{
        overflowY: galleryState ? 'hidden' : 'scroll',
      }}
      // onMouseOut={() => setOnHover(false)}
    >
      {isLoading && <Loader />}
      <Box
        sx={{
          backgroundColor: ThemeConstants.WHITE_COLOR,
        }}
      >
        {galleryState && (
          <Gallery
            handleImageSelected={handleSelectedImage}
            toggleGallery={toggleGallery}
            galleryMode={galleryType.current}
            handleVideoSelected={handleSelectedVideo}
            keyName={key}
          />
        )}
      </Box>
      <TopBar
        returnBack={returnBack}
        createText={t('publish')}
        handleClickOpen={handleClickOpen}
        onSave={onSave}
        handelPreview={handelPreview}
        state={articleInstance}
        setState={setArticleInstance}
        socialOgTags={socialOgTags}
        setSocialOgTags={setSocialOgTags}
        showGallery={showGallery}
        setOperationType={setOperationType}
        show={show}
        setShow={setShow}
        updateStructureDataArticle={updateStructureDataArticle}
        previewButton={previewButton}
        toolTipText={t('preview_tooltip')}
        category={CATEGORY_CONTENT}
        subCategory={ContentType.Article}
        createComment={createComment}
        workflow={workflow}
        timerState={timerState}
        lastmodifiedDate={lastmodifiedDate}
        setEnableWorkflowHistory={setEnableWorkflowHistory}
      />
      {enableWorkflowHistory ? (
        <WorkflowHistory
          workflow={workflow}
          setEnableWorkflowHistory={setEnableWorkflowHistory}
        />
      ) : (
        <ArticleDetails
          returnBack={returnBack}
          onHover={onHover}
          setOnHover={setOnHover}
          content={content}
          setContent={setContent}
          state={articleInstance}
          setState={setArticleInstance}
          setSelectedImage={setSelectedImage}
          selectedImage={selectedImage}
          onUploadClick={onUploadClick}
          showMediaOption={showMediaOption}
          setShowMediaOption={setShowMediaOption}
          operationType={operationType}
          resetSelectedImage={resetSelectedImage}
          updateImageField={updateImageField}
          setIsClickedPublish={setIsClickedPublish}
          count={count}
          imageCropHandle={imageCropHandle}
          isArticleCrop={isArticleCrop}
          id={params.id}
          setCheckDesc={setCheckDesc}
          workflow={workflow}
        />
      )}
      <PublishModal
        open={open}
        handleClose={handleClose}
        content={content}
        tagData={tagData}
        selectedTag={tagArr}
        handleTagOnChange={handleTags}
        onPublish={onPublish}
        onUploadClick={onUploadClick}
        selectedImage={selectedImage}
        state={articleInstance}
        operationType={operationType}
        resetSelectedImage={resetSelectedImage}
        updateImageField={updateImageField}
        isUploadArticle={true}
        count={count}
        imageCropHandle={imageCropHandle}
        category={CATEGORY_CONTENT}
        subCategory={ContentType.Article}
        workflow={workflow}
        handleClickOpen={handleClickOpen}
        onSave={onSave}
        createComment={createComment}
      />
      {(onSavedModal ||
        showExitWarning ||
        showPublishConfirm ||
        showWorkflowSubmit) && (
        <ArticleActionDialog
          onSavedModal={onSavedModal}
          crossButtonHandle={crossButtonHandle}
          showExitWarning={showExitWarning}
          closeButtonHandle={closeButtonHandle}
          setShowExitWarning={setShowExitWarning}
          showPublishConfirm={showPublishConfirm}
          showWorkflowSubmit={showWorkflowSubmit}
        />
      )}
    </Box>
  );
};
