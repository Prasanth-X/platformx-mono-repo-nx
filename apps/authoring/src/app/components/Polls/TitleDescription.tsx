import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useComment } from '../../hooks/useComment/useComment';
import AutoTextArea from '../Common/AutoTextArea';
import TextBox from '../Common/TextBox';
import TitleSubTitle from '../Common/TitleSubTitle';
import CommentWrapper from '../ContentRewiew/CommentWrapper';
import { useCustomStyle } from './Poll.style';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';

export const TitleDescription = ({
  state,
  setState,
  setSaveButton,
  unsavedChanges,
  pollRef,
  isDraft,
  setFieldChanges,
}) => {
  const { t } = useTranslation();
  const { comments, handleCommentClick, scrollToRef, selectedElementId } =
    useComment();
  const handleChange = (event) => {
    setFieldChanges(true);
    unsavedChanges.current = true;
  };
  const handleOnBlur = (event) => {
    const key = `${event.target.name}SocialShare`;
    setState({
      ...state,
      [event.target.name]: event.target.value,
      [key]: isDraft ? event.target.value : state[key],
    });
    pollRef.current = {
      ...pollRef.current,
      [event.target.name]: event.target.value,
      [key]: isDraft ? event.target.value : state[key],
    };

    unsavedChanges.current = true;
  };
  const classes = useCustomStyle();
  return (
    <>
      <Box id='titleDescription' className={classes.mainStyleWrapper}>
        <CommentWrapper
          elementId='1'
          scrollRef={scrollToRef}
          comments={comments}
        >
          <CommonBoxWithNumber
            number='01'
            title={t('title_head')}
            titleVarient='p3semibold'
            subTitleVarient='p4regular'
            subTitle={t('subhead')}
          >
            <Grid container>
              <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                <TitleSubTitle
                  title={`${t('title')}*`}
                  subTitle={t('poll_subtitle')}
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                <TextBox
                  name='title'
                  placeHolder={t('quiz_title_placeholder')}
                  handleChange={handleChange}
                  maxCharLength={120}
                  state={state.title}
                  handleOnBlur={handleOnBlur}
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5} lg={5} className='leftFiled'>
                <TitleSubTitle
                  title={t('short_title')}
                  subTitle={t('quiz_subtitle')}
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} lg={7} className='textFiled'>
                <TextBox
                  name='short_title'
                  placeHolder={t('quiz_short_placeholder')}
                  handleChange={handleChange}
                  maxCharLength={60}
                  state={state.short_title}
                  handleOnBlur={handleOnBlur}
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5} className='leftFiled'>
                <TitleSubTitle
                  title={t('short_description')}
                  subTitle={t('poll_short_subdes')}
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} className='textFiled'>
                <AutoTextArea
                  name='short_description'
                  placeHolder={t('quiz_description_placeholder')}
                  handleChange={handleChange}
                  maxCharLength={400}
                  state={state.short_description}
                  handleOnBlur={handleOnBlur}
                />
              </Grid>
              <Grid item xs={12} sm={5} md={5} className='leftFiledLast'>
                <TitleSubTitle
                  title={`${t('description')}*`}
                  subTitle={t('poll_short_subdes')}
                  titleVarient='h6medium'
                  subTitleVarient='h7regular'
                />
              </Grid>
              <Grid item xs={12} sm={7} md={7} className='textFiledLast'>
                <AutoTextArea
                  name='description'
                  placeHolder={t('quiz_description_placeholder')}
                  handleChange={handleChange}
                  maxCharLength={400}
                  state={state.description}
                  handleOnBlur={handleOnBlur}
                />
              </Grid>
            </Grid>
          </CommonBoxWithNumber>
        </CommentWrapper>
      </Box>
    </>
  );
};
