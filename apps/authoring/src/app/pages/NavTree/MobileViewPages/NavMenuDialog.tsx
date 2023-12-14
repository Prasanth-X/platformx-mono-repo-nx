import { Box, Divider } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import React from 'react';
import { Category, ContentAction } from '../../../utils/Enums/ContentType';
import useAccess from '../../../hooks/usePermissions/useAccess';
const Transition = React.forwardRef(function Transition(
  props: {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});
export default function NavMenuDialog({
  isOpen,
  setIsOpen,
  name,
  setIsDeleteOpen,
  setIsRenameOpen,
  setIsSubMenu,
  setOpenFirstPage,
  selectedMenu,
  setEditData,
  menuCount,
}) {
  const minCss = `
  .disabled {
   opacity: 0.38;
   pointer-events: none;
   cursor: default;
  }`;
  const { canAccessAction } = useAccess();
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      menuCount.current = 0;
    }, 500);
  };
  const onEditHandle = () => {
    setOpenFirstPage(true);
    setEditData(selectedMenu);
    handleClose();
  };

  return (
    <div>
      <style>{minCss}</style>
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
          },
        }}
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle sx={{ marginLeft: '13px' }}>{name}</DialogTitle>
        <Divider />
        <Box
          className={
            !canAccessAction(Category.Menu, '', ContentAction.Update) &&
            'disable'
          }
          onClick={() => {
            setIsRenameOpen(true);
            handleClose();
          }}
          sx={{ display: 'flex', marginLeft: '23px', p: '15px' }}
        >
          <Box sx={{ fontSize: '16px' }}>Rename</Box>
        </Box>
        <Box
          className={
            !canAccessAction(Category.Menu, '', ContentAction.Update) &&
            'disable'
          }
          onClick={onEditHandle}
          sx={{ display: 'flex', marginLeft: '23px', p: '15px' }}
        >
          <Box sx={{ fontSize: '16px' }}>Edit</Box>
        </Box>
        {/* <Box
          onClick={() => {
            handleClose();
          }}
          disa
          sx={{ display: 'flex', marginLeft: '23px', p: '15px' }}
        >
          <Box sx={{ fontSize: '16px' }}>Hide</Box>
        </Box> */}
        {menuCount.current == 0 ? (
          <Box
            onClick={() => {
              setIsSubMenu(true);
              handleClose();
            }}
            sx={{ display: 'flex', marginLeft: '23px', p: '15px' }}
          >
            <Box sx={{ fontSize: '16px' }}>Set as sub-menu</Box>
          </Box>
        ) : null}
        {/* <Box
          className={!canDuplicate && 'disable'}
          onClick={() => {
            handleClose();
          }}
          sx={{ display: 'flex', marginLeft: '23px', p: '15px' }}
        >
          <Box sx={{ fontSize: '16px' }}>Duplicate</Box>
        </Box> */}
        <Box
          onClick={() => {
            setIsDeleteOpen(true);
            handleClose();
          }}
          className={
            canAccessAction(Category.Menu, '', ContentAction.Delete)
              ? selectedMenu?.HomePage
                ? 'disabled'
                : ''
              : 'disable'
          }
          sx={{ display: 'flex', marginLeft: '23px', p: '15px' }}
        >
          <Box sx={{ fontSize: '16px' }}>Delete</Box>
        </Box>
      </Dialog>
    </div>
  );
}
