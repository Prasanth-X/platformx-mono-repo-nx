import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { BasicSwitch, ThemeConstants } from '@platformx/utilities';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});
type MoreDialogProps = {
  checked: any;
  onChange: any;
  name: any;
  handleViewWorkflow: any;
  id: any;
};
const MoreDialog = ({
  checked,
  handleViewWorkflow,
  onChange,
  name,
  id,
}: MoreDialogProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const styles = `
  .singlebr_vod {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
     
     h2.singlebr_vod{
      margin: 16px 24px;
      padding: 0;
     }`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <style>{styles}</style>

      <MoreVertIcon onClick={handleClickOpen} />
      <Dialog
        sx={{
          display: { em: 'none' },
          '.Platform-x-Dialog-paper': {
            boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
            borderRadius: '10px 10px 0 0',
            width: '100%',
            margin: 0,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999,
            maxWidth: '100%',
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Box
          // className={!canDelete && 'disable'}
          sx={{ display: 'flex', flexDirection: 'column', margin: '12px' }}
          onClick={() => {
            handleClose();
          }}
        >
          <Box sx={{ margin: '12px' }}>
            <Typography variant="h4medium" color="BLACK_COLOR_VARIANT1">
              {name}
            </Typography>
          </Box>
          <Box
            sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
            onClick={() => handleViewWorkflow(id)}
          >
            <Box className="edit-Box">
              <RemoveRedEyeOutlinedIcon />
            </Box>
            <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
              {t('view')}
            </Box>
          </Box>
          <Box
            className="boxbasicswitch"
            sx={{ display: 'flex', alignItems: 'center', margin: '12px' }}
            onClick={() => onChange(checked)}
          >
            <BasicSwitch
              checked={checked}
              onChange={() => onChange(checked)}
              color={checked ? ThemeConstants.GREEN_COLOR : 'red'}
            />

            <Box sx={{ marginRight: '10px' }}>
              <Box sx={{ fontSize: '16px', textTransform: 'capitalize' }}>
                {checked ? (
                  <Typography>{t('enable')}</Typography>
                ) : (
                  <Typography>{t('disable')}</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
};
export default MoreDialog;
