import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useTranslation } from 'react-i18next';
type DatePickerType = {
  time: any;
  handleValChange: (value: any) => void;
  handleDateChangeRaw?: (value: any) => void;
  isDisabled: boolean;
  disablePast?: boolean;
};

const DatePicker = ({
  time,
  handleValChange,
  handleDateChangeRaw,
  isDisabled,
  disablePast = true
}: DatePickerType) => {
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
