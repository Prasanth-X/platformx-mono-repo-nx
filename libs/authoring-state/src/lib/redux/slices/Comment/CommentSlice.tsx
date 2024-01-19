/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-empty-function */

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CommentData, ReviewComment } from './Comment.types';

const initialState: CommentData = {
  commentInfo: {
    comments: [],
    addComment: () => { },
    isCommentsPanelOpen: false,
    setIsCommentPanelOpen: () => { },
    updateComment: () => { },
    selectedComment: {},
    setSelectedComment: () => { },
    isReviewEnabled: false,
    setIsReviewEnabled: () => { },
    addReply: () => { },
    markAsRead: () => { },
    hasResolved: () => { },
    clearComment: () => { },
    getComment: () => { },
    commentCountLength: [],
    contentType: '',
    contentTitle: '',
  },
};
function removeDuplicates(arr: any) {
  return arr.filter((obj: any, index: any) => {
    return index === arr.findIndex((o: any) => obj.commentId === o.commentId);
  });
}
// const [getSession] = useUserSession();
// const { userInfo } = getSession();
const storedUserInfoString: string | null = localStorage.getItem('userInfo');
let username = "";
if (storedUserInfoString !== null) {
  const userInfo: any = JSON.parse(storedUserInfoString);
  username = `${userInfo.first_name} ${userInfo.last_name}`;
}
export const commentSlice = createSlice({
  name: 'Comment',
  initialState,
  reducers: {
    getComment: (state, action: PayloadAction<any>) => {
      state.commentInfo.contentType = action.payload.contentType;
      state.commentInfo.contentTitle = action.payload.contentName;

      const incomingComments = Array.isArray(action.payload.commentsNew)
        ? action.payload.commentsNew
        : [];

      if (
        state.commentInfo.contentType === action.payload.contentType &&
        state.commentInfo.contentTitle === action.payload.contentName
      ) {
        state.commentInfo.comments = removeDuplicates([
          ...state.commentInfo.comments,
          ...incomingComments,
        ]);
      } else {
        state.commentInfo.comments = incomingComments;
      }
    },
    addComment: (state, action: PayloadAction<any>) => {
      const commentCount = state.commentInfo.comments?.filter(
        (x: ReviewComment) => x.elementId === action.payload.elementId
      );
      const newComment: ReviewComment = {
        content: action.payload.content,
        elementId: action.payload.elementId,
        commentId: new Date().getTime(),
        reviewer: username,
        timeStamp: new Date().toLocaleString(),
        isResolved: false,
        prevCommentCount: commentCount?.length,
      };
      state.commentInfo.comments = [...state.commentInfo.comments, newComment];
      state.commentInfo.isCommentsPanelOpen = true;
    },
    clearComment: (state, action: PayloadAction<any>) => {
      state.commentInfo.comments = [];
    },
    updateComment: (state, action: PayloadAction<any>) => {
      const temp = state.commentInfo.comments.map((item) =>
        item.commentId === action.payload.commentId
          ? {
            ...item,
            content: action.payload.comment,
            timeStamp: new Date().toLocaleString(),
          }
          : item
      );
      state.commentInfo.comments = temp;
      const selectedComment =
        state.commentInfo.selectedComment.commentId === action.payload.commentId
          ? {
            ...state.commentInfo.selectedComment,
            content: action.payload.comment,
            timeStamp: new Date().toLocaleString(),
          }
          : state.commentInfo.selectedComment;
      state.commentInfo.selectedComment = selectedComment;
      state.commentInfo.isCommentsPanelOpen = true;
    },
    markAsRead: (state, action: PayloadAction<any>) => {
      const temp = state.commentInfo.comments.map((item) =>
        item.commentId === action.payload.commentId
          ? {
            ...item,
            hasMarkedAsRead: action.payload.isRead,
          }
          : item
      );
      state.commentInfo.comments = temp;
      state.commentInfo.isCommentsPanelOpen = true;
    },
    hasResolved: (state, action: PayloadAction<any>) => {
      const temp = state.commentInfo.comments.map((item) =>
        item.commentId === action.payload.commentId
          ? {
            ...item,
            isResolved: action.payload.hasResolve,
          }
          : item
      );
      state.commentInfo.comments = temp;
      const selectedComment =
        state.commentInfo.selectedComment.commentId === action.payload.commentId
          ? {
            ...state.commentInfo.selectedComment,
            isResolved: action.payload.hasResolve,
          }
          : state.commentInfo.selectedComment;
      state.commentInfo.selectedComment = selectedComment;
      state.commentInfo.isCommentsPanelOpen = true;
    },
    addReply: (state, action: PayloadAction<any>) => {
      const reply: any = {
        content: action.payload.replyPayload,
        reviewer: username,
        timeStamp: new Date().toLocaleString(),
      };
      const temp = state.commentInfo.comments.map((item) =>
        item.commentId === action.payload.comment.commentId
          ? {
            ...item,
            reply: action.payload.comment?.reply
              ? [...action.payload.comment?.reply || {}, reply]
              : [reply],
            timeStamp: new Date().toLocaleString(),
          }
          : item
      );
      state.commentInfo.comments = temp;
      const selected = {
        ...action.payload.comment,
        reply: action.payload.comment?.reply
          ? [...action.payload.comment?.reply || {}, reply]
          : [reply],
      };
      state.commentInfo.selectedComment = selected;
      state.commentInfo.isCommentsPanelOpen = true;
    },
    setSelectedComment: (state, action: PayloadAction<any>) => {
      state.commentInfo.selectedComment = action.payload.value;
    },
    setIsCommentPanelOpen: (state, action: PayloadAction<any>) => {
      state.commentInfo.isCommentsPanelOpen = action.payload.value;
    },
    setIsReviewEnabled: (state, action: PayloadAction<any>) => {
      state.commentInfo.isCommentsPanelOpen = action.payload.value;
    },
  },
});
export const {
  getComment,
  addComment,
  clearComment,
  updateComment,
  markAsRead,
  hasResolved,
  addReply,
  setIsCommentPanelOpen,
  setSelectedComment,
  setIsReviewEnabled,
} = commentSlice.actions;

export default commentSlice.reducer;
