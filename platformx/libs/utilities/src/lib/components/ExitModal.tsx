import { Box, Button, IconButton, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import DialogCloseIcon from "../assets/svgIcon/DialogCloseIcon.svg";
import DeleteIcon from "../assets/svgIcon/errorPopupIcon.svg";
import { prelemTypes } from "../theme/globalStyle";
import { useCustomStyle } from "./ExitModal.styles";

export default function ExitModal({
  isDialogOpen,
  title,
  subTitle,
  closeButtonText,
  confirmButtonText,
  handleClose,
  handleExit,
}: any) {
  const classes = useCustomStyle();
  const globalClasses = prelemTypes();
  return (
    <div>
      <Dialog
        className={`${classes.ExitModalWrapper} ${globalClasses.prelemType1} prelem prelemType1  DialogBg`}
        fullWidth={true}
        open={isDialogOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        sx={{
          ".Platform-x-Paper-root": {
            padding: "25px !important",
          },
          ".Platform-x-Box-root": {
            margin: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          },
          ".Platform-x-DialogContent-root": {
            overflowY: "hidden !important",
          },
          ".Platform-x-DialogActions-root": {
            margin: "20px 0 0 0 !important",
          },
          ".Platform-x-Dialog-paper": {
            maxWidth: { xs: "100%", sm: "600px", lg: "650px" },
            width: { xs: "100%", sm: "600px", lg: "650px" },
            margin: { xs: "0px" },
            position: { xs: "absolute", md: "relative" },
            bottom: { xs: 0 },
            borderBottomLeftRadius: { xs: 0, md: 4 },
            borderBottomRightRadius: { xs: 0, md: 4 },
            "& .popupCloseIcon": {
              position: "absolute",
              right: "20px",
              top: "10px",
            },
          },
          textAlign: "center",
        }}>
        <div>
          <IconButton
            className='popupCloseIcon'
            edge='end'
            color='inherit'
            onClick={handleClose}
            aria-label='close'>
            <img src={DialogCloseIcon} alt='' />
          </IconButton>
          <Box className='BoxImage'>
            <img src={DeleteIcon} alt='' />
          </Box>
          {title ? (
            <DialogTitle className='BoxDialogTitle' id='alert-dialog-title' variant='h4bold'>
              {title}
            </DialogTitle>
          ) : (
            ""
          )}
          {subTitle ? (
            <DialogContent className='BoxDialogContent'>
              <Typography className='BoxTypography' variant='h5regular'>
                {subTitle}
              </Typography>
            </DialogContent>
          ) : (
            ""
          )}

          <DialogActions className='BoxDialogAction'>
            {confirmButtonText ? (
              <Button
                variant='primaryButton2'
                sx={{
                  marginRight: "12px",
                  minWidth: { xs: "120px", md: "120px" },
                  minHeight: { xs: "40px", md: "47px" },
                }}
                onClick={handleExit}
                autoFocus>
                {confirmButtonText}
              </Button>
            ) : (
              ""
            )}
            {closeButtonText ? (
              <Button
                variant='primaryButton1'
                sx={{
                  minWidth: { xs: "120px", md: "120px" },
                  minHeight: { xs: "40px", md: "47px" },
                }}
                onClick={handleClose}>
                {closeButtonText}
              </Button>
            ) : (
              ""
            )}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
