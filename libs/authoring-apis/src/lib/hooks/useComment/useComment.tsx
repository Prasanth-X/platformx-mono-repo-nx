import { RootState, setSelectedComment } from '@platformx/authoring-state'
import { useUserSession } from '@platformx/utilities'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
export function useComment() {
  const [userInfo] = useUserSession()
  const dispatch = useDispatch()
  const { comments } = useSelector(
    (state: RootState) => state.comment.commentInfo,
  )
  const [selectedElementId, setSelectedElementId] = useState<string>('')
  const scrollToRef = useRef(null)

  const handleCommentClick = (
    event: any,
    elementId: string,
    commentId: number,
  ) => {
    const selectedComment: any =
      comments.find(
        (x: any) => x.elementId === elementId && x.commentId === commentId,
      ) || null

    const element = document.getElementById(elementId)

    const parentElement = element?.parentNode as HTMLElement

    if (parentElement) {
      const elements = document.querySelectorAll('.selected-comment')

      elements.forEach((element) => {
        element.classList.remove('selected-comment')
      })

      parentElement.classList.add('selected-comment')

      parentElement.scrollIntoView({ behavior: 'smooth' })
    }
    dispatch(setSelectedComment({ value: { ...selectedComment } }))
    setSelectedElementId(elementId)
  }

  return {
    comments,
    selectedElementId,
    scrollToRef,
    handleCommentClick,
  }
}
