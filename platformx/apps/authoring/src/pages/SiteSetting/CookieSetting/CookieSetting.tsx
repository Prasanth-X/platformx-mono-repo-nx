import CreateRoundedIcon from '@mui/icons-material/CreateRounded';
import { Box, Grid, Typography } from '@mui/material';
import { t } from 'i18next';
import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CogIcon from '../../../assets/Cog_Icon.svg';
import MultiSelect from '../../../components/Common/MultiSelect/MultiSelect';
import TitleSubTitle from '../../../components/Common/TitleSubTitle';
import { tagInlineCss } from '../../../components/Common/tags/TagCommonCss';
import PlateformXDialog from '../../../components/Modal';
import Loader from '../../../Common/Loader';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import {
  fetchCookiePolicy,
  fetchCountries,
  mutateCookiePolicy,
  publishCookiePolicy,
} from '../../../services/SiteSetting/SiteSetting.api';
import SiteSettingPanel from '../SiteSettingPanel/SiteSettingPanel';
import SiteTopBar from '../SiteTopBar/SiteTopBar';
import CookieFormControl from './CookieFormControl';
import { useStyles } from './CookieSetting.style';
import {
  consentCookieSkeletonList,
  formConfig,
  informativeCookieSkeletonList,
} from './CookieSettingConstant';

