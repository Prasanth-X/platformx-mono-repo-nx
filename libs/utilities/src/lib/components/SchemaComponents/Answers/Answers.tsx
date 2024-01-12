import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Grid, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TitleSubTitle from '../TitleSubtitle/TitleSubTitle';
const Answers = ({
  showGallery,
  answers,
  setAnswers,
  addImage,
  setAddImage,
  questionType,
}) => {
  const [isDisable, setsDisable] = useState<boolean>(false);
  const { t } = useTranslation();
  const handleChange = (event) => {
    setAddImage(event.target.checked);
  };
  const qusUnsavedChanges = useRef<boolean>(false);

  return (
    <>
      {/* {questionType === 'Single' && (
          <Box className='textFiled'>
            <BasicSwitchText
              state={addImage}
              isDisable={isDisable}
              handleChange={handleChange}
              title={t('anwer_title')}
              subtitle={t('anwer_subtitle')}
              keyName='addImage'
              child={t('add_image')}
            />
          </Box>
        )} */}

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
          <Typography variant='h7regular' className='textFiledLast'>
            TODO
          </Typography>
          {/* <Options
            addImage={addImage}
            showGallery={showGallery}
            answers={answers}
            setAnswers={setAnswers}
            qusUnsavedChanges={qusUnsavedChanges}
            questionType={questionType}
          /> */}
        </Grid>
      </Grid>
    </>
  );
};
export default Answers;
