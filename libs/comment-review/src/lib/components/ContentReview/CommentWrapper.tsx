import { RootState } from '@platformx/authoring-state';
import { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import CommentBox from './CommentBox';
import CommentPreview from './CommentPreview';
import { WrapperProps } from './ContentReview.types';
const CommentWrapper: React.FC<WrapperProps> = ({
  children,
  scrollRef,
  elementId,
  workflow,
}: WrapperProps) => {
  const { selectedComment, comments } = useSelector(
    (state: RootState) => state.comment.commentInfo
  );
  const popOverRef = useRef(null);
  const pageUrl = new URL(window.location.href);
  console.log('pageUrl', pageUrl);
  const arr = pageUrl.searchParams?.get('page')?.split('/') || [];
  const pathnm = `${arr[arr.length - 1]}`; //`${arr[6]}/${arr[7]}` || '';
  const contentName = useRef(
    pageUrl.searchParams.get('path')
      ? (pageUrl.searchParams.get('path') as string)
      : ''
  );
  const contentType = useRef(
    pageUrl.pathname
      .split('/')
    [pageUrl.pathname.split('/').length - 1].split('-')
      .slice(-1) || ''
  );
  const isValid = Object.keys(selectedComment || {}).length > 0;

  return (
    <div id={elementId} style={{ position: 'relative' }}>
      <div ref={popOverRef}></div>

      <CommentBox
        elementId={elementId}
        comments={comments}
        contentType={contentType.current}
        contentName={
          pageUrl.pathname.includes('/edit-page') ? pathnm : contentName.current
        }
        workflow={workflow}
      ></CommentBox>
      {isValid &&
        selectedComment &&
        elementId === selectedComment.elementId && (
          <CommentPreview parentRef={popOverRef}></CommentPreview>
        )}

      {children}
    </div>
  );
};
export default memo(CommentWrapper);
