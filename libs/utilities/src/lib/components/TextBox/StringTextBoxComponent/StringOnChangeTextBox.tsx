import React, { useEffect, useState } from 'react';
import './StringTextBoxComponent.css';
import CloseIcon from '@mui/icons-material/Close';
import { InputAdornment, TextField } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import {
  allowOnlyNumberInputData,
  allowOnlyShippingLetterInputData,
  allowOnlyLetterInputData,
} from '../../../utils/helperFns';

const allowInputParams = (e: any, key: string) => {
  switch (key) {
    case 'number':
      return allowOnlyNumberInputData(e);
    case 'CustomFirstName':
      return allowOnlyShippingLetterInputData(e);
    case 'charter':
      return allowOnlyLetterInputData(e);
    default:
      return null;
  }
};
type StringOnChangeTextBoxProps = {
  maxLength?: number;
  name?: string;
  label?: string;
  value?: string;
  helperText?: any;
  handleChange?: any;
  required?: boolean;
  isDisabled?: boolean;
  isCloseIcon?: boolean;
  rows?: string | number;
  errorMessage?: string;
  cssClass?: string | number;
  isPasswordField?: boolean;
  customInPutAllowField?: string;
  multiline?: string | number | boolean;
};
const StringOnChangeTextBox = (props: StringOnChangeTextBoxProps) => {
  const {
    name,
    label,
    rows,
    value,
    required,
    multiline,
    cssClass,
    isDisabled,
    maxLength = 0,
    handleChange,
    isPasswordField,
    errorMessage = '',
    isCloseIcon = true,
    customInPutAllowField = '',
  } = props;

  // const [stateValue, setStateValue] = useState("");
  const [textBoxType, setTextBoxType] = useState('text');

  const onChange = (e: any) => {
    e.preventDefault && e.preventDefault();
    // const { target: { value: val = "" } = {} } = e;
    // setStateValue(val);
    handleChange(e);
  };

  const clearText = (names = '') => {
    handleChange({
      target: {
        name: names,
        value: '',
      },
    });
    // setStateValue("");
  };

  const showHideShowText = () => {
    setTextBoxType(textBoxType === 'text' ? 'password' : 'text');
  };

  useEffect(() => {
    isPasswordField ? setTextBoxType('password') : setTextBoxType('text');
  }, [isPasswordField]);

  // useEffect(() => {
  //   setStateValue(value);
  // }, [value]);
  return (
    <>
      <TextField
        fullWidth
        name={name}
        type={textBoxType}
        // label={null}
        label={label}
        value={value}
        variant="filled"
        onChange={onChange}
        // onBlur={handleChange}
        // placeholder={label}
        select={false}
        rows={rows ? rows : 1}
        helperText={errorMessage}
        inputProps={{
          shrink: false,
          maxLength: maxLength > 0 ? maxLength : 1000000,
        }}
        required={required ? true : false}
        multiline={multiline ? true : false}
        disabled={isDisabled ? true : false}
        className={`${
          errorMessage ? 'error' : 'primary'
        } custom-textbox string-textbox ${cssClass}`}
        onInput={
          customInPutAllowField
            ? (e: any) => allowInputParams(e, customInPutAllowField)
            : null
        }
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {/* <span className="textfield-icon-left">
              <AccountCircle />
            </span> */}
              {isCloseIcon && (
                <CloseIcon
                  className="textfield-close-icon"
                  onClick={() => clearText(name)}
                />
              )}

              {isPasswordField && (
                <RemoveRedEyeOutlinedIcon
                  onClick={() => showHideShowText()}
                  className="show-hide-icon"
                ></RemoveRedEyeOutlinedIcon>
              )}
            </InputAdornment>
          ),
        }}
      />

      {/* {errorMessage ? (
      <Typography
        sx={{
          color: "red",
        }}
      >
        {errorMessage}
      </Typography>
    ) : null} */}
    </>
  );
};
export default StringOnChangeTextBox;
