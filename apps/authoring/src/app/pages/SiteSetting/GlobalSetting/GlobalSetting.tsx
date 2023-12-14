import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { t } from 'i18next';
import { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Loader from '../../../Common/Loader';
import Globalimageicon from '../../../assets/svg/globalimageicon.svg';
import Globalmiscicon from '../../../assets/svg/globalmiscicon.svg';
import Globalvideoicon from '../../../assets/svg/globalvideoicon.svg';
import Mislaniuosicon from '../../../assets/svg/mislaniousicon.svg';
import Videosicon from '../../../assets/svg/videoicon.svg';
import PlateformXDialog from '../../../components/Modal';
import useUserSession from "../../../hooks/useUserSession/useUserSession";
import {
  fetchGlobalSetting,
  publishGlobalSetting,
  updateGlobalSetting,
} from "../../../services/SiteSetting/SiteSetting.api";
import GlobalHeaderbreadscum from '../GlobalSetting/GlobalHeaderbreadscum';
import SiteSettingPanel from "../SiteSettingPanel/SiteSettingPanel";
import SiteTopBar from "../SiteTopBar/SiteTopBar";
import { useGlobalSettingStyle } from "./GlobalSetting.style";
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';

const GlobalSetting = () => {
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<string>('');
  const [form, setForm] = useState({
    header_bg_colour: "",
    header_text_colour: "",
    footer_bg_colour: "",
    footer_text_colour: "",
    font_selection: "",
    primary_colour: "",
    secondary_colour: "",
    image: [],
    video: [],
    misc: [],
    createdBy: "",
    lastModifiedBy: ""
  })
  const imagesRef = useRef<HTMLElement>(null);
  const videosRef = useRef<HTMLElement>(null);
  const miscellaneousRef = useRef<HTMLElement>(null);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const scrollDebounceRef = useRef<any>(null);
  const sectionPos = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);


  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const navigate = useNavigate();

  const crossButtonHandle = () => {
    setShowPublishConfirm(false);
  };

  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const iconList = [
    {
      iconComponent: <img src={Globalimageicon} alt='Globalimageicon' />,
      title: t('images'),
      section: 'images',
      sectionRef: imagesRef,
    },
    {
      iconComponent: <img src={Videosicon} alt='Globalvideoicon' />,
      title: t('videos'),
      section: 'videos',
      sectionRef: videosRef,
    },
    {
      iconComponent: <img src={Mislaniuosicon} alt='Globalmiscicon' />,
      title: t('miscellanious'),
      section: 'miscellanious',
      sectionRef: miscellaneousRef,
    },

  ];

  const fetchGlobalSettingData = async () => {
    try {
    const { authoring_getSitedetails = {} } = await fetchGlobalSetting({
      page: 'global-item',
    });

    setForm(prev => ({ ...prev, ...authoring_getSitedetails }))
  } catch (error) {
    showToastError(t('api_error_toast'));
  }
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
    }, 5);
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
    fetchGlobalSettingData();
    sectionPos.current = getSectionPos();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const publisglobalSetting = () => {
    const input = {
      input: {
        page: "global-item",
        status: "publish",
        is_schedule: false,
        schedule_date_time: ""
      }
    }
    localStorage.setItem('imageUuid', form?.image?.[0].ScopeId?.split('|')?.pop());
    localStorage.setItem('videoUuid', form?.video?.[0].ScopeId?.split('|')?.pop());
    publishGlobalSetting(input).then((response) => {
      setShowPublishConfirm(true);
    }).catch((err) => {
      setIsLoading(false);
      throw err;
     
    })
    
  }

  const onSaveClick = () => {
    setIsLoading(true);
    const requestParam = {
      input: {
        CommonFields: {
          page: 'global-item',
          createdby: username,
          lastmodifiedby: username,
          lastmodifieddate: '',
        },
        ObjectFields: {
          header_bg_colour: form.header_bg_colour,
          header_text_colour: form.header_text_colour,
          footer_bg_colour: form.footer_bg_colour,
          footer_text_colour: form.footer_text_colour,
          font_selection: form.font_selection,
          primary_colour: form.primary_colour,
          secondary_colour: form.secondary_colour,
          image: form.image,
          video: form.video,
          misc: form.misc
        }
      },
    };
    updateGlobalSetting(requestParam)
    .then(() => {
      setIsLoading(false);
    publisglobalSetting();
    })
    .catch((err) => {
    throw err;
    });
  };
  const classes = useGlobalSettingStyle({ isShowPreview })();
  return (
    <>
      <SiteTopBar
        iconList={iconList}
        siteLabel={t('global_setting')}
        returnBack={() => {
          navigate('/dashboard')
        }}
        onPreviewClick={setIsShowPreview}
        isShowPreview={isShowPreview}
        activeForm={activeForm}
        onBreadscumClick={onBreadscumClick}
        onSaveClick={onSaveClick}
      />
      <Box className={classes.pageContainer}>
        <Box className={classes.contentContainer}>
          <Box ref={imagesRef}>
          {isLoading && <Loader />}
            <SiteSettingPanel
              number='01'
              title={t('images')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
              panelStyle={{ marginTop: '30px' }}
            >
              {
                form.image?.map((image,i)=> (
          <Grid container key={i} className={i !== 0 ? classes.marginTop5px : ""}>
                <Grid item xs={12} >
                  <Box className={classes.globalContainer}
                  >
                    <Box sx={{
                      display: 'flex'
                    }}>
                      <Box className={classes.globalimg}
                      >
                        <img src={Globalimageicon} alt='Globalimageicon' />
                      </Box>
                      <Box className={classes.globalbread}>

                        <GlobalHeaderbreadscum value={image} />
                      </Box>
                    </Box>
                    <Box>

                      <Button sx={{
                        display: { xs: 'none', sm: 'block' },
                        marginTop: "10px",
                        height: "50px",

                        marginRight: '15px'
                      }}
                        variant="outlined"
                        disabled
                      >{t('view')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
                ))
              }
              
            </SiteSettingPanel>
          </Box>
          <Box ref={videosRef}>
            <SiteSettingPanel
              number='02'
              title={t('videos')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
              panelStyle={{ marginTop: '30px' }}
            >
              {
                form.video?.map((video,i)=> (
          <Grid container key={i} className={i !== 0 ? classes.marginTop5px : ""}>
                <Grid item xs={12} >
                  <Box className={classes.globalContainer}
                  >
                    <Box sx={{
                      display: 'flex'
                    }}>
                      <Box sx={{ padding: '14px' }} className={classes.globalimg}
                      >
                        <img src={Globalvideoicon} alt='Globalimageicon' />
                      </Box>
                      <Box className={classes.globalbread}>
                        <GlobalHeaderbreadscum value={video} />
                      </Box>
                    </Box>
                    <Box>
                      <Button sx={{
                        display: { xs: 'none', sm: 'block' },
                        marginTop: "10px",
                        height: "50px",

                        marginRight: '15px'
                      }}
                        variant="outlined"
                        disabled
                      >{t('view')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
                ))
              }
              
            </SiteSettingPanel>
          </Box>
          <Box ref={miscellaneousRef}>
            <SiteSettingPanel
              number='03'
              title={t('miscellaneous')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
              panelStyle={{ marginTop: '30px' }}
            >
              {
                form.misc?.map((misc,i)=> (
          <Grid container key={i} className={i !== 0 ? classes.marginTop5px : ""}>
                <Grid item xs={12} >
                  <Box className={classes.globalContainer}
                  >
                    <Box sx={{
                      display: 'flex'
                    }}>
                      <Box className={classes.globalimg}
                      >
                        <img src={Globalmiscicon} alt='Globalimageicon' />
                      </Box>
                      <Box className={classes.globalbread}>

                        <GlobalHeaderbreadscum value={misc} />
                      </Box>
                    </Box>
                    <Box  >

                      <Button sx={{
                        display: { xs: 'none', sm: 'block' },
                        marginTop: "10px",
                        height: "50px",

                        marginRight: '15px'
                      }}
                        variant="outlined"
                        disabled
                      >{t('view')}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
                ))
              }        
            </SiteSettingPanel>
          </Box>

        </Box>
      </Box>

      {showPublishConfirm &&
        <PlateformXDialog
          isDialogOpen={showPublishConfirm}
          title={t('congratulations')}
          subTitle={`${t('global_setting')}${'  '}${t('updated_toast')}`}
          confirmButtonText={t('go_to_dashboard')}
          confirmButtonHandle={() => navigate('/dashboard')}
          modalType='publish'
          crossButtonHandle={crossButtonHandle}
          closeButtonHandle={crossButtonHandle}
          closeIcon={<CreateRoundedIcon />}
        />}
    </>
  );
};
export default GlobalSetting;

