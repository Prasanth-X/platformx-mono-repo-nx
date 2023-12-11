import React from "react";
import { Box, Dialog } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CardContent from "./modalContent";

interface DialogList {
  disableConfirmButton?: boolean;
  isDialogOpen: boolean;
  title?: string;
  subTitle?: string;
  closeButtonText?: string;
  confirmButtonText?: string;
  confirmButtonHandle?: () => void;
  closeEmbedButtonHandle?: () => void;
  crossButtonHandle?: () => void;
  modalType?: string;
  pageUrl?: string;
  type?: string;
  setSelectedItem?: any;
}
export default function EmbedDialog({
  isDialogOpen,
  closeEmbedButtonHandle,
  setSelectedItem,
}: DialogList) {
  return (
    <Box className='embedmodal'>
      <Dialog
        fullWidth={true}
        open={isDialogOpen}
        onClose={closeEmbedButtonHandle}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        PaperProps={{
          sx: {
            maxWidth: { xs: "97%", sm: "1080px" },
            width: "97%",
            margin: { xs: "0px" },
            overflow: "hidden",
            height: { md: "480px" },
          },
        }}
        sx={{
          display: "block",
          height: { xs: "100vh", sm: "auto" },
        }}>
        <Box
          sx={{
            paddingLeft: "20px",
            marginTop: "8px",
            marginLeft: { xs: "initial", md: "auto" },
            position: "absolute",
            right: "-10px",
          }}>
          <Box
            sx={{ textAlign: "right", cursor: "pointer", zIndex: "99999" }}
            mt={1}
            mr={3}
            onClick={closeEmbedButtonHandle}>
            <CloseIcon />
          </Box>
        </Box>
        <CardContent selectedItem={setSelectedItem} />
      </Dialog>
    </Box>
  );
}
