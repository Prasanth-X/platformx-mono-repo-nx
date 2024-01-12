import { Typography } from '@mui/material'
import Box from '@mui/material/Box'
import { CommentPlaceHolder } from '@platformx/utilities'
const DefaultCommentList = () => {
  return (
    <Box sx={{ minHeight: 'inherit' }}>
      <img src={CommentPlaceHolder}></img>
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <Typography variant="h6regular" sx={{ textAlign: 'center' }}>
          Give feedback, ask a question, or just leave a note of appreciation.
          Click on the comment icon to leave a comment.
        </Typography>
      </Box>
    </Box>
  )
}
export default DefaultCommentList
