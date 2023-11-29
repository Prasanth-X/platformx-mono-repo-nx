import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import "./AddCard.css";
import IconMasterCardSvg from "../../../../assets/svgIcon/MasterCard.svg";
import StringTextBox from "../../../../Common/TextBox/StringTextBoxComponent/StringOnChangeTextBox";
import DropDown from "../../../../Common/DropDown/Dropdown";
import DateTextBox from "../../../../Common/TextBox/DateTextBox";
import StringOnBlurTextBox from "../../../../Common/TextBox/StringTextBoxComponent/StringOnBlurTextBox";
import { useTranslation } from "react-i18next";
import "../../../../service/i18n";
import { useCustomStyle } from "./AddCard.style";

const AddCard = ({ confirmOrder }: any) => {
  const { t } = useTranslation();
  const classes = useCustomStyle();
  const data = [
    { name: "State Bank of India", value: "State Bank of India" },
    { name: "ICICI Bank", value: "ICICI Bank" },
    { name: "HDFC Bank", value: "HDFC Bank" },
    { name: "Canara Bank", value: "Canara Bank" },
    { name: "Axis Bank", value: "Axis Bank" },
    { name: "Bank of Baroda", value: "Bank of Baroda" },
    { name: "Punjab National Bank", value: "Punjab National Bank" },
  ];
  const [formValues, setFormValues] = useState({
    selectBank: {
      value: "",
      error: false,
      errorMessage: t("you_must_select_bank_name"),
    },
    cardNumber: {
      value: "",
      error: false,
      errorMessage: t("you_must_enter_valid_card_number"),
    },
    cardHolderName: {
      value: "",
      error: false,
      errorMessage: t("you_must_enter_card_holder_name"),
    },
    expiry: {
      value: "",
      error: false,
      errorMessage: t("you_must_enter_expiry_date_of_card"),
    },
    cvv: {
      value: "",
      error: false,
      errorMessage: t("you_must_enter_cvv_number"),
    },
  });

  const parentHandler = (e: any) => {
    const { name, value } = e;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name],
        value,
      },
    });
  };

  const validateCardNumber = (ccNum: any) => {
    const visaRegEx = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    const mastercardRegEx = /^(?:5[1-5][0-9]{14})$/;
    const amexpRegEx = /^(?:3[47][0-9]{13})$/;
    const discovRegEx = /^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/;
    let isValid = false;

    if (visaRegEx.test(ccNum)) {
      isValid = true;
    } else if (mastercardRegEx.test(ccNum)) {
      isValid = true;
    } else if (amexpRegEx.test(ccNum)) {
      isValid = true;
    } else if (discovRegEx.test(ccNum)) {
      isValid = true;
    }

    if (isValid) {
      return false;
    } else {
      return true;
    }
  };

  const validateForm = (currentField: any, currentValue: any) => {
    if (currentField === "cardNumber") {
      return validateCardNumber(currentValue);
    } else {
      return !currentValue ? true : false;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue = formValues[currentField].value;
      newFormValues = {
        ...newFormValues,
        [currentField]: {
          ...newFormValues[currentField],
          error: validateForm(currentField, currentValue),
        },
      };
    }
    setFormValues(newFormValues);
  };

  return (
    <>
      <Box mb={4} className={`${classes.addCardWrapper} addCardSection`}>
        <Typography variant='h4bold' id='billing-radio-group' pb={2}>
          {t("add_your_card")}
        </Typography>
        <Box className={`card-detail-section borderLine`}>
          <Box component='form' noValidate onSubmit={(e: any) => handleSubmit(e)}>
            <Grid item xs={12} className='form-field-container'>
              <Typography variant='p4medium' component='label' className='form-label'>
                {t("choose_your_bank")}
              </Typography>
              {data && (
                <DropDown
                  name='selectBank'
                  arrayData={data}
                  label={t("select_bank")}
                  cssClass='input-control-selectbox'
                  value={formValues.selectBank.value}
                  parentHandler={parentHandler}
                  error={formValues.selectBank.error}
                  helperText={
                    formValues.selectBank.error && formValues.selectBank.errorMessage
                  }></DropDown>
              )}
            </Grid>
            <Grid item xs={12} className='form-field-container'>
              <Typography variant='p4medium' component='label' className='form-label'>
                {`${t("credit_debit_card_number")}*`}
              </Typography>
              <StringTextBox
                name='cardNumber'
                label={t("enter_card_number")}
                cssClass='input-control-textbox'
                value={formValues.cardNumber.value}
                helperText={
                  formValues.cardNumber.error && formValues.cardNumber.errorMessage
                }></StringTextBox>
            </Grid>
            <Grid item xs={12} className='form-field-container card-holder-img'>
              <Typography variant='p4medium' component='label' className='form-label'>
                {t("card_holder_name")}
              </Typography>
              <StringTextBox
                name='cardHolderName'
                label={t("enter_your_name_here")}
                cssClass='input-control-textbox'
                value={formValues.cardHolderName.value}
                helperText={
                  formValues.cardHolderName.error && formValues.cardHolderName.errorMessage
                }></StringTextBox>
              <Box className='card-type-image'>
                <img src={IconMasterCardSvg} alt='visa' />
              </Box>
            </Grid>
            <Grid item xs={12} className='form-field-container'>
              <Typography variant='p4medium' component='label' className='form-label'>
                {t("expiration_month_year")}
              </Typography>
              <DateTextBox
                name='expiry'
                label=''
                variant='outlined'
                cssClass='input-control-textbox'
                value={formValues.expiry.value}
                parentHandler={parentHandler}
                error={formValues.expiry.error}
                helperText={
                  formValues.expiry.error && formValues.expiry.errorMessage
                }></DateTextBox>
            </Grid>
            <Grid item xs={12} className='form-field-container'>
              <Typography variant='p4medium' component='label' className='form-label'>
                CVV*
              </Typography>
              <StringOnBlurTextBox
                maxLength={32}
                name='cvv'
                label={t("enter_CVV")}
                cssClass='input-control-textbox'
                helperText={formValues.cvv.error && formValues.cvv.errorMessage}
                // handleChange={handleChange}
                // errorMessage={firstNameError}
                // value={stateManage.firstName}
              />
            </Grid>

            <Box className='bottom-button-text-wrapper' mt={3}>
              <Typography variant='p3regular' className='center-align-item'>
                {`*${t("these_fields_are_mandatory")}`}
              </Typography>
              <Box className='cancel-done-wrapper'>
                <Button
                  type='button'
                  variant='secondaryButton1'
                  className='cancel'
                  onClick={() => confirmOrder(true)}>
                  {t("cancel")}
                </Button>
                <Button type='submit' variant='primaryButton1' className='done'>
                  {t("done")}
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AddCard;
