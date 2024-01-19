import {
  Box,
  Card,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material'
import { commentsApi, useComment } from '@platformx/authoring-apis'
import {
  RootState,
  addComment,
  getComment,
  setIsCommentPanelOpen,
  setSelectedComment,
} from '@platformx/authoring-state'
import {
  DefaultStateCommentIcon,
  SendIcon,
  ShowToastError,
  getCurrentLang,
} from '@platformx/utilities'
import { t } from 'i18next'
import { memo, useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CommentPopover, useCustomStyle } from './ContentReview.styles'
import { ReviewComment } from './ContentReview.types'
const CommentBox: React.FC<any> = ({
  elementId,
  comments,
  contentType,
  contentName,
  workflow,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const dispatch = useDispatch()
  const { isReviewEnabled } = useSelector(
    (state: RootState) => state.comment.commentInfo,
  )
  const [comment, setComment] = useState<string>('')
  const commentCount = comments?.filter(
    (x: ReviewComment) => x.elementId === elementId, //&& x.isResolved === false
  )
  const resolvedCommentCount = comments?.filter(
    (x: ReviewComment) => x.elementId === elementId && x.isResolved === true,
  )
  // const {
  //   addComment,
  //   setIsCommentPanelOpen,
  //   isReviewEnabled,
  //   getComment,
  //   setSelectedComment,
  // } = useCommentContext();
  const { handleCommentClick } = useComment()

  const handleAddComment = (comment: string, elementId: string) => {
    dispatch(addComment({ content: comment, elementId: elementId }))
    setAnchorEl(null)
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      dispatch(addComment({ content: comment, elementId: elementId }))
      setAnchorEl(null)
    }
  }

  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (commentCount?.length > 0) {
      //setIsCommentPanelOpen(true);
    }
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [highlighted, setHighlighted] = useState(false)

  const handleInputChange = (e: any) => {
    setComment(e.target.value)
    if (e.target.value.length > 0) {
      setHighlighted(true)
    } else {
      setHighlighted(false)
    }
  }
  //Get Comments
  const commentDetails = async () => {
    const currentLanguage = getCurrentLang()
    dispatch(setIsCommentPanelOpen({ value: false }))
    // const temp: ReviewComment[] = [];
    // getComment(temp);
    try {
      const response: any = await commentsApi.getComment({
        document_path: `/content/documents/hclplatformx/${currentLanguage}/${contentType}/${contentName}`,
      })
      const commentsData: ReviewComment[] =
        response?.authoring_getReviewComments[0]?.reviewer_comments[0] || []
      dispatch(
        getComment({
          commentsNew: commentsData,
          contentType: contentType[0],
          contentName: contentName,
        }),
      )
    } catch (err: any) {
      ShowToastError(t('api_error_toast'))
    }
  }
  useEffect(() => {
    dispatch(setSelectedComment({ value: null }))
    if (contentType && contentName) {
      commentDetails()
    } else {
      const commentsData: ReviewComment[] = []
      dispatch(
        getComment({
          commentsNew: commentsData,
          contentType: contentType[0],
          contentName: contentName,
        }),
      )
    }
  }, [contentType, contentName])

  const groupedComments: any = {}
  comments?.forEach((comment: any) => {
    if (!groupedComments[comment.elementId]) {
      groupedComments[comment.elementId] = []
    }
    groupedComments[comment.elementId].push(comment)
  })
  const handleCommentOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (
      commentCount?.length > 0 &&
      !groupedComments[elementId][groupedComments[elementId]?.length - 1]
        .isResolved
    ) {
      console.log(
        'group comment',
        groupedComments[elementId][groupedComments[elementId]?.length - 1],
      )
      handleCommentClick(
        event,
        elementId,
        groupedComments[elementId][groupedComments[elementId]?.length - 1]
          .commentId,
      )
    } else {
      handleClick(event)
    }
  }
  const pageUrl = new URL(window.location.href)
  console.log('url123', pageUrl.pathname.includes('/edit-page'))
  const classes = useCustomStyle()
  return (
    <>
      {isReviewEnabled && (
        <>
          <div
            className={`${classes.commentBoxMaine} ${
              pageUrl.pathname.includes('/edit-page')
                ? 'commentPage'
                : contentType[0] === 'article'
                ? 'commentArticle'
                : 'commentContent'
            }`}
            // style={{ position: 'absolute', right: '-40px', top: 0, zIndex: 9 }}
          >
            {/* {resolvedCommentCount?.length > 0 && (
              <Badge
                badgeContent={resolvedCommentCount?.length}
                color='success'
              ></Badge>
            )} */}

            {/* <Badge badgeContent={commentCount?.length} color='info'> */}
            <IconButton
              // sx={{ position: 'absolute', top: 0, left: 0, zIndex: 2000 }}
              aria-label="chat"
              onClick={
                //handleClick
                handleCommentOpen
              }
              sx={{ position: 'relative' }}
            >
              {commentCount?.length > 0 ? (
                <Box>
                  <span
                    color="error"
                    style={{
                      display: 'inline-block',
                      marginLeft: ' 5px',
                      marginRight: '5px',
                      marginBottom: '-2px',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: '7px',
                      right: '3px',
                      zIndex: 9,
                      height: '8px',
                      width: '8px',
                      backgroundColor: '#D32F2F',
                    }}
                  >
                    {' '}
                  </span>
                  <img
                    src={DefaultStateCommentIcon}
                    height="24px"
                    width="24px"
                  ></img>
                </Box>
              ) : (
                <img
                  src={DefaultStateCommentIcon}
                  height="24px"
                  width="24px"
                ></img>
              )}
              {/* <ChatBubbleOutlineOutlinedIcon color='info'></ChatBubbleOutlineOutlinedIcon> */}
            </IconButton>
            {/* </Badge> */}
          </div>
          <CommentPopover
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <Card
              sx={{ minWidth: '250px', maxWidth: '275px', padding: '10px' }}
            >
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
              >
                <FormControl variant="filled">
                  <OutlinedInput
                    id="filled-adornment-password"
                    type={'text'}
                    placeholder="Add comment"
                    size="small"
                    multiline
                    minRows={1}
                    maxRows={10}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => {
                            handleAddComment(comment, elementId)
                          }}
                          onMouseDown={() => {}}
                          disabled={comment?.length === 0}
                          edge="end"
                        >
                          <img
                            src={SendIcon}
                            color={highlighted ? 'primary' : 'disabled'}
                          ></img>
                          {/* <SendIcon
                            color={highlighted ? 'primary' : 'disabled'}
                          /> */}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <Box></Box>
              </Box>
            </Card>
          </CommentPopover>
        </>
      )}
    </>
  )
}
export default memo(CommentBox)
