import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CtaIcon from '../../../assets/svg/ctaicon.svg';
import HeaderIconn from '../../../assets/svg/headericonn.svg';
import HeadersearchIcon from '../../../assets/svg/headersearchicon.svg';
import LanguageIcon from '../../../assets/svg/languageicon.svg';
import Starupdatedicon from '../../../assets/svg/startupdatedicon.svg';
import MultiSelect from '../../../components/Common/MultiSelect/MultiSelect';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import PlateformXDialog from '../../../components/Modal';
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import {
  fetchHeaderSetting,
  publishHeaderSetting,
  updateHeaderSetting,
} from '../../../services/SiteSetting/SiteSetting.api';
import { postRequest } from '../../../services/config/request';
import Gallery from '../../Gallery/Gallery';
import Loader from '../../../Common/Loader';
import {
  HeaderCtaSkeleton,
  HeaderFaviconSkeleton,
  HeaderLanguageSkeleton,
  HeaderLogoSkeleton,
  HeaderSearchSkeleton,
} from '../CookieSetting/CookieSettingConstant';
import CookieTextBox from '../CookieSetting/CookieTextBox';
import SiteSettingAddImage from '../SiteSettingAddImage/SiteSettingAddImage';
import SiteSettingPanel from '../SiteSettingPanel/SiteSettingPanel';
import SiteTopBar from '../SiteTopBar/SiteTopBar';
import { useHeaderSettingStyle } from './HeaderSetting.style';

