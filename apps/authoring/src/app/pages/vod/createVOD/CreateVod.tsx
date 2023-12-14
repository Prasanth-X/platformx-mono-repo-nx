import { useLazyQuery, useMutation } from '@apollo/client';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Divider,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import AddImage from '../../../components/Common/AddImage';
import AutoTextArea from '../../../components/Common/AutoTextArea';
import TextBox from '../../../components/Common/TextBox';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import '../../../components/Common/commonStyles/disabledStyles.css';
import Icons from '../../../components/Icons';
import PlateformXDialog from '../../../components/Modal';
import VodPageScroll from '../../../components/Common/PageScroll';
import {
  showToastError,
  showToastSuccess,
} from '../../../components/toastNotification/toastNotificationReactTostify';
import useAccess from '../../../hooks/usePermissions/useAccess';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import { fetchTagList } from '../../../services/common/tags.aps';
import {
  create_vod,
  fetchVodById,
  publish_vod,
  update_vod,
} from '../../../services/vod/vod.api';
import { Store } from '../../../store/ContextStore';
import { ContentType } from '../../../utils/Enums/ContentType';
import { CATEGORY_CONTENT } from '../../../utils/constants';
import Gallery from '../../Gallery/Gallery';
import { HeadButton } from '../Components/CreateHeaderButtons/HeadButton';
import TagListing from '../TagListing';
import { checkIfUnsavedChanges, previewVod } from '../store/Actions';
// import { DEF_VOD } from './Utils/constats';
import icons, {
  DEF_VOD,
  BEFORE_UNLOAD,
  CANCEL,
  DRAFT,
  EVENT,
  IMAGE_URL,
  PATH,
  POP_STATE,
  PUBLISHED,
  SCROLL,
  SEO,
  SOCIAL_SHARE,
  SOCIAL_SHARE_IMG_URL,
  seo,
} from './Utils/constats';
import {
  createVodInstance,
  updateStructureData,
  updateVodSettings,
  isInViewport,
} from './Utils/helper';
import { ChooseVideoTray } from './components/chooseVideoTray/ChooseVideoTray';
import { GridRowWrap } from './components/gridRowWrap/GridRowWrap';
import './createVod.css';
import { useStyles } from './createVod.styles';
import { DspaceObject } from './createVod.types';
import CommonBoxWithNumber from '../../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import useWorkflow from '../../../hooks/useWorkflow/useWorkflow';
import { capitalizeFirstLetter } from '../../../utils/helperFunctions';
import { workflowKeys } from '../../../components/Submit/Utils/contstants';
import Submit from '../../../components/Submit/Submit';

