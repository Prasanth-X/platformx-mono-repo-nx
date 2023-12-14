import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';

const DatePicker = ({
  time,
  handleValChange,
  handleDateChangeRaw,
  isDisabled,
  disablePast = true
}) => {
  const { t } = useTranslation();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={time}
        disabled={isDisabled}
        disablePast={disablePast}
        onChange={handleValChange}
        inputFormat='MM/DD/YYYY HH:mm'
        renderInput={(params) =>
          (<TextField
            disabled={true}
            variant='outlined'
            // className="myDatePicker"
            // className="dummy"
            onKeyDown={handleDateChangeRaw}
            InputProps={{ readOnly: true }}
            {...params}
            placeholder={t('quiz_publish_placeholder')}
            sx={{
              '.Platform-x-InputBase-root.Mui-error fieldset': {
                borderColor: '#ced3d9 !important',
              },
            }}
          />)
        }
      />
    </LocalizationProvider>
  );
};
export default DatePicker;
