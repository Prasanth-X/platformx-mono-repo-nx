import { Box, Grid, SelectChangeEvent, Typography } from '@mui/material';
import { t } from 'i18next';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';
import Pencil from '../../../assets/svg/Pencil.svg';
import PlateformXDialog from '../../../components/Modal';
import Loader from '../../../Common/Loader';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import {
  createSiteConfig,
  fetchSites,
  publishMultisiteInfo,
  siteTitleValidation,
  subdomainValidation,
  updateSiteConfig,
} from '../../../services/SiteCreation/SiteCreation.api';
import {
  fetchAdminList,
  fetchDomainList,
} from '../../../services/SiteSetting/SiteSetting.api';
import CookieTextArea from '../../SiteSetting/CookieSetting/CookieTextArea';
import CookieTextBox from '../../SiteSetting/CookieSetting/CookieTextBox';
import SiteSettingPanel from '../../SiteSetting/SiteSettingPanel/SiteSettingPanel';
//import { handleTextChange } from '../SiteCreation.utils';
import SiteCreationTopBar from '../SiteCreationTopBar/SiteCreationTopBar';
import {
  ControlTitle,
  siteSettingPanelCounterStyle,
  siteSettingPanelSubTitle,
  siteSettingPanelTitle,
  textBoxStyle,
  textPlaceHolderStyle,
  useAddSiteStyle,
} from './AddSite.style';
import { formConfigData } from './AddSite.util';
import AddSiteSelect from './AddSiteSelect';
import { showToastSuccess } from '../../../components/toastNotification/toastNotificationReactTostify';
import TextBox from '../../../components/Common/TextBox';

