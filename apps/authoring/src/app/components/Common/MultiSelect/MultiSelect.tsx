import {
  Grid,
  Typography,
  Link,
  ListItem,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { Box } from '@mui/system';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { tagInlineCss } from '../tags/TagCommonCss';
import { nullToArray } from '../../../utils/helperFunctions';
import { siteSettingTagInlineCss, useStyles } from './MultiSelect.style';

const MultiSelect = ({
  list = [],
  onPickerChange = null,
  containerStyle = {},
  defaultAmountOfItem = 10,
  title = '',
  mobileAmountOfItem = 5,
  value = [],
}) => {
  const [amountOfItem, setAmountOfItem] = useState<number>(
    window.innerWidth <= 390 ? mobileAmountOfItem : defaultAmountOfItem
  );
  const [renderList, setRenderList] = useState(list);
  useEffect(() => {
    if (value && value.length && list) {
      const cloneList = list.filter((item) => !value.includes(item));
      setRenderList([...value, ...cloneList]);
    } else {
      setRenderList(list);
    }
  }, [value, list]);

  // const [selectedTagList, setSelectedTagList] = useState<any[]>(selectedTags);
  const classes = useStyles();
  return (
    <>
      <style>{siteSettingTagInlineCss}</style>
      <Box sx={containerStyle}>
        <Typography variant={`h6medium`} className={classes.typo}>
          {title}
        </Typography>
        <Box className={classes.listContainer}>
          {renderList?.slice(0, amountOfItem).map((item, index) => {
            return (
              <ListItem key={`${index + 1}`} className={classes.listItem}>
                <FormControlLabel
                  value={item || ''}
                  className='vod-cat'
                  control={
                    <Checkbox
                      // checked={findSelectedTag(tag)}
                      icon={<CheckCircleOutlineIcon />}
                      checkedIcon={<CheckCircleOutlineIcon />}
                    />
                  }
                  label={item}
                  labelPlacement='start'
                  onChange={(e) => {
                    onPickerChange(e, item);
                  }}
                  checked={nullToArray(value).includes(item)}
                  sx={{ textTransform: 'capitalize' }}
                />
              </ListItem>
            );
          })}
          {renderList.length > defaultAmountOfItem && (
            <Typography
              onClick={() => {
                setAmountOfItem(
                  amountOfItem === renderList.length
                    ? defaultAmountOfItem
                    : renderList.length
                );
              }}
              variant='h7regular'
              className={classes.typoViewMoreOrLess}
            >
              {amountOfItem === renderList.length
                ? t('view_less')
                : t('view_more')}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default MultiSelect;
