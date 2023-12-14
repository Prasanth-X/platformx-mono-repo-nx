import { Box, TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeConstants } from '@platformx/utilities';
import { formatUrl } from '../../utils/helperFunctions';
//import { updateField } from '../../articles/Actions';

const useStyles = makeStyles({
  customTextField: {
    '& input::placeholder': {
      fontSize: '28px',
      color: '#ced3d9',
      fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
    },
  },
});

export default function Title({
  updateField,
  titledata,
  existingPage,
  id,
  handleEnableArticlePreview,
}) {
  const { t } = useTranslation();
  const [title, setTitle] = useState(titledata);
  const classes = useStyles();
  const handleTitleChange = (e) => {
    //setTitle(e.target.value);
    //const url = formatUrl(e.target.value)
    const newVal = e.target.value.trim();
    if (newVal) {
      const url = formatUrl(newVal);
      let updatedObj = {};
      if (id && existingPage !== url) {
        updatedObj = {
          Title: newVal,
        };
      } else {
        updatedObj = {
          Title: newVal,
          Page: url,
          CurrentPageURL: url,
        };
      }
      updateField(updatedObj); //onBlur
    }
    // dispatch(updateField('Page',e.target.value, state.currentArticle.CurrentPageURL));
  };

  const handleChange = (e) => {
    const newVal = e.target.value;
    setTitle(newVal);
    handleEnableArticlePreview('title', newVal);
  };

  useEffect(() => {
    if (titledata) {
      setTitle(titledata);
    }
  }, [titledata]);
  return (
    <Box
      sx={{
        fontSize: '28px',
        paddingLeft: { xs: '32px', sm: '62px', md: '82px' },
        paddingRight: { xs: '32px', sm: '62px', md: '82px' },
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'white',
      }}
    >
      <TextField
        classes={{ root: classes.customTextField }}
        variant="standard" // <== changed this
        margin="normal"
        required
        fullWidth
        inputProps={{ style: { fontSize: '28px' }, maxLength: 350 }}
        id="title"
        name="title"
        autoComplete="title"
        autoFocus
        onBlur={handleTitleChange}
        onChange={handleChange}
        placeholder={t('title')}
        InputProps={{
          disableUnderline: true, // <== added this
        }}
        value={title || ''}
        sx={{
          '.Platform-x-InputBase-input': {
            textTransform: 'capitalize',
          },
        }}
      />
    </Box>
  );
}