export const CreateVod = () => {
  const { getWorkflowDetails, workflowRequest } = useWorkflow();
  const [workflowStatus, setWorkflowStatus] = useState(true);
  const [showWorkflowSubmit, setShowWorkflowSubmit] = useState(false);
  const workflowSubmitRequest = async (workflowObj, status) => {
    const { success, workflow_status } = await workflowRequest(
      workflowObj,
      status
    );
    if (success) {
      workflow_status === workflowKeys.publish.toLowerCase() &&
      status === workflowKeys.approve
        ? setShowPublishConfirm(true)
        : setShowWorkflowSubmit(true);
    }
  };
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { canAccessAction } = useAccess();
  const navigate = useNavigate();
  const params = useParams();
  const updateTempObj = useRef<any>({});
  const { state, dispatch } = useContext(Store);
  const { vod } = state;
  const [getSession] = useUserSession();
  const { userInfo,role } = getSession();
  const login_user_id = userInfo?.user_id;
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const vodPageUrl = new URL(window.location.href);
  const [isDraft, setIsDraft] = useState<boolean>(true);
  const [draftPageURL, setDraftPageURL] = useState<string>('');
  const [isVodCreated, setVodCreated] = useState<boolean>(
    vodPageUrl.searchParams.get('path') ? true : false
  );
  const [runFetchVodById] = useLazyQuery(fetchVodById);
  const [parentToolTip, setParentToolTip] = useState('');
  const [scrollToView, setScrollToView] = useState('');
  const [runFetchTagList] = useLazyQuery(fetchTagList);
  const [mutatePublish] = useMutation(publish_vod);
  const currentVodData = useRef(
    vodPageUrl.searchParams.get('path')
      ? (vodPageUrl.searchParams.get('path') as string)
      : ''
  );
  const [createVodMutate] = useMutation(create_vod);
  const [updateVodMutate] = useMutation(update_vod);
  const [openSaveModal, setOpenSaveModal] = useState<boolean>(false);
  const [openPageExistModal, setOpenPageExistModal] = useState<boolean>(false);
  const [tagData, setTagData] = useState<any>({});
  const [selectedTag, setSelectedTag] = useState<any>([]);
  const [vodInstance, setVodInstance] = useState<any>({});
  const [workflow, setWorkflow] = useState({});

  useEffect(() => {
    if (Object.keys(vodInstance).length === 0 && !params.id) {
      setVodInstance(createVodInstance(username));
    }
    if (currentVodData.current === '') {
      getWorkflowDetails(
        role,
        login_user_id,
        setWorkflow,
        capitalizeFirstLetter(ContentType.Vod)
      );
    }
  }, []);

  const updateField = (updatedPartialObj, callPreview = false) => {
    updateTempObj.current = updatedPartialObj;
    const modifiedVod = {
      ...JSON.parse(JSON.stringify(vodInstance)),
      ...updatedPartialObj,
      lastModifiedDate: new Date(),
    };
    setVodInstance(modifiedVod);
    if (callPreview) {
      dispatch(previewVod(modifiedVod));
      navigate('/vod-preview');
    }
  };
  const scrollHandler = () => {
    if (isInViewport(seo, true)) {
      setParentToolTip(SEO);
    } else {
      const active = icons.find((i) => isInViewport(i.id, false));
      if (active && active.tooltip !== parentToolTip) {
        setParentToolTip(active.tooltip);
      }
    }
  };
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);
  const unsavedChanges = useRef<boolean>(state.vod.isUnsavedVod);
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const galleryType = useRef<string>('Video');
  const disableSave = useRef<boolean>(false);
  const vodRef = useRef<any>(
    state.vod.currentVod ? state.vod.currentVod : DEF_VOD
  );
  const tagRef = useRef<any>([]);
  const [isPublishDisabled, setPublishDisabled] = useState<boolean>(true);
  const [isDraftDisabled, setDraftDisabled] = useState<boolean>(true);

  const updateCurrentInstance = (pageURL, callPreview = false) => {
    const updatedObj = {
      Page: pageURL ? pageURL : vodRef.current.Page,
      Title: vodRef.current.Title,
      Description: vodRef.current.Description,
      Thumbnail: vodRef.current.Thumbnail,
      DsapceVideoUrl: vodRef.current.DsapceVideoUrl,
      Tags: vodRef?.current?.Tags ? vodRef.current.Tags : tagRef.current,
      CurrentPageURL: `/${pageURL}`,
      PageSettings: {
        ...updateVodSettings(vodRef, currentVodData, i18n.language),
      },
    };
    updateField(updatedObj, callPreview);
  };

  const handelPreview = () => {
    if (!currentVodData.current) {
      updateCurrentInstance(
        vodRef.current.Title.replace(/[^A-Z0-9]+/gi, '-').toLowerCase(),
        true
      );
    } else {
      updateCurrentInstance(currentVodData.current, true);
    }
    dispatch(checkIfUnsavedChanges(unsavedChanges.current));
  };

  const exitWithoutSave = () => {
    setShowExitWarning(false);
    setIsEdited(false);
    navigate('/content/vod');
  };

  const createVod = (pageState, pageExist,isWorkflow = true) => {
    const structureData = updateStructureData(vodRef);
    const vodToSend = {
      ...JSON.parse(JSON.stringify(vodInstance)),
      ...updateTempObj.current,
      Page_State: pageState,
      IsConfirm: pageExist,
      StructureData: JSON.stringify(structureData),
    };
    createVodMutate({
      variables: {
        input: { ...vodToSend, lastModifiedDate: new Date() },
      },
    })
      .then((resp) => {
        if (resp?.data?.authoring_createVod?.isExist) {
          setOpenPageExistModal(true);
        } else {
          const { Page_CreatedBy, Title, Description } = vodToSend;
          // const { Title, Description} = updateTempObj.current;
         const workflowObj = {
          createdBy:Page_CreatedBy,
              title:Title,
              description:Description,
           path: resp?.data?.authoring_createVod?.path,
           workflow_status: workflowKeys.draft,
           tag_name: capitalizeFirstLetter(ContentType.Vod),
           last_modifiedBy: Page_CreatedBy,
         };
         setWorkflow({ ...workflow, ...workflowObj });
         if (isWorkflow) {
           workflowSubmitRequest(workflowObj, workflowKeys.approve);
         }
          unsavedChanges.current = false;
          dispatch(checkIfUnsavedChanges(unsavedChanges.current));
          setOpenPageExistModal(false);
          setIsDraft(false);
          showToastSuccess(`${t('vod')} ${t('created_toast')}`);
          setOpenSaveModal(true);
          // setOpenPageExistModal(false);
          const pageUrl = resp?.data?.authoring_createVod?.path.substring(
            resp?.data?.authoring_createVod?.path.lastIndexOf('/') + 1
          );
          vodRef.current.Page = pageUrl;
          setDraftPageURL(pageUrl);
          setVodCreated(true);
          const tagArrTemp = { ...vodRef.current };
          delete tagArrTemp.Description;
          const res = Object.keys(tagArrTemp).every((key) => tagArrTemp[key]);
          if (
            res &&
            Object.keys(tagArrTemp).length > 0 &&
            tagArrTemp.Tags.length > 0
          ) {
            setPublishDisabled(false);
          } else {
            setPublishDisabled(true);
          }
        }
      })
      .catch((error) => {
        if (error?.graphQLErrors[0]) {
          showToastError(error?.graphQLErrors[0]?.message);
        } else {
          showToastError(t('api_error_toast'));
        }
      });
  };

  const updateVOD = () => {
    const structureData = updateStructureData(vodRef);
    const updateVodToSend = {
      ...updateTempObj.current,
      ...JSON.parse(JSON.stringify(vodInstance)),
      StructureData: JSON.stringify(structureData),
      CurrentPageURL: `/${currentVodData.current}`,
      Page: draftPageURL ? draftPageURL : currentVodData.current,
    };
    delete updateVodToSend.__typename;
    updateVodMutate({
      variables: {
        input: updateVodToSend,
      },
    })
      .then((resp) => {
        const tagArrTemp = { ...vodRef.current };
        delete tagArrTemp.Description;
        const res = Object.keys(tagArrTemp).every((key) => tagArrTemp[key]);
        if (
          res &&
          Object.keys(tagArrTemp).length > 0 &&
          tagArrTemp.Tags.length > 0
        ) {
          setPublishDisabled(false);
        } else {
          setPublishDisabled(true);
        }
        showToastSuccess(`${t('vod')} ${t('updated_toast')}`);
        unsavedChanges.current = false;
        dispatch(checkIfUnsavedChanges(unsavedChanges.current));
        setShowExitWarning(false);
        setIsEdited(false);
      })
      .catch((error) => {
        showToastError(t('api_error_toast'));
        console.log(JSON.stringify(error, null, 2));
      });
  };

  const saveVod = () => {
    if (showExitWarning) {
      setShowExitWarning(false);
      setIsEdited(false);
    }
    if (!currentVodData.current && isDraft) {
      const pageURL = vodRef.current.Title.replace(
        /[^A-Z0-9]+/gi,
        '-'
      ).toLowerCase();
      updateCurrentInstance(pageURL);
      createVod('DRAFT', false);
    } else {
      updateVOD();
    }
  };

  const publishButtonHandel = () => {
    const pageURL = vodRef.current.Title.replace(
      /[^A-Z0-9]+/gi,
      '-'
    ).toLowerCase();

    const updatedObj = {
      Page: pageURL,
      Title: vodRef.current.Title,
      Description: vodRef.current.Description,
      Thumbnail: vodRef.current.Thumbnail,
      DsapceVideoUrl: vodRef.current.DsapceVideoUrl,
      Tags: vodRef?.current?.Tags ? vodRef.current.Tags : tagRef.current,
      CurrentPageURL: `/${pageURL}`,
      PageSettings: {
        ...updateVodSettings(vodRef, currentVodData, i18n.language),
      },
    };
    updateField(updatedObj);
    if (showExitWarning) {
      setShowExitWarning(false);
      setIsEdited(false);
    }
    const structureData = updateStructureData(vodRef);
    const vodToSend = {
      ...JSON.parse(JSON.stringify(vodInstance)),
      ...updateTempObj.current,
      Page_State: 'draft',
      Page_PublishedBy: username,
      Page: draftPageURL
        ? draftPageURL
        : currentVodData.current
        ? currentVodData.current
        : pageURL,
      CurrentPageURL: `/${
        draftPageURL
          ? draftPageURL
          : currentVodData.current
          ? currentVodData.current
          : pageURL
      }`,
      StructureData: JSON.stringify(structureData),
    };
    vodInstance.Page_State = 'draft';
    delete vodToSend.__typename;
    const requestdto = {
      page: draftPageURL
        ? draftPageURL
        : currentVodData.current
        ? currentVodData.current
        : pageURL,
      parentpageurl: '/',
      currentpageurl: `/${
        draftPageURL
          ? draftPageURL
          : currentVodData.current
          ? currentVodData.current
          : pageURL
      }`,
    };
    const { timeZone } = Intl.DateTimeFormat().resolvedOptions();

    mutatePublish({
      variables: {
        input: requestdto,
        vodRequest: vodToSend,
        timeZone: timeZone,
      },
    })
      .then((res) => {
        showToastSuccess(`${t('vod')} ${t('published_toast')}`);
        unsavedChanges.current = false;
        dispatch(checkIfUnsavedChanges(unsavedChanges.current));
        setShowPublishConfirm(true);
      })
      .catch((error) => {
        showToastError(t('api_error_toast'));
      });
  };
  //Functions to handle Page Exist modal
  const pageExistNoButtonHandle = () => {
    setOpenPageExistModal(false);
  };

  const pageExistYesButtonHandle = () => {
    setOpenPageExistModal(false);
    createVod('DRAFT', true);
  };
  //Functions to handle Draft Page modal
  const saveAsDraftViewButtonHandle = () => {
    navigate(`/content/create-vod?path=${vodRef.current?.Page}`);
    setOpenSaveModal(false);
  };

  const saveAsDraftCrossButtonHandle = (event, reason) => {
    if (reason && (reason == 'backdropClick' || 'escapeKeyDown')) return;
    setOpenSaveModal(false);
    navigate(`?path=${vodInstance?.Page}`);
  };

  const [errors, setErrors] = useState<DspaceObject>({
    DsapceVideoUrl: '',
    Thumbnail: '',
    Title: '',
    Description: '',
    Tags: '',
  });

  const handleSelectedImage = (image) => {
    vodRef.current = { ...vodRef.current, Thumbnail: image?.Thumbnail };
    unsavedChanges.current = true;
    setIsEdited(true);
  };
  const handleSelectedVideo = (video) => {
    vodRef.current = {
      ...vodRef.current,
      DsapceVideoUrl: video?.Url,
      Thumbnail: video?.Thumbnail,
      Title: video?.Title,
      Description: video?.Description,
    };
    unsavedChanges.current = true;
    setIsEdited(true);
    disableSave.current = true;
    setDraftDisabled(false);
  };
  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
  };
  const showGallery = (gType) => {
    window.scrollTo(0, 0);
    galleryType.current = gType;
    setGalleryState(true);
  };
  const handleTagOnChange = (event) => {
    let tagsArray: any = vodRef?.current?.Tags
      ? [...vodRef.current.Tags]
      : [...tagRef.current];

    if (event.target.checked) {
      tagsArray = [...tagsArray, event.target.value];
      if (tagsArray?.length > 100) {
        showToastError('You cannot select more than 100 tags.');
        return false;
      }
    } else {
      tagsArray.splice(tagsArray.indexOf(event.target.value), 1);
    }
    if (vod?.currentVod?.Title) {
      disableSave.current = false;
    } else {
      disableSave.current = true;
    }
    tagRef.current = tagsArray;
    vodRef.current = { ...vodRef.current, Tags: tagsArray };
    const tagArrTemp = { ...vodRef.current };
    delete tagArrTemp.Description;
    setSelectedTag(tagsArray);
    setVodInstance({ ...vodInstance, Tags: tagsArray });
    unsavedChanges.current = true;
    setIsEdited(true);
    const res = Object.keys(tagArrTemp).every((key) => tagArrTemp[key]);
    if (
      isVodCreated &&
      res &&
      Object.keys(tagArrTemp).length > 0 &&
      tagArrTemp.Tags.length > 0
    ) {
      setPublishDisabled(false);
    } else {
      setPublishDisabled(true);
    }
  };
  const handleChange = (event) => {
    const name = event.target.name;
    vodRef.current = { ...vodRef.current, [name]: event.target.value };
    unsavedChanges.current = true;
    setIsEdited(true);
    if (event.target.value !== '') setErrors({ ...errors, [name]: '' });
    const clone = { ...errors };
    if (
      name === 'DsapceVideoUrl' &&
      vodRef.current.DsapceVideoUrl !== event.target.value
    ) {
      clone.DsapceVideoUrl = '';
    }
    if (
      name === 'Thumbnail' &&
      vodRef.current.Thumbnail === event.target.value
    ) {
      clone.Thumbnail = '';
    }
    if (name === 'Title' && vodRef.current.Title === event.target.value) {
      clone.Title = '';
    }
    if (event.target.value !== '') {
      clone[name] = '';
    }
    setErrors(clone);
  };

  const backToVodList = () => {
    if (unsavedChanges.current == true) {
      if (vod?.currentVod?.Title) {
        disableSave.current = false;
      } else {
        disableSave.current = true;
      }
      setShowExitWarning(true);
    } else navigate('/content/vod');
  };
  const unloadCallback = (event) => {
    event.preventDefault();
    if (unsavedChanges.current == true) {
      event.returnValue = '';
      return '';
    } else {
      navigate('/content/vod');
    }
  };
  const onBackButtonEvent = (e) => {
    e.preventDefault();
    if (unsavedChanges.current) {
      backToVodList();
    } else {
      window.history.pushState(
        null,
        '',
        window.location.pathname + location?.search
      );
      backToVodList();
    }
  };
  const pageExistCrossButtonHandle = () => {
    setOpenPageExistModal(false);
    window.history.pushState(
      null,
      '',
      window.location.pathname + location?.search
    );
    window.addEventListener('popstate', onBackButtonEvent);
  };
  useEffect(() => {
    if (isEdited) {
      window.history.pushState(
        null,
        '',
        window.location.pathname + location?.search
      );
    }
    window.addEventListener('beforeunload', unloadCallback);
    window.addEventListener('popstate', onBackButtonEvent);
    return () => {
      window.removeEventListener('beforeunload', unloadCallback);
      window.removeEventListener('popstate', onBackButtonEvent);
    };
  }, [isEdited]);

  const tagListComponent = React.useMemo(
    () =>
      tagData &&
      tagData.length > 0 &&
      tagData.map((categories, index) => {
        return (
          <TagListing
            key={index}
            categories={categories}
            updateTagField={handleTagOnChange}
            selectedTags={vodInstance?.Tags}
          />
        );
      }),
    [tagData, selectedTag, vodInstance?.Tags]
  );

  useEffect(() => {
    const tagArrTemp = { ...vodRef.current };
    delete tagArrTemp.Description;
    const res = Object.keys(tagArrTemp).every((key) => tagArrTemp[key]);
    if (
      isVodCreated &&
      res &&
      Object.keys(tagArrTemp).length > 0 &&
      tagArrTemp?.Tags?.length > 0
    ) {
      setPublishDisabled(false);
    } else {
      setPublishDisabled(true);
    }
    if (vodRef.current.Title) {
      setDraftDisabled(false);
    } else {
      setDraftDisabled(true);
    }
  }, [vodRef.current, errors]);

  const onUploadClick = (type) => {
    showGallery(type);
  };
  useEffect(() => {
    if (
      (Object.keys(vod?.currentVod).length > 0 && params.id) ||
      Object.keys(vod?.currentVod).length
    ) {
      setVodInstance(vod?.currentVod);
    } else if (params.id) {
      runFetchVodById({
        variables: { folder: 'vodcontent', path: currentVodData.current },
      })
        .then((resp) => {
          if (resp?.data?.authoring_getCmsVodByPath) {
            const vodObj = resp?.data?.authoring_getCmsVodByPath;
            const tempdata = { ...vodObj };
            delete tempdata.__typename;
            setVodInstance(tempdata);
          }
        })
        .catch((err) => {
          console.error('runFetchErr ', err, JSON.stringify(err, null, 2));
        });
    }
  }, [vod, params.id]);

  useEffect(() => {
    if (currentVodData.current && unsavedChanges.current != true) {
      runFetchVodById({
        variables: { folder: 'vodcontent', path: currentVodData.current },
      })
        .then((res) => {
          if (res?.data?.authoring_getCmsVodByPath) {
            vodRef.current = {
              // ...vodRef.current,
              DsapceVideoUrl:
                res?.data?.authoring_getCmsVodByPath?.DsapceVideoUrl,
              Thumbnail: res?.data?.authoring_getCmsVodByPath?.Thumbnail,
              Title: res?.data?.authoring_getCmsVodByPath?.Title,
              Description: res?.data?.authoring_getCmsVodByPath?.Description,
              Tags: res?.data?.authoring_getCmsVodByPath?.Tags,
            };
            updateField(res?.data?.authoring_getCmsVodByPath);
            updateTempObj.current = res?.data?.authoring_getCmsVodByPath;
            delete updateTempObj.current.__typename;

            const {
              path,
              workflow_status,
              stages,
              tag_name,
              last_modifiedBy,
              createdBy,
              title,
              task_status,
              user_id,
              user_name,
            } = res.data.authoring_getCmsContentByPath;

            setWorkflow({
              path,
              workflow_status,
              stages,
              tag_name,
              last_modifiedBy,
              createdBy,
              role,
              title,
              enable: stages?.length > 0 ? true : false,
              login_user_id,
              task_status,
              task_user_id: user_id,
              task_user_name: user_name,
            });
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    }
    if (Object.keys(tagData).length == 0) {
      runFetchTagList({
        variables: { start: 0, rows: 1000 },
      })
        .then((res) => {
          if (res?.data?.authoring_getTagsList) {
            setTagData(res?.data?.authoring_getTagsList);
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    }
  }, []);

  useEffect(() => {
    if (!currentVodData.current && tagData?.length > 0) {
      handleTagOnChange({
        target: {
          checked: true,
          value: 'Video Card',
        },
      });
    }
  }, [tagData?.length > 0]);

  const theme = useTheme();
  const noWeb = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Box>
        <Box>
          {/* Top Section start */}
          <Grid container className={classes.createHeader}>
            <Grid
              item
              xs={2}
              md={5}
              em={4}
              sm={12}
              sx={{ display: 'flex', alignItems: 'center' }}
            >
            

              <Button
                variant='text'
                startIcon={<ArrowBack />}
                sx={{
                  minWidth: '0px',
                  textTransform: 'capitalize',
                  '&:hover': { backgroundColor: 'transparent' },
                }}
                onClick={backToVodList}
              >
                {!noWeb && (
                  <Typography variant='h4bold'>
                    {currentVodData.current
                      ? `${t('edit')} ${t('vod')}`
                      : t('create_vod')}
                  </Typography>
                )}
              </Button>
            </Grid>
            <Grid
              item
              xs={10}
              md={7}
              em={8}
              sm={12}
              display='flex'
              justifyContent='flex-end'
              alignItems='flex-end'
            >
              <HeadButton
                variant='secondaryButton'
                icon={VisibilityRoundedIcon}
                onclickHandler={handelPreview}
                canAccess={true}
                isDisabled={isDraftDisabled}
                text={t('preview')}
                iconType={'preview'}
              />
              <Box sx={{ margin: { xs: '0 5px', md: '0 10px' } }}>
                <HeadButton
                  variant='secondaryButton'
                  icon={SaveAsRoundedIcon}
                  onclickHandler={saveVod}
                  canAccess={canAccessAction(
                    CATEGORY_CONTENT,
                    ContentType.Vod,
                    'Create'
                  )}
                  isDisabled={isDraftDisabled}
                  text={t('save_as_draft')}
                  iconType={'save'}
                />
              </Box>
              {/* publish button */}
              {/* <HeadButton
                variant='primaryButton'
                icon={TelegramIcon}
                onclickHandler={publishButtonHandel}
                canAccess={canAccessAction(
                  CATEGORY_CONTENT,
                  ContentType.Vod,
                  'publish'
                )}
                isDisabled={isPublishDisabled}
                text={t('publish')}
                iconType={'publish'}
              /> */}
          <Submit
          category={CATEGORY_CONTENT}
          subCategory={ContentType.Vod}
            workflow={workflow}
            handlePublish={publishButtonHandel}
            handleSave={saveVod}
            createComment={()=>{}}
          />
            </Grid>
          </Grid>
          {/* Top Section End */}
          <Divider></Divider>
        </Box>
        <Box
          sx={{
            position: 'relative',
            height: {
              sm: 'calc(100vh - 125px)',
              xs: 'calc(100vh - 45px)',
            },
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'fixed',
              top: '25%',
              right: { sm: '5px', xs: 0 },
              zIndex: 1000,
            }}
          >
            <VodPageScroll
              icons={icons}
              parentToolTip={parentToolTip}
              srollToView={undefined} // srollToView={srollToView}
            />
          </Box>
          {/* Video Start */}
          <Box id='VideoAndThumbnail' className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='01'
              title={t('video_subtitle')}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t('subhead')}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  lg={5}
                  className='leftFiledLast'
                >
                  <TitleSubTitle
                    title={t('video_title')}
                    subTitle={t('video_subtitle')}
                    titleVarient='h6medium'
                    subTitleVarient='h7regular'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                  md={7}
                  lg={7}
                  className='textFiledLast'
                >
                  <ChooseVideoTray
                    ifVideoUrl={vodRef.current?.DsapceVideoUrl}
                    onUploadClick={onUploadClick}
                  />
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>
          {/* Video End */}
          {/* Thumbnail start */}
          <Box id='ImageAndThumbnail' className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='02'
              title={t('choose_the_image')}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t('subhead')}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  lg={5}
                  className='leftFiledLast'
                >
                  <TitleSubTitle
                    title={t('vod_thumbnail_title')}
                    subTitle={t('vod_thumbnail_subtitle')}
                    titleVarient='h6medium'
                    subTitleVarient='h7regular'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                  md={7}
                  lg={7}
                  className='textFiledLast'
                >
                  <AddImage
                    url={vodRef.current?.Thumbnail}
                    onUploadClick={onUploadClick}
                    type='Images'
                  />
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>
          {/* Thumbnail End */}
          {/* Title Desc start */}
          <Box id='titleDescription' className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='03'
              title={t('title_head')}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t('subhead')}
            >
              <Grid container>
                <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                  <TitleSubTitle
                    title={t('vod_title')}
                    subTitle={t('vod_subtitle')}
                    titleVarient='h6medium'
                    subTitleVarient='h7regular'
                  />
                </Grid>
                <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                  <TextBox
                    name='Title'
                    placeHolder={t('vod_title_placeholder')}
                    handleChange={handleChange}
                    maxCharLength={120}
                    state={vodRef?.current?.Title || ''}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  lg={5}
                  className='leftFiledLast'
                >
                  <TitleSubTitle
                    title={t('vod_desciption')}
                    subTitle={t('vod_subdes')}
                    titleVarient='h6medium'
                    subTitleVarient='h7regular'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                  md={7}
                  lg={7}
                  className='textFiledLast'
                >
                  <AutoTextArea
                    name={t('description')}
                    placeHolder={t('vod_desciption_placeholder')}
                    handleChange={handleChange}
                    maxCharLength={1000}
                    state={vodRef?.current?.Description || ''}
                  />
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>
          {/* Title Desc End */}
          {/* Tag Start */}
          <Box id='tags' className={classes.mainStyleWrapper}>
            <CommonBoxWithNumber
              number='04'
              title={t('choose_tags')}
              titleVarient='p3semibold'
              subTitleVarient='p4regular'
              subTitle={t('subhead')}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={5}
                  md={5}
                  lg={5}
                  className='leftFiledLast'
                >
                  <TitleSubTitle
                    title={t('tags')}
                    subTitle={t('choose_your_tags')}
                    titleVarient='h6medium'
                    subTitleVarient='h7regular'
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={7}
                  md={7}
                  lg={7}
                  className='textFiledLast'
                >
                  {tagListComponent}
                </Grid>
              </Grid>
            </CommonBoxWithNumber>
          </Box>
          {/* Tag End */}
        </Box>
      </Box>
      {galleryState && (
        <Gallery
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          galleryMode={galleryType.current}
          handleVideoSelected={handleSelectedVideo}
        />
      )}
      {showPublishConfirm && (
        <PlateformXDialog
          isDialogOpen={showPublishConfirm}
          title={t('congratulations')}
          subTitle={t('publish_process_vod')}
          confirmButtonText={t('go_to_listing')}
          confirmButtonHandle={() => navigate('/content/vod')}
          modalType='publish'
        />
      )}
      {showExitWarning && (
        <PlateformXDialog
          disableConfirmButton={isDraftDisabled}
          isDialogOpen={showExitWarning}
          title={t('save_warn_title')}
          subTitle={t('save_warn_subtitle')}
          closeButtonText={t('take_me_out')}
          confirmButtonText={t('done')}
          closeButtonHandle={exitWithoutSave}
          confirmButtonHandle={saveVod}
          crossButtonHandle={() => {
            setShowExitWarning(false);
          }}
          modalType='unsavedChanges'
        />
      )}
      {openPageExistModal && (
        <PlateformXDialog
          isDialogOpen={openPageExistModal}
          title={`${t('vod')} ${t('duplicate_exists')}`}
          subTitle={t('conformation')}
          closeButtonText={t('no')}
          confirmButtonText={t('yes')}
          closeButtonHandle={pageExistNoButtonHandle}
          confirmButtonHandle={pageExistYesButtonHandle}
          crossButtonHandle={pageExistCrossButtonHandle}
          modalType=''
        />
      )}
      {openSaveModal && (
        <PlateformXDialog
          isDialogOpen={openSaveModal}
          title={t('save_as_draft')}
          subTitle={t('save_draft_des')}
          closeButtonText={t('edit')}
          confirmButtonText={t('go_to_listing')}
          closeButtonHandle={saveAsDraftViewButtonHandle}
          confirmButtonHandle={() => navigate('/content/vod')}
          crossButtonHandle={saveAsDraftCrossButtonHandle}
          modalType='draft'
          closeIcon={<CreateRoundedIcon />}
        />
      )}
    </>
  );
};
