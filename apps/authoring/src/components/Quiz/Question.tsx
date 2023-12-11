import AddIcon from '@mui/icons-material/Add';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useComment } from '../../hooks/useComment/useComment';
import CommentWrapper from '../ContentRewiew/CommentWrapper';
import { DragableQuestions } from './DragableQuestions';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';
import { useCustomStyle } from './Quiz.style';
import TitleSubTitle from '../Common/TitleSubTitle';

export const Question = ({
  quizState,
  setQuizState,
  onClickAddQuestion,
  setIsClickedQueList,
  onClickEditQuestion,
}) => {
  const onClickQueList = () => {
    setIsClickedQueList(true);
  };
  const { t } = useTranslation();
  const { comments, handleCommentClick, scrollToRef, selectedElementId } =
    useComment();
  const classes = useCustomStyle();
  return (
    <Box id='questions' className={classes.mainStyleWrapper}>
      <CommentWrapper elementId='3' scrollRef={scrollToRef} comments={comments}>
        <CommonBoxWithNumber
          number='03'
          title={t('quiz_question_head')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
          <Grid container>
            <Grid item xs={12} sm={12} md={5} em={5} className='leftFiledLast'>
              <TitleSubTitle
                title={`${t('quiz_question_head')}*`}
                subTitle={t('quiz_question_subtitle')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
              />
            </Grid>
            <Grid item xs={12} sm={12} md={7} em={7}>
              <DragableQuestions
                quizState={quizState}
                setQuizState={setQuizState}
                onClickEditQuestion={onClickEditQuestion}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { sm: 'row', xs: 'column' },
                  padding: {
                    xs:
                      quizState?.questions?.length > 0
                        ? '20px 0px 20px 0px'
                        : 'none',
                  },
                  // justifyContent:'space-evenly'
                }}
              >
                <Button
                  variant='primaryButton'
                  startIcon={<AddIcon />}
                  sx={{
                    margin: { xs: '0 0 10px 0', md: '0 20px 0 0' },
                  }}
                  onClick={onClickAddQuestion}
                >
                  {t('add_questions')}
                </Button>

                <Button
                  variant='secondaryButton'
                  startIcon={<FormatListBulletedIcon />}
                  onClick={onClickQueList}
                >
                  {t('choose_from_list')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </CommentWrapper>
    </Box>
  );
};