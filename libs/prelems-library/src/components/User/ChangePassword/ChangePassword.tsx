import React, { useState } from "react";
import "../../../service/i18n";
import { useTranslation } from "react-i18next";
import Logo from "../../../assets/user/logo.png";
import { prelemTypes } from "theme/globalStyle";
import { useCustomStyle } from "./ChangePassword.style";
import FormValidate from "Common/CustomHook/FormValidate";
import { Box, Button, Grid, Typography } from "@mui/material";
import ToastService from "Common/ToastContainer/ToastService";
import { changePasswordServiceCall } from "./helperChangePassword";
import ChangePasswordImg from "../../../assets/user/changepassword.png";
import StringOnBlurTextBox from "Common/TextBox/StringTextBoxComponent/StringOnBlurTextBox";

type ChangePasswordProps = {
  secondaryArgs?: any;
  moveToHomePage?: (e?: any) => void;
  passwordDetails?: (e?: any) => void;
};
const ChangePassword = ({
  passwordDetails = () => {},
  moveToHomePage = () => {},
  secondaryArgs = {},
}: ChangePasswordProps) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  const { passwordFieldValidate, allFieldAreCheckToValue, allFieldAreCheckToEmpty } =
    FormValidate();
  const [stateManage, setStateManage] = useState<any>({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [stateErrorManage, setStateErrorManage] = useState<any>({
    oldPasswordError: "",
    newPasswordError: "",
    confirmPasswordError: "",
  });

  /**
   * error msg update
   */
  const errorMsgUpdate = () => {
    return {
      ...stateErrorManage,
      oldPasswordError: passwordFieldValidate(t("old_password"), stateManage.oldPassword)?.msg,
      newPasswordError: passwordFieldValidate(t("new_password"), stateManage.newPassword)?.msg,
      confirmPasswordError: passwordFieldValidate(
        t("confirm_password"),
        stateManage.confirmPassword,
      )?.msg,
    };
  };

  const handleInputChange = (event: any) => {
    const { name = "", value = "" } = event.target || {};
    setStateManage((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault && e.preventDefault();
    const inputEmptyValidate = allFieldAreCheckToValue({
      newPassword: stateManage.newPassword,
      oldPassword: stateManage.oldPassword,
      confirmPassword: stateManage.confirmPassword,
    });

    const errorMsg = errorMsgUpdate();
    setStateErrorManage(errorMsg);

    if (inputEmptyValidate) {
      // all error message are resolve comes true
      const errorMsgCheck = allFieldAreCheckToEmpty({
        ...errorMsg,
      });
      if (errorMsgCheck) {
        const { oldPassword = "", newPassword = "", confirmPassword = "" } = stateManage;
        // old password and new password are same check
        if (oldPassword !== newPassword) {
          // new password and confirm password are same check
          if (newPassword === confirmPassword) {
            const res = await changePasswordServiceCall({
              userDetails: stateManage,
              secondaryArgs: secondaryArgs,
            });
            // eslint-disable-next-line no-console
            console.log(res);

            passwordDetails({ validate: true, ...stateManage });
          } else {
            ToastService.failToast(t("new_confirm_password_same_error"));
            passwordDetails({ validate: false });
          }
        } else {
          ToastService.failToast(t("old_new_password_same_error"));
          passwordDetails({ validate: false });
        }
      } else {
        passwordDetails({ validate: false });
      }
    } else {
      passwordDetails({ validate: false });
    }
  };

  return (
    <Box
      className={`${classes.changePwdScreenWrapper} ${globalClasses.prelemType1} prelem prelemType1 changePwdScreenBg`}>
      <Box className='changePwdScreen'>
        <Box className='leftPanel'>
          <Box className='logoWrapper' onClick={moveToHomePage}>
            <img src={Logo} alt='logo' title='logo' className='logo' />
          </Box>
          <Box className='imageWrapper'>
            <img
              src={ChangePasswordImg}
              alt='change password'
              title='change password'
              className='changePwdImg'
            />
          </Box>
          <Box className='quoteMessage'>
            <Typography variant='h2bold' className='title'>
              {t("changepassword_quote")}
            </Typography>
            <Typography variant='p4regular' className='description marginTopZero'>
              {t("changepassword_quote_message")}
            </Typography>
          </Box>
        </Box>

        <Box className='rightPanel'>
          <Box className='formContainer' component='form' noValidate>
            <Typography variant='h4bold'>{t("change_password")}</Typography>
            <Typography variant='p3regular' className='marginTopZero'>
              {t("enter_new_password")}
            </Typography>
            <Grid container spacing={0} className='formGrid'>
              <Grid item xs={12} sm={12} em={12} className='text-wrapper'>
                <StringOnBlurTextBox
                  maxLength={32}
                  name='oldPassword'
                  isPasswordField={true}
                  label={t("old_password")}
                  value={stateManage.newPassword}
                  cssClass='input-control-textbox'
                  handleChange={handleInputChange}
                  errorMessage={stateErrorManage?.oldPasswordError}
                />
              </Grid>

              <Grid item xs={12} sm={12} em={12} className='text-wrapper'>
                <StringOnBlurTextBox
                  maxLength={32}
                  name='newPassword'
                  isPasswordField={true}
                  label={t("new_password")}
                  value={stateManage.newPassword}
                  cssClass='input-control-textbox'
                  handleChange={handleInputChange}
                  errorMessage={stateErrorManage?.newPasswordError}
                />
              </Grid>

              <Grid item xs={12} sm={12} em={12} className='text-wrapper'>
                <StringOnBlurTextBox
                  maxLength={32}
                  name='confirmPassword'
                  isPasswordField={true}
                  label={t("confirm_password")}
                  value={stateManage.confirmPassword}
                  cssClass='input-control-textbox'
                  handleChange={handleInputChange}
                  errorMessage={stateErrorManage?.confirmPasswordError}
                />
              </Grid>

              <Grid item xs={12} sm={12} em={12} className='textCenter'>
                <Button
                  type='button'
                  variant='primaryButton1'
                  className='changePwdButton'
                  onClick={(e: any) => handleSubmit(e)}>
                  {t("save")}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

ChangePassword.defaultProps = {
  moveToHomePage: () => {},
  passwordDetails: () => {},
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
    },
    editState: false,
    multiSlot: {},
  },
};

export default ChangePassword;
