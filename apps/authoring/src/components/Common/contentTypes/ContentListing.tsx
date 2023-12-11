import { useLazyQuery, useMutation } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
import BarChartIcon from '@mui/icons-material/BarChart';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Button, Grid, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import QuizIcon from '../../../assets/QuizIcon.svg';
import NoResults from '../../../assets/images/no-results.png';
import EmbedDialog from '../../../components/Embed/embedPostModal';
import PlateformXSocialDialog from '../../../components/SocialShareModal/socialShareModal';
import { usePermissions } from '../../../hooks/usePermissions/usePermissions';
import Gallery from '../../../pages/Gallery/Gallery';
import DuplicateContentPopup from '../../../pages/articles/DuplicateContentPopup';
import PlateformXDialogDelete from '../../../pages/articles/deletePopup';
import {
  createContentType,
  deleteContentType,
  fetchContentByPath,
  fetchContentTypeList,
  publishContentType,
} from '../../../services/contentTypes/contentTypes.api';
import { Store } from '../../../store/ContextStore';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { authInfo } from '../../../utils/authConstants';
import { LanguageList } from '../../../utils/constants';
import {
  convertToLowerCase,
  formatUrl,
  getCurrentLang,
  getSelectedSite,
  nullToArray,
} from '../../../utils/helperFunctions';
import MobileListFilter from '../../MobileListFilter';
import PlateformXDialog from '../../Modal';
import ArticleListDesktopLoader from '../../contentList/contentListLoaderDesktop';
import ArticleListMobileLoader from '../../contentList/contentListLoaderMobile';
import {
  showToastError,
  showToastSuccess,
} from '../../toastNotification/toastNotificationReactTostify';
import ContentGridLoader from '../ContentGridLoader';
import ContentListDesktop from '../ContentListDesktop';
import { ContentListGrid } from '../ContentListGrid';
import { ContentListMobile } from '../ContentListMobile';
import { ErrorTooltip } from '../ErrorTooltip';
import Filter from '../selectListing/Filter';
import {
  previewContent,
  updateContentList,
  updateInitialState,
} from './store/ContentAction';
import { defaultFalBackImage } from '../../../utils/helper';
export const ContentListing = ({ contentType, fromSearch = '' }) => {
  const { t, i18n } = useTranslation();
  const { canCreate } = usePermissions();
  const { state, dispatch } = useContext(Store);
  const { content } = state;
  const { contentArray = [] } = content;
  const [runFetchContentByPath] = useLazyQuery(fetchContentByPath);
  const searchPageUrl = new URL(window.location.href);
  const navigate = useNavigate();
  const [isDelete, setIsDelete] = useState(false);
  const [isUnpublish, setIsUnpublish] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>();
  const [sortOrder, setSortOrder] = useState('DESC');
  const [startIndex, setStartIndex] = useState<number>(0);
  const [rows, setRows] = useState<number>(20);
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [isloading, setLoading] = useState(false);
  const [runFetchContentList] = useLazyQuery(fetchContentTypeList);
  const [mutateDelete] = useMutation(deleteContentType);
  const [mutateUnpublish] = useMutation(publishContentType);
  const [listView, setListView] = useState('List');
  const [filterValue, setFilterValue] = useState('ALL');
  const [contentSettingsPanelState, setContentSettingsPanelState] =
    useState<boolean>(false);
  const [confirmImageOrVideoDelete, setConfirmImageOrVideoDelete] =
    useState<boolean>(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [filterMenu, setFilterMenu] = useState<null | HTMLElement>(null);
  const openFilterMenu = Boolean(filterMenu);
  const [selectedImage, setSelectedImage] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [selectedVideo, setSelectedVideo] = useState({
    Thumbnail: '',
    Title: '',
    Description: '',
  });
  const [embedData, setEmbedData] = useState({});
  const [createquizmutate] = useMutation(createContentType, {
    context: {
      headers: {
        language: localStorage.getItem('lang'),
        sitename: getSelectedSite(),
      },
    },
  });
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [galleryType, setGalleryType] = useState<string>('Images');
  const [isImageOrVideoDeletePopop, setIsImageOrVideoDeletePopup] =
    useState(false);
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [openSocialShareModal, setSocialShareModal] = useState(false);
  const [openEmbedModal, setOpenEmbedModal] = useState(false);
  const [language, setLanguage] = useState<string[]>([]);
  const [existLangContent, setLangContent] = useState('');
  const gcpUrl = process.env.REACT_APP_GCP_URL;
  const BucketName = process.env.REACT_APP_BUCKET_NAME;
  const defaultImage = process.env.REACT_APP_DEFAULT_IMAGE;

  useEffect(() => {
    localStorage.setItem('lang', getCurrentLang());
  }, []);
  const pageExistPopup = {
    saveAsDraftTitle: `${contentType} with the same title already exists!`,
    saveAsDraftDescription: 'Are you sure you want to continue?',
    saveAsDraftCloseText: 'No',
    saveAsDraftConfirmText: 'Yes',
  };
  const unpublishPopup = {
    unpublishTitle: `Unpublish ${contentType}`,
    unpublishDescription: `Are you sure you want to unpublish the ${contentType}?`,
    unpublishCloseText: 'No',
    unpublishConfirmText: 'Yes',
  };
  const deletePopup = {
    deleteTitle: 'Are you sure?',
    deleteDescription: `Do you really want to delete this ${contentType}?. This process cannot be undone.`,
    deleteCloseText: 'No, Keep it!',
    deleteConfirmText: 'Yes, Delete it!',
  };
  const { deleteTitle, deleteDescription, deleteCloseText, deleteConfirmText } =
    deletePopup;
  const {
    unpublishTitle,
    unpublishDescription,
    unpublishCloseText,
    unpublishConfirmText,
  } = unpublishPopup;
  const defaultSocialImage = defaultFalBackImage();
  const defaultEmbedImage =
    'https://platx-dspace-dev.fanuep.com/server/api/core/bitstreams/3e74f70e-7064-4bc9-a9a1-40ba01ecbef9/content';
  const socialShareData = {
    Title: selectedContent?.title,
    Description: selectedContent?.description,
    Page: selectedContent?.page,
    PageSettings: {
      SocialOgTitle: selectedContent?.title,
      SocialOgImage:
        selectedContent?.tag_name === 'Quiz'
          ? selectedContent?.settingsProperties?.socialog_image
            ? selectedContent?.settingsProperties?.socialog_image
            : defaultSocialImage
          : selectedContent?.tag_name === 'Poll'
          ? selectedContent?.settingsProperties?.socialog_image
            ? selectedContent?.settingsProperties?.socialog_image
            : defaultSocialImage
          : selectedContent?.thumbnail_image
          ? selectedContent?.thumbnail_image
          : '',
      SocialOgDescription: selectedContent?.description,
    },
    Caption: '',
    ShareType: '',
    ScheduleDate: '',
    NetworkType: '',
    postURL: '',
    contentType: selectedContent?.contentType,
    reSchedulePostUrl: '',
    Thumbnail:
      selectedContent?.tag_name === 'Quiz'
        ? selectedContent?.settingsProperties?.socialog_image
          ? selectedContent?.settingsProperties?.socialog_image
          : defaultSocialImage
        : selectedContent?.tag_name === 'Poll'
        ? selectedContent?.settingsProperties?.socialog_image
          ? selectedContent?.settingsProperties?.socialog_image
          : defaultSocialImage
        : selectedContent?.thumbnail_image
        ? selectedContent?.thumbnail_image
        : defaultSocialImage,
    CurrentPageURL: selectedContent?.current_page_url,
  };
  const getDuplicateTitle = () => {
    const newVal = `${t('copy_of')} ${selectedContent?.title}`.trim();
    const duplicateContentTitle =
      newVal.length > 100 ? newVal.slice(0, 100) : newVal;
    return duplicateContentTitle.trim();
  };
  const getContent = (index, length) => {
    if (contentType) {
      setIsLazyLoad(true);
      setLoading(true);
      runFetchContentList({
        variables: {
          contentType: contentType,
          pageFilter: filterValue,
          pagination: { start: index, rows: length },
          sort: sortOrder,
          searchTerm: fromSearch,
        },
      })
        .then((resp) => {
          dispatch(
            updateInitialState(resp?.data?.authoring_getContentTypeItems)
          );
          if (resp?.data?.authoring_getContentTypeItems?.length < 10) {
            setIsLazyLoad(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(JSON.stringify(err, null, 2));
        });
    }
  };
  const commonfields = {
    background_content: {
      objectType: selectedContent?.background_content?.objectType,
      Url: selectedContent?.background_content?.Url,
      Title: '',
      Thumbnail: selectedContent?.background_content?.Url,
      Color: selectedContent?.background_content?.Color,
    },
    display_scores: selectedContent?.display_scores,
  };
  const [arr, setArr] = useState<
    {
      id: string;
      value: string;
    }[]
  >([]);

  const createContent = (IsDuplicate = false, title = '', isCalled = false) => {
    let temp = '';
    let url = '';
    if (title) {
      url = formatUrl(title);
      setSelectedContent({ ...selectedContent, page: title });
    } else {
      url = selectedContent?.page;
    }
    const tempObjField =
      contentType === 'Quiz'
        ? {
            ...commonfields,
            questions: selectedContent?.questions,
            result_range_1: selectedContent?.result_range_1,
            result_range_2: selectedContent?.result_range_2,
            result_range_3: selectedContent?.result_range_3,
            result_range_4: selectedContent?.result_range_4,
          }
        : contentType === 'Event'
        ? {
            // ...commonfields,
            banner_image: selectedContent?.banner_image,
            thumbnail_image: selectedContent?.thumbnail_image,
            actual_address: selectedContent?.actual_address,
            event_end_date: selectedContent?.event_end_date,
            event_start_date: selectedContent?.event_start_date,
            virtual_address: selectedContent?.virtual_address,
            google_api_address: selectedContent?.google_api_address,
          }
        : contentType === 'Article'
        ? {
            banner: selectedContent?.banner,
            sub_title: selectedContent?.sub_title,
            published_images: selectedContent?.published_images,
            original_image: selectedContent?.original_image,
          }
        : {
            ...commonfields,
            question_background_content:
              selectedContent?.question_background_content,
            // background_color: selectedContent?.background_color,
            poll_description: selectedContent?.poll_description,
            poll_question: selectedContent?.poll_question,
            poll_result: selectedContent?.poll_result,
            poll_title: selectedContent?.poll_title,
            // poll_answer_image: selectedContent?.poll_answer_image,
            options_compound_fields: selectedContent?.options_compound_fields,
            start_date: selectedContent?.creationDate,
            end_date: selectedContent?.end_date,
          };
    const contentToSend = {
      CommonFields: {
        analytics: '',
        analytics_enable: selectedContent?.analytics_enable,
        category: selectedContent?.category,
        createdBy: selectedContent?.createdBy,
        creationDate: new Date().toISOString(),
        current_page_url: `/${url}`,
        description: selectedContent?.description,
        is_edit: selectedContent?.is_edit,
        modificationDate: new Date().toISOString(),
        others: selectedContent?.others,
        page: url,
        page_lastmodifiedby: selectedContent?.createdBy,
        page_state: 'DRAFT',
        parent_page_url: '/',
        robot_txt: selectedContent?.robot_txt,
        seo_enable: selectedContent?.seo_enable,
        settings: selectedContent?.settingsProperties,
        short_description: selectedContent?.short_description,
        short_title: selectedContent?.short_title,
        site_name: selectedContent?.site_name,
        sitemap: selectedContent?.sitemap,
        structure_data: selectedContent?.structure_data,
        tags: selectedContent?.tags,
        title: url,
        IsConfirm: IsDuplicate,
      },
      ObjectFields: {
        ...tempObjField,
      },
    };
    if (!isCalled) {
      language.map((lang) => {
        LanguageList.map((l) => {
          if (l.value === lang) {
            localStorage.setItem('lang', l.id);
            createquizmutate({
              variables: {
                contenttype: contentType,
                input: contentToSend,
              },
              context: {
                headers: {
                  language: localStorage.getItem('lang'),
                  sitename: getSelectedSite(),
                },
              },
            })
              .then((resp) => {
                localStorage.removeItem('lang');
                if (resp?.data?.authoring_createContent?.isExist) {
                  temp += `${l.value},`;
                  setLangContent(temp);
                  setOpenPageExistModal(true);
                  setArr((prev) => [...prev, { id: l.id, value: lang }]);
                } else {
                  const pathArr =
                    resp?.data?.authoring_createContent?.path.split('/');
                  const path = pathArr[pathArr.length - 1];
                  showToastSuccess(
                    `${contentType} ${t('duplicated_toast')} ${t('for')} ${
                      l.value
                    }`
                  );
                  getContent(0, 20);
                  // navigate(
                  //   `/content/create-${contentType?.toLowerCase()}?path=${path}`
                  // );
                }
              })
              .catch((error) => {
                console.log(JSON.stringify(error, null, 2));
                showToastError(t('api_error_toast'));
              });
          }
        });
      });
    } else {
      arr.map((val) => {
        localStorage.setItem('lang', val.id);
        createquizmutate({
          variables: {
            contenttype: contentType,
            input: contentToSend,
          },
          context: {
            headers: {
              language: localStorage.getItem('lang'),
              sitename: getSelectedSite(),
            },
          },
        })
          .then((resp) => {
            localStorage.removeItem('lang');
            if (resp?.data?.authoring_createContent?.isExist) {
              setOpenPageExistModal(true);
            } else {
              const pathArr =
                resp?.data?.authoring_createContent?.path.split('/');
              const path = pathArr[pathArr.length - 1];
              showToastSuccess(
                `${contentType} ${t('duplicated_toast')} ${t('for')} ${
                  val.value
                }`
              );
              getContent(0, 20);
            }
          })
          .catch((error) => {
            console.log(JSON.stringify(error, null, 2));
            showToastError(t('api_error_toast'));
          });
      });
      setArr([]);
    }
    setShowDuplicateModal(false);
  };
  //Functions to handle Page Exist modal
  const pageExistNoButtonHandle = () => {
    setOpenPageExistModal(false);
    setArr([]);
  };
  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    createContent(true, '', true);
  };
  const pageExistCrossButtonHandle = () => {
    setOpenPageExistModal(false);
  };

  //Function to set Image/Video to default
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

  const onClickClose = () => {
    setShowDuplicateModal(false);
  };

  const handleImageOrVedioDelete = (type) => {
    setGalleryType(type);
    setIsImageOrVideoDeletePopup(true);
    setConfirmImageOrVideoDelete(false);
  };

  const handleSelectedImage = (image) => {
    setSelectedImage(image);
  };

  const handleSelectedVideo = (video) => {
    setSelectedVideo(video);
  };

  //Toggle Gallery from settings file
  const toggleGallerySettings = (toggleState, type) => {
    setSelectedImage({ Title: '', Description: '', Thumbnail: '' });
    setGalleryState(toggleState);
    setGalleryType(type);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setFilterMenu(event.currentTarget);
  };

  const openSettingsPanel = (path) => {
    navigate(
      `/content/create-${contentType?.toLowerCase()}?path=${path}&open=socialShare`
    );
  };

  const closeContentSettingsPanel = () => {
    setContentSettingsPanelState(false);
  };

  const handleFilterClose = () => {
    setFilterMenu(null);
  };

  const handleGridView = () => {
    setListView('Grid');
  };

  const handleListView = () => {
    setListView('List');
  };

  const handlePublishedPageView = (contentPayload, fromView: boolean) => {
    if (contentPayload?.page_state === 'published' || fromView) {
      window.open(
        `${authInfo.publishUri + i18n.language}/${contentType?.toLowerCase()}${
          contentPayload?.current_page_url
        }`
      );
    } else if (
      contentPayload?.page_state === 'draft' ||
      contentPayload?.page_state == 'unpublished'
    ) {
      const qusArry = [];
      if (selectedContent?.questions?.length && contentType === 'Quiz') {
        selectedContent?.questions?.map((qus) => {
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
        const tempObj = { ...selectedContent, questions: qusArry, contentType };
        dispatch(previewContent(tempObj));
        navigate('/content-preview');
      } else if (contentType === 'Poll') {
        dispatch(previewContent({ ...selectedContent, contentType }));
        navigate('/content-preview');
      } else if (contentType === 'Event') {
        const eventtoPreview = {
          ...selectedContent,
          settings: selectedContent?.settingsProperties,
          PageTags: selectedContent?.tags,
          lastModifiedDate: selectedContent?.modificationDate,
          last_modification_date: selectedContent?.modificationDate,
          AnalyticsEnable: selectedContent?.analytics_enable,
        };
        dispatch(previewContent({ ...eventtoPreview, contentType }));
        navigate('/content-preview');
      } else {
        showToastError(t('preview_toast'));
      }
    }
  };
  const handleCopy = (pageUrl) => {
    const text = `${
      process.env.REACT_APP_PUBLISH_URI + i18n.language
    }/${contentType.toLowerCase()}${pageUrl}`;
    if (pageUrl) {
      navigator.clipboard.writeText(text);
      showToastSuccess(t('url_copy_toast'));
    } else {
      showToastError(t('api_error_toast'));
    }
  };

  const handleDuplicate = () => {
    if (selectedContent?.title !== '') {
      setShowDuplicateModal(true);
    }
  };

  const getContentData = (index) => {
    runFetchContentList({
      variables: {
        contentType: contentType,
        pageFilter: filterValue,
        pagination: { start: index, rows: rows },
        sort: sortOrder,
        searchTerm: content.contentProp,
      },
    })
      .then((res) => {
        if (res?.data?.authoring_getContentTypeItems?.length > 0) {
          dispatch(updateContentList(res?.data?.authoring_getContentTypeItems));
        }
        if (res?.data?.authoring_getContentTypeItems?.length == 0) {
          setIsLazyLoad(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        showToastError(t('api_error_toast'));
      });
  };

  useEffect(() => {
    getContent(0, rows);
  }, [filterValue, fromSearch]);

  const fetchMoreData = () => {
    const nextIndex = startIndex + rows;
    setStartIndex(() => nextIndex);
    getContentData(nextIndex);
  };
  const deleteContent = () => {
    const contentInfo = {
      page: selectedContent?.page,
      current_page_url: selectedContent?.current_page_url,
      parent_page_url: selectedContent?.parent_page_url,
    };
    mutateDelete({
      variables: {
        contentInfo: contentInfo,
        contentType: contentType,
      },
    })
      .then(() => {
        showToastSuccess(`${contentType} ${t('deleted_toast')}`);
        getContent(0, content?.contentArray?.length);
      })
      .catch(() => {
        setLoading(false);
        showToastError(t('api_error_toast'));
      });
  };
  const handleUnpublishContent = (calledFromDelete = false) => {
    mutateUnpublish({
      variables: {
        contenttype: contentType,
        input: {
          page: selectedContent?.page,
          status: 'depublish',
        },
      },
    })
      .then(() => {
        if (calledFromDelete) {
          deleteContent();
        } else {
          showToastSuccess(`${contentType} ${t('unpublished_toast')}`);
          getContent(0, rows);
        }
      })
      .catch(() => {
        showToastError(t('api_error_toast'));
      });
  };
  function handleDeleteContent() {
    if (selectedContent?.page_state == 'PUBLISHED') {
      handleUnpublishContent(true);
    } else {
      deleteContent();
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    window?.history?.pushState({}, '', searchPageUrl);
    setFilterValue(() => (event.target as HTMLInputElement).value);
    handleFilterClose();
  };

  useEffect(() => {
    setLoading(true);
    dispatch(previewContent({}));
    if (contentType) {
      dispatch(updateInitialState([]));
      runFetchContentList({
        variables: {
          contentType: contentType,
          pageFilter: filterValue,
          pagination: { start: startIndex, rows: rows },
          sort: sortOrder,
          searchTerm: content.contentProp,
        },
      })
        .then((res) => {
          if (res?.data?.authoring_getContentTypeItems) {
            dispatch(
              updateInitialState(res?.data?.authoring_getContentTypeItems)
            );
          } else {
            setIsLazyLoad(false);
          }
          if (res?.data?.authoring_getContentTypeItems?.length < 10) {
            setIsLazyLoad(false);
          }
          setLoading(false);
        })
        .catch((err) => {
          setIsLazyLoad(false);
          setLoading(false);
          console.log(JSON.stringify(err, null, 2));
          showToastError(t('no_results_toast'));
        });
    }
  }, [contentType, content.contentProp]);
  const confirmDelete = () => {
    setIsDelete(true);
  };
  const deleteCloseButtonHandle = () => {
    setIsDelete(false);
  };
  const deleteConfirmButtonHandle = () => {
    handleDeleteContent();
    setIsDelete(false);
  };
  const confirmUnpublish = () => {
    setIsUnpublish(true);
  };
  const unpublishCloseButtonHandle = () => {
    setIsUnpublish(false);
  };
  const unpublishConfirmButtonHandle = () => {
    handleUnpublishContent();
    setIsUnpublish(false);
  };
  const handleEmbed = () => {
    setOpenEmbedModal(true);
  };
  const handleSocialShare = () => {
    setSocialShareModal(true);
  };
  const closeButtonHandle = () => {
    setSocialShareModal(false);
    // alert('test');
  };
  const closeEmbedButtonHandle = () => {
    setOpenEmbedModal(false);
    setEmbedData({});
  };
  const gridListViewLoaderDesktop = (viewType = '') => {
    if (viewType === 'List') {
      return <ArticleListDesktopLoader />;
    }
    return <ContentGridLoader />;
  };

  const gridListViewLoaderMobile = (viewType = '') => {
    if (viewType === 'List') {
      return <ArticleListMobileLoader />;
    }
    return <ContentGridLoader />;
  };
  const createContentNew = () => {
    navigate(`/content/create-${contentType?.toLowerCase()}`);
  };
  useEffect(() => {
    const embedTempData = {
      Title: selectedContent?.title,
      Description: selectedContent?.description,
      Thumbnail:
        selectedContent?.tag_name === 'Quiz'
          ? selectedContent?.settingsProperties?.socialog_image
            ? selectedContent?.settingsProperties?.socialog_image
            : defaultEmbedImage
          : selectedContent?.tag_name === 'Poll'
          ? selectedContent?.settingsProperties?.socialog_image
            ? selectedContent?.settingsProperties?.socialog_image
            : defaultEmbedImage
          : selectedContent?.thumbnail_image
          ? selectedContent?.thumbnail_image
          : defaultEmbedImage,
      Author: selectedContent?.createdBy,
      lastModifiedDate: selectedContent?.creationDate,
      Page: selectedContent?.page,
    };
    setEmbedData(embedTempData);
  }, [selectedContent]);
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: { xs: '10px', md: '15px 20px' },
          borderBottom: '1px solid #ced3d9',
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="h3bold" sx={{ textTransform: 'capitalize' }}>
              {contentType === 'Event'
                ? `${t(contentType.toLowerCase())}s`
                : t(contentType.toLowerCase())}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Box
              onClick={handleFilterClick}
              sx={{
                marginRight: '10px',
                borderRadius: '3px',
                border: '1px solid #ced3d9',
                display: { xs: 'none', md: 'flex' },
                cursor: 'pointer',
                fontSize: '12px',
                alignItems: 'center',
                backgroundColor: '#fff',
                minWidth: '40px',
                height: '40px',
                justifyContent: 'center',
                color: '#5c6574',
              }}
            >
              <TuneIcon
                sx={{
                  verticalAlign: 'middle',
                  fontSize: { xs: '18px', md: '20px' },
                }}
              />
            </Box>
            <Box
              sx={{
                marginRight: '10px',
                borderRadius: '3px',
                border: '1px solid #ced3d9',
                display: { xs: 'flex', md: 'none' },
                cursor: 'pointer',
                fontSize: '12px',
                alignItems: 'center',
                backgroundColor: '#fff',
                minWidth: '40px',
                height: '40px',
                justifyContent: 'center',
                color: '#5c6574',
              }}
            >
              <MobileListFilter
                filterValue={filterValue}
                handleChange={handleChange}
                contentType={contentType}
              />
            </Box>
            {listView === 'List' && (
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '3px',
                  marginRight: { xs: '0px', md: '10px' },
                  border: '1px solid #ced3d9',
                  cursor: 'pointer',
                  minWidth: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5c6574',
                }}
                onClick={handleGridView}
              >
                <GridViewSharpIcon
                  sx={{
                    verticalAlign: 'middle',
                    fontSize: { xs: '18px', md: '20px' },
                  }}
                />
              </Box>
            )}
            {listView === 'Grid' && (
              <Box
                sx={{
                  backgroundColor: '#FFF',
                  padding: { xs: '4px 6px', md: '4px 7px' },
                  border: '1px solid #ced3d9',
                  borderRadius: '3px',
                  marginRight: { xs: '0px', md: '10px' },
                  cursor: 'pointer',
                  minWidth: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5c6574',
                }}
                onClick={handleListView}
              >
                <FormatListBulletedIcon
                  sx={{
                    fontSize: { xs: '18px', md: '20px' },
                    verticalAlign: 'middle',
                  }}
                />
              </Box>
            )}
            <Menu
              elevation={0}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              anchorEl={filterMenu}
              open={openFilterMenu}
              onClose={handleFilterClose}
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
                  padding: '0 18px',
                },
                '.form_Control': {
                  margin: '0 -18px !important',
                  '.form_Control_radio': {
                    display: 'none',
                    '& + span': {
                      fontSize: '12px',
                    },
                  },
                  label: {
                    margin: '0 !important',
                    padding: '5px 12px',
                    '&:has(> span.Mui-checked)': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      fontWeight: '500',
                    },
                  },
                },
              }}
            >
              <Filter
                filterValue={filterValue}
                handleChange={handleChange}
                handleCloseFilter={handleFilterClose}
                contentType={contentType}
              />
            </Menu>
            <Box
              sx={{
                backgroundColor: '#FFF',
                padding: { xs: '4px 6px', md: '4px 7px' },
                border: '1px solid #ced3d9',
                borderRadius: '3px',
                marginRight: { xs: 0, md: '10px' },
                cursor: 'pointer',
                minWidth: '40px',
                height: '40px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#5c6574',
              }}
            >
              <DeleteOutlineIcon
                sx={{
                  fontSize: { xs: '18px', md: '24px' },
                  verticalAlign: 'middle',
                }}
              />
            </Box>

            <ErrorTooltip
              component={
                <Button
                  onClick={createContentNew}
                  disabled={!canCreate}
                  className="addnewpage"
                  variant="contained"
                  sx={{
                    padding: '10px',
                    maxHeight: '40px',
                    display: { xs: 'none', md: 'flex' },
                    textTransform: 'capitalize',
                  }}
                >
                  <AddIcon sx={{ marginRight: '5px' }} /> {t('add_new')}
                </Button>
              }
              doAccess={!canCreate}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          position: 'relative',
          height: 'calc(100vh - 160px)',
          overflowY: 'scroll',
          overflowX: 'hidden',
          paddingBottom: { xs: '150px', sm: '0' },
        }}
        id="scrollableDiv"
      >
        {openSocialShareModal ? (
          <PlateformXSocialDialog
            isDialogOpen={openSocialShareModal}
            closeButtonHandle={closeButtonHandle}
            setSelectedItem={socialShareData}
            contentType={contentType}
          />
        ) : null}
        {openEmbedModal ? (
          <EmbedDialog
            isDialogOpen={openEmbedModal}
            closeEmbedButtonHandle={closeEmbedButtonHandle}
            setSelectedItem={embedData}
            contentType={convertToLowerCase(contentType)}
          />
        ) : null}
        {isDelete ? (
          <PlateformXDialogDelete
            isDialogOpen={isDelete}
            title={t('delete_title')}
            subTitle={`${t('delete_confirm')} ${t(
              contentType?.toLowerCase()
            )}?. ${t('process_undone')}`}
            closeButtonText={t('no_keep_it')}
            confirmButtonText={t('yes_delete_it')}
            closeButtonHandle={deleteCloseButtonHandle}
            confirmButtonHandle={deleteConfirmButtonHandle}
          />
        ) : null}
        {showDuplicateModal ? (
          <DuplicateContentPopup
            titledata={`${getDuplicateTitle()}`}
            isDialogOpen={showDuplicateModal}
            closeButtonHandle={onClickClose}
            doneButtonHandle={createContent}
            contentType={t(contentType?.toLowerCase())}
            language={language}
            setLanguage={setLanguage}
          />
        ) : null}
        {openPageExistModal ? (
          <PlateformXDialog
            isDialogOpen={openPageExistModal}
            title={`${t(contentType?.toLowerCase())} ${t(
              'duplicate_exists'
            )} ${t('for')} ${existLangContent.substring(
              0,
              existLangContent.length - 1
            )}`}
            subTitle={t('conformation')}
            closeButtonText={t('no')}
            confirmButtonText={t('yes')}
            closeButtonHandle={pageExistNoButtonHandle}
            confirmButtonHandle={pageExistYesButtonHandle}
            crossButtonHandle={pageExistCrossButtonHandle}
            modalType=""
          />
        ) : null}
        {isUnpublish ? (
          <PlateformXDialog
            isDialogOpen={isUnpublish}
            title={`${t('unpublish')} ${t(contentType?.toLowerCase())}`}
            subTitle={`${t('unpublish_confirm')} ${t(
              contentType?.toLowerCase()
            )}`}
            closeButtonText={t('no')}
            confirmButtonText={t('yes')}
            closeButtonHandle={unpublishCloseButtonHandle}
            confirmButtonHandle={unpublishConfirmButtonHandle}
          />
        ) : null}
        {galleryState && (
          <Box
            sx={{
              width: '100%',
              height: '100%',
              top: 0,
              right: 0,
              position: 'fixed',
              zIndex: 99,
            }}
          >
            <Gallery
              handleImageSelected={handleSelectedImage}
              toggleGallery={toggleGallery}
              galleryMode={galleryType}
              handleVideoSelected={handleSelectedVideo}
            />
          </Box>
        )}

        <Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {listView === 'List' && (
              <Grid
                container
                sx={{
                  alignItems: 'center',
                  padding: '15px 25px',
                  borderBottom: '1px solid #ced3d9',
                }}
              >
                <Grid item xs={2.2} sx={{ marginRight: '25px' }}>
                  <Typography
                    variant="h6regular"
                    sx={{
                      color: '#89909a',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('title')}
                  </Typography>
                </Grid>
                <Grid item xs={2.3} sx={{ marginRight: '2.8%' }}>
                  <Typography
                    variant="h6regular"
                    sx={{
                      color: '#89909a',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('description')}
                  </Typography>
                </Grid>
                <Grid item xs={1} sx={{ marginRight: '3.2%' }}>
                  <Typography
                    variant="h6regular"
                    sx={{
                      color: '#89909a',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('author')}
                  </Typography>
                </Grid>
                <Grid item xs={2.6} sx={{ marginRight: '3%' }}>
                  <Typography
                    variant="h6regular"
                    sx={{
                      color: '#89909a',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('modified_time')}
                  </Typography>
                </Grid>
                <Grid item xs={1.4} sx={{ marginRight: '3.1%' }}>
                  <Typography
                    variant="h6regular"
                    sx={{
                      color: '#89909a',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('state')}
                  </Typography>
                </Grid>
                <Grid item xs={0.5}>
                  <Typography
                    variant="h6regular"
                    sx={{
                      color: '#89909a',
                      fontWeight: '600',
                      textTransform: 'capitalize',
                    }}
                  >
                    {t('action')}
                  </Typography>
                </Grid>
              </Grid>
            )}

            {isloading ? (
              <>{gridListViewLoaderDesktop(listView)}</>
            ) : (
              <>
                <InfiniteScroll
                  dataLength={
                    content?.contentArray?.length
                      ? content?.contentArray?.length
                      : 0
                  }
                  next={fetchMoreData}
                  hasMore={isLazyLoad}
                  loader={gridListViewLoaderDesktop(listView)}
                  scrollableTarget="scrollableDiv"
                  style={{ overflowX: 'hidden' }}
                >
                  <Box>
                    {listView === 'List' ? (
                      <Box sx={{ display: 'Grid' }}>
                        {content?.contentArray?.map((item, index) => (
                          <ContentListDesktop
                            listItem={item}
                            index={index}
                            setSelectedItem={setSelectedContent}
                            handleUnpublish={confirmUnpublish}
                            handleDelete={confirmDelete}
                            handleCopy={handleCopy}
                            handleDuplicate={handleDuplicate}
                            handlePublishedPageView={handlePublishedPageView}
                            openItemSettingsPanel={openSettingsPanel}
                            handleSocialShare={handleSocialShare}
                            handleEmbed={handleEmbed}
                            contentType={contentType}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Box
                        sx={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          padding: '0 10px',
                        }}
                      >
                        {content?.contentArray?.map((item, index) => {
                          return (
                            <ContentListGrid
                              listItem={item}
                              index={index}
                              setSelectedItem={setSelectedContent}
                              handleUnpublish={confirmUnpublish}
                              handleDelete={confirmDelete}
                              handleCopy={handleCopy}
                              handleDuplicate={handleDuplicate}
                              handlePublishedPageView={handlePublishedPageView}
                              openItemSettingsPanel={openSettingsPanel}
                              handleSocialShare={handleSocialShare}
                              handleEmbed={handleEmbed}
                              contentType={contentType}
                              icon={
                                contentType === 'Quiz' ? (
                                  <img
                                    src={QuizIcon}
                                    style={{
                                      marginRight: '4px',
                                      width: '20px',
                                      height: '20px',
                                      filter: 'brightness(0) invert(1)',
                                    }}
                                  />
                                ) : (
                                  <BarChartIcon
                                    sx={{ fill: ThemeConstants.WHITE_COLOR }}
                                  />
                                )
                              }
                            />
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                </InfiniteScroll>
              </>
            )}
          </Box>
          <Box sx={{ display: { sm: 'none' } }}>
            {isloading ? (
              <>{gridListViewLoaderMobile(listView)}</>
            ) : (
              <>
                {nullToArray(contentArray).length !== 0 && (
                  <InfiniteScroll
                    dataLength={
                      content?.contentArray?.length
                        ? content?.contentArray?.length
                        : 0
                    }
                    next={() => {
                      console.log('Clicked');
                    }}
                    hasMore={isLazyLoad}
                    loader={gridListViewLoaderMobile(listView)}
                    scrollableTarget="scrollableDiv"
                    style={{ overflowX: 'hidden' }}
                  >
                    <Box>
                      {listView === 'List' ? (
                        <Box>
                          {content?.contentArray?.map((item, index) => (
                            <ContentListMobile
                              listItem={item}
                              handleChange={handleChange}
                              openItemSettingsPanel={openSettingsPanel}
                              setSelectedItem={setSelectedContent}
                              handleUnpublish={confirmUnpublish}
                              handleDelete={confirmDelete}
                              handleCopy={handleCopy}
                              handleDuplicate={handleDuplicate}
                              handlePublishedPageView={handlePublishedPageView}
                              handleSocialShare={handleSocialShare}
                              handleEmbed={handleEmbed}
                              contentType={contentType}
                            />
                          ))}
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            padding: '0 10px',
                          }}
                        >
                          {content?.contentArray?.map((item, index) => {
                            return (
                              <ContentListGrid
                                listItem={item}
                                index={index}
                                setSelectedItem={setSelectedContent}
                                handleUnpublish={confirmUnpublish}
                                handleDelete={confirmDelete}
                                handleCopy={handleCopy}
                                handleDuplicate={handleDuplicate}
                                handlePublishedPageView={
                                  handlePublishedPageView
                                }
                                openItemSettingsPanel={openSettingsPanel}
                                handleSocialShare={handleSocialShare}
                                handleEmbed={handleEmbed}
                                contentType={contentType}
                                icon={
                                  contentType === 'Quiz' ? (
                                    <img
                                      src={QuizIcon}
                                      style={{
                                        marginRight: '4px',
                                        width: '20px',
                                        height: '20px',
                                        filter: 'brightness(0) invert(1)',
                                      }}
                                    />
                                  ) : (
                                    <BarChartIcon />
                                  )
                                }
                              />
                            );
                          })}
                        </Box>
                      )}
                    </Box>
                  </InfiniteScroll>
                )}
              </>
            )}
          </Box>
          {nullToArray(contentArray).length === 0 && !isloading ? (
            <Box
              sx={{ textAlign: 'center', marginTop: { xs: '30%', sm: '10%' } }}
            >
              <img src={NoResults} />
              <Typography
                variant="h5"
                sx={{
                  color: '#c3c3c3',
                }}
              >
                {fromSearch.length > 0
                  ? t('no_match_results')
                  : `${t('find_any')} ${t(contentType.toLowerCase())} ${t(
                      'to_show'
                    )}`}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </Box>
    </>
  );
};
