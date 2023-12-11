import CancelIcon from '@mui/icons-material/Cancel';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Divider, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import Slide from '@mui/material/Slide';
import React, { useRef, useState } from 'react';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function RenameDialog({
  isRenameOpen,
  setIsRenameOpen,
  name,
  setIsOpen,
  onRename,
}) {
  const [value, setValue] = useState(name);
  const [layout, setLayout] = useState('default');
  const keyboard = useRef();

  const handleClose = () => {
    setIsRenameOpen(false);
  };
  const onChange = (input) => {
    setValue(input);
  };

  const handleShift = () => {
    const newLayoutName = layout === 'default' ? 'shift' : 'default';
    setLayout(newLayoutName);
  };

  const onKeyPress = (button) => {
    if (button === '{shift}' || button === '{lock}') handleShift();
  };

  const onChangeInput = (event) => {
    const input = event.target.value;
    setValue(input);
    //    keyboard.current!==undefined ? keyboard.current?.setValue(input):null
  };

  return (
    <div className="App">
      <Dialog
        sx={{
          display: { sm: 'none' },
          '.Platform-x-Dialog-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '10px 10px 0 0',
            width: '100%',
            margin: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
        open={isRenameOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle sx={{ marginLeft: '13px' }}>Rename</DialogTitle>
        <Divider />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              m: '30px 20px 0 20px',
            }}
          >
            <TextField
              size="small"
              type="url"
              value={value}
              onChange={onChangeInput}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <CancelOutlinedIcon
                      onClick={() => setValue('')}
                      sx={{
                        cursor: 'pointer',
                        width: '16px',
                        height: '16px',
                        color: '#2d2d39',
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              sx={{
                width: '347px',
                '.Platform-x-InputBase-root': {
                  height: '50px',
                  fontSize: ThemeConstants.FONTSIZE_XS,
                },
              }}
            ></TextField>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              mt: '30px',
              mb: '22px',
            }}
          >
            <Button
              variant="contained"
              disableElevation
              // onClick={onBack}
              sx={{
                width: '163px',
                height: '50px',
                fontSize: ThemeConstants.FONTSIZE_SM,
                backgroundColor: '#fff',
                color: '#2d2d39',
                textTransform: 'none',
                //   margin: '54px 20px 18px 20px',
                borderRadius: '3px',
                '&:hover': {
                  backgroundColor: ThemeConstants.WHITE_COLOR,
                  color: ThemeConstants.BLACK_COLOR,
                },
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={() => {
                setIsOpen(true);
                handleClose();
              }}
            >
              <CancelIcon sx={{ mr: '10px', width: '24px', height: '24px' }} />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mr: '5px',
                }}
              >
                Cancel
              </Box>
            </Button>
            <Button
              variant="contained"
              disableElevation
              sx={{
                width: '163px',
                height: '50px',
                fontSize: ThemeConstants.FONTSIZE_SM,
                backgroundColor: '#2d2d39',
                color: '#fff',
                textTransform: 'none',
                ml: '16px',
                borderRadius: '3px',

                '&:hover': {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                },
              }}
              onClick={() => {
                onRename(value);
                handleClose();
              }}
            >
              <SaveIcon
                sx={{
                  width: '24px',
                  height: '24px',
                  color: '#ffffff',
                  mr: '10px',
                }}
              />
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: '3px',
                }}
              >
                Save
              </Box>

              {/* <ArrowForwardIosIcon sx={{ ml: '10px', width:'15px', height:'15px' }} /> */}
            </Button>
          </Box>
        </Box>
        <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          onChange={onChange}
          onKeyPress={onKeyPress}
          layout={{
            default: [
              '1 2 3 4 5 6 7 8 9 0',
              'q w e r t y u i o p',
              'a s d f g h j k l',
              '{lock} z x c v b n m {bksp}',
              '.com @ {space}',
            ],
            shift: [
              '1 2 3 4 5 6 7 8 9 0',
              'Q W E R T Y U I O P',
              'A S D F G H J K L',
              '{lock} Z X C V B N M {bksp}',
              '.com @ {space}',
            ],
          }}
        />
      </Dialog>
    </div>
  );
}
