import { useTranslation } from 'react-i18next';
import { emailValidate } from 'lib/utils/helperFns';

const FormValidate = () => {
  const { t } = useTranslation();

  const validateForm = (errors = {}) => {
    let valid = true;
    Object.values(errors).forEach((val) => {
      if (val !== true) {
        valid = false;
      }
    });
    return valid;
  };

  /**
   * check contain have spl char added
   * @param {string} string
   */
  const containsSpecialCharCheck = (string = '') => {
    const reg = /^((?=.*\W)|(?=.*_))/;
    return reg.test(string) ? true : false;
  };

  /**
   * check password policy return validate value
   * @param password password value
   */
  const passwordFieldValidate = (name = '', password = '') => {
    if (password) {
      const lower = new RegExp('(?=.*[a-z])');
      const upper = new RegExp('(?=.*[A-Z])');
      const number = new RegExp('(?=.*[0-9])');
      const newObj = {
        lowerCase: lower.test(password),
        upperCase: upper.test(password),
        digit: number.test(password),
        specialChar: containsSpecialCharCheck(password),
        minLength: ('' + password).length >= 8 ? true : false,
      };
      const validatePass = validateForm(newObj);
      return {
        msg: validatePass ? '' : `${t(name)} ${t('password_policy_error')}`,
        passwordObj: newObj,
      };
    }
    return {
      msg: `${t(name)} ${t('is_mandatory')}`,
      passwordObj: {},
    };
  };

  /**
   * @param email string
   * @returns string
   */
  const emailValidation = (email = ''): any => {
    if (email) {
      return !emailValidate(email)
        ? `${t('email_id')} ${t('is_not_in_valid_format')}`
        : '';
    }
    return `${t('email_id')} ${t('is_mandatory')}`;
  };

  /**
   * @param value string
   * @returns string
   */
  const mandatoryValidate = (name = '', value = ''): any => {
    if (value) {
      return '';
    }
    return `${t(name)} ${t('is_mandatory')}`;
  };

  const minimumErrorMsg = (name = '', value = '', min = 0) => {
    return value.length >= min
      ? ''
      : `${t(name)} ${t('need_minimum')} ${min} ${t('character')}`;
  };

  const maxErrorMsg = (name = '', value = '', max = 0) => {
    return max >= value.length
      ? ''
      : `${t(name)} ${t('allow_only')} ${max} ${t('character')}`;
  };

  /**
   * @param value string
   * @returns string
   */
  const mandatoryValidateWithMinAndMax = ({
    name = '',
    value = '',
    min = 0,
    max = 0,
  }): any => {
    let errorMsg = '';
    if (value) {
      if (max && min) {
        errorMsg =
          maxErrorMsg(name, value, max) === ''
            ? minimumErrorMsg(name, value, min)
            : maxErrorMsg(name, value, max);
      } else if (max) {
        errorMsg = maxErrorMsg(name, value, max);
      } else if (min) {
        errorMsg = minimumErrorMsg(name, value, min);
      }
      return errorMsg;
    }
    return `${t(name)} ${t('is_mandatory')}`;
  };

  /**
   *
   * @param errors object
   * @returns boolean
   */
  const allFieldAreCheckToValue = (errors = {}) => {
    let valid = true;
    Object.values(errors).forEach((ele) => {
      if (ele === '') {
        valid = false;
      }
    });
    return valid;
  };

  /**
   *
   * @param errors object
   * @returns boolean
   */
  const allFieldAreCheckToEmpty = (errors = {}) => {
    let valid = true;
    Object.values(errors).forEach((ele) => {
      if (ele !== '') {
        valid = false;
      }
    });
    return valid;
  };

  return {
    emailValidation,
    mandatoryValidate,
    passwordFieldValidate,
    allFieldAreCheckToValue,
    allFieldAreCheckToEmpty,
    mandatoryValidateWithMinAndMax,
  };
};
export default FormValidate;
