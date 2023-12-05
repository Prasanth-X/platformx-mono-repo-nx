import React, { createContext, useContext, useState } from 'react';
import { ReviewComment } from '../../components/ContentRewiew/ContentReview.types';
import useUserSession from '../../hooks/useUserSession/useUserSession';
type ContainerProps = {
  children: React.ReactNode; //👈 children prop typr
};

type CommentContextData = {
  comments: ReviewComment[];
  addComment: (content: string, sectionId: string) => void;
  updateComment: (content: string, commentId: number) => void;
  isCommentsPanelOpen: boolean;
  isReviewEnabled: boolean;
  setIsReviewEnabled: (isOpen: boolean) => void;
  setIsCommentPanelOpen: (isOpen: boolean) => void;
  setSelectedComment: (reviewComment: ReviewComment) => void;
  selectedComment: ReviewComment;
  addReply: (replay: string, comment: ReviewComment) => void;
  markAsRead: (isRead: boolean, commentId: number) => void;
  hasResolved: (hasResolve: boolean, commentId: number) => void;
  clearComment: () => void;
  getComment: (
    comments: ReviewComment[],
    contentType: string,
    contentName: string
  ) => void;
  commentCountLength: any;
  contenttype: string;
  contentTitle: string;
};

const CommentContext = createContext<CommentContextData>({
  comments: [],
  addComment: () => {},
  isCommentsPanelOpen: false,
  setIsCommentPanelOpen: () => {},
  updateComment: () => {},
  selectedComment: null,
  setSelectedComment: () => {},
  isReviewEnabled: false,
  setIsReviewEnabled: () => {},
  addReply: () => {},
  markAsRead: () => {},
  hasResolved: () => {},
  clearComment: () => {},
  getComment: () => {},
  commentCountLength: [],
  contenttype: '',
  contentTitle: '',
});

export const useCommentContext = () => useContext(CommentContext);
// export const CommentProvider: React.FC = ({children} ) => {

export const CommentProvider: React.FC = (props: ContainerProps) => {
  const [comments, setComments] = useState<ReviewComment[]>([]);
  const [isCommentsPanelOpen, setIsCommentPanelOpen] = useState(false);
  const [isReviewEnabled, setIsReviewEnabled] = useState(false);
  const [selectedComment, setSelectedComment] = useState<ReviewComment | null>(
    null
  );
  const [contenttype, setContentType] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const username = `${userInfo.first_name} ${userInfo.last_name}`;
  function removeDuplicates(arr) {
    return arr.filter((obj, index) => {
      return index === arr.findIndex((o) => obj.commentId === o.commentId);
    });
  }
  const getComment = (
    commentsNew: ReviewComment[],
    contentType,
    contentName
  ) => {
    //setComments(comments);
    setContentType(contentType);
    setContentTitle(contentName);
    if (contenttype === contentType && contentName === contentTitle) {
      setComments(removeDuplicates([...commentsNew, ...comments]));
    } else {
      setComments(commentsNew);
    }
  };

  const commentCountLength =
    comments &&
    comments.filter(
      (x: ReviewComment) => x.elementId === selectedComment?.elementId //&& x.isResolved === false
    );
  const addComment = (content: string, elementId: string) => {
    const commentCount = comments?.filter(
      (x: ReviewComment) => x.elementId === elementId
    );
    const newComment: ReviewComment = {
      content,
      elementId: elementId,
      commentId: new Date().getTime(),
      reviewer: username,
      timeStamp: new Date().toLocaleString(),
      isResolved: false,
      prevCommentCount: commentCount?.length,
    };
    setComments((prevComments: ReviewComment[]) => [
      ...prevComments,
      newComment,
    ]);
    setIsCommentPanelOpen(true);
  };
  const clearComment = () => {
    setComments([]);
  };
  const updateComment = (comment: string, commentId: number) => {
    setComments((prevComments: ReviewComment[]) =>
      prevComments.map((item) =>
        item.commentId === commentId
          ? {
              ...item,
              content: comment,
              timeStamp: new Date().toLocaleString(),
            }
          : item
      )
    );

    setSelectedComment((prevComments: ReviewComment) =>
      prevComments.commentId === commentId
        ? {
            ...prevComments,
            content: comment,
            timeStamp: new Date().toLocaleString(),
          }
        : prevComments
    );
    setIsCommentPanelOpen(true);
  };
  const markAsRead = (isRead: boolean, commentId: number) => {
    setComments((prevComments: ReviewComment[]) =>
      prevComments.map((item) =>
        item.commentId === commentId
          ? {
              ...item,
              hasMarkedAsRead: isRead,
            }
          : item
      )
    );
    setIsCommentPanelOpen(true);
  };

  const hasResolved = (hasResolve: boolean, commentId: number) => {
    console.log('id', commentId);
    setComments((prevComments: ReviewComment[]) =>
      prevComments.map((item) =>
        item.commentId === commentId
          ? {
              ...item,
              isResolved: hasResolve,
            }
          : item
      )
    );
    {
      // Object.keys(selectedComment || {}).length > 0 &&
      setSelectedComment((prevComments: ReviewComment) =>
        prevComments.commentId === commentId
          ? {
              ...prevComments,
              isResolved: hasResolve,
            }
          : prevComments
      );
    }
    setIsCommentPanelOpen(true);
  };

  const addReply = (replyPayload: string, comment: ReviewComment) => {
    const replyArr = [];
    const reply: any = {
      content: replyPayload,
      reviewer: username,
      timeStamp: new Date().toLocaleString(),
    };
    console.log('select', comment);
    setComments((prevComments: ReviewComment[]) =>
      prevComments.map((item) =>
        item.commentId === comment.commentId
          ? {
              ...item,
              reply:
                comment && comment.reply ? [...comment.reply, reply] : [reply],
              timeStamp: new Date().toLocaleString(),
            }
          : item
      )
    );

    const selected = {
      ...comment,
      reply: comment && comment.reply ? [...comment.reply, reply] : [reply],
    };

    setSelectedComment(selected);
    setIsCommentPanelOpen(true);
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        addComment,
        updateComment,
        isCommentsPanelOpen,
        setIsCommentPanelOpen,
        setSelectedComment,
        selectedComment,
        isReviewEnabled,
        setIsReviewEnabled,
        addReply,
        markAsRead,
        hasResolved,
        clearComment,
        getComment,
        commentCountLength,
        contenttype,
        contentTitle,
      }}
    >
      {props.children}
      {/* {children} */}
    </CommentContext.Provider>
  );
};
