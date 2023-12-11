import { Box, Grid, TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';

const useStyles = makeStyles({
  customTextField: {
    '& input::placeholder': {
      fontSize: '28px',
      color: '#ced3d9',
      fontWeight: ThemeConstants.FONTWEIGHT_BOLD,
    },
    '& input': { fontWeight: 700, fontFamily: 'Playfair Display' },
  },
});

export default function Title({ state, setState }) {
  const { t } = useTranslation();
  const [isEditable, setIsEditable] = useState(true);
  const classes = useStyles();

  const handleTitleChange = (e) => {
    const newVal = e.target.value;
    setState({
      ...state,
      CommonFields: {
        ...state.CommonFields,
        title: newVal,
        settings: { ...state.CommonFields.settings, socialog_title: newVal },
        structure_data: '',
      },
    });
  };

  return (
    <Box
      sx={{
        fontSize: '28px',
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: 'white',
      }}
    >
      <Grid container>
        {/* <Grid item xs={2} md={0.5}>
          </Grid> */}
        <Grid item xs={8} md={10}>
          {isEditable ? (
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
              // onBlur={handleTitleChange}
              onMouseEnter={() => {
                setIsEditable(true);
              }}
              onMouseLeave={() => {
                state?.CommonFields?.title.length > 0 && setIsEditable(false);
              }}
              onChange={handleTitleChange}
              placeholder={t('enter_title')}
              InputProps={{
                disableUnderline: true, // <== added this
              }}
              value={state?.CommonFields?.title || ''}
            />
          ) : (
            <Typography
              onClick={() => {
                setIsEditable(true);
              }}
              sx={{
                fontSize: '28px',
                mt: '16px',
                mb: '8px',
                fontWeight: 700,
                p: '4px 0 5px',
                lineHeight: '1.4375em',
              }}
            >
              {state?.CommonFields?.title || ''}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
