import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { Button, MenuItem } from '@mui/material';
import { useState } from 'react';

import { StyledMenu } from './Submit.styles';

interface SubmitProps {
  Tab1?: string;
  Tab2?: string;
  Button2?: string;
}

const Submit = ({ Button2, Tab1, Tab2 }: SubmitProps) => {
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const openListMenu = Boolean(listMenu);
  const handleSubmitList = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setListMenu(event.currentTarget);
  };
  const handleListClose = () => {
    setListMenu(null);
  };
  const handleListOpen = () => {
    setListMenu(listMenu);
  };
  return (
    <>
      <Button
        variant='primaryButton'
        onClick={handleSubmitList}
        endIcon={<KeyboardArrowDownRoundedIcon />}
        className='sm'
        type='submit'
      >
        {Button2}
      </Button>
      <StyledMenu
        sx={{ top: '0px', left: '0px' }}
        id='long-menu'
        anchorEl={listMenu}
        open={openListMenu}
        onClose={handleListClose}
      >
        <MenuItem
          disableRipple
          onClick={() => {
            handleListClose();
          }}
        >
          {Tab1}
        </MenuItem>
        <MenuItem
          disableRipple
          onClick={() => {
            handleListClose();
          }}
        >
          {Tab2}
        </MenuItem>
      </StyledMenu>
    </>
  );
};

export default Submit;
