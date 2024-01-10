import { TextField, Typography } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addMinutes } from "date-fns";
import { useState } from "react";

interface DatePickerProps {
  isDisabled?: boolean;
  //   variant: 'outlined' | 'filled';
  disablePast?: boolean;
  state?: any;
  setState?: any;
  field?: any;
  isValid?: any;
}

const XDatePicker = ({
  isDisabled,
  disablePast,
  state,
  setState,
  field,
  isValid,
}: DatePickerProps) => {
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };

  const InitialValue = addMinutes(new Date(), 6);

  const [selectedDate, setSelectedDate] = useState("");
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setState({
      ...state,
      [field.name]: new Date(date).toISOString(), //new Date(date).toLocaleDateString().split("/").reverse().join("-"),
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        renderInput={(params) => (
          <TextField
            {...params}
            name={field.name}
            onKeyDown={handleDateChangeRaw}
            // onBlur={handleBlur}
            sx={{
              ".Platform-x-InputBase-root.Mui-error fieldset": {
                borderColor: isValid ? "#ced3d9 !important" : "#B71C1C",
              },
            }}
          />
        )}
        inputFormat='YYYY-MM-DD'
        value={selectedDate}
        onChange={handleDateChange}
      />
      {!isValid ? (
        <Typography
          variant='h7regular'
          sx={{
            color: "#B71C1C",
            marginTop: "10px",
            fontSize: { md: "12px", sm: "12px" },
            marginLeft: "14px",
          }}>
          {`${field.title} is required`}
        </Typography>
      ) : null}
    </LocalizationProvider>
  );
};
export default XDatePicker;
