import { Popover, styled } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import useTheme from '@mui/material/styles/useTheme';
import { makeStyles } from '@mui/styles';

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    commentBoxMaine: {
      '&.commentArticle': {
        position: 'absolute',
        right: '-40px',
        top: 0,
        zIndex: 9,
      },
      '&.commentContent': {
        position: 'absolute',
        right: '10px',
        top: '15px',
        zIndex: 9,
      },
      '&.commentPage': {
        position: 'absolute',
        right: '0px',
        top: 0,
        zIndex: 9,
      },
    },
  };
});

export const StyledDrawer = styled(Drawer)(() => ({
  position: 'relative',
  marginLeft: 'auto',
  width: 200,
  '& .MuiBackdrop-root': {
    display: 'none',
  },
  '& .MuiDrawer-paper': {
    boxShadow: 'none',
    border: ' 1px solid lightgray',
  },
  overflowY: 'auto',
  maxHeight: '100vh',
  boxShadow: 'none',
}));

export const CommentPopover = styled(Popover)`
  .MuiPopover-root {
    pointer-events: auto;
  }
  .MuiPopover-modal {
    background-color: transparent;
  }
`;