const CookieSetting = () => {
  const [consentList, setConsentList] = useState<string[]>([]);
  const [informativeList, setInformativeList] = useState<string[]>([]);
  const [isShowPreview, setIsShowPreview] = useState<boolean>(false);
  const [activeForm, setActiveForm] = useState<string>('');
  const [coutryList, setCoutryList] = useState<string[]>([]);
  const informativeFormRef = useRef<HTMLElement>(null);
  const consentFormRef = useRef<HTMLElement>(null);
  const scrollDebounceRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const classes = useStyles();
  const originalApiResult = useRef<any>(null);
  const [isNotificationToast, setIsNotificationToast] =
    useState<boolean>(false);
  const toastMessage = useRef(null);
  const onCloseSaveHandler = () => {
    setIsNotificationToast(false);
  };
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const crossButtonHandle = () => {
    setIsNotificationToast(false);
  };
  const navigate = useNavigate();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  const iconList: any = [
    {
      iconComponent: <img src={CogIcon} />,
      title: t('informative_cookie_setting'),
      section: 'Informative',
      sectionRef: informativeFormRef,
    },
    {
      iconComponent: <img src={CogIcon} />,
      title: t('consent_cookie_setting'),
      section: 'Consent',
      sectionRef: consentFormRef,
    },
  ];

  const handleScroll = () => {
    if (scrollDebounceRef.current) {
      clearTimeout(scrollDebounceRef.current);
    }

    const timeOutId = setTimeout(() => {
      setActiveForm(
        window.scrollY < consentFormRef.current.offsetTop - 130
          ? 'Informative'
          : 'Consent'
      );
    }, 100);
    scrollDebounceRef.current = timeOutId;
  };

  const fetchAndUpdateData = async () => {
    const [cookiePolicyForm, countryList] = await Promise.all([
      fetchCookiePolicy({
        pagePath: 'cookie-item',
      }),
      fetchCountries({
        start: 0,
        rows: 1000,
        searchCategory: 'country',
      }),
    ]);
    const { authoring_getCookiePolicy: apiResult = {} } = cookiePolicyForm;
    const countries = countryList?.authoring_getTagsList[0]?.tags;
    const cloneForm = form;
    cloneForm.forEach((control) => {
      control.value = apiResult[control.name];
    });

    setCoutryList(countries);
    setConsentList(
      apiResult.consent_cookie_country_list
        ? apiResult.consent_cookie_country_list.split('|')
        : []
    );
    setInformativeList(
      apiResult.informative_cookie_country_list
        ? apiResult.informative_cookie_country_list.split('|')
        : []
    );
    originalApiResult.current = apiResult;
    setForm([...cloneForm]);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    fetchAndUpdateData();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const multiSelectChange = (e, name) => {
    setConsentList((preState) =>
      preState.includes(name)
        ? preState.filter((c) => c !== name)
        : [...preState, name]
    );
  };
  const initForm = () => {
    return formConfig.map((config) => ({
      value: config.defaultValue || '',
      errorMessage: '',
      title: t('cookie_policy'),
      ...config,
      //   validations: config.validations,
      //   ref: config.ref,
    }));
  };
  const [form, setForm] = useState(initForm());
  const handleInputChange = useCallback((event) => {
    const { target: { name = '', value = '' } = {} } = event;
    const control = form.find((control) => name === control.name);
    if (!control) return;
    control.value = value;
    setForm([...form]);
  }, []);

  const onBreadscumClick = (icon) => {
    if (!icon) return;
    setActiveForm(icon.section);
    window.scrollTo(0, icon?.sectionRef?.current.offsetTop - 125);
  };

  const getFormValue = () => {
    const formValue: any = {};
    form.forEach((control) => {
      formValue[control.name] = control.value;
    });
    formValue.informative_cookie_country_list = informativeList.join('|');
    formValue.consent_cookie_country_list = consentList.join('|');
    return formValue;
  };

  const renderListControlFromArr = (list) =>
    list.map((config, index) => (
      <Fragment key={`control${index + 1}`}>
        <CookieFormControl
          name={config.name}
          type={config.type}
          maxLength={config.maxLength}
          placeHolder={config.placeHolder}
          title={config.title}
          subTitle={config.subTitle}
          titleVarient={config.titleVarient}
          subTitleVarient={config.subTitleVarient}
          value={config.value}
          skeleton={config.skeleton}
          skeletonTitle={config.skeletonTitle}
          handleChange={handleInputChange}
          isShowPreview={isShowPreview}
          index={index}
        />
      </Fragment>
    ));

  const publisheaderSetting = () => {
    const input = {
      input: {
        page: 'cookie-item',
        status: 'publish',
        is_schedule: false,
        schedule_date_time: '',
      },
    };
    publishCookiePolicy(input)
      .then((response) => {
        setIsNotificationToast(true);
      })
      .catch((err) => {
        throw err;
      });
  };

  const onSaveClick = async () => {
    setIsLoading(true);
    const formResult = getFormValue();
    delete originalApiResult.current.__typename;
    const params = {
      input: {
        CommonFields: {
          page: 'cookie-item',
          createdby: username,
          lastmodifiedby: username,
          lastmodifieddate: '',
        },
        ObjectFields: {
          ...formResult,
          consent_cookie_policy_link: formResult.cookie_policy_cta_link,
        },
      },
    };

    mutateCookiePolicy(params)
      .then(() => {
        setIsLoading(false);
        publisheaderSetting();
      })
      .catch((err) => {
        setIsLoading(false);
        throw err;
      });
  };

  return (
    <>
      <style>{tagInlineCss}</style>
      <SiteTopBar
        iconList={iconList}
        siteLabel={t('cookie_policy')}
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
          <Box ref={informativeFormRef}>
            {isLoading && <Loader />}
            <SiteSettingPanel
              number='01'
              title={t('informative_cookie_setting')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
            >
              <Box className={classes.informativeContentContainer}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sm={8}
                    lg={8}
                    className={classes.informativeLeft}
                  >
                    <Grid container rowSpacing={1}>
                      {renderListControlFromArr(form.slice(0, 5))}
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.leftGridItem}
                      >
                        <TitleSubTitle
                          title={`${t('enter_cookie_country_list')}`}
                          subTitle={t('')}
                          titleVarient='h6medium'
                          subTitleVarient='h7regular'
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.rightGridItem}
                      >
                        <MultiSelect
                          containerStyle={{
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            borderRadius: '4px',
                            minHeight: '48px',
                          }}
                          list={coutryList}
                          onPickerChange={(e, name) => {
                            setInformativeList((preState) =>
                              preState.includes(name)
                                ? preState.filter((c) => c !== name)
                                : [...preState, name]
                            );
                          }}
                          defaultAmountOfItem={8}
                          mobileAmountOfItem={5}
                          value={informativeList}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sm={4}
                    lg={4}
                    className={classes.informativeSkeleton}
                  >
                    <Box className={classes.informativeSkeletonContainer}>
                      {informativeCookieSkeletonList.map((skeleton, index) => (
                        <Box
                          sx={{ marginTop: index > 0 ? '35px' : '0' }}
                          key={`skeleton${index + 1}`}
                        >
                          <Typography
                            className={classes.informativeSkeletonTitle}
                          >
                            {t(skeleton.title)}
                          </Typography>
                          {skeleton.component}
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </SiteSettingPanel>
          </Box>

          <Box ref={consentFormRef}>
            <SiteSettingPanel
              number='02'
              title={t('consent_cookie_setting')}
              subTitle={t('subhead')}
              contentContainerSx={{ padding: '20px' }}
              panelStyle={{ marginTop: '30px' }}
            >
              <Box className={classes.consentPanel}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    sm={8}
                    lg={8}
                    className={classes.informativeLeft}
                  >
                    <Grid container rowSpacing={1}>
                      {renderListControlFromArr(form.slice(5, form.length))}

                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.leftGridItem}
                      >
                        <TitleSubTitle
                          title={`${t('enter_cookie_country_list')}`}
                          subTitle={t('')}
                          titleVarient='h6medium'
                          subTitleVarient='h7regular'
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        className={classes.rightGridItem}
                      >
                        <MultiSelect
                          list={coutryList}
                          onPickerChange={multiSelectChange}
                          defaultAmountOfItem={8}
                          mobileAmountOfItem={5}
                          value={consentList}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    sm={4}
                    lg={4}
                    className={classes.informativeSkeleton}
                  >
                    <Box className={classes.informativeSkeletonContainer}>
                      {consentCookieSkeletonList.map((skeleton, index) => (
                        <Box
                          sx={{ marginTop: index > 0 ? '35px' : '0' }}
                          key={`skeleton${index + 1}`}
                        >
                          <Typography
                            className={classes.informativeSkeletonTitle}
                          >
                            {t(skeleton.title)}
                          </Typography>
                          {skeleton.component}
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </SiteSettingPanel>
          </Box>
        </Box>
      </Box>
      {isNotificationToast && (
        <PlateformXDialog
          isDialogOpen={isNotificationToast}
          title={t('congratulations')}
          subTitle={`${t('cookie_settings_success')}`}
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

export default CookieSetting;
