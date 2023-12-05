import React from 'react';
import { Button } from '@mui/material';
import './Button.css';
import Delete from 'assets/svgIcon/Delete.svg';
import { useCustomStyle } from './Button.style';

const DeleteButton = () => {
  const classes = useCustomStyle();
  return (
    <Button
      variant="whitebutton"
      className={`ecom-delete-button-small ${classes.buttonwhite}`}
      startIcon={<img src={Delete} alt="delete" />}
    ></Button>
  );
};
export default DeleteButton;
