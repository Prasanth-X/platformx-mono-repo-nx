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
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  convertToLowerCase,
  nullToArray,
  nullToObject,
} from '../../../utils/helperFns';

interface TagListingProps {
  categories?: any;
  updateTagField?: any;
  selectedTags?: any;
  isPublishModal?: any;
}
const XTagListing = (props: TagListingProps) => {
  const { t } = useTranslation();
  const {
    categories = {},
    selectedTags = [],
    updateTagField,
    isPublishModal,
  } = nullToObject(props);

  const [count, setCount] = useState(10);
  const [isViewLess, setIsViewLess] = useState(false);

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
              ?.slice(0, count)
              ?.map((tag, index1) => {
                return (
                  <ListItem
                    key={convertToLowerCase(`${index1}categories-kjdj`)}
                    sx={{
                      display: isPublishModal ? 'block' : 'inline-block',
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
                      onChange={(e) => updateTagField(e, categories)}
                      checked={nullToArray(selectedTags)?.includes(tag || '')}
                    />
                    {count === index1 + 1 && categories.tags.length > count && (
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
export default React.memo(XTagListing);
