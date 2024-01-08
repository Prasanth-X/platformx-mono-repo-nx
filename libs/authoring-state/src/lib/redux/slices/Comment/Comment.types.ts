export type Reply = {
  content: string;
  reviewer: string;
  timeStamp: string;
};
export type ReviewComment = {
  content?: string;
  elementId?: string;
  commentId?: number;
  reviewer?: string;
  timeStamp?: string;
  isResolved?: boolean;
  hasMarkedAsRead?: boolean;
  reply?: Reply[];
  prevCommentCount?: number;
  resolvedBy?: string;
  reopenBy?: string;
};

export type CommentContextData = {
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
  contentType: string;
  contentTitle: string;
};
export type CommentData = {
  commentInfo: CommentContextData;
};
