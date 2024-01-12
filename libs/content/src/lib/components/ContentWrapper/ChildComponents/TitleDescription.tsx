import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import TextBox from '../../TextBox/TextBox';
import TitleSubTitle from '../../TitleSubtitle/TitleSubTitle';
import XTextArea from '../../XTextArea/XTextArea';

export const TitleDescription = () => {
  const { t } = useTranslation();

  return (
    <Grid container>
      <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
        <TitleSubTitle
          title='Title'
          subTitle='Sub Title'
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Grid>
      <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
        <TextBox name='title' placeHolder='title' maxCharLength={120} />
      </Grid>
      <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
        <TitleSubTitle
          title='Title'
          subTitle='Sub Title'
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Grid>
      <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
        <TextBox
          name='short_title'
          placeHolder='short title'
          maxCharLength={60}
        />
      </Grid>
      <Grid item xs={12} sm={5} md={5} className='leftFiled'>
        <TitleSubTitle
          title='Title'
          subTitle='Sub Title'
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Grid>
      <Grid item xs={12} sm={7} md={7} className='textFiled'>
        <XTextArea minRows={1} maxRows={8} />
      </Grid>
      <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
        <TitleSubTitle
          title='Title'
          subTitle='Sub Title'
          titleVariant='h6medium'
          subTitleVariant='h7regular'
        />
      </Grid>
      <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
        <XTextArea minRows={1} maxRows={8} />
      </Grid>
    </Grid>
  );
};
