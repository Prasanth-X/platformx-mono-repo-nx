import React from 'react';
import Box from '@mui/material/Box';
import { ThemeConstants } from '@platformx/utilities';
import EditIcon from '@mui/icons-material/Edit';
import InsertLinkRoundedIcon from '@mui/icons-material/InsertLinkRounded';

interface ButtonEditLinkProps {
  zIndex: number;
  opacity: string;
  left: string;
  top: string;
  handleEditButtonWindowRef: (clientX: number, clientY: number) => void;
  handleEditButtonText: (e: object, buttonName: string) => void;
  buttonRef: any;
  buttonName: string;
}

export const ButtonEditLink = ({
  zIndex,
  opacity,
  left,
  top,
  handleEditButtonWindowRef,
  buttonRef,
  handleEditButtonText,
  buttonName,
}: ButtonEditLinkProps) => {
  return (
    <Box
      sx={{
        backgroundColor: ThemeConstants.WHITE_COLOR,
        padding: '9px',
        borderRadius: `7px`,
        boxShadow: `0 3px 6px 0 rgba(0, 0, 0, 0.16)`,
        width: '100px',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'fixed',
        opacity: opacity,
        left: parseInt(left) >= 1000 ? `${parseInt(left) - 200}px` : left,
        top: top,
        zIndex: zIndex,
      }}
      data-testid="button-edit-link"
      ref={buttonRef}
    >
      <EditIcon
        sx={{ width: '20px', height: '20px', cursor: 'pointer' }}
        onClick={(e) => handleEditButtonText(e, buttonName)}
      />
      <InsertLinkRoundedIcon
        sx={{
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          transform: `rotate(-45deg)`,
        }}
        onClick={(e) => handleEditButtonWindowRef(e.clientX, e.clientY)}
      />
    </Box>
  );
};
