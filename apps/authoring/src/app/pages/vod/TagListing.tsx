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
import { useTranslation } from 'react-i18next';
import { nullToArray } from '../../utils/helperFunctions';

const TagListing = ({ categories, updateTagField, selectedTags }) => {
  const { t } = useTranslation();
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
    <>
      {categories?.tags?.length > 0 ? (
        <Box
          sx={{
            marginBottom: '15px',
            textTransform: 'capitalize',
          }}
        >
          <Typography variant='h6semibold'>{categories.category}</Typography>
          <List>
            {[...(categories?.tags || [])]
              .sort()
              ?.slice(0, count)
              ?.map((tag, index1) => {
                return (
                  <>
                    <ListItem
                      key={index1}
                      sx={{
                        display: 'inline-block',
                        width: 'auto',
                        padding: '0px',
                        marginBottom: '10px',
                      }}
                    >
                      <FormControlLabel
                        value={tag || ''}
                        className='vod-cat'
                        control={
                          <Checkbox
                            // checked={findSelectedTag(tag)}
                            icon={<CheckCircleOutlineIcon />}
                            checkedIcon={<CheckCircleOutlineIcon />}
                          />
                        }
                        label={tag}
                        labelPlacement='start'
                        onChange={(e) => updateTagField(e)}
                        checked={nullToArray(selectedTags).includes(tag)}
                      />

                      {count === index1 + 1 &&
                        categories.tags.length > count && (
                          <Typography
                            onClick={() =>
                              setViewMoreTagCount(categories.tags.length)
                            }
                            variant='h7regular'
                            component='span'
                            sx={{
                              color: '#4B9EF9',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              textTransform: 'capitalize',
                            }}
                          >
                            {t('view_more')}
                          </Typography>
                        )}
                      {count === index1 + 1 && isViewLess && (
                        <Typography
                          onClick={() => setViewLessTagCount(10)}
                          variant='h7regular'
                          component='span'
                          sx={{
                            color: '#4B9EF9',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            textTransform: 'capitalize',
                          }}
                        >
                          {t('view_less')}
                        </Typography>
                      )}
                    </ListItem>
                  </>
                );
              })}
            <Divider sx={{ borderColor: '#D9DBE9', paddingTop: '20px' }} />
          </List>
        </Box>
      ) : (
        ''
      )}
    </>
  );
};
export default TagListing;
