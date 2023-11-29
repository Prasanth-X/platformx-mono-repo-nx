import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import GreenTick from "assets/userProfile/greenTick.png";
import "service/i18n";
import dayjs from "dayjs";
import ProfileHeader from "./ProfileHeader";
import { nullToObject } from "utils/helperFns";
import { useTranslation } from "react-i18next";
import { prelemTypes } from "theme/globalStyle";
import DropDown from "Common/DropDown/Dropdown";
import { useCustomStyle } from "./Profile.style";
import FormValidate from "Common/CustomHook/FormValidate";
import { getFlag } from "components/HeaderFooter/helperFunction";
import ToastContainerHandle from "Common/ToastContainer/ToastContainerHandle";
import Confirmation from "components/Ecommerce/Common/Confirmation/Confirmation";
import StringOnBlurTextBox from "Common/TextBox/StringTextBoxComponent/StringOnBlurTextBox";
import {
  getUniqueTimeZone,
  getUserDetailsService,
  updateUserDetailsService,
} from "./helperProfile";
import {
  Box,
  Grid,
  TextField,
  Container,
  Typography,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { LanguageList, countries, genderData } from "utils/helperConstants";
import ToastService from "Common/ToastContainer/ToastService";
import { errorRequest } from "Common/ConstantData";
import Coins from "./Coins";
import Redeem from "./Redeem";

type ProfileProps = {
  secondaryArgs: any;
  // profileDetails: (e?: any) => void;
};

const Profile = ({ secondaryArgs = {} }: ProfileProps) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const menuArr = [
    { title: "Profile", heading: "My Profile" },
    { title: "Coin", heading: "My Coins" },
    { title: "Redeem", heading: "Redeem" },
  ];

  const {
    emailValidation,
    mandatoryValidate,
    allFieldAreCheckToValue,
    allFieldAreCheckToEmpty,
    // mandatoryValidateWithMinAndMax,
  } = FormValidate();

  const [isDisabled, setisDisabled] = useState(true);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [userDetails, setUserDetails] = useState<any>({});
  const [usdTime, setUsdTime] = useState<any[]>([]);
  const [activeMenu, setActiveMenu] = useState(0);

  const [stateManage, setStateManage] = useState<any>({
    dob: "",
    title: "",
    gender: "",
    country: "",
    emailID: "",
    lastName: "",
    language: "",
    firstName: "",
    description: "",
    mobileNumber: "",
    defaultLanguage: "en",
    ISD: "(IN)  +91",
    timezone: "Asia/Calcutta 22:27:58 GMT+0530 (IST)",
  });

  const [stateErrorManage, setStateErrorManage] = useState<any>({
    emailIDError: "",
    mobileNumberError: "",
    firstNameError: "",
  });

  const handleISD = (event: any, newValue: any) => {
    setStateManage((prevFormData: any) => {
      return {
        ...prevFormData,
        ["ISD"]: newValue.label,
      };
    });
  };

  const handleLanguage = (event: any, newValue: any) => {
    setStateManage((prevFormData: any) => {
      return {
        ...prevFormData,
        ["defaultLanguage"]: newValue.id,
      };
    });
  };

  /**
   *success popUp close
   */
  const confirmationPopUpClose = () => {
    setSuccessPopUp(false);
  };

  const handleInputChange = (event: any) => {
    event.preventDefault && event.preventDefault();
    const { name = "", value = "" } = event?.target || {};
    setStateManage({
      ...stateManage,
      [name]: value,
    });
  };

  const editProfile = () => {
    setisDisabled(!isDisabled);
  };

  /**
   * error msg update
   */
  const errorMsgUpdate = () => {
    return {
      ...stateErrorManage,
      emailIDError: emailValidation(stateManage.emailID),
      firstNameError: mandatoryValidate(t("first_name"), stateManage.firstName),
      // mobileNumberError: mandatoryValidateWithMinAndMax({
      //   name: t("mobile_number"),
      //   value: stateManage.mobileNumber,
      //   min: 10,
      //   max: 12,
      // }),
    };
  };

  const saveProfile = async (e: any) => {
    const userId = localStorage.getItem("userId");
    e.preventDefault && e.preventDefault();
    const inputEmptyValidate = allFieldAreCheckToValue({
      emailID: stateManage.emailID,
      firstName: stateManage.firstName,
      // mobileNumber: stateManage.mobileNumber,
    });

    const errorMsg = errorMsgUpdate();
    setStateErrorManage(errorMsg);
    if (inputEmptyValidate) {
      // all error message are resolve comes true
      const errorMsgCheck = allFieldAreCheckToEmpty({
        ...errorMsg,
      });
      if (errorMsgCheck) {
        const res = await updateUserDetailsService({
          userId: userId,
          userDetails: stateManage,
          secondaryArgs: secondaryArgs,
        });
        const { data: { errors = [], data = {} } = {} } = res;
        const isSuccess = data?.updateUserProfile?.message || "";
        if (isSuccess) {
          setSuccessPopUp(true);
          setisDisabled(true);
          // ToastService.SuccessToast(isSuccess);
        } else {
          setisDisabled(false);
          setSuccessPopUp(false);
          ToastService.failToast(errors.length > 0 ? errors[0]?.message : t(errorRequest));
          // eslint-disable-next-line no-console
          console.error(errors);
        }
        // profileDetails({ validate: true, ...stateManage });
      } else {
        // profileDetails({ validate: false });
      }
    } else {
      // profileDetails({ validate: false });
    }
  };

  const strTime = new Date().toLocaleString([], {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    hour12: false,
  });
  const time = new Date(strTime).toTimeString().slice(0, -21);
  const defaultTimeZone = `${Intl.DateTimeFormat().resolvedOptions().timeZone} ${time}(IST)`;

  useEffect(() => {
    getUniqueTimeZone().forEach((val: any) => {
      setUsdTime((prev) => [...prev, { label: val.label, time: val.time }]);
    });
    setStateManage((prevFormData: any) => {
      return {
        ...prevFormData,
        ["timezone"]: defaultTimeZone,
      };
    });
  }, []);

  const handleChangeTimeZone = (event: any, newValue: { label: any }) => {
    setStateManage((prevFormData: any) => {
      return {
        ...prevFormData,
        ["timezone"]: newValue?.label,
      };
    });
  };

  const getUserDetailsServiceApi = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      const res = await getUserDetailsService({
        userId: userId,
        secondaryArgs: secondaryArgs,
      });
      const { status = 0, data: { errors = [], data: { viewProfile = {} } = {} } = {} } =
        nullToObject(res);
      if (status === 200 && Object.keys(nullToObject(viewProfile)).length > 0) {
        const newObj = {
          ...stateManage,
          dob: viewProfile?.dob,
          gender: viewProfile?.gender,
          emailID: viewProfile?.email,
          lastName: viewProfile?.last_name,
          firstName: viewProfile?.first_name,
          mobileNumber: viewProfile?.phone,
          timezone: viewProfile?.timezone || "Asia/Calcutta 22:27:58 GMT+0530 (IST)",
          defaultLanguage: viewProfile?.preferred_sites_languages || "en",
        };
        setStateManage(newObj);
        setUserDetails(viewProfile);
      } else {
        setUserDetails({});
        setStateManage({});
        // eslint-disable-next-line no-console
        console.error(errors);
      }
    }
  };

  useEffect(() => {
    getUserDetailsServiceApi();
  }, []);

  const handleChange = (index: number) => {
    setActiveMenu(index);
  };

  const tempHide = false;
  return (
    <Box
      className={`${classes.profileScreenWrapper} ${globalClasses.prelemType1} prelem prelemType1 profileScreenBg`}>
      <ToastContainerHandle />
      <Box className='signUpScreen'>
        <Container className='grid_container prelem-py myProfileWrapper'>
          <Grid container>
            <Grid xs={12}>
              <Typography variant='h1bold'>{menuArr[activeMenu]?.heading}</Typography>
            </Grid>
            <Grid xs={12} sm={4} md={3} lg={3}>
              <Box className='leftSideBar'>
                {menuArr?.map((item: any, index: number) => (
                  <Typography
                    key={index}
                    variant='p3regular'
                    className={activeMenu === index ? "menuItem activeItem" : "menuItem"}
                    onClick={() => handleChange(index)}>
                    {item?.title}
                  </Typography>
                ))}
              </Box>
            </Grid>
            <Grid xs={12} sm={8} md={9} lg={9}>
              <Box className='rightSideBar'>
                {activeMenu === 0 && (
                  <Box className='profilePageWrapper'>
                    {/* profile page header */}
                    <ProfileHeader
                      isDisabled={isDisabled}
                      userDetails={userDetails}
                      editProfile={editProfile}
                      saveProfile={saveProfile}
                    />

                    <Box className='profileForm'>
                      <Grid container spacing={4} className='formContainer'>
                        <Grid item xs={12} sm={12} em={12} className='gap'>
                          <Box className='gridContentWrapper'>
                            <Typography variant='p3semibold' className='marginBottomZero'>
                              {t("basic_details")}
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} em={6} className='gap'>
                          <Box className='gridContentWrapper'>
                            <StringOnBlurTextBox
                              maxLength={12}
                              name='firstName'
                              label={t("first_name")}
                              isDisabled={isDisabled}
                              isCloseIcon={!isDisabled}
                              cssClass='input-control-textbox'
                              value={stateManage.firstName}
                              handleChange={handleInputChange}
                              errorMessage={stateErrorManage.firstNameError}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} em={6} className='gap'>
                          <Box className='gridContentWrapper'>
                            <StringOnBlurTextBox
                              maxLength={12}
                              name='lastName'
                              label={t("last_name")}
                              cssClass='input-control-textbox'
                              value={stateManage.lastName}
                              handleChange={handleInputChange}
                              isDisabled={isDisabled}
                              errorMessage={""}
                              isCloseIcon={!isDisabled}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} em={6} className='gap'>
                          <Box className='gridContentWrapper'>
                            <StringOnBlurTextBox
                              maxLength={32}
                              name='emailID'
                              isDisabled={true}
                              isCloseIcon={false}
                              label={t("email_id")}
                              value={stateManage.emailID}
                              cssClass='input-control-textbox'
                              handleChange={handleInputChange}
                              errorMessage={stateErrorManage.emailIDError}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} em={6} className='gap'>
                          <Box className='gridContentWrapper'>
                            <Autocomplete
                              disablePortal
                              defaultValue={LanguageList().find(
                                (ele) => ele?.id === stateManage.defaultLanguage,
                              )}
                              id='auto-complete-textbox'
                              className='auto-complete-textbox'
                              options={LanguageList()}
                              value={stateManage.defaultLanguage}
                              onChange={handleLanguage}
                              disabled={isDisabled}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  name='defaultLanguage'
                                  variant='filled'
                                  className='autoComplete selectDefaultCountry'
                                  InputProps={{
                                    ...params.InputProps,
                                    startAdornment: (
                                      <InputAdornment position='start' className='flagWrapper'>
                                        <img
                                          src={getFlag(stateManage.defaultLanguage)}
                                          alt='flag'
                                          className='flagImage'
                                        />
                                      </InputAdornment>
                                    ),
                                  }}
                                />
                              )}
                              popupIcon={<ExpandMoreIcon />}
                            />
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} em={6} className='gap'>
                          <Box className='gridContentWrapper'>
                            <Box className='mobileWithIsdcode'>
                              <Autocomplete
                                disablePortal
                                id='auto-complete-textbox'
                                className='auto-complete-textbox defaultCode smallTxtBox'
                                options={countries}
                                size='small'
                                popupIcon={<ExpandMoreIcon />}
                                value={stateManage.ISD}
                                onChange={handleISD}
                                disabled={isDisabled}
                                renderOption={(props, option) => (
                                  <Box component='li' className='flagRow' {...props}>
                                    <Box className='flagIcon'>
                                      <img
                                        loading='lazy'
                                        alt='country flag'
                                        title='country flag'
                                        width='25'
                                        src={`https://flagcdn.com/w20/${option?.code?.toLowerCase()}.png`}
                                        srcSet={`https://flagcdn.com/w40/${option?.code?.toLowerCase()}.png 2x`}
                                      />
                                    </Box>
                                    {option.label}
                                  </Box>
                                )}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    placeholder='ISD'
                                    variant='filled'
                                    className='autoComplete selectCountrycode'
                                  />
                                )}
                              />
                              <StringOnBlurTextBox
                                maxLength={12}
                                name='mobileNumber'
                                isDisabled={isDisabled}
                                label={t("mobile_number")}
                                cssClass='input-control-textbox mobileTxtBox'
                                handleChange={handleInputChange}
                                value={stateManage.mobileNumber}
                                customInPutAllowField={"number"}
                                errorMessage={stateErrorManage.mobileNumberError}
                                isCloseIcon={!isDisabled}
                              />
                            </Box>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} em={6} className='gap'>
                          <Box className='gridContentWrapper'>
                            <DropDown
                              name='gender'
                              arrayData={genderData()}
                              label={t("gender")}
                              cssClass='input-control-selectbox'
                              value={stateManage.gender}
                              parentHandler={handleInputChange}
                              stateValue={stateManage.gender}
                              isDisabled={isDisabled}></DropDown>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} em={6} className='gap'>
                          <Box className='gridContentWrapper'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DatePicker
                                format='DD/MM/YYYY'
                                label={t("dob")}
                                disabled={isDisabled}
                                className='customCalender'
                                maxDate={dayjs(new Date())}
                                value={dayjs(stateManage.dob)}
                                defaultValue={dayjs(stateManage.dob)}
                                onChange={(newValue) => {
                                  handleInputChange({
                                    target: {
                                      name: "dob",
                                      value: newValue,
                                    },
                                  });
                                }}
                              />
                            </LocalizationProvider>
                          </Box>
                        </Grid>

                        <Grid item xs={12} sm={12} em={6} className='gap'>
                          <Box className='gridContentWrapper'>
                            <Autocomplete
                              disablePortal
                              disabled={isDisabled}
                              id='timeZone'
                              options={usdTime}
                              value={stateManage.timezone}
                              onChange={handleChangeTimeZone}
                              renderInput={(params) => <TextField {...params} name='timezone' />}
                              popupIcon={<ExpandMoreIcon />}
                            />
                          </Box>
                        </Grid>

                        {tempHide && (
                          <>
                            <Grid item xs={12} sm={12} em={12} className='gap'>
                              <Box className='gridContentWrapper'>
                                <StringOnBlurTextBox
                                  maxLength={60}
                                  name='title'
                                  label={t("title")}
                                  isDisabled={isDisabled}
                                  value={stateManage.title}
                                  cssClass='input-control-textbox'
                                  handleChange={handleInputChange}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={12} em={12} className='gap'>
                              <Box className='gridContentWrapper'>
                                <StringOnBlurTextBox
                                  rows={5}
                                  maxLength={300}
                                  multiline={true}
                                  name='description'
                                  label={t("description")}
                                  isDisabled={isDisabled}
                                  value={stateManage.title}
                                  cssClass='input-control-textbox'
                                  handleChange={handleInputChange}
                                />
                              </Box>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Box>
                  </Box>
                )}
                {activeMenu === 1 && <Coins secondaryArgs={secondaryArgs} />}
                {activeMenu === 2 && <Redeem secondaryArgs={secondaryArgs} />}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* userUpdate popUp */}
      {successPopUp && (
        <Confirmation
          open={true}
          img={GreenTick}
          text={t("profile_update_msg")}
          title={t("profile_update")}
          handleClose={confirmationPopUpClose}
        />
      )}
    </Box>
  );
};

Profile.defaultProps = {
  secondaryArgs: {
    gcpUrl: "https://storage.googleapis.com",
    bucketName: "cropped_image_public",
    prelemBaseEndpoint: {
      deliveryEndPoint: "https://dev.delivery.hcl-x.com/platform-x/",
      APIEndPoint: "https://platx-api-dev.fanuep.com/platform-x/",
      device: "window",
      buttonBaseUrl: "https://platx-publish-dev.fanuep.com/",
      language: "en",
      PublishEndPoint: "https://dev.hcl-x.com/",
      loyaltyEndPoint: "https://loyalty.backend.hcl-x.com/",
    },
    editState: false,
    multiSlot: {},
  },
};

export default Profile;
