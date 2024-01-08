import styled from 'styled-components';

/* eslint-disable-next-line */
export interface CommentReviewProps {}

const StyledCommentReview = styled.div`
  color: pink;
`;

export function CommentReview(props: CommentReviewProps) {
  return (
    <StyledCommentReview>
      <h1>Welcome to CommentReview!</h1>
    </StyledCommentReview>
  );
}

export default CommentReview;
