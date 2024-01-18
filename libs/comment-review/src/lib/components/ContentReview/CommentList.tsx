import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
} from '@mui/material';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useComment } from '@platformx/authoring-apis';
import { addReply, hasResolved } from '@platformx/authoring-state';
import { useUserSession } from '@platformx/utilities';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CommentListProps, ReviewComment } from './ContentReview.types';
import { formatTimestamp, stringAvatar } from './helper';

const PrimaryText = styled('div')(({ theme }) => ({
  wordWrap: 'break-word',

  marginBottom: '3px',

  ...theme.typography.body1,
}));

const SecondaryText = styled('div')(({ theme }) => ({
  wordWrap: 'break-word',

  ...theme.typography.caption,
  fontSize: '11px',
}));

const CommentList: React.FC<any> = ({ comments }: CommentListProps) => {
  const groupedComments: any = {};
  const { handleCommentClick } = useComment();
  const dispatch = useDispatch();

  const [items, setItems] = useState<ReviewComment>();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  const resolveText = `Resolved By ${username}`;
  const reopenText = `Reopened By ${username}`;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isReopenDisabled, setIsReopenDisabled] = useState(true);
  const handleMenuOpen = (event: any, comment: any) => {
    setAnchorEl(event.currentTarget);
    setItems(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Group comments by sectionId

  comments?.forEach((comment: any) => {
    if (!groupedComments[comment.elementId]) {
      groupedComments[comment.elementId] = [];
    }
    groupedComments[comment.elementId].push(comment);
  });
  const scrollToView = (elementId: any, commentId: any, event: any) => {
    document.getElementById(elementId)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setTimeout(() => {
      handleCommentClick(event, elementId, commentId);
    }, 500);
  };
  const commentCountLength = comments?.filter(
    (x: ReviewComment) => x.elementId === items?.elementId //&& x.isResolved === false
  );
  // useEffect(() => {
  //   console.log('reopen', isReopenDisabled);
  //   setIsReopenDisabled(
  //     commentCountLength?.length === items?.prevCommentCount + 2 &&
  //       items.isResolved
  //   );
  // }, [items]);
  const isDisabled = () => {
    if (items) {
      if (
        groupedComments[items?.elementId][
          groupedComments[items?.elementId]?.length - 1
        ].commentId === items?.commentId
      ) {
        return false;
      } else {
        return true;
      }
    }
  };
  return (
    <>
      {' '}
      <List>
        {Object.keys(groupedComments).map((elementId, index) => (
          <React.Fragment key={elementId}>
            {groupedComments[elementId].map((comment: ReviewComment) => (
              <Box
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: '#D9DBE9',
                  },
                }}
              >
                <ListItem
                  alignItems="flex-start"
                  // sx={{
                  //   cursor: 'pointer',
                  //   '&:hover': {
                  //     backgroundColor: ThemeConstants.OFF_WHITE_COLOR,
                  //   },
                  // }}
                  // onClick={(event: any) => {
                  //   scrollToView(comment.elementId, comment.commentId, event);
                  // }}
                >
                  <ListItemAvatar>
                    <Avatar
                      {...stringAvatar(comment?.reviewer)}
                      // sx={{ borderRadius: '10px' }}
                    />
                  </ListItemAvatar>
                  {/* <ListItemText
                    // primary={<PrimaryText>{comment.content}</PrimaryText>}
                    secondary={
                      <SecondaryText>{`${
                        comment.reviewer
                      } ${' '} ${formatTimestamp(
                        comment.timeStamp
                      )}`}</SecondaryText>
                    }
                  />{' '} */}
                  <ListItemSecondaryAction
                    sx={{ position: 'absolute', right: '0px', display: 'flex' }}
                  >
                    <Tooltip
                      title={comment.isResolved ? 'Resolved' : 'Resolve'}
                      placement="left-end"
                    >
                      <span
                        style={{
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <TaskAltIcon
                          onClick={() => {
                            !comment?.isResolved &&
                              dispatch(
                                addReply({
                                  replyPayload: resolveText,
                                  comment: comment,
                                })
                              );

                            !comment?.isResolved &&
                              dispatch(
                                hasResolved({
                                  hasResolve: true,
                                  commentId: comment.commentId,
                                })
                              );
                          }}
                          sx={{
                            color: comment.isResolved ? 'green' : 'grey',
                            width: '20px',
                            height: '20px',
                          }}
                        />
                      </span>
                    </Tooltip>
                    {/* </ListItemSecondaryAction>
                  <ListItemSecondaryAction> */}
                    <IconButton onClick={(e) => handleMenuOpen(e, comment)}>
                      <MoreVertIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Box
                  onClick={(event: any) => {
                    scrollToView(comment.elementId, comment.commentId, event);
                  }}
                >
                  <ListItemText
                    sx={{ paddingLeft: '16px' }}
                    primary={
                      <PrimaryText
                        sx={{ fontSize: '14px', fontWeight: 600, mb: '0px' }}
                      >
                        {comment.reviewer}
                        {/* {comment.content} */}
                      </PrimaryText>
                    }
                    secondary={
                      <SecondaryText sx={{ fontSize: '12px', fontWeight: 600 }}>
                        {' '}
                        {`${formatTimestamp(comment.timeStamp)}`}
                      </SecondaryText>
                    }
                  />{' '}
                  <Typography
                    variant="h6regular"
                    sx={{ paddingLeft: '16px', pb: '10px' }}
                  >
                    {comment.content}
                  </Typography>
                </Box>
                <Divider sx={{ borderColor: '#D9DBE9' }}></Divider>
              </Box>
            ))}
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: 'bottom',

                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',

                horizontal: 'right',
              }}
              sx={{
                '.Platform-x-Menu-paper': {
                  boxShadow: '0 10px 25px 0 rgba(0, 0, 0, 0.12);',
                  borderRadius: '5px',
                  // paddingLeft: '6px',
                  // paddingRight: '6px',
                },
              }}
            >
              {/* <MenuItem
                onClick={() => {
                  // markAsRead(true, comment.commentId);
                  handleMenuClose();
                }}
              >
                Delete
              </MenuItem> */}

              <MenuItem
                onClick={(event) => {
                  scrollToView(items?.elementId, items?.commentId, event);
                  handleMenuClose();
                }}
                disabled={isDisabled()}
              >
                Reply
              </MenuItem>
              {items?.isResolved && (
                <MenuItem
                  disabled={
                    // commentCountLength?.length ===
                    //   items?.prevCommentCount + 2 && items.isResolved
                    isDisabled()
                  }
                  onClick={() => {
                    dispatch(
                      addReply({ replyPayload: reopenText, comment: items })
                    );
                    dispatch(
                      hasResolved({
                        hasResolve: false,
                        commentId: items.commentId,
                      })
                    );
                    handleMenuClose();
                  }}
                >
                  Reopen
                </MenuItem>
              )}
            </Menu>
            {/* {index !== Object.keys(groupedComments).length - 1 && <Divider />} */}
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default CommentList;
