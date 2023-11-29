import AddIcon from '@mui/icons-material/Add';
import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { t } from 'i18next';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Common/Loader';
import DocumentIcon from '../../../assets/Document.svg';
import LinkIcon from '../../../assets/LinkIcon.svg';
import PictureIcon from '../../../assets/PictureIcon.svg';
import AboutusIconn from '../../../assets/svg/AboutusIconn.svg';
import ContactusIconn from '../../../assets/svg/ContactusIconn.svg';
import VectorIconSvg from '../../../assets/svg/VectorIcon.svg';
import MediahandleIconnn from '../../../assets/svg/mediahandleIconnn.svg';
import MultiSelect from '../../../components/Common/MultiSelect/MultiSelect';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import PlateformXDialog from '../../../components/Modal';
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import {
  fetchFooterSetting,
  publishFooterSetting,
  updateSiteSetting,
} from '../../../services/SiteSetting/SiteSetting.api';
import { postRequest } from '../../../services/config/request';
import Gallery from '../../Gallery/Gallery';
import {
  AddLinkSkeleton,
  ContactUsSkeleton,
  CopyRightSkeleton,
  MediaHandleSkeleton,
  NewsLetterSkeleton,
  SiteLogoSkeleton,
} from '../CookieSetting/CookieSettingConstant';
import CookieTextBox from '../CookieSetting/CookieTextBox';
import SiteSettingAddImage from '../SiteSettingAddImage/SiteSettingAddImage';
import SiteSettingPanel from '../SiteSettingPanel/SiteSettingPanel';
import SiteTopBar from '../SiteTopBar/SiteTopBar';
import CopyrightIconn from '././../../../assets/svg/CopyrightIconnn.svg';
import { useFooterSettingStyle } from './FooterSetting.style';

