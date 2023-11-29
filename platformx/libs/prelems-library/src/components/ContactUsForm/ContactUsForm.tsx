import React, { useEffect, useRef, useState } from "react";
import useTheme from "@mui/material/styles/useTheme";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import GreenTick from "assets/userProfile/greenTick.png";
import "service/i18n";
import { useTranslation } from "react-i18next";
import { prelemTypes } from "theme/globalStyle";
import { useCustomStyle } from "./ContactUsForm.style";
import FormValidate from "Common/CustomHook/FormValidate";
import ToastContainerHandle from "Common/ToastContainer/ToastContainerHandle";
import Confirmation from "components/Ecommerce/Common/Confirmation/Confirmation";
import StringOnBlurTextBox from "Common/TextBox/StringTextBoxComponent/StringOnBlurTextBox";
import {
  Box,
  Grid,
  TextField,
  Container,
  Typography,
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
} from "@mui/material";
import { updateUserFormDetailsService } from "utils/helper";
import { countries } from "utils/helperConstants";
import { getCountryFlag } from "utils/helperFns";
import { useInView } from "react-intersection-observer";
import { usePrelemImpression } from "Common/ImpressionHooks/PrelemImpressionHook";

const ContactUsForm = ({
  content,
  secondaryArgs = {},
  authoringHelper,
  analytics,
}: ContactUsFormProps) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const theme = useTheme();
  const globalClasses = prelemTypes();
  const [checked, setChecked] = React.useState(false);
  const { emailValidation, mandatoryValidate, allFieldAreCheckToValue, allFieldAreCheckToEmpty } =
    FormValidate();
  const [isDisabled] = useState(false);
  const [successPopUp, setSuccessPopUp] = useState(false);
  const [stateManage, setStateManage] = useState<any>({
    firstName: "",
    lastName: "",
    companyName: "",
    emailAddress: "",
    country: "(IN)  +91",
    phoneNumber: "",
    message: "",
  });
  const [stateErrorManage, setStateErrorManage] = useState<any>({
    emailAddressError: "",
    phoneNumberError: "",
    firstNameError: "",
  });
  const firstRender = useRef(true);
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  const defaultStructureData = () => {
    let contactUsFormStructureData;
    try {
      contactUsFormStructureData = {};
    } catch (e) {
      contactUsFormStructureData = {};
    }
    return contactUsFormStructureData;
  };
  const genrateStructureData = () => {
    let contactUsFormStructureData;
    const tempSD = String(authoringHelper?.lastSavedStructuredData);

    if (firstRender.current) {
      const defaultSD = defaultStructureData();
      const stringifyStructureData = defaultSD && JSON.stringify(defaultSD);
      authoringHelper?.sendDefaultStructureDataForResetToAuthoringCB(stringifyStructureData || "");

      if (String(tempSD).length > 0) {
        contactUsFormStructureData = JSON.parse(tempSD);
      } else {
        contactUsFormStructureData = defaultStructureData();
      }
      firstRender.current = false;
    } else {
      contactUsFormStructureData = defaultStructureData();
    }
    return contactUsFormStructureData;
  };

  useEffect(() => {
    if (analytics?.isAuthoring && analytics?.isSeoEnabled) {
      const structureData = genrateStructureData();
      const stringifyStructureData = structureData && JSON.stringify(structureData);
      authoringHelper?.sendStructureDataToAuthoringCB(stringifyStructureData || "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content?.Description, content?.Title]);

  usePrelemImpression(analytics, inView);

  const handleISD = (event: any, newValue: any) => {
    setStateManage((prevFormData: any) => {
      return {
        ...prevFormData,
        ["country"]: newValue.label,
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
  /**
   * error msg update
   */
  const errorMsgUpdate = () => {
    return {
      ...stateErrorManage,
      emailAddressError: emailValidation(stateManage.emailAddress),
      phoneNumberError: mandatoryValidate(t("phone_number"), stateManage.phoneNumber),
      firstNameError: mandatoryValidate(t("first_name"), stateManage.firstName),
    };
  };
  const cancelProfile = () => {
    setStateManage({
      firstName: "",
      lastName: "",
      companyName: "",
      emailAddress: "",
      country: "(IN)  +91",
      phoneNumber: "",
      message: "",
    });
    setStateErrorManage({
      emailAddressError: "",
      phoneNumberError: "",
      firstNameError: "",
    });
    setChecked(false);
  };
  const saveProfile = async (e: any) => {
    e.preventDefault && e.preventDefault();
    const inputEmptyValidate = allFieldAreCheckToValue({
      emailAddress: stateManage.emailAddress,
      firstName: stateManage.firstName,
      phoneNumber: stateManage.phoneNumber,
    });
    const errorMsg = errorMsgUpdate();
    setStateErrorManage(errorMsg);
    if (inputEmptyValidate) {
      // all error message are resolve comes true
      const errorMsgCheck = allFieldAreCheckToEmpty({
        ...errorMsg,
      });
      if (errorMsgCheck) {
        const res = await updateUserFormDetailsService({
          userDetails: stateManage,
          secondaryArgs: secondaryArgs,
        });
        const { data: { data = {} } = {} } = res;
        const isSuccess = data?.updateUserProfile?.message || "";
        if (isSuccess) {
          setSuccessPopUp(true);
          cancelProfile();
        } else {
          cancelProfile();
          setSuccessPopUp(true);
        }
      }
    }
  };

  return (
    <Box
      ref={authoringHelper?.innerRef}
      className={`${classes.contactUsFormScreenWrapper} ${globalClasses.prelemType1} prelem prelemType1 contactUsFormScreenBg`}>
      <Container
        className={
          authoringHelper?.isEditPage ? "grid_full_width prelem-py" : "grid_container prelem-py"
        }
        ref={ref}>
        <ToastContainerHandle />
        <Box className='signUpScreen'>
          <Container className='prelem-py'>
            <Grid container>
              <Box className='contactUsPageWrapper'>
                <Typography variant='h1bold' id='Title'>
                  {content?.Title}
                </Typography>
                <Typography variant='p2regular' id='Description'>
                  {content.Description}
                </Typography>
                <Box className='profileForm'>
                  <Grid container spacing={4} className='formContainer'>
                    <Grid item xs={12} sm={12} em={6} className='gap'>
                      <Box className='gridContentWrapper'>
                        <StringOnBlurTextBox
                          maxLength={100}
                          name='firstName'
                          label={t("first_name_label") + "*"}
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
                          maxLength={100}
                          name='lastName'
                          label={t("last_name_label")}
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
                          maxLength={100}
                          name='companyName'
                          label={t("company_name")}
                          cssClass='input-control-textbox'
                          value={stateManage.companyName}
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
                          name='emailAddress'
                          isDisabled={isDisabled}
                          isCloseIcon={!isDisabled}
                          label={t("email_id") + "*"}
                          value={stateManage.emailAddress}
                          cssClass='input-control-textbox'
                          handleChange={handleInputChange}
                          errorMessage={stateErrorManage.emailAddressError}
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
                            value={stateManage.country}
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
                                InputProps={{
                                  ...params.InputProps,
                                  startAdornment: (
                                    <InputAdornment position='start' className='flagWrapper'>
                                      <img
                                        src={getCountryFlag(stateManage.country)}
                                        srcSet={getCountryFlag(stateManage.country) + ` 2x`}
                                        alt='flag'
                                        className='flagImage'
                                      />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            )}
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} em={6} className='gap'>
                      <Box className='gridContentWrapper'>
                        <StringOnBlurTextBox
                          maxLength={12}
                          name='phoneNumber'
                          isDisabled={isDisabled}
                          label={t("phone_number") + "*"}
                          cssClass='input-control-textbox'
                          handleChange={handleInputChange}
                          value={stateManage.phoneNumber}
                          customInPutAllowField={"number"}
                          errorMessage={stateErrorManage.phoneNumberError}
                          isCloseIcon={!isDisabled}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={12} em={12} className='gap'>
                      <Box className='gridContentWrapper'>
                        <StringOnBlurTextBox
                          maxLength={1000}
                          rows={4}
                          multiline={true}
                          name='message'
                          label={t("message")}
                          cssClass='input-control-textbox'
                          value={stateManage.message}
                          handleChange={handleInputChange}
                          isDisabled={isDisabled}
                          errorMessage={""}
                          isCloseIcon={!isDisabled}
                        />
                        <Box className='policyWrapper'>
                          <FormControlLabel
                            control={
                              <Checkbox
                                value='remember'
                                sx={{
                                  "& svg": {
                                    fill: theme.palette.prelemType1.CHECKBOX.BOX_COLOR,
                                  },
                                }}
                              />
                            }
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            disabled={secondaryArgs?.editState}
                            label={
                              <Typography variant='p4regular' id='Terms_Conditions'>
                                {content?.Terms_Conditions}
                              </Typography>
                            }
                          />
                        </Box>
                        <Box className='buttonWrapper'>
                          <Button
                            variant='primaryButton2'
                            className='actionButton'
                            onClick={cancelProfile}>
                            {t("cancel")}
                          </Button>
                          <Button
                            variant='primaryButton1'
                            className='actionButton'
                            onClick={saveProfile}
                            disabled={secondaryArgs?.editState ? true : !checked}>
                            {t("submit")}
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Container>
        </Box>

        {/* userUpdate popUp */}
        {successPopUp && (
          <Confirmation
            open={true}
            img={GreenTick}
            text={""}
            title={t("form_update_message")}
            handleClose={confirmationPopUpClose}
          />
        )}
      </Container>
    </Box>
  );
};

interface Content {
  Title?: string;
  Description?: string;
  Terms_Conditions?: string;
}
type ContactUsFormProps = {
  content: Content;
  secondaryArgs?: any;
  authoringHelper?: AuthoringHelper;
  analytics: Analytics;
};

interface Analytics {
  pageId?: number;
  prelemId?: number;
  pageTitle?: string;
  prelemTitle?: string;
  pageDesc?: string;
  pageTags?: string;
  prelemTags?: string;
  prelemPosition?: number;
  isAnalyticsEnabled: boolean;
  isAuthoring: boolean;
  isSeoEnabled: boolean;
}

interface AuthoringHelper {
  innerRef: React.Ref<HTMLDivElement>;
  sendStructureDataToAuthoringCB: (structureData: string) => void;
  sendDefaultStructureDataForResetToAuthoringCB: (structureData: string) => void;
  openButtonEditWindowInAuthoringCB: (buttonObj?: object, e?: object) => void;
  selectedButtonNameForEditing: string;
  isEditing: boolean;
  buttonRef?: React.Ref<HTMLButtonElement>;
  buttonContentEditable?: boolean;
  lastSavedStructuredData?: string;
  isEditPage?: boolean;
}

ContactUsForm.defaultProps = {
  content: {
    Title: "Thanks for you Interest in HCL-X",
    Description:
      "Wants to unlock Your Brand Potential WithX – The Ultimate Engagement Platform. Submit this form and our sales representative will contact you soon.",
    Terms_Conditions:
      "By supplying my contact information, I authorize the HCL family of companies to contact me with personalized communications about HCL products and services. See our Privacy Policy for more details or to opt-out at any time.",
  },
  authoringHelper: {
    innerRef: null,
    sendStructureDataToAuthoringCB: () => {},
    sendDefaultStructureDataForResetToAuthoringCB: () => {},
    openButtonEditWindowInAuthoringCB: () => {},
    selectedButtonNameForEditing: "",
    isEditing: false,
    buttonRef: null,
    buttonContentEditable: false,
    lastSavedStructuredData: "",
    isEditPage: false,
  },
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
      usersEndPoint: "https://dev.users.hcl-x.com/platform-x/",
    },
    editState: false,
    multiSlot: {},
  },
  analytics: {
    isAnalyticsEnabled: true,
    isSeoEnabled: false,
    isAuthoring: false,
    position: 0,
    pageId: 12345,
    prelemId: 23456,
    pageTitle: "Contact Us Form",
    pageDesc:
      "The Prelem ‘About us 2’ can be used to give an introduction to your website. It has an image, title, description & CTA which can be used to add the required information.",
    pageTags: "Contact Us Form",
    prelemTags: "Contact Us Form",
  },
};

export default ContactUsForm;
