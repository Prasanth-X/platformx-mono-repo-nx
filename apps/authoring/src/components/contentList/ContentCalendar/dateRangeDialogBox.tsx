import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import { useState } from 'react';
// import { TransitionProps } from "@mui/material/transitions";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import { format } from 'date-fns';
import ThemeConstants from '../../../theme/variable';

const MyActionBar = ({ onAccept, onCancel }) => {
  return (
    <Box
      sx={{
        marginBottom: '15px',
        textAlign: 'center',
      }}
    >
      <Button
        variant='contained'
        disableElevation
        sx={{
          backgroundColor: ThemeConstants.WHITE_COLOR,
          color: ThemeConstants.BLACK_COLOR,
          '&:hover': {
            backgroundColor: ThemeConstants.WHITE_COLOR,
            color: ThemeConstants.BLACK_COLOR,
          },
          width: '159px',
          height: '40px',
          margin: '0 5px 0px 0px',
          border: '1px solid #000000',
          borderRadius: '3px',
        }}
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        onClick={onAccept}
        variant='contained'
        disableElevation
        sx={{
          backgroundColor: ThemeConstants.BLACK_COLOR,
          color: ThemeConstants.WHITE_COLOR,
          '&:hover': {
            backgroundColor: ThemeConstants.BLACK_COLOR,
            color: ThemeConstants.WHITE_COLOR,
          },
          width: '159px',
          height: '40px',
          borderRadius: '3px',
          margin: '0 0px 0px 5px',
        }}
      >
        {' '}
        Done
      </Button>
    </Box>
  );
};

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

