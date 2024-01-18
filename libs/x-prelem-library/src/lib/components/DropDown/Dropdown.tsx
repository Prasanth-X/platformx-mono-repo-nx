import React from "react";
import "./Dropdown.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import useTheme from "@mui/material/styles/useTheme";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useCustomStyle } from "./Dropdown.style";

const DropDown = ({
  name,
  label,
  arrayData,
  stateValue = "",
  parentHandler,
  helperText,
  error,
  cssClass,
  isDisabled,
}: any) => {
  const theme = useTheme();
  const classes = useCustomStyle();
  return (
    <FormControl
      fullWidth
      size='medium'
      className={`dropdown-wrapper ${cssClass}`}
      variant='filled'>
      <Select
        displayEmpty
        name={name}
        error={error}
        disabled={isDisabled ? true : false}
        id='select-small'
        value={stateValue ? stateValue : ""}
        placeholder={label}
        onChange={parentHandler}
        labelId='select-small-label'
        className={`custom-dropdown ${classes.customDropDownWrapper} allCustomTypeDropdown`}
        IconComponent={ExpandMoreOutlinedIcon}
        MenuProps={{
          className: "customDropDownPopOver",
          PaperProps: {
            sx: {
              backgroundColor: theme.palette.prelemType1.SELECT.PLACEHOLDER,
            },
          },
          MenuListProps: {
            className: "menuListing",
            sx: {
              "&.menuListing li": {
                color: theme.palette.prelemType1.SELECT.TEXT,
                padding: theme.spacing(1),
                "&.Mui-selected": {
                  backgroundColor: `${theme.palette.prelemType1.SELECT.TEXT_BACKGROUND_HOVER} !important`,
                  color: theme.palette.prelemType1.SELECT.TEXT_HOVER,
                },
                "&:hover": {
                  backgroundColor: theme.palette.prelemType1.SELECT.TEXT_BACKGROUND_HOVER,
                  color: theme.palette.prelemType1.SELECT.TEXT_HOVER,
                },
              },
            },
          },
        }}
        renderValue={stateValue !== "" ? undefined : () => `${label}`}>
        {arrayData.map((item: any, index: number) => {
          return (
            <MenuItem value={item.name} key={"options" + index}>
              {item.name}
            </MenuItem>
          );
        })}
        ;
      </Select>

      {helperText && (
        <FormHelperText error className='form-dropdown-error'>
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default DropDown;
