import { Box, Button, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import {
  addMonths,
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  isSameDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
} from 'date-fns';
import { useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import './default.css';
import './styles.css';

export default function CalendarDesktop({ isClicked, onclickDesk }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [open, setOpen] = useState(isClicked);

  const handleClose = () => {
    setOpen(false);
    onclickDesk(false);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{
        display: { xs: 'none', sm: 'block' },
        '.Platform-x-Dialog-paper': {
          top: 15,
          maxWidth: 900,
          bottom: 50,
          left: { md: 50 },
        },
      }}
    >
      <Box>
        <DateRangePicker
          onChange={(item) => setState([item.selection])}
          showSelectionPreview
          moveRangeOnFirstSelection={false}
          showDateDisplay={false}
          months={2}
          color="#272727"
          ranges={state}
          direction="horizontal"
          inputRanges={[]}
          staticRanges={[
            {
              label: 'Past Week',
              range: () => ({
                startDate: startOfWeek(addWeeks(new Date(), -1)),
                endDate: endOfWeek(addWeeks(new Date(), -1)),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: 'Past Month',
              range: () => ({
                startDate: startOfMonth(addMonths(new Date(), -1)),
                endDate: endOfMonth(addMonths(new Date(), -1)),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: 'This Year',
              range: () => ({
                startDate: startOfYear(new Date()),
                endDate: endOfDay(new Date()),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
            {
              label: 'Custom',
              range: () => ({
                startDate: new Date(),
                endDate: new Date(),
              }),
              isSelected(range) {
                const definedRange = this.range();
                return (
                  isSameDay(range.startDate, definedRange.startDate) &&
                  isSameDay(range.endDate, definedRange.endDate)
                );
              },
            },
          ]}
        />
        <Divider />
        <Box
          sx={{
            display: { xs: 'none', md: 'block', sm: 'block' },
            padding: '15px',
            textAlign: 'right',
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
              width: '68px',
              height: '35px',
              marginRight: '10px',
              border: '1px solid #000000',
              borderRadius: '3px',
            }}
            disableElevation
            onClick={handleClose}
          >
            Cancel
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

              width: '68px',
              height: '35px',
              borderRadius: '3px',
            }}
            disableElevation
          >
            Done
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
