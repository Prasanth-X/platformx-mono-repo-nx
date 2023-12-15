import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {
  Box,
  Checkbox,
  Divider,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

const ArticleTagCategory = ({ categories, updateTagField, selectedTags }) => {
  const [count, setCount] = useState(10);
  const [isViewLess, setIsViewLess] = useState(false);
  const findSelectedTag = (tag) => {
    if (selectedTags?.length > 0 && tag != '') {
      return selectedTags?.includes(tag);
    } else {
      return false;
    }
  };
  const setViewMoreTagCount = (tagLength) => {
    setCount(tagLength);
    setIsViewLess(true);
  };
  const setViewLessTagCount = (tagLength) => {
    setCount(tagLength);
    setIsViewLess(false);
  };
  return (
    <Box
      sx={{
        marginBottom: '30px',
        textTransform: 'capitalize',
      }}
    >
      <Typography variant='h5bold' component='h5' sx={{ color: '#000000' }}>
        {categories.category}
      </Typography>
      <List>
        {[...(categories?.tags || [])]
          .sort()
          ?.slice(0, count)
          ?.map((tag, index1) => {
            return (
              <ListItem
                key={index1}
                sx={{
                  display: 'inline-block',
                  width: 'auto',
                  padding: '0px',
                  marginBottom: '12px',
                }}
              >
                <FormControlLabel
                  value={tag || ''}
                  className='vod-cat'
                  control={
                    <Checkbox
                      checked={findSelectedTag(tag)}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleOutlineIcon />}
                    />
                  }
                  label={tag}
                  labelPlacement='start'
                  onChange={(e) => updateTagField(e)}
                />
                {count === index1 + 1 && categories.tags.length > count && (
                  <Typography
                    onClick={() => setViewMoreTagCount(categories.tags.length)}
                    variant='h6medium'
                    sx={{
                      color: '#374fd5',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    View More
                  </Typography>
                )}
                {count === index1 + 1 && isViewLess && (
                  <Typography
                    onClick={() => setViewLessTagCount(10)}
                    variant='h6medium'
                    sx={{
                      color: '#374fd5',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                  >
                    View Less
                  </Typography>
                )}
              </ListItem>
            );
          })}
        <Divider sx={{ paddingTop: '30px' }} />
      </List>
    </Box>
  );
};
export default ArticleTagCategory;
