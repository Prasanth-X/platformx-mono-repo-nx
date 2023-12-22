import { Box, Dialog, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import * as React from 'react';
import AdvanceSearchBar from './AdvanceSearch/AdvanceSearchBar';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function SearchModel({
  searchOpen,
  handleSearchClose,
  menuSelected = '',
}) {
  return (
    <Dialog
      open={searchOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleSearchClose}
      maxWidth="md"
      sx={{
        '& .Platform-x-Dialog-paper': {
          borderRadius: '8px',
          margin: '27px 15px',
          minWidth: { xs: 'calc(100% - 30px)', md: 'auto' },
        },
        borderRadius: '8px',
        '& .Platform-x-Dialog-container': {
          alignItems: 'flex-start',
        },
      }}
    >
      <Box className="searchModelMain">
        {searchOpen ? (
          <AdvanceSearchBar handleClose={handleSearchClose} />
        ) : null}
      </Box>
    </Dialog>
  );
}
