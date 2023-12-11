import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Box, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import ThemeConstants from '../../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { useStyles } from './Reschedule.styles';
import { RescheduleProps } from './Reschedule.types';
import ScheduleIcon from '../../../../assets/svg/schedulePopupIcon.svg';

const Reschedule = ({
  isOpen,
  rescheduleFlag,
  schedulePublishDateTime,
  scheduleUnpublishDateTime,
  rescheduleDto,
  handleConfirmPublishReschedule,
  handleConfirmUnpublishReschedule,
  closeButtonHandle,
}: RescheduleProps) => {
  //const [isDialogOpen, setIsDialogOpen] = useState(isOpen);
  const initialSchedulePublishAt = new Date(schedulePublishDateTime);
  const initialScheduleUnpublishAt = new Date(scheduleUnpublishDateTime);
  const [publishTime, setPublishTime] = useState(initialSchedulePublishAt);
  const [unpublishTime, setUnpublishTime] = useState(
    initialScheduleUnpublishAt
  );
  const classes = useStyles();
  let title = '';
  switch (rescheduleFlag) {
    case 'Publish':
      title = 'Reschedule Publish';
      break;
    case 'Unpublish':
      title = 'Reschedule Unpublish';
      break;
  }
  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  };
  const handleChangePublish = (newValue) => {
    setPublishTime(newValue);
  };
  const handleChangeUnpublish = (newValue) => {
    setUnpublishTime(newValue);
  };
  const handleConfirmInternal = () => {
    if (rescheduleFlag == 'Publish') {
      handleConfirmPublishReschedule(publishTime, rescheduleDto);
    } else {
      handleConfirmUnpublishReschedule(unpublishTime, rescheduleDto);
    }
  };
  return (
    <Dialog
      fullWidth
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{
        '.Platform-x-Paper-root': {
          padding: '25px !important',
        },
        '.Platform-x-Box-root': {
          margin: '5px',
        },
        '.Platform-x-DialogContent-root': {
          overflowY: 'hidden !important',
        },
        '.Platform-x-DialogActions-root': {
          margin: '20px 0 0 0 !important',
        },
        '.Platform-x-Dialog-paper': {
          maxWidth: { xs: '100%', sm: '700px', lg: '800px' },
          width: { xs: '100%', sm: '700px', lg: '800px' },
          margin: { xs: '0px' },
          position: { xs: 'absolute', md: 'inherit' },
          bottom: { xs: 0 },
          borderBottomLeftRadius: { xs: 0, md: 4 },
          borderBottomRightRadius: { xs: 0, md: 4 },
        },
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          textAlign: 'center',
          color: '#fd0c0d',
          margin: { xs: 0, md: '71px 0 4px' },
          height: '120px',
        }}
      >
        <img src={ScheduleIcon} />
      </Box>
      {title ? (
        <Typography variant="h3bold" mt={4} sx={{ textAlign: 'center' }}>
          {title}
        </Typography>
      ) : (
        ''
      )}
      <DialogContent sx={{ padding: { xs: '20px 14px', md: '0 24px' } }}>
        <Box
          sx={{
            padding: { xs: '0px', md: '25px 25px 0px 25px' },
            textAlign: 'center',
          }}
        >
          <Typography variant="h5semibold">Enter the new schedule</Typography>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              PopperProps={{ className: classes.popperStyle }}
              value={rescheduleFlag == 'Publish' ? publishTime : unpublishTime}
              onChange={
                rescheduleFlag == 'Publish'
                  ? handleChangePublish
                  : handleChangeUnpublish
              }
              renderInput={(params) => (
                <TextField
                  onKeyDown={handleDateChangeRaw}
                  size="small"
                  {...params}
                  sx={{
                    border: 'none',
                    '.Platform-x-InputBase-root': {
                      height: '50px',
                      fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                    },
                    '.Platform-x-OutlinedInput-root': {
                      borderRadius: '0',
                      margin: '10px auto',
                      width: '70%',
                    },
                  }}
                />
              )}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <Box
        sx={{
          display: { xs: 'none', md: 'block' },
          padding: '25px',
          textAlign: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: ThemeConstants.WHITE_COLOR,
            color: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.WHITE_COLOR,
              color: ThemeConstants.BLACK_COLOR,
            },
            minWidth: '130px',
            marginRight: '20px',
            border: '1px solid #000000',
          }}
          disableElevation
          onClick={() => closeButtonHandle()}
        >
          Close
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            color: ThemeConstants.WHITE_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
              color: ThemeConstants.WHITE_COLOR,
            },
            minWidth: '130px',
          }}
          disableElevation
          onClick={() => handleConfirmInternal()}
        >
          Done
        </Button>
      </Box>

      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          padding: '14px 14px 0px 14px',
          textAlign: 'center',
        }}
      >
        <Button
          variant="contained"
          sx={{
            backgroundColor: ThemeConstants.BLACK_COLOR,
            color: ThemeConstants.WHITE_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.BLACK_COLOR,
              color: ThemeConstants.WHITE_COLOR,
            },
            minWidth: '130px',
          }}
          disableElevation
          onClick={() => handleConfirmInternal()}
        >
          Done
        </Button>

        <Button
          variant="contained"
          sx={{
            backgroundColor: ThemeConstants.WHITE_COLOR,
            color: ThemeConstants.BLACK_COLOR,
            '&:hover': {
              backgroundColor: ThemeConstants.WHITE_COLOR,
              color: ThemeConstants.BLACK_COLOR,
            },
            minWidth: '130px',
            marginTop: '20px',
            border: '1px solid #000000',
          }}
          disableElevation
          onClick={() => closeButtonHandle()}
        >
          Close
        </Button>
      </Box>
    </Dialog>
  );
};
export default Reschedule;
