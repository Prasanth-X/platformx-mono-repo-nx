import { Box, Grid } from '@mui/material';
import { useStyles } from './QuestionSection.styles';
import { TitleSubTitle, XButton } from '@platformx/utilities';

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
          titleVariant={'h6medium'}
          subTitleVariant={'h7regular'}
          title={field?.title}
          subTitle={field?.description}
        />
      </Grid>
      <Grid item xs={12} sm={7} md={7} lg={7}>
        {/* <DragableQuestions
          quizState={quizState}
          setQuizState={setQuizState}
          onClickEditQuestion={() => { }}
        /> */}
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