const HeaderSetting = () => {
  const [languageList, setlanguageList] = useState<string[]>([]);
  const [operationType, setOperationType] = useState<any>('');
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [key, setKey] = useState('');
  const galleryType = useRef<string>('Images');
  // const selectedImage = useRef<object>({});
  // const [imageUrl, setImageUrl] = useState<string>('');
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeForm, setActiveForm] = useState<string>('');
  const [languageOptionList, setlanguageOptionList] = useState<string[]>([]);
  const fsietLogoRef = useRef<HTMLElement>(null);
  const headerfaviconRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLElement>(null);
  const languageRef = useRef<HTMLElement>(null);
  const ctatitleRef = useRef<HTMLElement>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  //   const mediaHandleRef = useRef<HTMLElement>(null);
  const scrollDebounceRef = useRef<any>(null);
  const sectionPos = useRef<any>(null);
  const originalRes = useRef<any>(null);
  const languagelistref = useRef<any>([]);
  const [form, setForm] = useState<any>({
    header_logo: '',
    header_favicon: '',
    search: '',
    cta_title: '',
    cta_url: '',
    vendor_language: '',
  });
  // const [isNotificationToast, setIsNotificationToast] =
  //   useState<boolean>(false);
  // const toastMessage = useRef(null);
  // const onCloseSaveHandler = () => {
  //   setIsNotificationToast(false);
  // };
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const navigate = useNavigate();

  const crossButtonHandle = () => {
    setShowPublishConfirm(false);
  };
  // const crossButtonHandle={() => {
  //   setShowPublishConfirm(false);
  // }}
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const iconList = [
    {
      iconComponent: <img src={HeaderIconn} alt='Header Icon' />,
      title: t('header_logo'),
      section: 'headerlogo',
      sectionRef: fsietLogoRef,
    },
    {
      iconComponent: <img src={Starupdatedicon} alt='Star Updated Icon' />,
      title: t('header_favicon'),
      section: 'headerfavicon',
      sectionRef: headerfaviconRef,
    },
    {
      iconComponent: <img src={HeadersearchIcon} alt='Header Search Icon' />,
      title: t('search'),
      section: 'search',
      sectionRef: searchRef,
    },
    {
      iconComponent: <img src={LanguageIcon} alt='Language Icon' />,
      title: t('language'),
      section: 'language',
      sectionRef: languageRef,
    },
    {
      iconComponent: <img src={CtaIcon} alt='Cta Icon' />,
      title: t('cta_link'),
      section: 'cta_link',
      sectionRef: ctatitleRef,
    },
  ];
  const handleTextChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  const fetchHeaderSettingData = async () => {
    const { authoring_getSitedetails = {} } = await fetchHeaderSetting({
      page: 'header-item',
    });
    delete authoring_getSitedetails.__typename;
    originalRes.current = authoring_getSitedetails;
    const {
      header_logo = '',
      header_favicon = '',
      search,
      cta_title = '',
      cta_url = '',
      language = '',
      language_list = [],
    } = authoring_getSitedetails;
    languagelistref.current = language_list;
    setForm({
      header_logo: header_logo || '',
      header_favicon: header_favicon || '',
      search: search,
      cta_title: cta_title || '',
      cta_url: cta_url || '',
    });
    const x = language_list.reduce((acc, obj) => {
      return { ...acc, [obj.lang_code]: obj.lang };
    }, {});
    setlanguageOptionList(language_list.map((language) => language.lang));
    setlanguageList(language.split('|').map((lang) => x[lang]));
  };

  const getLanguage = () => {
    const getList = languagelistref.current.reduce((acc, obj) => {
      return { ...acc, [obj.lang]: obj.lang_code };
    }, {});
    const languageField = languageList.map((lang) => getList[lang]);
    return languageField.join('|');
  };
  const publisheaderSetting = () => {
    const input = {
      input: {
        page: 'header-item',
        status: 'publish',
        is_schedule: false,
        schedule_date_time: '',
      },
    };
    publishHeaderSetting(input)
      .then((response) => {
        //toastMessage.current = 'publish_settings_success';
        //setIsNotificationToast(true);
        setShowPublishConfirm(true);
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };
  const onSaveClick = () => {
    setIsLoading(true);
    const requestParam = {
      input: {
        CommonFields: {
          page: 'header-item',
          createdby: username,
          lastmodifiedby: username,
          lastmodifieddate: '',
        },
        ObjectFields: {
          ...form,
          vendor_language: getLanguage(),
        },
      },
    };
    updateHeaderSetting(requestParam)
      .then(() => {
        setIsLoading(false);
        //toastMessage.current = 'header_settings_success';
        publisheaderSetting();
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };
  const [fieldstatus, setFieldStatus] = useState('');
  const onUploadClick = (type, field = '') => {
    showGallery('Images', 'imagevideoURL', field);
    setOperationType(type);
    setFieldStatus(field);
  };

  // const updateField = (updatedPartialObj) => {
  // };

  const showGallery = (gType, keyName, id?: any) => {
    window.scrollTo(0, 0);
    setGalleryState(true);
    setKey(keyName);
  };

  const handleSelectedImage = async (image, keyName) => {
    try {
      const payload = {
        bitstreamId: image.bitStreamId,
        visibility: 'public',
      };
      const response = await postRequest(
        'api/v1/assets/image/no-crop',
        payload
      );

      const relativeUrl =
        response?.original_image_relative_path + '.' + response?.ext;
      setForm((preForm) => ({ ...preForm, [fieldstatus]: relativeUrl }));
    } catch (error) {
      console.log(error);
      showToastError(t('api_error_toast'));
    }
  };
  const toggleGallery = (toggleState, type) => {
    setGalleryState(toggleState);
  };

  const onBreadscumClick = (icon) => {
    if (!icon) return;
    setActiveForm(icon.section);
    window.scrollTo(0, icon?.sectionRef?.current.offsetTop - 155);
  };

  const handleScroll = () => {
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
    }
    const timeOutId = setTimeout(() => {
      const currentScroll = window.scrollY;
      const activeSection = sectionPos.current.find(
        (section) =>
          currentScroll >= section.start && currentScroll <= section.end
      );
      if (activeSection) {
        setActiveForm(activeSection.section);
      }
    }, 10);
    scrollDebounceRef.current = timeOutId;
  };

  const getSectionPos = () => {
    let tempStartPos = 0;
    const listPos = iconList.map((icon) => {
      const sectionStartPos = tempStartPos;
      tempStartPos = icon.sectionRef.current.offsetTop;
      return {
        ...icon,
        start: sectionStartPos,
        end: icon.sectionRef.current.offsetHeight + sectionStartPos,
      };
    });
    return listPos;
  };

  useEffect(() => {
    fetchHeaderSettingData();
    sectionPos.current = getSectionPos();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLinkInputChange = (link, fieldName) => {
    return (event) => {
      link[fieldName] = event.target.value;
      setForm({ ...form });
    };
  };
  const [searchSwitch, setsearchSwitch] = useState<boolean>(true);
  const switchChange = (controlName) => {
    setsearchSwitch(!searchSwitch);
  };
  const classes = useHeaderSettingStyle({ isShowPreview })();
  const CookieTextBoxStyle = {
    background: '#EFF0F7',
    borderRadius: '5px',
    fontFamily: 'Inter !important',
    fontStyle: 'normal',
    padding: '5px 20px',
    height: '57px',
  };

  const CookieTextBoxPlacholderStyle = {
    top: '4px',
    left: '9px',
    fontFamily: 'Inter',
    fontSize: '14px',
    fontWeight: '400',
    color: '#6E7191',
  };
  return (
    <>
      <SiteTopBar
        iconList={iconList}
        siteLabel={t('header')}
        returnBack={() => {
          navigate('/dashboard');
        }}
        onPreviewClick={setIsShowPreview}
        isShowPreview={isShowPreview}
        activeForm={activeForm}
        onBreadscumClick={onBreadscumClick}
        onSaveClick={onSaveClick}
      />
      <Box className={classes.pageContainer}>
        <Box className={classes.contentContainer}>
          <Box ref={fsietLogoRef}>
            {isLoading && <Loader />}
            <SiteSettingPanel
              number='01'
              title={t('header_logo')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  className={classes.leftForm}
                >
                  <Box>
                    <TitleSubTitle
                      title={`${t('event_image_tilte')}*`}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>
                  <Box sx={{ marginTop: '15px' }}>
                    <SiteSettingAddImage
                      url={
                        process.env.REACT_APP_GCP_URL +
                        '/' +
                        process.env.REACT_APP_BUCKET_NAME +
                        '/' +
                        form.header_logo
                      }
                      type='header_logo'
                      operationType={operationType}
                      onUploadClick={onUploadClick}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} className={classes.rightForm}>
                  <Box>
                    <Box className={classes.skeletonTitle}>
                      {t('logo_will_look_like_this_on_header')}
                    </Box>
                    {HeaderLogoSkeleton(1)}
                  </Box>
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>
          <Box ref={headerfaviconRef}>
            <SiteSettingPanel
              number='02'
              title={t('header_favicon')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
              panelStyle={{ marginTop: '30px' }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  className={classes.leftForm}
                >
                  <Box>
                    <TitleSubTitle
                      title={`${t('event_image_tilte')}*`}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>
                  <Box sx={{ marginTop: '15px' }}>
                    <Box sx={{ width: '40%' }}>
                      <SiteSettingAddImage
                        url={
                          process.env.REACT_APP_GCP_URL +
                          '/' +
                          process.env.REACT_APP_BUCKET_NAME +
                          '/' +
                          form.header_favicon
                        }
                        // updateField={updateField}
                        type='header_favicon'
                        operationType={operationType}
                        onUploadClick={onUploadClick}
                      />
                    </Box>
                    <Box className={classes.skeletonTitle}>
                      Image Size must be 16x16px, Max 200KB JPG & PNG are
                      allowed only
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} className={classes.rightForm}>
                  <Box>
                    <Box className={classes.skeletonTitle}>
                      {t('logo_will_look_like_this_on_header')}
                    </Box>
                    {HeaderFaviconSkeleton(1)}
                  </Box>
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>
          <Box ref={searchRef}>
            <SiteSettingPanel
              number='03'
              title={t('search')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
              panelStyle={{ marginTop: '30px' }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  className={classes.leftForm}
                >
                  <Box>
                    <TitleSubTitle
                      title={t('search_bar')}
                      subTitle={t('header_subtitle_search')}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                    <FormControl>
                      <RadioGroup
                        value={form.search}
                        onChange={(e) =>
                          setForm({ ...form, search: e.target.value })
                        }
                      >
                        <FormControlLabel
                          value='true'
                          control={<Radio />}
                          label={t('yes_i_required_this')}
                        />
                        <FormControlLabel
                          value='false'
                          control={<Radio />}
                          label={t('i_dont_need_this')}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  className={classes.rightForm}
                >
                  <Box className={classes.skeletonTitle}>
                    {t('search_will_look_like_this_on_footer')}
                  </Box>
                  {HeaderSearchSkeleton(1)}
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>
          <Box ref={languageRef}>
            <SiteSettingPanel
              number='04'
              title={t('language')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
              panelStyle={{ marginTop: '30px' }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  className={classes.leftForm}
                >
                  <MultiSelect
                    title={t('choose_language')}
                    list={languageOptionList}
                    defaultAmountOfItem={10}
                    mobileAmountOfItem={5}
                    onPickerChange={(e, name) => {
                      setlanguageList((preState) =>
                        preState.includes(name)
                          ? preState.filter((s) => s !== name)
                          : [...preState, name]
                      );
                    }}
                    value={languageList}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  className={classes.rightForm}
                >
                  <Box className={classes.skeletonTitle}>
                    {t('language_will_be_added_here')}
                  </Box>
                  {HeaderLanguageSkeleton(1)}
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>
          <Box ref={ctatitleRef}>
            <SiteSettingPanel
              number='05'
              title={t('cta_url')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
              panelStyle={{ marginTop: '30px' }}
            >
              <Grid container>
                <Grid
                  item
                  xs={12}
                  sm={8}
                  md={8}
                  lg={8}
                  className={classes.leftForm}
                >
                  <Box>
                    <TitleSubTitle
                      title={t('cta_title')}
                      subTitle={t('this_will_be_the_title')}
                      titleVarient='h5medium'
                      subTitleVarient='h6regular'
                    />
                  </Box>
                  <Grid
                    item
                    xs={11}
                    sm={11}
                    md={11}
                    lg={11}
                    sx={{ marginTop: '10px' }}
                  >
                    <Box marginTop={2}>
                      <CookieTextBox
                        name='cta_title'
                        state={form.cta_title}
                        placeHolder={t('write_your_text_here')}
                        handleChange={(event) => {
                          handleTextChange(event);
                        }}
                        textBoxStyle={{ ...CookieTextBoxStyle }}
                        placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                      />
                    </Box>
                  </Grid>
                  <Box marginTop={2}>
                    <TitleSubTitle
                      title={t('add_url')}
                      subTitle={t('this_will_be_the_url')}
                      titleVarient='h5medium'
                      subTitleVarient='h6regular'
                    />
                  </Box>
                  <Grid
                    item
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    sx={{ marginTop: '10px' }}
                  ></Grid>
                  <Grid
                    item
                    xs={11}
                    sm={11}
                    md={11}
                    lg={11}
                    sx={{ marginTop: '20px' }}
                  >
                    <Box marginTop={2}>
                      <CookieTextBox
                        name='cta_url'
                        state={form.cta_url}
                        placeHolder={t('paste_your_destination_link_here')}
                        handleChange={(event) => {
                          handleTextChange(event);
                        }}
                        textBoxStyle={{ ...CookieTextBoxStyle }}
                        placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                      />
                    </Box>
                  </Grid>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={4}
                  md={4}
                  lg={4}
                  className={classes.rightForm}
                >
                  <Box className={classes.skeletonTitle}>
                    {t('links_will_be_added_here')}
                  </Box>
                  {HeaderCtaSkeleton(1)}
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>
        </Box>
      </Box>
      {galleryState && (
        <Gallery
          handleImageSelected={handleSelectedImage}
          toggleGallery={toggleGallery}
          galleryMode={galleryType.current}
          keyName={key}
        />
      )}
      {/* {isNotificationToast &&
        <PlateformXSnackbar
          isDefaultOpen={isNotificationToast}
          message={t(toastMessage.current)}
          messageType='success'
          onCloseButtonClick={onCloseSaveHandler}
        />} */}
      {showPublishConfirm && (
        <PlateformXDialog
          isDialogOpen={showPublishConfirm}
          title={t('congratulations')}
          subTitle={`${t('header')}${'  '}${t('update_settings_success')}`}
          confirmButtonText={t('go_to_dashboard')}
          confirmButtonHandle={() => navigate('/dashboard')}
          modalType='publish'
          crossButtonHandle={crossButtonHandle}
          closeButtonHandle={crossButtonHandle}
          closeIcon={<CreateRoundedIcon />}
        />
      )}
    </>
  );
};
export default HeaderSetting;
