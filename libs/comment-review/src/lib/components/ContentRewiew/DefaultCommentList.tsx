import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { ReactComponent as CommentPlaceHolder } from '../../../src/assets/svg/CommentPlaceHolder.svg';
const DefaultCommentList = () => {
  return (
    <Box sx={{ minHeight: 'inherit' }}>
      <CommentPlaceHolder />
      <Box sx={{ display: 'flex', alignItems: 'center', padding: '20px' }}>
        <Typography variant='h6regular' sx={{ textAlign: 'center' }}>
          Give feedback, ask a question, or just leave a note of appreciation.
          Click on the comment icon to leave a comment.
        </Typography>
      </Box>
    </Box>
  );
};
export default DefaultCommentList;
