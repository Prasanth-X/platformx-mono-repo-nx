import React from 'react';
import { Box, Typography } from '@mui/material';
// import ChatGptCommonLoader from '../../../../assets/svg/ChatGptCommonLoader.gif';
import NewChatGptLoader from '../../../../assets/NewChatGptLoader.gif';
import { useStyles } from './ChatGptLoader.Style';
import { useTranslation } from 'react-i18next';
import { ThemeConstants } from '@platformx/utilities';

const ChatGptLoader = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box className={classes.LoaderMainBox}>
      <Box className={classes.ImageBox}>
        <Box>
          <img className={classes.ImageDiv} src={NewChatGptLoader} />
          <Box>
            <Typography className={classes.TypoDiv} variant="h4bold">
              {t('chatgpt_reload_message1')}
            </Typography>
            <Typography variant="h5regular" className={classes.TypoDiv2}>
              {t('chatgpt_reload_message2')}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatGptLoader;
