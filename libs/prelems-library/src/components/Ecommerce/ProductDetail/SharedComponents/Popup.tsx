import React from "react";
import { Card, CardActionArea, CardMedia, Dialog, IconButton, Box } from "@mui/material";
import { Close } from "@mui/icons-material";
import IconNextSvg from "../../../../assets/svgIcon/next.svg";
import IconPrevSvg from "../../../../assets/svgIcon/prev.svg";
import "./Popup.css";

interface ImageDialogProps {
  isOpen: boolean;
  isMobile: boolean;
  handleClose: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  imageUrl: string | undefined;
}

const Popup: React.FC<ImageDialogProps> = ({
  isOpen,
  isMobile,
  handleClose,
  handlePrev,
  handleNext,
  imageUrl,
}) => (
  <Dialog
    open={isOpen}
    onClose={handleClose}
    className='product-detail-popup'
    sx={{
      "& .Platform-x-Dialog-paper": { maxWidth: isMobile ? "100%" : "100%" },
      "& .Platform-x-Paper-root": {
        margin: { em: "0px" },
        maxHeight: { em: "100vh" },
        width: { em: "100%" },
      },
      "& .popup-image-container": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
    }}
    fullWidth>
    <Box className='popup-close'>
      <IconButton aria-label='Close' onClick={handleClose}>
        <Close />
      </IconButton>
    </Box>
    <IconButton
      aria-label='Previous'
      onClick={handlePrev}
      className='prev-button'
      style={{
        position: "absolute",
        top: "50%",
        left: 10,
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}>
      <img src={IconPrevSvg} alt='next' />
    </IconButton>
    <IconButton
      aria-label='Next'
      onClick={handleNext}
      className='next-button'
      style={{
        position: "absolute",
        top: "50%",
        right: 10,
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}>
      <img src={IconNextSvg} alt='next' />
    </IconButton>
    <Card>
      <CardActionArea onClick={handleNext} disableRipple>
        <Box className='popup-image-container'>
          <CardMedia
            component='img'
            image={imageUrl}
            alt='Next Large Image'
            sx={{ height: "auto", width: { xs: "60%", em: "500px" } }}
          />
        </Box>
      </CardActionArea>
    </Card>
  </Dialog>
);

export default Popup;
