import React, { useState } from "react";
import "service/i18n";
import { useTranslation } from "react-i18next";
import { useCustomStyle } from "./SignUp.style";
import { prelemTypes } from "theme/globalStyle";
import Logo from "assets/user/logo.png";
import SignUpSvg from "assets/user/signUp.png";
import FormValidate from "Common/CustomHook/FormValidate";
import { Box, Button, Grid, Link, Typography } from "@mui/material";
import StringOnBlurTextBox from "Common/TextBox/StringTextBoxComponent/StringOnBlurTextBox";

type signUpProps = {
  userDetailsPass: (e?: any) => void;
  redirectToLoginPage?: (e?: any) => void;
};

const SignUp = ({ userDetailsPass = () => {}, redirectToLoginPage = () => {} }: signUpProps) => {
  const { emailValidation, mandatoryValidate, allFieldAreCheckToValue, allFieldAreCheckToEmpty } =
    FormValidate();

  const { t } = useTranslation();
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();

  const [stateManage, setStateManage] = useState<any>({
    userName: "",
    firstName: "",
    lastName: "",
    emailID: "",
  });

  const [stateErrorManage, setStateErrorManage] = useState<any>({
    emailIDError: "",
    userNameError: "",
    firstNameError: "",
  });

  /**
   * error msg update
   */
  const errorMsgUpdate = () => {
    return {
      ...stateErrorManage,
      emailIDError: emailValidation(stateManage.emailID),
      userNameError: mandatoryValidate(t("user_name"), stateManage.userName),
      firstNameError: mandatoryValidate(t("first_name"), stateManage.firstName),
    };
  };

  const handleInputChange = (event: any) => {
    const { name = "", value = "" } = event?.target || {};
    setStateManage((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault && e.preventDefault();
    const inputEmptyValidate = allFieldAreCheckToValue({
      userName: stateManage.userName,
      firstName: stateManage.firstName,
      emailID: stateManage.emailID,
    });

    const errorMsg = errorMsgUpdate();
    setStateErrorManage(errorMsg);

    if (inputEmptyValidate) {
      // all error message are resolve comes true
      const errorMsgCheck = allFieldAreCheckToEmpty({
        ...errorMsg,
      });
      if (errorMsgCheck) {
        userDetailsPass({ validate: true, ...stateManage });
      } else {
        userDetailsPass({ validate: false });
      }
    } else {
      userDetailsPass({ validate: false });
    }
  };

  return (
    <Box
      className={`${classes.signUpScreenWrapper} ${globalClasses.prelemType1} prelem prelemType1 signUpScreenBg`}>
      <Box className='signUpScreen'>
        <Box className='leftPanel'>
          <Box onClick={redirectToLoginPage} className='logoWrapper'>
            <img src={Logo} alt='logo' title='logo' className='logo' />
          </Box>
          <Box className='imageWrapper'>
            <img src={SignUpSvg} alt='signup' title='signup' className='signUpImg' />
          </Box>
          <Box className='quoteMessage'>
            <Typography variant='h2bold' className='title'>
              {t("signup_quote")}
            </Typography>
            <Typography variant='p4regular' className='description marginTopZero'>
              {t("signup_quote_message")}
            </Typography>
          </Box>
        </Box>

        <Box className='rightPanel'>
          <Box className='formContainer' component='form' noValidate>
            <Typography variant='h4bold'>{t("signup")}</Typography>
            <Typography variant='p3regular' className='marginTopZero'>
              {t("signup_message")}
            </Typography>

            <Grid container spacing={0} className='formGrid'>
              <Grid item xs={12} sm={12} em={12} className='text-wrapper'>
                <StringOnBlurTextBox
                  maxLength={12}
                  name='userName'
                  label={t("user_name")}
                  value={stateManage.userName}
                  cssClass='input-control-textbox'
                  handleChange={handleInputChange}
                  customInPutAllowField={"charter"}
                  errorMessage={stateErrorManage?.userNameError}
                />
              </Grid>

              <Grid item xs={12} sm={12} em={12} className='text-wrapper'>
                <StringOnBlurTextBox
                  maxLength={12}
                  name='firstName'
                  label={t("first_name")}
                  value={stateManage.firstName}
                  cssClass='input-control-textbox'
                  handleChange={handleInputChange}
                  customInPutAllowField={"charter"}
                  errorMessage={stateErrorManage?.firstNameError}
                />
              </Grid>

              <Grid item xs={12} sm={12} em={12} className='text-wrapper'>
                <StringOnBlurTextBox
                  maxLength={12}
                  name='lastName'
                  label={t("last_name")}
                  value={stateManage.lastName}
                  cssClass='input-control-textbox'
                  handleChange={handleInputChange}
                  customInPutAllowField={"charter"}
                  errorMessage={""}
                />
              </Grid>

              <Grid item xs={12} sm={12} em={12} className='text-wrapper'>
                <StringOnBlurTextBox
                  maxLength={32}
                  name='emailID'
                  label={t("email_id")}
                  value={stateManage.emailID}
                  cssClass='input-control-textbox'
                  handleChange={handleInputChange}
                  errorMessage={stateErrorManage?.emailIDError}
                />
              </Grid>

              <Grid item xs={12} sm={12} em={12} className='textCenter'>
                <Button
                  type='button'
                  variant='primaryButton1'
                  className='signUpButton'
                  onClick={(e: any) => handleSubmit(e)}>
                  {t("join_now")}
                </Button>
                <Typography variant='p3regular'>
                  {t("already_account")}
                  <Link onClick={redirectToLoginPage} variant='p3regular' className='link'>
                    Log in
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
