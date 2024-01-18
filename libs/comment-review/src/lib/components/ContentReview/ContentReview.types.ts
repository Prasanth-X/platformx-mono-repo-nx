export type ReviewComment = {
  content: string;
  elementId: string;
  commentId: number;
  reviewer: string;
  timeStamp: string;
  isResolved?: boolean;
  hasMarkedAsRead?: boolean;
  reply?: Reply[];
  prevCommentCount?: number;
  resolvedBy?: string;
  reopenBy?: string;
};
export type Reply = {
  content: string;
  reviewer: string;
  timeStamp: string;
};
export type WrapperProps = {
  elementId: string;
  scrollRef: React.RefObject<any>;
  comments?: ReviewComment[];
  children: React.ReactNode;
  workflow?: any;
};
export type CommentEditorProps = {
  comment: ReviewComment;
  onSave: (comments: ReviewComment, commentId: number) => void;
  onCancel: (cancel: boolean) => void;
};

export type CommentListProps = {
  comments: ReviewComment[];
  onCommentClick: (event: any, elementId: string, commentId: number) => void;
};

export type PreviewProps = {
  parentRef: React.RefObject<any>;
};
export interface CommentPanelProps {
  comments: ReviewComment[];
}
