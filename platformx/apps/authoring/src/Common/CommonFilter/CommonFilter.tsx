import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase, nullToObject } from '../../utils/helperFunctions';

type SocialShareFilterTypes = {
  arrayData?: any;
  handleChange?: any;
  filterValue?: string;
  handleCloseFilter?: any;
};

const CommonFilter = (props: SocialShareFilterTypes = {}) => {
  const { t } = useTranslation();
  const {
    arrayData = [],
    filterValue = '',
    handleChange,
    handleCloseFilter,
  } = nullToObject(props);

  return (
    <FormControl className='form_Control'>
      <RadioGroup value={filterValue} onChange={handleChange}>
        {arrayData.map((ele, i) => {
          return (
            <React.Fragment
              key={convertToLowerCase(`${i}arrayData-CommonFilter-jdjd`)}
            >
              <FormControlLabel
                onClick={handleCloseFilter}
                value={ele.value}
                control={<Radio className='form_Control_radio' />}
                label={t(ele.label.toLowerCase())}
              />
            </React.Fragment>
          );
        })}

        {/* <FormControlLabel
                    onClick={handleCloseFilter}
                    value="SCHEDULED_PUBLISH"
                    control={<Radio className='form_Control_radio' />}
                    label="Scheduled Shared"
                /> */}
      </RadioGroup>
    </FormControl>
  );
};
export default React.memo(CommonFilter);
