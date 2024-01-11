import { TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useState } from 'react';
import { addMinutes } from 'date-fns';

export interface DateTimeProps {
  error?: boolean;
  isDisabled?: boolean;
  variant?: 'outlined' | 'filled';
  placeholder?: string;
  size?: 'small' | 'medium';
  Date?: string;
}

export const XDateTimePicker = (
  error,
  isDisabled,
  variant,
  placeholder,
  size,

) => {
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  const InitialValue = addMinutes(new Date(), 6)

  const [selectedDate, setSelectedDate] = useState(InitialValue);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <DateTimePicker
      value={selectedDate}
      onChange={handleDateChange}
      renderInput={(params) => (
        <TextField
          size={size}
          variant={variant}
          onKeyDown={handleDateChangeRaw}
          InputProps={{ readOnly: true }}
          {...params}
          placeholder={placeholder}
          error={error}
          disabled={isDisabled}
        />
      )}
    />
  );
}; 
