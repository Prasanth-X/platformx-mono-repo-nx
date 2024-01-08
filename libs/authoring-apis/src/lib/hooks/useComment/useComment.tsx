import { useRef, useState } from 'react';
// import { useCommentContext } from '../../context/CommentsContext/CommentsContext';
export function useComment() {
  // const { comments, setSelectedComment } = useCommentContext();

  const [selectedElementId, setSelectedElementId] = useState<string>('');
  const scrollToRef = useRef(null);

  const handleCommentClick = (
    event: any,
    elementId: string,
    commentId: number
  ) => {
    // const selectedComment: ReviewComment =
    //   comments.find(
    //     (x: ReviewComment) =>
    //       x.elementId === elementId && x.commentId === commentId
    //   ) || null;

    const element = document.getElementById(elementId);

    const parentElement = element?.parentNode as HTMLElement;

    if (parentElement) {
      const elements = document.querySelectorAll('.selected-comment');

      elements.forEach((element) => {
        element.classList.remove('selected-comment');
      });

      parentElement.classList.add('selected-comment');

      parentElement.scrollIntoView({ behavior: 'smooth' });
    }
    // setSelectedComment({ ...selectedComment });
    console.log('check scroll', elementId);
    setSelectedElementId(elementId);
  };

  return {
    // comments,
    selectedElementId,
    scrollToRef,
    handleCommentClick,
  };
}
