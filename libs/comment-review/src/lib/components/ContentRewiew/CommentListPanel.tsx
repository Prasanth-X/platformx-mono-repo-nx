import { IconButton, Typography } from '@mui/material';

import Box from '@mui/material/Box';

import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import * as React from 'react';

import { RootState, setIsCommentPanelOpen } from '@platformx/authoring-state';
import { useDispatch, useSelector } from 'react-redux';
import CommentList from './CommentList';
import { StyledDrawer } from './ContentReview.styles';
import DefaultCommentList from './DefaultCommentList';
const CommentListPanel: React.FC = () => {
  const { isCommentsPanelOpen, comments } = useSelector(
    (state: RootState) => state.comment.commentInfo
  );
  const dispatch = useDispatch();

  return (
    <div id="pannel">
      <React.Fragment key={'right'}>
        <StyledDrawer
          PaperProps={{
            sx: {
              height: 'calc(100% - 64px)',
              bottom: 10,
              top: 64,
              boxShadow: 'none',
              borderLeft: 'solid 1px #D9DBE9',
            },
          }}
          open={isCommentsPanelOpen}
          sx={{
            // width: drawerWidth,
            flexShrink: 0,
            '& .MuiPaper-root': {
              //   width: drawerWidth,
              boxSizing: 'border-box',
              //   boxShadow: 'none',
              boxShadow: 'none',
              borderStyle: 'solid',
              borderWidth: '5px',
            },

            '& .MuiPaper-paper': {
              //   width: drawerWidth,
              boxSizing: 'border-box',
              //   boxShadow: 'none',
              boxShadow: 'none',
              borderStyle: 'solid',
              borderWidth: '5px',
            },
          }}
          hideBackdrop
          anchor={'right'}
          onClose={() => {
            dispatch(setIsCommentPanelOpen({ value: false }));
          }}
        >
          <Box
            sx={{ width: 250, height: '-webkit-fill-available' }}
            role="presentation"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '8px 15px',
                position: 'relative',
                backgroundColor: '#F7F7FC',
              }}
            >
              <Typography variant="p3semibold">Comments</Typography>
              <IconButton
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  position: 'absolute',
                  right: '7px',
                }}
                onClick={() => {
                  dispatch(setIsCommentPanelOpen({ value: false }));
                  // setIsReviewEnabled(true);
                }}
              >
                <CloseSharpIcon sx={{ width: '20px', height: '20px' }} />
              </IconButton>
            </Box>
            <Box sx={{ minHeight: '75vh' }}>
              {comments?.length > 0 ? (
                <CommentList comments={comments}></CommentList>
              ) : (
                <DefaultCommentList />
              )}
            </Box>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained'> Summit Review</Button>
            </Box> */}
          </Box>
        </StyledDrawer>
      </React.Fragment>
    </div>
  );
};

export default CommentListPanel;
