import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import * as React from 'react';

export default function AssigneList() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select value={age} onChange={handleChange} displayEmpty>
          <MenuItem value=''>
            Select
          </MenuItem>
          <MenuItem value={10}>James Mallan </MenuItem>
          <MenuItem value={20}>Mary Lyon </MenuItem>
          <MenuItem value={30}>Yoana </MenuItem>
          <MenuItem value={40}>John </MenuItem>
          <MenuItem value={50}>Paul Dev </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
