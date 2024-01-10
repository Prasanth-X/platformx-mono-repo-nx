import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addMinutes } from "date-fns";
import { useState } from "react";
export interface XDatePickerProps {
  isDisabled?: boolean;
  //   variant: 'outlined' | 'filled';
  disablePast?: boolean;
  state?: any;
  setState?: any;
  field?: any;
}

const XDateTimePicker = ({ isDisabled, disablePast, state, setState, field }: XDatePickerProps) => {
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  const InitialValue = addMinutes(new Date(), 6);

  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setState({ ...state, [field.name]: new Date(date).toISOString() });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
        disabled={isDisabled}
        disablePast={disablePast}
        inputFormat='MM/DD/YYYY HH:mm'
        renderInput={(params) => (
          <TextField
            disabled
            variant='outlined'
            onKeyDown={handleDateChangeRaw}
            InputProps={{ readOnly: true }}
            {...params}
            sx={{
              ".Platform-x-InputBase-root.Mui-error fieldset": {
                borderColor: "#ced3d9 !important",
              },
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};
export default XDateTimePicker;
