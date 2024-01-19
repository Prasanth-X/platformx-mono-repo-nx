import CloseSharpIcon from '@mui/icons-material/CloseSharp'
import NavigateBeforeOutlinedIcon from '@mui/icons-material/NavigateBeforeOutlined'
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import {
  Avatar,
  Box,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useComment } from '@platformx/authoring-apis'
import { RootState, addReply, hasResolved } from '@platformx/authoring-state'
import {
  ReplyIcon,
  capitalizeFirstLetter,
  useUserSession,
} from '@platformx/utilities'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CommentEditor from './CommentEditor'
import { CommentPopover } from './ContentReview.styles'
import { PreviewProps } from './ContentReview.types'
import { formatTimestamp, stringAvatar } from './helper'

const CommentPreview: React.FC<PreviewProps> = ({
  parentRef,
}: PreviewProps) => {
  const [enableEdit, setEnableEdit] = useState(false)
  const [replay, setReplay] = useState<string>('')
  const [selectedId, setSelectedId] = useState(0)
  const [open, setOpen] = useState(true)
  const dispatch = useDispatch()
  const { isReviewEnabled, selectedComment, comments } = useSelector(
    (state: RootState) => state.comment.commentInfo,
  )

  const [getSession] = useUserSession()
  const { userInfo } = getSession()
  const { handleCommentClick } = useComment()
  const username = `${userInfo.first_name} ${userInfo.last_name}`

  const resolveText = `Resolved By ${username}`
  const handleClose = () => {
    setOpen(false)
  }
  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      dispatch(addReply({ replyPayload: replay, comment: selectedComment }))
      setReplay('')
    }
  }
  const groupedComments: any = {}
  comments?.forEach((comment: any) => {
    if (!groupedComments[comment.elementId]) {
      groupedComments[comment.elementId] = []
    }
    groupedComments[comment.elementId].push(comment)
  })
  const findCommentId = (elementId: any, action = 'after') => {
    const id: any = Object.keys(groupedComments).findIndex((val, i) => {
      console.log('val', val, i, elementId)

      return val == elementId //val.commentId;
    })
    console.log('id', groupedComments[Object.keys(groupedComments)[id - 1]])
    return groupedComments[
      Object.keys(groupedComments)[action === 'prev' ? id - 1 : id + 1]
    ][0]
  }
  useEffect(() => {
    setOpen(
      Object.keys(selectedComment || {}).length > 0, //&& isCommentsPanelOpen
    )
  }, [selectedComment])

  if (!open) return <></>
  const isDisabled = () => {
    if (selectedComment) {
      if (
        groupedComments[selectedComment?.elementId || ''][
          groupedComments[selectedComment?.elementId || '']?.length - 1
        ].commentId === selectedComment?.commentId
      ) {
        return false
      } else {
        return true
      }
    }
  }
  return (
    <CommentPopover
      open={open}
      anchorEl={parentRef.current}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      disableScrollLock
    >
      <Card
        sx={{
          minWidth: '300px',
          maxWidth: '350px',
          padding: '10px',
          pt: '0px',
          pb: '0px',
        }}
      >
        {
          <>
            {!enableEdit && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottomWidth: '1px',
                    borderTop: 0,
                    borderLeft: 0,
                    borderRight: 0,
                    borderStyle: 'solid',
                    borderColor: '#D9DBE9',
                  }}
                >
                  <Box>
                    <IconButton
                      aria-label="previous"
                      onClick={(event: any) => {
                        Number(selectedComment.elementId) - 1 > 0 &&
                          (document
                            .getElementById(
                              findCommentId(
                                Number(selectedComment.elementId).toString(),
                                'prev',
                              ).elementId,
                            )
                            ?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            }),
                          setTimeout(() => {
                            handleCommentClick(
                              event,
                              findCommentId(
                                Number(selectedComment.elementId).toString(),
                                'prev',
                              ).elementId,
                              findCommentId(
                                Number(selectedComment.elementId).toString(),
                                'prev',
                              ).commentId,
                            )
                          }, 500))
                      }}
                    >
                      <NavigateBeforeOutlinedIcon
                        sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
                      />
                    </IconButton>
                    <IconButton
                      aria-label="next"
                      onClick={(event: any) => {
                        Number(selectedComment.elementId) + 1 <=
                          comments.length &&
                          (document
                            .getElementById(
                              findCommentId(
                                Number(selectedComment.elementId).toString(),
                              ).elementId,
                            )
                            ?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'start',
                            }),
                          setTimeout(() => {
                            handleCommentClick(
                              event,
                              findCommentId(
                                Number(selectedComment.elementId).toString(),
                              ).elementId,
                              findCommentId(
                                Number(selectedComment.elementId).toString(),
                              ).commentId,
                            )
                          }, 500))
                      }}
                    >
                      <NavigateNextOutlinedIcon
                        sx={{ color: 'rgba(0, 0, 0, 0.3)' }}
                      />
                    </IconButton>
                  </Box>
                  <Box>
                    <Tooltip
                      title={
                        selectedComment.isResolved ? 'Resolved' : 'Resolve'
                      }
                    >
                      <IconButton aria-label="settings" sx={{ padding: '6px' }}>
                        <TaskAltIcon
                          onClick={() => {
                            !selectedComment?.isResolved &&
                              dispatch(
                                addReply({
                                  replyPayload: resolveText,
                                  comment: selectedComment,
                                }),
                              )
                            dispatch(
                              hasResolved({
                                hasResolve: true,
                                commentId: selectedComment.commentId,
                              }),
                            )
                          }}
                          sx={{
                            color: selectedComment.isResolved
                              ? 'green'
                              : 'rgba(0, 0, 0, 0.5)',
                            width: '20px',
                            height: '20px',
                          }}
                        />
                      </IconButton>
                    </Tooltip>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClose}
                      onMouseDown={() => {}}
                      edge="end"
                      sx={{ paddingLeft: '5px' }}
                    >
                      <CloseSharpIcon
                        sx={{
                          color: 'rgba(0, 0, 0, 0.5)',
                          width: '21px',
                          height: '21px',
                        }}
                      ></CloseSharpIcon>
                    </IconButton>
                  </Box>
                </Box>
              </>
            )}
            {!enableEdit && (
              <>
                <>
                  <Box
                    mt={1}
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center">
                      <Tooltip
                        title={selectedComment?.reviewer || ''}
                        placement="left-end"
                        sx={{ cursor: 'pointer' }}
                      >
                        <span style={{ cursor: 'pointer' }}>
                          <Avatar
                            {...stringAvatar(selectedComment?.reviewer || '')}
                            // sx={{ width: 24, height: 24 }}
                          />
                        </span>
                      </Tooltip>
                      <Typography
                        variant="p4semibold"
                        color="black"
                        sx={{
                          padding: '8.5px 14px',
                          marginTop: '0px',
                          marginBottom: '0px',
                        }}
                      >
                        {capitalizeFirstLetter(selectedComment?.reviewer)}
                        {/* {selectedComment?.content} */}
                      </Typography>
                      <Typography
                        variant="h7semibold"
                        // color='textSecondary'
                        // marginLeft={5}
                        textAlign="right"
                        sx={{
                          position: 'absolute',
                          right: '10px',
                          color: '#6E7191',
                        }}
                      >
                        {formatTimestamp(selectedComment?.timeStamp || '')}
                      </Typography>
                    </Box>
                    {/* <Box>
                      <IconButton
                        aria-label='settings'
                        onClick={() => {
                          setEnableEdit(!enableEdit);
                          setSelectedId(selectedComment.commentId);
                        }}
                      >
                        <EditOutlinedIcon fontSize='small' />
                      </IconButton>
                    </Box> */}
                  </Box>
                  <Box sx={{ ml: '35px ', padding: '8.5px 14px', pt: '0px' }}>
                    <Typography
                      variant="caption"
                      color="black"
                      sx={{
                        // padding: '8.5px 14px',
                        pt: '0px',

                        fontSize: '14px',
                      }}
                    >
                      {selectedComment?.content}
                    </Typography>
                  </Box>
                  {/* <Box my={1} ml={5}>
                    <Typography
                      variant='caption'
                      style={{ wordWrap: 'break-word', overflow: 'hidden' }}
                    >
                      {selectedComment.reply?.content}
                    </Typography>
                  </Box> */}
                </>
                <>
                  {selectedComment?.reply?.map((selectedComment, index) => (
                    <>
                      {' '}
                      <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                      >
                        <Box display="flex" alignItems="center">
                          <Tooltip
                            title={selectedComment?.reviewer}
                            placement="left-end"
                            sx={{ cursor: 'pointer' }}
                          >
                            <span style={{ cursor: 'pointer' }}>
                              <Avatar
                                // sx={{ width: 24, height: 24 }}

                                {...stringAvatar(selectedComment?.reviewer)}
                              />
                            </span>
                          </Tooltip>
                          <Typography
                            variant="p4semibold"
                            color="black"
                            // marginLeft={1}
                            sx={{
                              padding: '8.5px 14px',
                              marginTop: '0px',
                              marginBottom: '0px',
                            }}
                          >
                            {capitalizeFirstLetter(
                              selectedComment?.reviewer, //userInfo.first_name
                            )}
                          </Typography>
                          <Typography
                            variant="h7semibold"
                            //color='textSecondary'
                            // marginLeft={5}
                            textAlign="right"
                            sx={{
                              position: 'absolute',
                              right: '10px',
                              color: '#6E7191',
                            }}
                          >
                            {formatTimestamp(selectedComment?.timeStamp)}
                          </Typography>
                        </Box>
                        {/* <Box>
                      <IconButton
                        aria-label='settings'
                        onClick={() => {
                          setEnableEdit(!enableEdit);
                          setSelectedId(selectedComment.commentId);
                        }}
                      >
                        <EditOutlinedIcon fontSize='small' />
                      </IconButton>
                    </Box> */}
                      </Box>
                      <Box
                        sx={{ ml: '35px ', padding: '8.5px 14px', pt: '0px' }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            // padding: '8.5px 14px',
                            pt: '0px',
                            wordWrap: 'break-word',
                            overflow: 'hidden',
                            fontSize: '14px',
                          }}
                        >
                          {/* {selectedComment.content} */}
                          {selectedComment.content}
                        </Typography>
                      </Box>
                    </>
                  ))}
                </>
              </>
            )}
            {enableEdit && selectedId === selectedComment.commentId && (
              <CommentEditor
                comment={selectedComment}
                onCancel={setEnableEdit}
              ></CommentEditor>
            )}
          </>
        }

        {!enableEdit && (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems={'center'}
            mt="10px"
            sx={{
              borderTop: '1px solid #D9DBE9',
              padding: '10px 0px',
              pb: '0px',
            }}
          >
            {/* <Box>
              <Tooltip
                title={userInfo.first_name}
                placement='left-end'
                sx={{ cursor: 'pointer' }}
              >
                <span style={{ cursor: 'pointer' }}>
                  <Avatar
                    sx={{ width: 20, height: 20 }}
                    // sx={{
                    //   height: '30px !important',
                    //   width: '30px !important',
                    // }}
                    {...stringAvatar(userInfo.first_name)}
                  />
                </span>
              </Tooltip>
            </Box> */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {' '}
              <FormControl variant="filled" sx={{ width: '100%' }}>
                <TextField
                  id="filled-adornment-password"
                  variant="standard"
                  // type={'text'}
                  placeholder="Reply"
                  disabled={
                    isDisabled()
                    // commentCountLength?.length ===
                    //   selectedComment?.prevCommentCount + 2 &&
                    // selectedComment.isResolved
                  }
                  size="small"
                  // multiline
                  sx={{
                    fontSize: '14px',
                    '.Platform-x-InputBase-root': {
                      fontSize: '14px',
                      // cursor: 'not-allowed !important',
                    },
                    '.css-1wuzo6d-MuiInputBase-input-MuiInput-input.Mui-disabled':
                      {
                        cursor: 'not-allowed !important',
                      },
                  }}
                  minRows={1}
                  value={replay}
                  onChange={(e) => {
                    setReplay(e.target.value)
                  }}
                  onKeyDown={handleKeyDown}
                  maxRows={10}
                  InputProps={{
                    disableUnderline: true,
                    // endAdornment: <ArrowCircleUpIcon />,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          disabled={replay ? false : true}
                          onClick={() => {
                            dispatch(
                              addReply({
                                replyPayload: replay,
                                comment: selectedComment,
                              }),
                            )
                            setReplay('')
                          }}
                          onMouseDown={() => {}}
                          edge="end"
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pt: '0px',
                          }}
                        >
                          <img
                            src={ReplyIcon}
                            style={{
                              filter: replay ? '' : 'grayscale(90%)',
                            }}
                          ></img>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Box>
            <Box></Box>
          </Box>
        )}
      </Card>
    </CommentPopover>
  )
}

export default CommentPreview
