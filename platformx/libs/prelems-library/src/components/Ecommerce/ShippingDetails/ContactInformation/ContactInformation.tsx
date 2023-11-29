import React from "react";
import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
// import EmailTextBox from "../../../../Common/TextBox/EmailTextBox";
import StringOnBlurTextBox from "../../../../Common/TextBox/StringTextBoxComponent/StringOnBlurTextBox";
import { useTranslation } from "react-i18next";
import "../../../../service/i18n";
import { useCustomStyle } from "./ContactInformation.style";

const ContactInformation = (_props: any) => {
  const classes = useCustomStyle();
  const theme = useTheme();
  const { stateManage = {}, handleChange = () => {}, stateErrorManage = {} } = _props;
  const { email = "" } = stateManage;
  const { emailError = "" } = stateErrorManage;
  const { t } = useTranslation();

  return (
    <Box className='contact-information-section'>
      <Typography variant='h4bold'>{t("contact_info")}</Typography>
      <FormGroup>
        <Box pb={1} className={`${classes.contactInformationWrapper} contactInformationPanel`}>
          <StringOnBlurTextBox
            name='email'
            label={t("email_id")}
            handleChange={handleChange}
            errorMessage={emailError}
            value={email}
            cssClass='input-control-textbox'
          />
        </Box>
        <Box>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{ "& svg": { fill: theme.palette.prelemType1.CHECKBOX.BOX_COLOR } }}
              />
            }
            label={<Typography variant='p4regular'>{`${t("create_an_accnt")}?`}</Typography>}
          />
        </Box>
      </FormGroup>
    </Box>
  );
};

export default ContactInformation;
