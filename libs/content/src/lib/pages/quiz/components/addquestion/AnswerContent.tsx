import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Options } from './Options';
import { useCustomStyle } from '../../quiz.style';
import { BasicSwitchText, CommonBoxWithNumber, TitleSubTitle } from '@platformx/utilities';

const AnswerContent = ({
  showGallery,
  answers,
  setAnswers,
  addImage,
  setAddImage,
  qusUnsavedChanges,
  questionType,
}) => {
  const { t } = useTranslation();
  const handleChange = (event) => {
    setAddImage(event.target.checked);
  };
  const classes = useCustomStyle();
  return (
    <Box className={classes.mainStyleWrapper}>
      <CommonBoxWithNumber
        number='02'
        title={t('answer_content')}
        titleVarient='p3semibold'
        subTitleVarient='p4regular'
        subTitle={t('subhead')}
      >
        {questionType === 'Single' && (
          <Box className='textFiled'>
            <BasicSwitchText
              state={addImage}
              isDisable={false}
              handleChange={handleChange}
              title={t('anwer_title')}
              subtitle={t('anwer_subtitle')}
              keyName='addImage'
              child={t('add_image')}
            />
          </Box>
        )}

        <Grid container>
          <Grid item xs={12} md={5} className='leftFiledLast'>
            <TitleSubTitle
              title={t('answers')}
              subTitle={t('enter_answer')}
              titleVariant='h6medium'
              subTitleVariant='h7regular'
              toolTipIcon={
                <InfoOutlinedIcon
                  sx={{ height: '18px', width: '18px', paddingLeft: '4px' }}
                />
              }
              toolTipText={t('answer_content_tp')}
            />
          </Grid>
          <Grid item xs={12} md={7} className='textFiledLast'>
            <Options
              addImage={addImage}
              showGallery={showGallery}
              answers={answers}
              setAnswers={setAnswers}
              qusUnsavedChanges={qusUnsavedChanges}
              questionType={questionType}
            />
          </Grid>
        </Grid>
      </CommonBoxWithNumber>
    </Box>
  );
};
export default AnswerContent;
