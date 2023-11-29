import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { convertToLowerCase, nullToObject } from '../../utils/helperFunctions';

const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const CommonMobileDialogBox = (props: any = {}) => {
  const { t } = useTranslation();
  const {
    listItem = {},
    arrayData = [],
    isOptionEnable = false,
    handleUserSelectData,
  } = nullToObject(props);

  const [open, setOpen] = React.useState(false);
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

  /**
   * close popUp and pass data
   * @param ele object
   * @param option object
   */
  const onSelectUserOption = (ele = {}, option = {}) => {
    handleUserSelectData(ele, option);
    handleClose(); //close popUp
  };

  return (
    <div>
      <style>{styles}</style>
      <MoreVertIcon
        onClick={
          !isOptionEnable
            ? (e) => handleClickOpen()
            : () => {
                console.log('Clicked');
              }
        }
      />
      <Dialog
        sx={{
          display: { sm: 'none' },
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
          },
        }}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle className='singlebr_vod'>{listItem.Title}</DialogTitle>
        {arrayData.map((ele, index) => {
          return (
            <React.Fragment
              key={convertToLowerCase(`${index}arrayData-key-jdjud`)}
            >
              <Box
                sx={{ display: 'flex', alignItems: 'stretch', margin: '12px' }}
                onClick={() => onSelectUserOption(ele, listItem)}
              >
                <Box
                  sx={{
                    marginTop: '3px',
                    marginRight: '0.625rem',
                  }}
                >
                  {React.cloneElement(ele.icon)}
                </Box>
                <Box sx={{ fontSize: '16px' }}>{t(ele.name.toLowerCase())}</Box>
              </Box>
            </React.Fragment>
          );
        })}
      </Dialog>
    </div>
  );
};

export default React.memo(CommonMobileDialogBox);
