import React from 'react';
import { TextareaAutosize } from '@mui/material';

export interface AutoTextAreaProps {
  placeHolder?: string;
  minRows?: number;
  maxRows?: number;
  maxLength?: number;
  onBlur?: () => void;
  isDisabled?: boolean;
}
// eslint-disable-next-line no-empty-pattern
export const XTextArea = ({
  placeHolder = 'Write your text here',
  minRows,
  maxRows,
  isDisabled,
  onBlur,
  maxLength
}: AutoTextAreaProps

) => {
  return (
    <TextareaAutosize
      placeholder={placeHolder}
      // onBlur={(e) => handleOnBlur && handleOnBlur(e)}
      minRows={minRows}
      maxRows={maxRows}
      disabled={isDisabled}
      maxLength={maxLength}
      // inputProps={{ maxLength }}
      onBlur={onBlur}
      style={{
        width: '100%',
        resize: 'none',
        padding: '12px',
        border: 'solid 1px #ced3d9',
        borderRadius: '5px',
        backgroundColor: '#fff',
        fontFamily: 'Inter',
      }}
    />
  );
};
export default XTextArea;