export default function DateRangeDialogBox({
  openCustom,
  handleCustomOpen,
  sendData,
}) {
  const [open, setOpen] = useState(openCustom);
  const [isOpen, setIsOpen] = useState(false);
  const [toDate, setTodate] = useState(new Date());
  const [value, setValue] = React.useState<any>(new Date());
  const [valueTo, setValueTo] = React.useState<any>(new Date());
  const [isToOpen, setToOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(true);
  };
  const handleToOpen = () => {
    setToOpen(true);
  };
  const handleToClose = () => {
    setToOpen(false);
  };

  // const handleChange = (newValue: Dayjs | null) => {
  //   // setValue(newValue);
  // };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false);
    handleCustomOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  React.useEffect(() => {
    setValue(value);
  }, [value]);
  React.useEffect(() => {
    setValueTo(valueTo);
  }, [valueTo]);
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none', lg: 'none', xl: 'none' } }}>
      <>
        <Dialog
          sx={{
            display: { sm: 'none' },
            '.Platform-x-Dialog-paper': {
              boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
              borderRadius: '8px 8px 0 0',
              margin: 0,
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '436px',
              alignItems: 'center',
            },
          }}
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleDialogClose}
          aria-describedby='alert-dialog-slide-description'
        >
          <Box
            sx={{
              width: '100%',
              height: '93px',
              margin: '0 0 19px',
              padding: '7px 28px 7px 15px',
              borderRadius: '8px 8px 0 0',
              backgroundColor: '#eef1ff',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              sx={{
                fontSize: '12px',
                color: '#858791',
                textAlign: 'left',
                // width:'100px',
                margin: '12.8px 15px 9.5px 0',
                fontWeight: 500,
              }}
            >
              Select Custom Date
            </Typography>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Typography
                sx={{
                  fontSize: '15px',
                  color: '#1f2021',
                  textAlign: 'left',
                  // width:'100px',
                  margin: '0.3px 0px 14.8px 0px',
                  fontWeight: 600,
                }}
              >
                {value != null ? format(new Date(value), 'eeee, dd MMM') : ''}
                {/* {Moment(value?.toString()).format('dddd, D MMM')} */}
              </Typography>
              <ArrowForwardIcon
                sx={{
                  width: '18px',
                  height: '18px',
                  margin: '5.1px 5px 19.6px 5px',
                }}
              />
              <Typography
                sx={{
                  fontSize: '15px',
                  color: '#1f2021',
                  textAlign: 'right',
                  // width:'100px',
                  margin: '0.3px 0 14.8px 0px',
                  fontWeight: 600,
                }}
              >
                {valueTo != null
                  ? format(new Date(valueTo), 'eeee, dd MMM')
                  : ''}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginLeft: '15px' }}>
            <Typography
              sx={{
                fontSize: '12px',
                color: '#858791',
                textAlign: 'left',
                // width:'100px',
                height: '17px',
                // margin: '0 150px 86.1px 0' ,
                fontWeight: 500,
                marginTop: '5px',
              }}
            >
              From
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <MobileDatePicker
                  toolbarTitle='Select From Date'
                  value={value}
                  open={isOpen}
                  onOpen={handleIsOpen}
                  onClose={handleClose}
                  // dayOfWeekFormatter={(day) => day}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  components={{ ActionBar: MyActionBar }}
                  DialogProps={{
                    sx: {
                      display: { sm: 'none' },
                      '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
                        margin: 0,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                      },
                      '.css-j88s13-MuiPickersToolbar-root-MuiDatePickerToolbar-root':
                        {
                          backgroundColor: '#eef1ff',
                        },
                      '.css-1us0ehi-MuiButtonBase-root-MuiPickersDay-root': {
                        borderRadius: '6px',
                      },
                      '.css-32nl4m-MuiButtonBase-root-MuiPickersDay-root': {
                        borderRadius: '6px',
                      },
                      '.css-5qpy3c-PrivatePickersYear-button': {
                        borderRadius: '6px',
                      },
                      '.css-esw5jw-MuiTypography-root': {
                        textTransform: 'none',
                      },
                      '.css-i4bv87-MuiSvgIcon-root': {
                        fill: '#000',
                      },
                      '.css-dplwbx-MuiPickersCalendarHeader-label': {
                        color: '#1f2021',
                      },
                    },
                  }}
                  renderInput={(params) =>
                    (<TextField
                      sx={{
                        fontSize: '16px',
                        color: '#2d2d39',
                        textAlign: 'left',
                        width: '330px',
                        height: '50px',
                        backgroundColor: '#f5f6f8',
                        outline: 'none',
                        margin: '8.9px 15px 27.2px 0px',
                        borderRadius: '3px',
                        '& fieldset': { border: 'none' },
                      }}
                      {...params}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={handleIsOpen}>
                              <CalendarMonthIcon sx={{ color: '#000000' }} />{' '}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>)
                  }
                />
              </Stack>
            </LocalizationProvider>
            <Typography
              sx={{
                fontSize: '12px',
                color: '#858791',
                textAlign: 'left',
                // width:'100px',
                height: '17px',
                // margin: '6.1px 103px 61.5px 0' ,
                fontWeight: 500,
              }}
            >
              To
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Stack spacing={3}>
                <MobileDatePicker
                  toolbarTitle='Select To Date'
                  value={valueTo}
                  open={isToOpen}
                  onOpen={handleToOpen}
                  onClose={handleToClose}
                  // dayOfWeekFormatter={(day) => day}
                  onChange={(newValue) => {
                    setValueTo(newValue);
                  }}
                  components={{ ActionBar: MyActionBar }}
                  DialogProps={{
                    sx: {
                      display: { sm: 'none' },
                      '.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
                        margin: 0,
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                      },
                      '.css-j88s13-MuiPickersToolbar-root-MuiDatePickerToolbar-root':
                        {
                          backgroundColor: '#eef1ff',
                        },
                      '.css-1us0ehi-MuiButtonBase-root-MuiPickersDay-root': {
                        borderRadius: '6px',
                      },
                      '.css-32nl4m-MuiButtonBase-root-MuiPickersDay-root': {
                        borderRadius: '6px',
                      },
                      '.css-5qpy3c-PrivatePickersYear-button': {
                        borderRadius: '6px',
                      },
                      '.css-esw5jw-MuiTypography-root': {
                        textTransform: 'none',
                      },
                      '.css-i4bv87-MuiSvgIcon-root': {
                        fill: '#000',
                      },
                      '.css-dplwbx-MuiPickersCalendarHeader-label': {
                        color: '#1f2021',
                      },
                    },
                  }}
                  renderInput={(params) =>
                    (<TextField
                      sx={{
                        fontSize: '16px',
                        color: '#2d2d39',
                        textAlign: 'left',
                        width: '330px',
                        height: '50px',
                        backgroundColor: '#f5f6f8',
                        outline: 'none',
                        margin: '8.9px 15px 27.2px 0px',
                        borderRadius: '3px',
                        '& fieldset': { border: 'none' },
                      }}
                      {...params}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton edge='end' onClick={handleToOpen}>
                              <CalendarMonthIcon sx={{ color: '#000000' }} />{' '}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    ></TextField>)
                  }
                />
              </Stack>
            </LocalizationProvider>
          </Box>
          <Box
            sx={{
              // display: { xs: 'none', md: 'block', sm: 'block' },
              // margin:'69.6px 15px 50px 15px',
              marginTop: '40px',
              textAlign: 'right',
            }}
          >
            <Button
              variant='contained'
              sx={{
                backgroundColor: ThemeConstants.WHITE_COLOR,
                color: ThemeConstants.BLACK_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.WHITE_COLOR,
                  color: ThemeConstants.BLACK_COLOR,
                },
                width: '159px',
                height: '45px',
                margin: '0 5px 0 0',
                border: '1px solid #000000',
                borderRadius: '3px',
              }}
              disableElevation
              onClick={() => handleDialogClose()}
            >
              Cancel
            </Button>

            <Button
              variant='contained'
              sx={{
                backgroundColor: ThemeConstants.BLACK_COLOR,
                color: ThemeConstants.WHITE_COLOR,
                '&:hover': {
                  backgroundColor: ThemeConstants.BLACK_COLOR,
                  color: ThemeConstants.WHITE_COLOR,
                },
                width: '159px',
                height: '45px',
                borderRadius: '3px',
                margin: '0 0 0 5px',
              }}
              disableElevation
              onClick={() => {
                sendData({
                  startDate: value instanceof Date ? value : value?.$d,
                  endDate: valueTo instanceof Date ? valueTo : valueTo?.$d,
                });
                setOpen(false);
              }}
            >
              Done
            </Button>
          </Box>
        </Dialog>
      </>
    </Box>
  );
}
