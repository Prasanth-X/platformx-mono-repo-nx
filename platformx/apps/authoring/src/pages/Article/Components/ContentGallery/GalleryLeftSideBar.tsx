import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Badge,
  Box,
  Checkbox,
  Grid,
  ListItem,
  Typography,
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { nullToArray } from '../../../../utils/helperFunctions';

const GalleryLeftSideBar = ({
  categoriesdata,
  updateTagField,
  selectedTags,
  selectedTagCounts,
}) => {
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
  const findSelectedTag = (tag) => {
    if (selectedTags?.length > 0 && tag != '') {
      return selectedTags?.includes(tag);
    } else {
      return false;
    }
  };

  const getTagCount = () => {
    const { tags } = categoriesdata;
    if (tags.length > 0) {
      return tags.reduce((acc, item) => {
        if (selectedTags.includes(item)) acc += 1;
        return acc;
      }, 0);
    }
    return 0;
  };

  const tagCount = getTagCount();
  return (
    <Box>
      {categoriesdata?.tags?.length > 0 ? (
        <Accordion
          sx={{
            '.Platform-x-Paper-root.Platform-x-Paper-elevation': {
              borderRadius: '0px !important',
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
            sx={{
              '.Platform-x-Paper-root.Platform-x-Paper-elevation': {
                borderRadius: '0px !important',
              },
              '.Platform-x-AccordionSummary-content': {
                margin: '12px 0',
                '&.Mui-expanded': {
                  margin: '12px 0',
                },
              },
            }}
          >
            {tagCount > 0 ? (
              <Grid>
                <Typography
                  variant='h6medium'
                  sx={{
                    padding: { em: '0 0 0 16px' },
                  }}
                >
                  {categoriesdata.category}
                  <Badge
                    sx={{
                      margin: '0 0 0 1rem',
                    }}
                    badgeContent={tagCount}
                    color='error'
                  ></Badge>
                </Typography>
              </Grid>
            ) : (
              <Typography
                variant='h6medium'
                sx={{
                  padding: { em: '0 0 0 16px' },
                }}
              >
                {categoriesdata.category}
              </Typography>
            )}
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: { xs: '8px 16px 16px 16px', em: '8px 16px 16px 32px' },
              '.Platform-x-Paper-root.Platform-x-Paper-elevation': {
                borderRadius: '0px !important',
              },
            }}
          >
            {[...(categoriesdata?.tags || [])]
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
                          inputProps={{ id: categoriesdata.category }}
                        />
                      }
                      label={tag}
                      labelPlacement='start'
                      onChange={(e) => updateTagField(e)}
                      checked={nullToArray(selectedTags).includes(tag)}
                    />
                    {count === index1 + 1 &&
                      categoriesdata.tags.length > count && (
                        <Typography
                          onClick={() =>
                            setViewMoreTagCount(categoriesdata.tags.length)
                          }
                          variant='h7regular'
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
                        variant='h7regular'
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
          </AccordionDetails>
        </Accordion>
      ) : (
        ''
      )}
    </Box>
  );
};

export default GalleryLeftSideBar;
