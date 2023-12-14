import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import './AutoCompleteMultiSelect.css';
const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function AutoCompleteMultiSelect({
  options,
  placeholder,
  className = '',
  values = [],
  onChange = (event: any, newInputValue: any) => {},
  getOptionLabel,
  optionFormat = '',
  limitTags = -1,
}) {
  return (
    <Autocomplete
      limitTags={limitTags}
      value={[...values]}
      className={className}
      multiple
      id='checkboxesdemos'
      options={options}
      disableCloseOnSelect
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) =>
        option[optionFormat] === value[optionFormat]
      }
      onChange={onChange}
      classes={{
        popper: 'autocompleteMultiSelectPopper',
        paper: 'autocompleteMultiSelectPapper',
        inputRoot: 'autocompleteMultiSelectInputRoot',
        tag: 'autocompleteMultiSelectTag',
        root: 'autocompleteMultiSelectroot',
      }}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option[optionFormat]}
        </li>
      )}
      renderInput={(params) => {
        return <TextField {...params} placeholder={placeholder} />;
      }}
    />
  );
}
