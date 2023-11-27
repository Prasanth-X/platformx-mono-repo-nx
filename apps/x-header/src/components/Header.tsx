// Header.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { DropdownMenu } from '@x-prelems/x-shared-components';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const companyServiceOptions = [
    { label: 'Web Development', value: 'web-development' },
    { label: 'Mobile App Development', value: 'mobile-app-development' },
    { label: 'Graphic Design', value: 'graphic-design' },
    { label: 'Digital Marketing', value: 'digital-marketing' },
    { label: 'Consulting Services', value: 'consulting-services' },
  ];
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuClick}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Platform X
        </Typography>
        <DropdownMenu
          buttonLabel={'Services'}
          options={companyServiceOptions}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
