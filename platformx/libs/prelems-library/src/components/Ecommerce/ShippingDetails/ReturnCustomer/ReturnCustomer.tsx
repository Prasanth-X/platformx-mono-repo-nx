import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import useTheme from "@mui/material/styles/useTheme";

import { Box, Button, Checkbox, FormControlLabel, Grid, Link, Stack } from "@mui/material";
import StringTextBox from "../../../../Common/TextBox/StringTextBoxComponent/StringOnChangeTextBox";
import PasswordTextBox from "../../../../Common/TextBox/PasswordTextBox";
import IconGoogleSvg from "../../../../assets/svgIcon/Gplus.svg";
import IconFbSvg from "../../../../assets/svgIcon/FaceBookIcon.svg";
import "./ReturnCustomer.css";
import { useTranslation } from "react-i18next";
import "../../../../service/i18n";
import { useCustomStyle } from "./ReturnCustomer.style";

const ReturnCustomer = () => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const theme = useTheme();
  return (
    <Box className={`return-customer-login ${classes.returnCustomerWrapper} returnCustomerLogin`}>
      <Accordion className={`accordian-wrapper accordianBg`} elevation={0} disableGutters={true}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'>
          <Typography variant='p4regular' className={`icon-with-text noMarginall`}>
            <AccountCircleOutlinedIcon /> {`${t("returning_customer")}?`}
            <Typography variant='p4regular' className={`underline noMarginall`} component={"span"}>
              {t("click_here_to_login")}
            </Typography>
          </Typography>
        </AccordionSummary>
        <AccordionDetails className='accordion-details'>
          <Typography variant='p4regular'>{t("please_enter_your_details")}</Typography>
          <Box component='form' noValidate>
            <StringTextBox
              name='username'
              label={`${t("username_or_email")}*`}
              cssClass='input-control-textbox white-bg'></StringTextBox>
            <PasswordTextBox
              variant='filled'
              name='password'
              label={`${t("password")}`}
              type='password'
              cssClass='input-control-textbox white-bg'></PasswordTextBox>
            <Grid container>
              <Grid item xs>
                <FormControlLabel
                  control={
                    <Checkbox
                      value='remember'
                      sx={{ "& svg": { fill: theme.palette.prelemType1.CHECKBOX.BOX_COLOR } }}
                    />
                  }
                  label={<Typography variant='p4regular'>{t("remember_me")}</Typography>}
                />
              </Grid>
              <Grid item>
                <Link href='#' underline='none' mt={1}>
                  <Typography variant='p4regular'>Forgot password?</Typography>
                </Link>
              </Grid>
            </Grid>
            <Button type='submit' variant='primaryButton1'>
              {t("login")}
            </Button>
          </Box>

          <Box className='or-wrapper'>
            <Box className={`line borderBottomLine`}></Box>
            <Typography variant='p4regular' className='orText'>
              {t("or_login_with")}
            </Typography>
          </Box>
          <Stack direction='row' spacing={2} mt={5} mb={5} className='login-cta-wrapper'>
            <Button
              variant='primaryButton2'
              size='large'
              className={`facebook-button-icon borderLine`}
              startIcon={<img src={IconFbSvg} alt='facebook' />}>
              Facebook
            </Button>
            <Button
              variant='primaryButton2'
              size='large'
              className={`google-button-icon borderLine`}
              startIcon={<img src={IconGoogleSvg} alt='Google' />}>
              Google
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ReturnCustomer;
