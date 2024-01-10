import { useLazyQuery, useMutation } from '@apollo/client';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid } from '@mui/material';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import IconButton from '@mui/material/IconButton';
import StepIcon from '@mui/material/StepIcon';
import Tooltip from '@mui/material/Tooltip';
import { addMinutes } from 'date-fns';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
// import SkeltonLoader from '../../components/Skeleton-loader/skeleton';
import SocialShareStep1 from './socialShareSteps1';
import SocialShareStep2 from './socialShareSteps2';
import SocialShareStep3 from './socialShareSteps3';

import { useTranslation } from 'react-i18next';
import { ShowToastError, ShowToastSuccess } from '@platformx/utilities';
import { useUserSession } from '@platformx/utilities';
import {
  ArticleMutations,
  ArticleQueries,
  FETCH_VOD_BY_ID,
} from '@platformx/authoring-apis';
import {
  fetchSocialShareProfile,
  rescheduleSocialShare,
  scheduleSocialShare,
} from '@platformx/authoring-apis';
import {
  capitalizeFirstLetter,
  convertToLowerCase,
  getSubDomain,
  SkeltonLoader
} from '@platformx/utilities';
enum ShareNetworkValues {
  fb = 'Facebook',
  in = 'LinkedIn',
}

const steps = [
  {
    label: 'choose_network',
    description: 'network_subtitle',
  },
  {
    label: 'create_post',
    description: 'create_subtitlte',
  },
  {
    label: 'preview',
    description: 'preview_subtitle',
  },
];

function BadgedlibStepIcon(props: any) {
  const { active, completed, icon } = props;
  const [open, setOpen] = React.useState(false);
  const { t, i18n } = useTranslation();
  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };
  return (
    <Badge
      badgeContent={
        <ClickAwayListener onClickAway={handleTooltipClose}>
          <Tooltip
            PopperProps={{
              sx: { color: '#fff', fontSize: '12px' },
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={t(steps[icon - 1].description)}
          >
            <IconButton onClick={handleTooltipOpen} size="small">
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                }}
              >
                <InfoOutlinedIcon color="disabled" />
              </Box>
            </IconButton>
          </Tooltip>
        </ClickAwayListener>
      }
      overlap="circular"
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <StepIcon
        sx={{ color: active || completed ? '#2d2d39' : '#ced3d9' }}
        icon={icon}
      />
    </Badge>
  );
}

