import TuneIcon from '@mui/icons-material/Tune';
import {
  Box,
  Dialog,
  DialogTitle
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Filter from '../components/Common/selectListing/Filter';

const MobileListFilter = ({ filterValue, handleChange, contentType }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseFilter = () => {
    setOpen(false);
  };
  return (
    <Box>
      <TuneIcon
        onClick={handleClickOpen}
        sx={{ verticalAlign: 'middle', fontSize: { xs: '18px', md: '20px' } }}
      />
      <Dialog
        sx={{
          display: { sm: 'none' },
          '.Platform-x-Dialog-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '10px 10px 0 0',
            margin: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
          },
        }}
        open={open}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseFilter}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle sx={{ textTransform: "capitalize" }}>{t("filter_update")}</DialogTitle>
        <Box
          sx={{
            margin: '0 0 20px 0',
            '.form_Control': {
              width: '100%',
              '.form_Control_radio': {
                display: 'none',
                '& + span': {
                  fontSize: '16px',
                },
              },
              label: {
                margin: '0 !important',
                padding: '5px 20px',
                '&:has(> span.Mui-checked)': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  fontWeight: '500',
                },
              },
            },
          }}
        >
          <Filter
            filterValue={filterValue}
            handleChange={handleChange}
            contentType={contentType}
            handleCloseFilter={handleCloseFilter}
          />
        </Box>
      </Dialog>
    </Box>
  );
};
export default MobileListFilter;
