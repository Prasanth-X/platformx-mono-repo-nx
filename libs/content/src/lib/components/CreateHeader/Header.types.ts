export type HeaderProps = {
  id?: string;
  hasPreviewButton: boolean;
  handleReturn: () => void;
  handlePublish?: () => void;
  handleSaveOrPublish: any;
  handelPreview?: () => void;
  editText?: string;
  createText?: string;
  toolTipText?: string;
  isQuiz?: boolean;
  hasPublishButton?: boolean;
  hasSaveButton?: boolean;
  publishText?: string;
  saveText?: string;
  previewText?: string;
  saveVariant?: string;
  showPreview?: boolean;
  category: string;
  subCategory: string | string[];
  workflow?: any;
  hasTimerState?: boolean;
  lastModifiedDate?: string;
  setEnableWorkflowHistory?: (boolean) => void;
  createComment?: () => void;
  setIsFeatured?: (val: boolean) => void;
  isFeatured: boolean;
  commentInfo?: CommentType;
};
interface CommentType {
  setIsReviewEnabled: (isOpen: boolean) => void;
  setIsCommentPanelOpen: (isOpen: boolean) => void;
  isReviewEnabled: boolean;
  comments: any[];
}
