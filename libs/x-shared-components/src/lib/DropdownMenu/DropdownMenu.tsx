import { useState } from 'react';
import { MenuItem, Menu, Button } from '@mui/material';
import { DropdownMenuProps } from './DropdownMenu.types';

const DropdownMenu = ({ buttonLabel, options }: DropdownMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button onClick={handleClick} color="inherit">
        {buttonLabel}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option.value} onClick={handleClose}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default DropdownMenu;
