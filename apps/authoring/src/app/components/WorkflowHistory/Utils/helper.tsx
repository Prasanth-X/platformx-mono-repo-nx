import DraftIcon from '../../../assets/svg/WorkflowHistory/Draft.svg';
import EditorIcon from '../../../assets/svg/WorkflowHistory/Editor.svg';
import PublisherIcon from '../../../assets/svg/WorkflowHistory/Publish.svg';
import ReviewerIcon from '../../../assets/svg/WorkflowHistory/Review.svg';

export const icons: { [index: string]: string } = {
  request_review: DraftIcon,
  review: EditorIcon,
  approval: ReviewerIcon,
  publish: PublisherIcon,
};