const FooterSetting = () => {
  const [mediaList, setMediaList] = useState<string[]>([]);
  const [operationType, setOperationType] = useState<any>('');
  const [galleryState, setGalleryState] = useState<boolean>(false);
  const [key, setKey] = useState('');
  const galleryType = useRef<string>('Images');
  // const selectedImage = useRef<object>({});
  // const [imageUrl, setImageUrl] = useState<string>('');
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<string>('');
  const [mediaOptionList, setMediaOptionList] = useState<[]>([]);
  const fsietLogoRef = useRef<HTMLElement>(null);
  const aboutUsRef = useRef<HTMLElement>(null);
  const contactUsRef = useRef<HTMLElement>(null);
  const linkRef = useRef<HTMLElement>(null);
  const copyrightTextRef = useRef<HTMLElement>(null);
  const newLetterRef = useRef<HTMLElement>(null);
  const mediaHandleRef = useRef<HTMLElement>(null);
  const scrollDebounceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const sectionPos = useRef<any>(null);
  const originalRes = useRef<any>(null);
  const [form, setForm] = useState<any>({
    site_logo: '',
    about_us_text: '',
    title_text: '',
    address: '',
    email_address: '',
    contact_number: '',
    footer_link: [],
    copyright_text: '',
    news_letter_title: '',
    news_letter_description: '',
  });
  const [isNotificationToast, setIsNotificationToast] =
    useState<boolean>(false);
  const toastMessage = useRef(null);
  const onCloseSaveHandler = () => {
    setIsNotificationToast(false);
  };
  const crossButtonHandle = () => {
    setIsNotificationToast(false);
  };
  const navigate = useNavigate();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();

  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  const iconList = [
    {
      iconComponent: <img src={PictureIcon} alt='Site Logo' />,
      title: t('site_logo'),
      section: 'sitelogo',
      sectionRef: fsietLogoRef,
    },
    {
      iconComponent: <img src={AboutusIconn} alt='About Us Icon' />,
      title: t('about_us'),
      section: 'aboutus',
      sectionRef: aboutUsRef,
    },
    {
      iconComponent: <img src={ContactusIconn} alt='Contact Us Icon' />,
      title: t('contact_us'),
      section: 'contactus',
      sectionRef: contactUsRef,
    },
    {
      iconComponent: <img src={LinkIcon} alt='Link Icon' />,
      title: t('link'),
      section: 'link',
      sectionRef: linkRef,
    },
    {
      iconComponent: <img src={CopyrightIconn} alt='Copyright Icon' />,
      title: t('sitesetting_copyright'),
      section: 'copyright',
      sectionRef: copyrightTextRef,
    },
    {
      iconComponent: <img src={DocumentIcon} alt='Document Icon' />,
      title: t('sitesetting_news_title'),
      section: 'newsletter',
      sectionRef: newLetterRef,
    },
    {
      iconComponent: <img src={MediahandleIconnn} alt='Media Handle Icon' />,
      title: t('media_handle'),
      section: 'media',
      sectionRef: mediaHandleRef,
    },
  ];
  const handleTextChange = (event, fieldName) => {
    setForm({ ...form, [fieldName]: event.target.value });
  };
  const fetchFooterSettingData = async () => {
    const { authoring_getFooterSettings = {} } = await fetchFooterSetting({
      pagePath: 'footer-item',
    });
    delete authoring_getFooterSettings.__typename;
    originalRes.current = authoring_getFooterSettings;
    const {
      site_logo = '',
      about_us_text = '',
      title_text = '',
      address = '',
      email_address = '',
      contact_number = '',
      link = [],
      copyright_text = '',
      news_letter_title = '',
      news_letter_description = '',
      mediahandle = [],
    } = authoring_getFooterSettings;
    setForm({
      site_logo: site_logo || '',
      about_us_text: about_us_text || '',
      title_text: title_text || '',
      address: address || '',
      email_address: email_address || '',
      contact_number: contact_number || '',
      copyright_text: copyright_text || '',
      news_letter_title: news_letter_title || '',
      news_letter_description: news_letter_description || '',
      footer_link: link,
    });
    setMediaOptionList(mediahandle.map((media) => media.media_name));
    setMediaList(
      mediahandle
        .filter((media) => media.isSelected)
        .map((media) => media.media_name)
    );
  };
  const publishfooterSetting = () => {
    const input = {
      input: {
        page: 'footer-item',
        status: 'publish',
        is_schedule: false,
        schedule_date_time: '',
      },
    };
    publishFooterSetting(input)
      .then((response) => {
        setIsLoading(false);
        toastMessage.current = 'footer_settings_success';
        setIsNotificationToast(true);
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };
  const onSaveClick = () => {
    const newData = form?.footer_link?.filter((item) => {
      return item.link_name === '' || item.link_url === '';
    });
    if (newData.length >= 1) {
      showToastError(t('api_error_ntoast'));
    } else {
      setIsLoading(true);
      const requestParam = {
        input: {
          CommonFields: {
            page: 'footer-item',
            createdby: username,
            lastmodifiedby: username,
            lastmodifieddate: '',
          },
          ObjectFields: {
            ...form,
            media_handle: mediaList.map((mediaName) => ({
              enable: true,
              media_name: mediaName,
            })),
            // last_modified_by: originalRes.current.lastmodifiedby,
            // last_modification_date: originalRes.current.lastmodificationdate,
          },
        },
      };
      updateSiteSetting(requestParam)
        .then(() => {
          publishfooterSetting();
        })
        .catch((err) => {
          setIsLoading(false);
          throw err;
        });
    }
  };

  const onUploadClick = (type) => {
    showGallery('Images', 'imagevideoURL');
    setOperationType(type);
  };
  const updateField = (updatedPartialObj) => {
    console.log('updatedPartialObj', updatedPartialObj);
  };

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
      setForm((preForm) => ({ ...preForm, site_logo: relativeUrl }));
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
    }, 20);
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
    fetchFooterSettingData();
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
  const [newForms, setNewForm] = useState([]);
  const onDeleteOption = (index) => {
    if (form.footer_link.length <= 1) {
    } else {
      const linkData = form.footer_link;
      console.log(linkData);
      form.footer_link = linkData.filter((item, ind) => ind != index);
      setForm({ ...form });
    }
  };

  const onLinkDrop = (event, index) => {
    const dropIndex = +event.dataTransfer.getData('text');
    const cloneFormLink = [...form.footer_link];
    const droppedLink = { ...cloneFormLink[dropIndex] };
    const currentLink = { ...cloneFormLink[index] };
    cloneFormLink.splice(dropIndex, 1, currentLink);
    cloneFormLink.splice(index, 1, droppedLink);
    setForm({ ...form, footer_link: cloneFormLink });
  };
  const classes = useFooterSettingStyle({ isShowPreview })();
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
        siteLabel={t('footer')}
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
              title={t('site_logo')}
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
                      subTitle={t('choose_the_image')}
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
                        form.site_logo
                      }
                      updateField={updateField}
                      type='Images'
                      operationType={operationType}
                      onUploadClick={onUploadClick}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4} md={4} className={classes.rightForm}>
                  <Box>
                    <Typography className={classes.skeletonTitle}>
                      {t('logo_will_look_like_this_on_footer')}
                    </Typography>
                    {SiteLogoSkeleton(1)}
                  </Box>
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>

          <Box ref={aboutUsRef}>
            <SiteSettingPanel
              number='02'
              title={t('about_us')}
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
                  className={classes.aboutUsLeft}
                >
                  <TitleSubTitle
                    title={t('about_us_text')}
                    subTitle={t('this_will_be_the_about_us_text')}
                    titleVarient='h6medium'
                    subTitleVarient='h7regular'
                  />
                  <Box marginTop={2}>
                    <CookieTextBox
                      name='about_us_text'
                      handleChange={(event) =>
                        handleTextChange(event, 'about_us_text')
                      }
                      state={form.about_us_text}
                      textBoxStyle={{ ...CookieTextBoxStyle }}
                      placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                    />
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
                  <Box>
                    <Typography className={classes.skeletonTitle}>
                      {t('logo_will_look_like_this_on_footer')}
                    </Typography>
                    {SiteLogoSkeleton(2)}
                  </Box>
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>

          <Box ref={contactUsRef}>
            <SiteSettingPanel
              number='03'
              title={t('contact_us')}
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
                      title={t('Title_text')}
                      subTitle={t('this_will_be_the_title_text')}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                    <CookieTextBox
                      name='title_text'
                      state={form.title_text}
                      handleChange={(event) =>
                        handleTextChange(event, 'title_text')
                      }
                      textBoxStyle={{ ...CookieTextBoxStyle }}
                      placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                    />
                  </Box>

                  <Box marginTop={3}>
                    <TitleSubTitle
                      title={t('sitesetting_bg_title')}
                      subTitle={t('sitesetting_sub_title')}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>

                  <Box className={classes.pictureiconinner} marginTop={2}>
                    <Box className={classes.pictureIconContainer}>
                      <img src={PictureIcon} alt='PictureIcon' />
                    </Box>
                    <Box className={classes.aboutUsTextBox}>
                      <CookieTextBox
                        name='address'
                        placeHolder={t('sitesetting_add')}
                        state={form.address}
                        handleChange={(event) => {
                          handleTextChange(event, 'address');
                        }}
                        textBoxStyle={{ ...CookieTextBoxStyle }}
                        placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                      />
                    </Box>
                  </Box>

                  <Box marginTop={3}>
                    <TitleSubTitle
                      title={t('email_address')}
                      subTitle={t('this_will_be_the_email_address_text')}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>

                  <Box className={classes.pictureiconinner} marginTop={2}>
                    <Box className={classes.pictureIconContainer}>
                      <img src={PictureIcon} alt='PictureIcon' />
                    </Box>
                    <Box className={classes.aboutUsTextBox}>
                      <CookieTextBox
                        name='email_address'
                        placeHolder={t('enter_your_email_address_here')}
                        state={form.email_address}
                        handleChange={(event) => {
                          handleTextChange(event, 'email_address');
                        }}
                        textBoxStyle={{ ...CookieTextBoxStyle }}
                        placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                      />
                    </Box>
                  </Box>

                  <Box marginTop={3}>
                    <TitleSubTitle
                      title={t('contact_number')}
                      subTitle={t('this_will_be_the_contact_number_text')}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>
                  <Box className={classes.pictureiconinner} marginTop={2}>
                    <Box className={classes.pictureIconContainer}>
                      <img src={PictureIcon} alt='PictureIcon' />
                    </Box>
                    <Box className={classes.aboutUsTextBox}>
                      <CookieTextBox
                        name='contact_number'
                        placeHolder={t('enter_your_contact_number')}
                        state={form.contact_number}
                        maxCharLength={15}
                        handleChange={(event) => {
                          handleTextChange(event, 'contact_number');
                        }}
                        textBoxStyle={{ ...CookieTextBoxStyle }}
                        placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                      />
                    </Box>
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
                  <Typography className={classes.skeletonTitle}>
                    {t('contact_us_will_look_like_this_on_footer')}
                  </Typography>
                  {ContactUsSkeleton}
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>

          <Box ref={linkRef}>
            <SiteSettingPanel
              number='04'
              title={t('add_link')}
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
                      title={t('add_link_and_URL')}
                      subTitle={t('enter_link')}
                      titleVarient='h3medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>

                  <Box marginTop={2}>
                    {form.footer_link.map((link, index) => (
                      <Grid
                        container
                        key={`link_${index + 1}`}
                        draggable
                        onDragStart={(event) => {
                          event.dataTransfer.setData('text', `${index}`);
                        }}
                        onDrop={(event) => {
                          onLinkDrop(event, index);
                        }}
                        onDragOver={(event) => {
                          event.preventDefault();
                        }}
                      >
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={1}
                          lg={1}
                          sx={{
                            marginTop: index > 0 ? '20px' : '0',
                          }}
                          className={classes.dragIconContainer}
                        >
                          <img src={VectorIconSvg} alt='VectorIconSvg' />
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sm={10}
                          md={10}
                          lg={10}
                          sx={{ marginTop: index > 0 ? '20px' : '0' }}
                        >
                          <CookieTextBox
                            name='enter_link_url'
                            placeHolder={t('enter_link_url')}
                            state={link.link_url}
                            error={link.link_url === '' ? 'red' : ''}
                            handleChange={handleLinkInputChange(
                              link,
                              'link_url'
                            )}
                            textBoxStyle={{ ...CookieTextBoxStyle }}
                            placeHolderStyle={{
                              ...CookieTextBoxPlacholderStyle,
                            }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={1}
                          lg={1}
                          sx={{
                            marginTop: index > 0 ? '20px' : '0',
                          }}
                        >
                          <DeleteIcon
                            onClick={() => onDeleteOption(index)}
                            className={classes.deleteicon}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={1}
                          sm={1}
                          md={1}
                          lg={1}
                          sx={{ marginTop: '20px' }}
                        ></Grid>
                        <Grid
                          item
                          xs={10}
                          sm={10}
                          md={10}
                          lg={10}
                          sx={{ marginTop: '20px' }}
                        >
                          <CookieTextBox
                            name='linkname1'
                            placeHolder={t('linkname')}
                            state={link.link_name}
                            error={link.link_name === '' ? 'red' : ''}
                            handleChange={handleLinkInputChange(
                              link,
                              'link_name'
                            )}
                            textBoxStyle={{ ...CookieTextBoxStyle }}
                            placeHolderStyle={{
                              ...CookieTextBoxPlacholderStyle,
                            }}
                          />
                        </Grid>
                      </Grid>
                    ))}
                  </Box>
                  <Grid container className={classes.newLinkContainer}>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={12}
                      lg={12}
                      className={classes.addNewBtnBox}
                    >
                      <Box
                        onClick={() => {
                          setForm({
                            ...form,
                            footer_link: [
                              ...form.footer_link,
                              { link_url: '', link_name: '' },
                            ],
                          });
                        }}
                        component='span'
                        sx={{ cursor: 'pointer' }}
                      >
                        <AddIcon className={classes.addicon} />
                        {t('add_new_link')}
                      </Box>
                    </Grid>
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
                  <Typography className={classes.skeletonTitle}>
                    {t('links_will_be_added_here')}
                  </Typography>
                  {AddLinkSkeleton}
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>

          <Box ref={copyrightTextRef}>
            <SiteSettingPanel
              number='05'
              title={t('sitesetting_copyright')}
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
                  className={classes.copyRightLeft}
                >
                  <Box>
                    <TitleSubTitle
                      title={t('sitesetting_copyright')}
                      subTitle={t('sitesetting_copyright_sub')}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>
                  <Box marginTop={2}>
                    <CookieTextBox
                      name='copyright_text'
                      state={form.copyright_text}
                      handleChange={(event) => {
                        handleTextChange(event, 'copyright_text');
                      }}
                      textBoxStyle={{ ...CookieTextBoxStyle }}
                      placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                    />
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
                  <Typography className={classes.skeletonTitle}>
                    {t('copyright_text_will_be_updated_here')}
                  </Typography>
                  {CopyRightSkeleton}
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>

          <Box ref={newLetterRef}>
            <SiteSettingPanel
              number='06'
              title={t('sitesetting_news_title')}
              subTitle={t('sitesetting_copy_subhead')}
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
                      title={t('Title_text')}
                      subTitle={t('this_will_be_the_title_text')}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>
                  <Box marginTop={2}>
                    <CookieTextBox
                      name='news_letter_title'
                      placeHolder={t('write_your_text_here')}
                      state={form.news_letter_title}
                      handleChange={(event) => {
                        handleTextChange(event, 'news_letter_title');
                      }}
                      textBoxStyle={{ ...CookieTextBoxStyle }}
                      placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                    />
                  </Box>
                  <Box marginTop={3}>
                    <TitleSubTitle
                      title={t('news_Letter_description')}
                      subTitle={t('this_will_be_the_description')}
                      titleVarient='h6medium'
                      subTitleVarient='h7regular'
                    />
                  </Box>
                  <Box marginTop={2}>
                    <CookieTextBox
                      name='news_letter_description'
                      placeHolder={t('vod_desciption_placeholder')}
                      state={form.news_letter_description}
                      handleChange={(event) => {
                        handleTextChange(event, 'news_letter_description');
                      }}
                      textBoxStyle={{ ...CookieTextBoxStyle }}
                      placeHolderStyle={{ ...CookieTextBoxPlacholderStyle }}
                    />
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
                  <Typography className={classes.skeletonTitle}>
                    {t('newsletter_title_will_be_updated_here')}
                  </Typography>
                  {NewsLetterSkeleton}
                </Grid>
              </Grid>
            </SiteSettingPanel>
          </Box>

          <Box ref={mediaHandleRef}>
            <SiteSettingPanel
              number='07'
              title={t('media_handle')}
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
                    title={t('sitesetting_select_media_title')}
                    list={mediaOptionList}
                    defaultAmountOfItem={10}
                    mobileAmountOfItem={5}
                    onPickerChange={(e, name) => {
                      setMediaList((preState) =>
                        preState.includes(name)
                          ? preState.filter((s) => s !== name)
                          : [...preState, name]
                      );
                    }}
                    value={mediaList}
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
                  <Typography className={classes.skeletonTitle}>
                    {t('media_handle_will_be_updated_here')}
                  </Typography>
                  {MediaHandleSkeleton}
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
      {isNotificationToast && (
        <PlateformXDialog
          isDialogOpen={isNotificationToast}
          title={t('congratulations')}
          subTitle={`${t('footer_settings_success')}`}
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

export default FooterSetting;
