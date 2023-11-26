// apps/header/src/app/Header.tsx
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { DropdownMenu } from '@x-prelems-monorepo-nx/x-components';
import ThemeConstants from 'libs/x-components/src/theme/prelemVariableLight';
const Header: React.FC = () => {
  const menu1Options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  const menu2Options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: ThemeConstants.BLACK_COLOR,
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          color={ThemeConstants.WHITE_COLOR}
          component="div"
          sx={{ flexGrow: 1 }}
        >
          Platfom X
        </Typography>
        <DropdownMenu buttonLabel="Menu 1" options={menu1Options} />
        <DropdownMenu buttonLabel="Menu 2" options={menu2Options} />
        {/* Add more DropdownMenu components with their respective options */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