const AddSite = () => {
  const [activeForm, setActiveForm] = useState<string>('');
  const [adminDomainList, setAdminDomain] = useState({
    domainList: [],
    adminList: [],
  });
  const { siteName } = useParams();
  const [openPublishModal, setOpenPublishModal] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedPageURL, setSavedPageURL] = useState('');
  const [isExist, setIsExist] = useState({
    site_title: false,
    site_address: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const toastMessage = useRef(null);
  const createSiteSection = useRef<HTMLElement>(null);
  const scrollDebounceRef = useRef<any>(null);
  const sectionPos = useRef<any>(null);
  const isFormValid = useRef<any>(false);

  function convertTitleToURL(title) {
    // Remove Spaces
    let url = title.replace(/\s+/g, '');
    // Remove special characters
    url = url.replace(/[^\w-]+/g, '');
    // Convert to lowercase
    url = url.toLowerCase();
    return url;
  }
  const navigate = useNavigate();
  const damFormConfig = [
    {
      name: 'DAMURL',
      title: t('dam_url'),
      placeholder: t('Enter_dam_url'),
    },
    {
      name: 'DAMUserName',
      title: t('dam_user_name'),
      placeholder: t('dam_user_name'),
    },
    {
      name: 'DAMPassword',
      title: t('dam_password'),
      placeholder: t('dam_pass'),
    },
    {
      name: 'imagefoldermapping',
      title: t('image_folder_mapping'),
      placeholder: t('image_folder_mapping_enter'),
    },
    {
      name: 'videofoldermapping',
      title: t('video_folder_mapping'),
      placeholder: t('video_folder_mapping_enter'),
    },
    {
      name: 'Audiofoldermapping',
      title: t('audio folder_mapping'),
      placeholder: t('audio folder_mapping_Enter'),
    },
    {
      name: 'miscfoldermapping',
      title: t('misc_folder_mapping'),
      placeholder: t('misc_folder_mapping_enter'),
    },
  ];
  const vodFormConfig = [
    {
      name: 'VODURL',
      title: t('vod_url'),
      placeholder: t('enter_vod_url'),
    },
    {
      name: 'VODUSERNAME',
      title: t('vod_user_name'),
      placeholder: t('enter_vod_user_name'),
    },
    {
      name: 'VODPassword',
      title: t('vod_password'),
      placeholder: t('Enter_vod_password'),
    },
    {
      name: 'imagefoldermapping',
      title: t('image_folder_mapping'),
      placeholder: t('image_folder_mapping_enter'),
    },
    {
      name: 'videofoldermapping',
      title: t('video_folder_mapping'),
      placeholder: t('video_folder_mapping_enter'),
    },
    {
      name: 'Audiofoldermapping',
      title: t('audio folder_mapping'),
      placeholder: t('audio folder_mapping_Enter'),
    },
    {
      name: 'miscfoldermapping',
      title: t('misc_folder_mapping'),
      placeholder: t('misc_folder_mapping_enter'),
    },
  ];
  const cmsFormConfig = [
    {
      name: 'cmsUrl',
      title: t('cms_url'),
      placeHolder: t('enter_cms_url'),
    },
    {
      name: 'cmsUserName',
      title: t('cms_user_name'),
      placeHolder: t('enter_cms_user_name'),
    },
    {
      name: 'cmsPassword',
      title: t('cms_password'),
      placeHolder: t('cms_password'),
    },
    {
      name: 'imageFolderMapping',
      title: t('image_folder_mapping'),
      placeHolder: t('enter_image_folder_mapping'),
    },
    {
      name: 'videoFolderMapping',
      title: t('video_folder_mapping'),
      placeHolder: t('enter_video_folder_mapping'),
    },
    {
      name: 'audioFolderMapping',
      title: t('audio_folder_mapping'),
      placeHolder: t('enter_audio_folder_mapping'),
    },
    {
      name: 'miscFolderMapping',
      title: t('misc_folder_mapping'),
      placeHolder: t('enter_misc_folder_mapping'),
    },
  ];
  const initForm = (formConfig) => {
    return formConfig.map((config) => ({
      value: '',
      errorMessage: '',
      ...config,
      title: t(config.title),
      placeHolder: t(config.placeHolder),
      label: t(config.label),
      //   validations: config.validations,
      //   ref: config.ref,
    }));
  };

  const [newSiteForm, setNewSiteForm] = useState(
    initForm(formConfigData(adminDomainList))
  );
  const [damForm, setDamForm] = useState(initForm(damFormConfig));
  const [vodForm, setVodForm] = useState(initForm(vodFormConfig));
  const [cmsForm, setCmsForm] = useState(initForm(cmsFormConfig));

  const fetchSiteDetail = async () => {
    try {
      const { authoring_getSitedetails = {} } = await fetchSites({
        page: siteName,
      });

      if (
        !authoring_getSitedetails ||
        !Object.keys(authoring_getSitedetails).length
      )
        return;
      const siteDetail = {
        ...authoring_getSitedetails,
        domain_name: authoring_getSitedetails?.domain_name,
      };

      const newSiteFormClone = [...newSiteForm];
      newSiteFormClone.forEach((control) => {
        control.value = siteDetail[control.name];
      });
      setNewSiteForm([
        ...newSiteFormClone,
        { name: 'site_title_url', value: siteDetail.site_title_url },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDomain = async () => {
    try {
      const res: any = await fetchDomainList();
      const temp = res?.authoring_getAdminDomainList?.map((obj) => ({
        ...obj,
        value: obj.dnsName,
      }));
      setAdminDomain((prev) => ({ ...prev, domainList: temp }));
    } catch (error) {
      console.log(error);
    }
  };
  const fetchAdmin = async () => {
    try {
      const res: any = await fetchAdminList();
      const temp = res?.authoring_getAdminDomainList?.map((obj) => ({
        value: obj.email,
        name: obj.email,
        user_id: obj.user_id,
      }));
      setAdminDomain((prev) => ({ ...prev, adminList: temp }));
    } catch (error) {
      console.log(error);
    }
  };

  const validate = async (input, type) => {
    try {
      if (type === 'site_title') {
        const res: any = await siteTitleValidation(input);
        const temp = res?.authoring_searchExistsValidation;
        setIsExist((val) => ({ ...val, [type]: temp?.isExist }));
      } else {
        const res: any = await subdomainValidation(input);
        const temp = res?.authoring_searchExistsValidation;
        setIsExist((val) => ({ ...val, [type]: temp?.isExist }));
      }
    } catch (error) {
      setIsExist((val) => ({ ...val, [type]: true }));
    }
  };

  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  useEffect(() => {
    !siteName && setNewSiteForm(initForm(formConfigData(adminDomainList)));
  }, [adminDomainList]);

  useEffect(() => {
    fetchDomain();
    fetchAdmin();
    if (siteName) {
      fetchSiteDetail();
    }
  }, []);

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
    }, 100);
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
    sectionPos.current = getSectionPos();
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const onBreadscumClick = (icon) => {
    if (!icon) return;
    setActiveForm(icon.section);
    window.scrollTo(0, icon?.sectionRef?.current.offsetTop - 125);
  };
  const iconList = [
    {
      iconComponent: <img src={Pencil} />,
      title: t('create_new_site'),
      section: 'create_new_site',
      sectionRef: createSiteSection,
    },
    // {
    //   iconComponent: <SettingSliderIcon />,
    //   title: t('site_configuration'),
    //   section: 'site_configuration',
    //   sectionRef: siteConfigurationSection,
    // },
  ];

  const overrideMuiCss = `
  .css-m8z8k6-MuiButtonBase-root-MuiTab-root.Mui-selected {
    color: #4B9EF9;
  }
  .css-iamoa2-MuiTabs-indicator {
    background-color:  #4B9EF9;
  }
  .
  `;

  const getFormValue = (form): any => {
    const formValue = {};
    form.forEach((control) => {
      formValue[control.name] = control.value;
    });
    return formValue;
  };

  const handleToast = (response) => {
    if (response) {
      response
        .then((res) => {
          if (!res?.errors) {
            setOpenPublishModal(true);
          }
        })
        .catch((error) => {
          throw error;
        });
    }
  };

  const getZoneName = () => {
    const zone = adminDomainList.domainList.find(
      (control) => control.value === newSiteForm[0].value
    );
    return zone?.name || adminDomainList.domainList[0]?.name || '';
  };

  const onBlur = (name) => {
    if (name === 'site_title') {
      const input = {
        search: newSiteForm[2]?.value,
      };
      newSiteForm[2]?.value != '' && validate(input, 'site_title');
    } else {
      const input = {
        search: newSiteForm[1]?.value + '.' + newSiteForm[0]?.value,
        zoneName: getZoneName(),
      };

      validate(input, 'site_address');
    }
  };

  const onSave = async (calledFromPublish = false) => {
    try {
      setIsLoading(true);
      const newSiteFormValue = getFormValue(newSiteForm);
      if (newSiteFormValue && Object.keys(newSiteFormValue).length) {
        const userObj = adminDomainList.adminList.find(
          (obj) => obj.value === newSiteForm[5].value
        );
        const input = {
          input: {
            CommonFields: {
              page: siteName ? siteName : newSiteFormValue.site_title,
              createdby: username,
              lastmodifiedby: username,
              lastmodifieddate: '',
            },
            ObjectFields: {
              ...newSiteFormValue,
              is_edit: Boolean(siteName),
              is_softdelete: false,
              user_action_info: '',
              doc_state: 'DRAFT',
              zone_name: getZoneName(),
              userId: userObj?.user_id,
            },
          },
        };

        const action = siteName ? updateSiteConfig : createSiteConfig;
        // if(siteName){
        //   delete input.input.ObjectFields?.userId
        // }
        const promiseRes = await action(input);

        let msg = 'create_site_success';
        if (siteName) {
          msg = 'update_site_success';
        }
        if (!promiseRes?.errors && !calledFromPublish) {
          toastMessage.current = msg;
          //setIsNotificationToast(true);
          setSavedPageURL(promiseRes?.authoring_createSiteConfig?.name);
          setIsSaved(true);
          setIsLoading(false);
          showToastSuccess(t(toastMessage.current));
        }
      }
    } catch (error: any) {
      console.log(error?.graphQLErrors);
      setIsLoading(false);
    }
  };

  const onPublish = async () => {
    try {
      setIsLoading(true);
      const publishRes = publishMultisiteInfo({
        input: {
          page: siteName ? siteName : savedPageURL,
          status: 'publish',
          is_schedule: false,
          schedule_date_time: '',
        },
      });

      await handleToast(publishRes);
      setIsLoading(false);
      setIsSaved(false);
    } catch (error: any) {
      console.log(error?.graphQLErrors);
      setIsLoading(false);
    }
  };

  const closeButtonHandle = () => {
    setOpenPublishModal(false);
  };

  useEffect(() => {
    isFormValid.current = [
      ...newSiteForm,
      ...cmsForm,
      ...damForm,
      ...vodForm,
    ].every((control) => control.value);
  }, [newSiteForm, cmsForm, damForm, vodForm]);

  const handleDropDownChange = (event: SelectChangeEvent, controlName) => {
    const control = newSiteForm.find((control) => control.name === controlName);
    control.value = event.target.value;
    setNewSiteForm([...newSiteForm]);

    if (controlName === 'domain_name' && newSiteForm[1]?.value) {
      onBlur('site_address');
    }
  };

  const handleTextChange = (ctrl, form, setForm) => (event) => {
    let value = event.target.value;
    if (ctrl.name === 'site_address') {
      value = value
        ?.replace(/[^a-zA-Z0-9.]/g, '')
        .toLowerCase()
        .replace(/\s/g, '');
    }
    ctrl.value = value;
    setForm([...form]);
  };
  const getList = (control) => {
    if (control.name === 'domain_name' && control.list?.length === 0) {
      return adminDomainList.domainList;
    } else if (control.name === 'site_admin' && control.list?.length === 0) {
      return adminDomainList.adminList;
    }
    return control.list;
  };

  const renderControl = (control) => {
    switch (control.type) {
      case 'textfield':
        return (
          <>
            <TextBox
              backgroundColor={'#EFF0F6'}
              name={control.name}
              maxCharLength={control.name === 'site_title' ? 50 : 30}
              placeHolder={control.placeHolder}
              state={control.value}
              handleChange={handleTextChange(
                control,
                newSiteForm,
                setNewSiteForm
              )}
              handleOnBlur={() => onBlur(control.name)}
              isDisabled={control.name === 'site_address' && Boolean(siteName)}
              error={isExist[control.name]}
              helperText={isExist[control.name] && t('already_exists')}
            />
            {control.name === 'site_address' && (
              <Typography className={classes.typoBoxStyle} marginTop={1}>
                {`${newSiteForm[1]?.value}`
                  ? `${newSiteForm[1]?.value}.${newSiteForm[0]?.value?.replace(
                      '.com.',
                      '.com'
                    )}`
                  : `${newSiteForm[0]?.value?.replace('.com.', '.com')}`}
              </Typography>
            )}
          </>
        );
      case 'textarea':
        return (
          <CookieTextArea
            name={control.name}
            placeHolder={control.placeHolder}
            state={control.value}
            handleChange={handleTextChange(
              control,
              newSiteForm,
              setNewSiteForm
            )}
          />
        );
      case 'dropdown':
        return (
          <AddSiteSelect
            value={control.value}
            handleDropDownChange={(event) =>
              handleDropDownChange(event, control.name)
            }
            itemList={getList(control)}
            isLanguageDropDown={control.name.includes('site_default_lang')}
            isDisabled={
              (control.name === 'site_default_language' ||
                control.name === 'domain_name' ||
                control.name === 'isShared') &&
              Boolean(siteName)
            }
          />
        );
      default:
        return null;
    }
  };
  const classes = useAddSiteStyle();
  return (
    <>
      <style>{overrideMuiCss}</style>
      <SiteCreationTopBar
        iconList={iconList}
        // siteLabel={t('site_creation')}
        siteLabel={siteName ? `${t('site_update')}` : `${t('site_creation')}`}
        returnBack={() => {
          navigate('/sites/site-listing');
        }}
        activeForm={activeForm}
        onBreadscumClick={onBreadscumClick}
        onSave={onPublish}
        // formValue={[...newSiteForm, ...cmsForm, ...damForm, ...vodForm]}
        formValue={[...newSiteForm]}
        onIconClick={onSave}
        isSaved={isSaved}
      />
      <Box className={classes.addSitePage}>
        <Box ref={createSiteSection}>
          {isLoading && <Loader />}
          <SiteSettingPanel
            number='01'
            title={siteName ? `${t('update_site')}` : `${t('create_new_site')}`}
            subTitle={t('subhead')}
            contentContainerSx={{ padding: '30px 20px' }}
            panelStyle={{ marginTop: '5px' }}
            titleStyle={{
              ...siteSettingPanelTitle,
            }}
            subTitleStyle={{
              ...siteSettingPanelSubTitle,
            }}
            counterStyle={{
              ...siteSettingPanelCounterStyle,
            }}
          >
            <Grid container sx={{ paddingTopTop: '20px' }}>
              {newSiteForm.map((control, index) => (
                <Fragment key={`control_${index + 1}`}>
                  <Grid
                    item
                    xs={12}
                    sm={5}
                    md={5}
                    lg={5}
                    sx={{
                      marginTop:
                        index > 0
                          ? {
                              xs: '24px',
                              sm: '36px',
                            }
                          : '0',
                    }}
                  >
                    <ControlTitle>{t(control.title)}</ControlTitle>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={7}
                    md={7}
                    lg={7}
                    sx={{
                      marginTop:
                        index > 0
                          ? {
                              xs: '16px',
                              sm: '36px',
                            }
                          : {
                              xs: '16px',
                              sm: '0',
                            },
                    }}
                  >
                    {renderControl(control)}
                  </Grid>
                </Fragment>
              ))}
            </Grid>
          </SiteSettingPanel>
        </Box>
      </Box>
      {/* {isNotificationToast && (
        <PlateformXSnackbar
          isDefaultOpen={isNotificationToast}
          message={t(toastMessage.current)}
          messageType='success'
          onCloseButtonClick={onCloseSaveHandler}
        />
      )} */}

      {openPublishModal && (
        <PlateformXDialog
          isDialogOpen={openPublishModal}
          title={t('congratulations')}
          subTitle={`${t('publish_site_success')}`}
          confirmButtonText={t('go_to_site_listing')}
          closeButtonHandle={closeButtonHandle}
          confirmButtonHandle={() => navigate('/sites/site-listing')}
          modalType='publish'
          type='site'
        />
      )}
    </>
  );
};

export default AddSite;
