import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useTranslation } from 'react-i18next';
import SocialShareSteps from './SocialShareSteps';
import { DialogList } from './utils/socialShareTypes';
import React from 'react';

export default function PlateformXSocialDialog({
  isDialogOpen,
  closeButtonHandle,
  setSelectedItem,
  contentType,
  onClickingDone,
}: DialogList) {
  const { t } = useTranslation();
  return (
    <Box className="socialsharemodal">
      <Dialog
        fullWidth
        open={isDialogOpen}
        onClose={closeButtonHandle}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '.Platform-x-Dialog-paper': {
            maxWidth: {
              xs: '500px',
              sm: '650px',
              md: '650px',
              em: '800px',
              xl: '800px',
            },
            overflowX: 'hidden',
            minHeight: '590px',
            padding: { md: '25px', xs: '20px' },
            '@media screen and (min-height: 650px )': {
              minHeight: '640px',
            },
            '@media screen and (max-height: 600px) and (orientation: landscape)':
            {
              overflowY: 'scroll',
              minHeight: '350px',
            },
            // maxheight: { xs: "714px", md: "657px", xl: "657px" },
          },
          display: { xs: 'block', md: 'block' },
        }}
      >
        <Box
          sx={{
            display: { xs: 'flex', md: 'flex' },
            // placeContent: "space-between",
            // paddingLeft: "20px",
            // marginTop: "8px",
            marginLeft: { xs: 'initial', md: 'auto' },
          }}
        >
          {/* <Box sx={{ marginTop: '5px', marginBottom: '10px', display: { md: "none", xs: " none", em: "none" } }}>
            <Typography variant="h5medium">{t("social_share")}</Typography>
          </Box> */}
          <Box
            sx={{ textAlign: 'right', cursor: 'pointer', zIndex: '99999' }}
            onClick={closeButtonHandle}
          >
            <CloseIcon
              style={{ position: 'absolute', top: '15px', right: '15px' }}
            />
          </Box>
        </Box>
        <SocialShareSteps
          onDoneClick={closeButtonHandle}
          onClickingDone={onClickingDone}
          selectedItem={setSelectedItem}
          contentType={contentType}
        />
      </Dialog>
    </Box>
  );
}
