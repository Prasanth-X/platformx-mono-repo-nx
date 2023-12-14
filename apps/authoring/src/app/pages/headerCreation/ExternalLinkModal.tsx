import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { ThemeConstants } from '@platformx/utilities';
import { MenuItemLinkProp } from './types';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const ExternalLinkModal = ({
  handleClose,
  openPageModal,
  updateMenuItems,
}) => {
  const [menuItemName, setMenuItemName] = useState('');
  const [menuExternalLink, setMenuExternalLink] = useState('');
  const [linkTarget, setLinkTarget] = useState('existingTab');
  const createMenuItem = () => {
    if (
      menuItemName.trim().length != 0 &&
      menuExternalLink.trim().length != 0
    ) {
      const newMenuItem: MenuItemLinkProp = {
        menuExternalLink,
        linkTarget,
      };
      updateMenuItems(menuItemName, newMenuItem);
      handleClose();
    }
  };
  return (
    <Modal
      open={openPageModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: '75%',
          padding: '10px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography
            variant="h5"
            mt={2}
            sx={{
              textAlign: 'center',
              fontSize: {
                xs: ThemeConstants.FONTSIZE_MD,
                xl: ThemeConstants.FONTSIZE_SECONDARY_DEFAULT,
              },
            }}
          >
            Link Detail
          </Typography>
        </Box>
        <Box
          sx={{
            padding: '10px',
          }}
        >
          <TextField
            value={menuItemName}
            error={menuItemName?.length === 0}
            onChange={(e: any) => setMenuItemName(e.target.value)}
            variant="standard"
            placeholder="Menu Item Name"
            inputProps={{ maxLength: 15 }}
            sx={{
              p: 1,
              width: '100%',
              height: '1rem',
              margin: '25px',
              '.Platform-x-Input-root:after': {
                borderBottom: `1px solid ${ThemeConstants.BLACK_COLOR}`,
              },
            }}
          />
          <TextField
            value={menuExternalLink}
            error={menuExternalLink?.length === 0}
            onChange={(e: any) => setMenuExternalLink(e.target.value)}
            variant="standard"
            placeholder="https://www.google.com"
            inputProps={{ maxLength: 25 }}
            sx={{
              p: 1,
              width: '100%',
              height: '1rem',
              margin: '25px',
              '.Platform-x-Input-root:after': {
                borderBottom: `1px solid ${ThemeConstants.BLACK_COLOR}`,
              },
            }}
          />
          <Box
            sx={{
              padding: '10px',
            }}
          >
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Open as
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={linkTarget}
                onChange={(e) => setLinkTarget(e.target.value)}
              >
                <FormControlLabel
                  value="existingTab"
                  control={<Radio />}
                  label="Existing Tab"
                />
                <FormControlLabel
                  value="newTab"
                  control={<Radio />}
                  label="New Tab"
                />
              </RadioGroup>
            </FormControl>
          </Box>
          <Button
            variant="contained"
            sx={{
              marginRight: '10px',
              alignSelf: 'flex-end',
              backgroundColor: ThemeConstants.BLACK_COLOR,
              color: ThemeConstants.WHITE_COLOR,
              '&:hover': {
                backgroundColor: ThemeConstants.BLACK_COLOR,
                color: ThemeConstants.WHITE_COLOR,
              },
              minWidth: '130px',
            }}
            disableElevation
            onClick={createMenuItem}
          >
            Done
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
