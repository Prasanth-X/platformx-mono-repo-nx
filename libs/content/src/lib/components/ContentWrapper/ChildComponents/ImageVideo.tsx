import { Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import FileUpload from '../../XFileUpload/XFileUpload';
import TitleSubTitle from '../../TitleSubtitle/TitleSubTitle';

const ImageVideo = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
        <TitleSubTitle
          title='Title*'
          subTitle='Sub Title'
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Grid>
      <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
        <FileUpload chooseText='Choose your image' />
      </Grid>
    </Grid>
  );
};

export default React.memo(ImageVideo);
