import { Button, Grid, TextField } from '@mui/material';
import { updateComment } from '@platformx/authoring-state';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CommentEditorProps } from './ContentReview.types';
const CommentEditor: React.FC<any> = ({
  comment,
  onCancel,
}: CommentEditorProps) => {
  const [editedComment, setEditedComment] = useState<string>(comment.content);
  // const { updateComment } = useCommentContext();
  const dispatch = useDispatch();

  const handleCommentChange = (e: any) => {
    setEditedComment(e.target.value);
  };

  const handleCancel = () => {
    setEditedComment(comment.content);
    onCancel(false);
  };

  const handleSave = () => {
    dispatch(
      updateComment({ comment: editedComment, commentId: comment?.commentId })
    );
    onCancel(false);
  };

  return (
    <Grid
      container
      // spacing={2}
      // p={2}
      sx={{
        padding: '16px',
        paddingTop: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pr: '0px',
        pb: '0px',
      }}
    >
      <Grid item xs={12} mb={1} sx={{ paddingRight: '16px' }}>
        <TextField
          label="Edit ReviewComment"
          value={editedComment}
          onChange={handleCommentChange}
          fullWidth
          multiline
          minRows={3}
        />
      </Grid>
      <Grid
        item
        container
        //justifyContent={'space-between'}
        sx={{
          padding: '10px',
          paddingTop: '0px',
          width: 'auto',
          pb: '0px',
        }}
      >
        <Grid item>
          <Button variant="outlined" onClick={handleCancel} sx={{ mr: '10px' }}>
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleSave} sx={{ ml: '10px' }}>
            Save
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CommentEditor;
