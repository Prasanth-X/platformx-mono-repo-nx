import { Box, Grid } from '@mui/material';
import { XButton } from '../../../../CommonSchemaComponents/XButton/XButton';
import TitleSubTitle from '../../../../components/Common/TitleSubTitle';
import { DragableQuestions } from '../../../../components/Quiz/DragableQuestions';
import { useStyles } from './QuestionSection.styles';

const QuestionSection = ({
  field,
  toggleAddQuestion,
  toggleQuestionListing,
  quizState,
  setQuizState,
}) => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12} sm={5} md={5} lg={5}>
        <TitleSubTitle
          titleVarient={'h6medium'}
          subTitleVarient={'h7regular'}
          title={field?.title}
          subTitle={field?.description}
        />
      </Grid>
      <Grid item xs={12} sm={7} md={7} lg={7}>
        <DragableQuestions
          quizState={quizState}
          setQuizState={setQuizState}
          onClickEditQuestion={() => {}}
        />
        <Box className={classes.container}>
          <XButton
            variant={'primaryButton'}
            label={field?.buttonObj?.buttonLabel1}
            onClick={toggleAddQuestion}
          />
          <XButton
            variant={'primaryButton'}
            label={field?.buttonObj?.buttonLabel2}
            onClick={toggleQuestionListing}
          />
        </Box>
      </Grid>
    </>
  );
};

export default QuestionSection;
