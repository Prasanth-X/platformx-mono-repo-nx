import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import * as React from "react";
import { useState } from "react";
// import { TransitionProps } from "@mui/material/transitions";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from "@mui/material";
import DateRangeDialogBox from "./dateRangeDialogBox";

const Transition = React.forwardRef(function Transition(
    props: {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
export default function CalendarDialogBox({ isClickedMob, onclickMob, sendData }) {
  const [open, setOpen] = useState(isClickedMob);
  const [openCustom, setOpenCustom] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCustomOpen = (value) => {
    setOpen(value);
    setOpenCustom(false);
  };
  const handleClose = (value) => {
    setOpen(false);
    onclickMob(false);
  };
  const handleCustomClose = () => {
    setOpenCustom(false);
  };
  return (
    <Box sx={{ display: { xs: 'block', sm: 'none', lg: 'none', xl: 'none' }, }}>

      <>
        {/* <MoreVertIcon onClick={handleClickOpen} /> */}
        <Dialog
            sx={{
              display: { sm: "none" },
              ".Platform-x-Dialog-paper": {
                boxShadow: "0 3px 6px 0 rgba(0, 0, 0, 0.16)",
                borderRadius: "8px 8px 0 0",
                margin: 0,
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: '297px',
                alignItems: 'center',
              },
            }}
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
          <Box
              sx={{
                height: '50px',
                margin: '26px 10px 10px 10.3px',
                padding: '11px 210px 16px 18px',
                borderRadius: '3px',
                backgroundColor: '#f5f6f8',
                alignItems: 'center',
                width: '330px'
                }}
            >

            <Box sx={{ fontSize: "16px", color: '#2d2d39', textAlign: 'left', width: '100px' }}>Past Week</Box>
          </Box>
          <Box
              sx={{
                height: '50px',
                margin: '0px 10px 10px 10.3px',
                padding: '11px 210px 16px 15px',
                borderRadius: '3px',
                backgroundColor: '#f5f6f8',
                alignItems: 'center',
                width: '330px'
                }}
            >

            <Box sx={{ fontSize: "16px", color: '#2d2d39', textAlign: 'left', width: '100px' }}>Past Month</Box>
          </Box>
          <Box
              sx={{
                height: '50px',
                margin: '0px 10px 10px 10.3px',
                padding: '11px 210px 16px 18px',
                borderRadius: '3px',
                backgroundColor: '#f5f6f8',
                alignItems: 'center',
                width: '330px'
                }}
            >

            <Box sx={{ fontSize: "16px", color: '#2d2d39', textAlign: 'left' }}>This Year</Box>
          </Box>
          <Box
              sx={{
                height: '50px',
                margin: '0px 10px 10px 10.3px',
                padding: '11px 210px 16px 18px',
                borderRadius: '3px',
                backgroundColor: '#f5f6f8',
                alignItems: 'center',
                width: '330px',
                display: "flex",
                }}
                onClick={() => setOpenCustom(true)}
            >

            <Box sx={{ fontSize: "16px", color: '#2d2d39', textAlign: 'left' }}>Custom</Box>
            {/* <Box  sx={{ marginLeft: "190px",alignItems:'center',display: "flex",}}> */}
            <ArrowForwardIosIcon sx={{ width: '15px',
              height: '20px', color: '#000', marginLeft: "220px" }}/>
            {/* </Box> */}
          </Box>

        </Dialog>
        {openCustom && <DateRangeDialogBox sendData={sendData} openCustom={openCustom} handleCustomOpen={handleCustomOpen}/>}

      </>
    </Box>
  );
}