const SocialShareSteps = ({
  selectedItem,
  contentType,
  onClickingDone,
  onDoneClick,
}: any) => {
  const { t, i18n } = useTranslation();
  const [activeStep, setActiveStep] = React.useState(1);
  const [selectedSocial, setSelectedSocial] = React.useState({
    in: selectedItem?.NetworkType == 'LinkedIn' ? true : false,
    fb: true,
  });

  const [facebookProfileData, setfacebookProfileData] = React.useState({});
  const [caption, setCaption] = React.useState(
    selectedItem?.Caption ? selectedItem?.Caption : ''
  );
  const [checked, setChecked] = React.useState(
    selectedItem?.ShareType === 'Schedule'
  );
  const [scheduleDate, setScheduleDate] = React.useState<Date | null>(
    selectedItem?.ScheduleDate
      ? selectedItem.ScheduleDate
      : addMinutes(new Date(), 15)
  );
  const navigate = useNavigate();
  const [socialShareSchedule] = useMutation(scheduleSocialShare);
  const [socialShareReSchedule] = useMutation(rescheduleSocialShare);
  const [runFetchSocialShare] = useLazyQuery(fetchSocialShareProfile);
  const [loading, setLoading] = React.useState(false);
  const [runFetchContentByPath] = useLazyQuery(
    ArticleQueries.FETCH_CONTENT_BY_PATH
  );
  const [runFetchArticleModel] = useLazyQuery(
    ArticleQueries.FETCH_ARTICLE_MODEL
  );
  const [runFetchVodById] = useLazyQuery(FETCH_VOD_BY_ID);
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;

  //Social Share Schedule API Call
  const socialSchedule = (input: any, sharetype: any) => {
    setLoading(true);
    socialShareSchedule({
      variables: {
        input: { socialShareFields: input },
        shareType: sharetype,
        contentType: 'SocialShare',
      },
    })
      .then((res) => {
        ShowToastSuccess(
          `${t(contentType == 'video' ? 'VOD' : contentType)} ${t(
            checked ? 'scheduled' : 'shared'
          )} ${t('successfully')}`
        );
        onDoneClick();
        setLoading(false);
      })
      .catch((error) => {
        ShowToastError(t('api_error_toast'));
        onDoneClick();
        setLoading(false);
      });
  };

  //Check VOD status before calling Social Share Schedule API
  const getVodStatus = (page: any, scheduleInput: any, sharetype: any) => {
    runFetchVodById({
      variables: { folder: 'vodcontent', path: page },
    })
      .then((resp) => {
        if (resp?.data?.authoring_getCmsVodByPath) {
          const vodObj = resp?.data?.authoring_getCmsVodByPath;
          if (
            vodObj?.Page_State === 'PUBLISH' ||
            vodObj?.Page_State === 'DRAFT'
          ) {
            socialSchedule(scheduleInput, sharetype);
          } else {
            ShowToastError(
              'Cannot share a non-published item. Please publish it and try again.'
            );
            onDoneClick();
            setLoading(false);
          }
        } else {
          ShowToastError(
            'Cannot share a non-published item. Please publish it and try again.'
          );
          onDoneClick();
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('runFetchErr ', err, JSON.stringify(err, null, 2));
        ShowToastError(t('api_error_toast'));
        onDoneClick();
        setLoading(false);
      });
  };
  //Check Article status before calling Social Share Schedule API
  const getArticleStatus = async (articleName: any, scheduleInput: any, sharetype: any) => {
    setLoading(true);
    if (articleName) {
      await runFetchArticleModel({
        variables: { folder: 'article', path: articleName },
      })
        .then((resp) => {
          if (resp?.data?.authoring_getCmsArticleByPath) {
            const articleObj = resp?.data?.authoring_getCmsArticleByPath;
            if (
              articleObj?.Page_State === 'PUBLISH' ||
              articleObj?.Page_State === 'DRAFT'
            ) {
              socialSchedule(scheduleInput, sharetype);
            } else {
              ShowToastError(
                'Cannot share a non-published item. Please publish it and try again.'
              );
              onDoneClick();
              setLoading(false);
            }
          } else {
            ShowToastError(
              'Cannot share a non-published item. Please publish it and try again.'
            );
            onDoneClick();
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log('runFetchErr ', JSON.stringify(err, null, 2));
          ShowToastError(t('api_error_toast'));
          onDoneClick();
          setLoading(false);
        });
    } else {
      ShowToastError(t('api_error_toast'));
      onDoneClick();
      setLoading(false);
    }
  };
  //Check Poll, Quiz and Event status before calling Social Share Schedule API
  const getContentStatus = (type: any, contentPath: any, scheduleInput: any, sharetype: any) => {
    setLoading(true);
    runFetchContentByPath({
      variables: {
        contentType: capitalizeFirstLetter(type),
        path: contentPath,
      },
    })
      .then((res) => {
        // if (res?.data?.authoring_getCmsContentByPath !== null) {
        //   ShowToastError(
        //     'Cannot share a non-published item. Please publish it and try again.'
        //   );
        //   onDoneClick();
        //   setLoading(false);
        // }
        if (
          res?.data?.authoring_getCmsContentByPath?.page_state ===
          'PUBLISHED' ||
          res?.data?.authoring_getCmsContentByPath?.page_state === 'DRAFT'
        ) {
          socialSchedule(scheduleInput, sharetype);
        } else {
          ShowToastError(
            'Cannot share a non-published item. Please publish it and try again.'
          );
          onDoneClick();
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(JSON.stringify(err, null, 2));
        ShowToastError(t('api_error_toast'));
        onDoneClick();
        setLoading(false);
      });
  };
  //Social Share Re-Schedule API Call
  const socialReSchedule = (ReScheduleInput: any) => {
    setLoading(true);
    socialShareReSchedule({
      variables: {
        requestdto: ReScheduleInput,
        scheduleTime: checked ? scheduleDate : '',
        type: 'SocialShare',
      },
    })
      .then((res) => {
        ShowToastSuccess('Social Share rescheduled successfully.');
        onClickingDone();
        setLoading(false);
      })
      .catch((error) => {
        ShowToastError(t('api_error_toast'));
        onClickingDone();
        setLoading(false);
      });
  };
  //Handle Next Step in the popup
  const handleNext = () => {
    const currentDateTime = addMinutes(new Date(), 14);
    //const scheduleDateTime= new Date(scheduleDate? scheduleDate :'');
    if (activeStep == 1 && checked) {
      const scheduleDateTime: any = scheduleDate
        ? new Date(scheduleDate)
        : scheduleDate;
      if (!scheduleDate || scheduleDateTime == 'Invalid Date') {
        ShowToastError(t('ss_date_format'));
        return false;
      }
      if (scheduleDateTime && scheduleDateTime < currentDateTime) {
        ShowToastError(t('ss_publish_time'));
        return false;
      }
    }
    if (activeStep == 1) {
      const shareNetwork = [ShareNetworkValues.fb];
      runFetchSocialShare({
        variables: { socialShareType: shareNetwork },
      })
        .then((res) => {
          setfacebookProfileData(
            res?.data?.authoring_socialSharePageProfile[0]?.facebookRes
          );
        })
        .catch((err) => {
          console.log(JSON.stringify(err, null, 2));
        });
    }

    if (activeStep == 2) {
      const postURL = `${getSubDomain()}/${i18n.language}/${convertToLowerCase(contentType) === 'vod'
        ? 'video'
        : convertToLowerCase(contentType)
        }${selectedItem?.CurrentPageURL}`;

      if (checked) {
        const scheduleDateTime: any = scheduleDate
          ? new Date(scheduleDate)
          : scheduleDate;
        if (!scheduleDate || scheduleDateTime == 'Invalid Date') {
          ShowToastError(t('ss_date_format'));
          return false;
        }
        if (scheduleDateTime && scheduleDateTime < currentDateTime) {
          ShowToastError(t('ss_publish_time'));
          return false;
        }
      }

      const sharetype: any = [];
      // const sharetype= [selectedSocial?.in? ShareNetworkValues.in : null, selectedSocial?.fb? ShareNetworkValues.fb : null,];
      if (selectedSocial?.in) {
        sharetype.push(ShareNetworkValues?.in);
      }
      if (selectedSocial?.fb) {
        sharetype.push(ShareNetworkValues?.fb);
      }
      const scheduleInput = {
        fbFields: {
          message: caption,
          link: selectedItem?.postURL ? selectedItem?.postURL : postURL,
        },
        CommonFields: {
          title: selectedItem?.Title,
          description: selectedItem?.Description,
          settings: {
            is_schedule_publish: checked ? true : false,
            schedule_publish_datetime: checked ? scheduleDate : '',
          },
        },
        ObjectFields: {
          item_title: selectedItem?.Title,
          content_type: selectedItem?.contentType
            ? selectedItem?.contentType
            : contentType == 'video'
              ? 'VOD'
              : contentType,
          item_path: selectedItem?.Page,
        },
      };
      // Call Shcedule and Re-Schedule API based on share Type
      if (selectedItem?.ShareType === 'Schedule') {
        const ReScheduleInput = {
          page: selectedItem?.reSchedulePostUrl?.replace(/^\/|\/$/g, ''),
          currentpageurl: selectedItem?.reSchedulePostUrl,
          parentpageurl: '/',
        };
        socialReSchedule(ReScheduleInput);
      } else {
        if (contentType === 'video') {
          getVodStatus(selectedItem?.Page, scheduleInput, sharetype);
        } else if (contentType === 'article') {
          getArticleStatus(selectedItem?.Page, scheduleInput, sharetype);
        } else {
          getContentStatus(
            contentType,
            selectedItem?.Page,
            scheduleInput,
            sharetype
          );
        }
      }
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  const inlineCss = `
  .desktopstepper .Platform-x-StepIcon-root {
    width: 58px;
    height: 58px;
  }
  .desktopstepper .Platform-x-StepLabel-label{
      font-size: 20px;
      letter-spacing: normal;
      padding: 0 0 20px 20px;
  }
 .desktopstepper .Platform-x-StepConnector-root{
    margin-left: 30px;
 }
 .desktopstepper .Platform-x-StepIcon-text{
  font-Size: 8px;
  font-weight: 700;
 }
 .Platform-x-StepLabel-horizontal.Platform-x-StepLabel-alternativeLabel {
  flex-direction: column;
}

.mobilestepper .Platform-x-StepIcon-root {
  width: 45px;
  height: 45px;
}
.mobilestepper .Platform-x-StepConnector-root{
  top: 20px;
  margin-right: 15px;
}
.mobilestepper .Platform-x-StepLabel-labelContainer{
  margin-top: 15px;
}
.mobilestepper .Platform-x-StepLabel-label{
  font-size: 12px;
}
.mobilestepper .Platform-x-StepIcon-text{
  font-Size: 8px;
  font-weight: 700;
 }
.Platform-x-Tooltip-tooltip{
  background-color: #ffffff;
  font-size: 12px;
  color: #5c6574;
  padding: 20px;
  letter-spacing: 1;
  line-height: 1.7;
}
.socialsharestepsbtn .Platform-x-ButtonBase-root.Mui-disabled, .next-prev .Platform-x-ButtonBase-root.Mui-disabled {
  background-color: #ced3d9;
  color: #89909a;
}

@media (max-width: 767px) {
  .socialsharestepsbtn {
    position: absolute;
    bottom: 20px;
    left: 0;
    width: 100%;
}
 `;
  return (
    <Box>
      <style>{inlineCss}</style>
      <Grid>
        {(selectedItem && selectedItem?.Thumbnail) || selectedItem?.Banner ? (
          <>
            {/* <Grid item xs={12} md={6}>
            <Box
              sx={{
                width: "100%",
                margin: "30px 50px 9px 14px",
                padding: "10px 10px 8px ",
                display: { xs: "block", sm: "block", md: "none" },
              }}
              className="mobilestepper"
            >
              <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      StepIconComponent={BadgedlibStepIcon}
                      sx={{ textAlign: "center" }}
                    >
                      {t(step.label)}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <Box
              sx={{
                padding: { xs: "70px", sm: "70px", md: '5px 0 20px 40px', xl: "70px" },
                display: { xs: "none", sm: "none", md: "block" },
              }}
              className="desktopstepper"
            >
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step
                    sx={{
                      "& .Platform-x-StepLabel-root .Platform-x-active .Platform-x-StepIcon-text": {
                        fontSize: "14px",
                      },
                    }}
                    key={step.label}
                  >
                    <StepLabel>{t(step.label)}</StepLabel>
                    <Box
                      sx={{
                        marginLeft: "30px",
                        paddingLeft: "55px",
                        paddingRight: "11px",
                        borderLeft: index === 2 ? "0" : "1px solid #bdbdbd",
                        color: "#5c6574",
                      }}
                    >
                      <Typography
                        sx={{ position: "relative", top: "-25px" }}
                        variant="h6regular"
                      >
                        {t(step.description)}
                      </Typography>
                    </Box>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Grid> */}

            <Grid item xs={12} md={12}>
              <Box sx={{ overflowY: 'auto', maxHeight: '540px' }}>
                {activeStep === 0 ? (
                  <SocialShareStep1
                    selectedSocial={selectedSocial}
                    setSelectedSocial={setSelectedSocial}
                  />
                ) : null}
                {activeStep === 1 ? (
                  <SocialShareStep2
                    selectedItems={setCaption}
                    caption={caption}
                    checked={checked}
                    setCaption={setCaption}
                    setChecked={setChecked}
                    scheduleDate={scheduleDate}
                    setScheduleDate={setScheduleDate}
                    isReschedule={selectedItem?.ShareType === 'Schedule'}
                  />
                ) : null}
                {activeStep === 2 || activeStep === 3 ? (
                  <SocialShareStep3
                    selectedItems={selectedItem}
                    captionText={caption}
                    isSchedulePost={checked}
                    scheduleDateVal={scheduleDate}
                    selectedNetwork={selectedSocial}
                    contentType={contentType}
                    facebookProfileData={facebookProfileData}
                    loading={loading}
                  />
                ) : null}
              </Box>
              <Box
                sx={{
                  position: { md: 'absolute' },
                  // marginTop: {
                  //   md: activeStep === 0 ? '300px' : activeStep === 1 ? '170px' : '240px',
                  //   em: activeStep === 0 ? '130px' : '0px',
                  // },
                  '@media screen and (max-height: 600px) and (orientation: landscape)':
                  {
                    position: 'unset',
                    marginTop: '12px',
                  },
                  display: { xs: 'none', md: 'flex' },
                  justifyContent: { md: 'flex-end' },
                  bottom: { xs: '20px', md: '15px' },
                  right: { xs: '20px', md: '25px' },
                  marginTop: '5px',
                }}
                className="next-prev"
              >
                {activeStep === 2 || activeStep === 3 ? (
                  <Button
                    variant="secondaryButton"
                    disabled={activeStep === 3 ? true : false}
                    onClick={handleBack}
                    sx={{ marginRight: '12px' }}
                  >
                    {t('back')}
                  </Button>
                ) : null}
                {activeStep === 0 || activeStep === 1 || activeStep === 2 ? (
                  <Button
                    variant="primaryButton"
                    disabled={
                      activeStep === 0
                        ? selectedSocial?.in || selectedSocial?.fb
                          ? false
                          : true
                        : false
                    }
                    onClick={handleNext}
                  >
                    {activeStep === 2 ? t('done') : t('next')}
                  </Button>
                ) : null}
                {activeStep === 3 ? (
                  <Button variant="primaryButton" disabled onClick={handleNext}>
                    {activeStep === 3 ? t('done') : t('next')}
                  </Button>
                ) : null}
              </Box>

              <Box
                sx={{
                  position: 'inherit',
                  padding: { xs: '20px 0px 0px 0px' },
                  textAlign: 'center',
                  //marginBottom: "35px",
                  display: { xs: 'block', md: 'none' },
                }}
                className="socialsharestepsbtn"
              >
                {activeStep === 2 || activeStep === 3 ? (
                  <Button
                    variant="secondaryButton"
                    disabled={activeStep === 3 ? true : false}
                    onClick={handleBack}
                    sx={{ mr: 1, width: '45%' }}
                  >
                    {t('back')}
                  </Button>
                ) : null}
                {activeStep === 0 ? (
                  <Button
                    variant="primaryButton"
                    sx={{ width: '85%' }}
                    disabled={
                      activeStep === 0
                        ? selectedSocial?.in || selectedSocial?.fb
                          ? false
                          : true
                        : false
                    }
                    onClick={handleNext}
                  >
                    {t('next')}
                  </Button>
                ) : null}
                {activeStep === 1 || activeStep === 2 || activeStep === 3 ? (
                  <Button
                    sx={{ width: '45%' }}
                    variant="primaryButton"
                    disabled={activeStep === 3 ? true : false}
                    onClick={handleNext}
                    className="socialsharedone"
                  >
                    {activeStep === 2
                      ? t('done')
                      : activeStep === 3
                        ? t('done')
                        : t('next')}
                  </Button>
                ) : null}
              </Box>
            </Grid>
          </>
        ) : (
          <Grid item xs={12} md={12}>
            <SkeltonLoader maxWidth={800} maxHeight={500} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
export default SocialShareSteps;
