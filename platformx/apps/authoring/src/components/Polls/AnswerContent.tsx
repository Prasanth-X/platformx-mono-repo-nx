import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Box, Grid } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useComment } from '../../hooks/useComment/useComment';
import BasicSwitchText from '../Common/BasicSwitchText';
import TitleSubTitle from '../Common/TitleSubTitle';
import CommentWrapper from '../ContentRewiew/CommentWrapper';
import { Options } from './Options';
import { useCustomStyle } from './Poll.style';
import CommonBoxWithNumber from '../../Common/CommonBoxWithNumber/CommonBoxWithNumber';

const AnswerContent = ({
  showGallery,
  answers,
  setAnswers,
  addImage,
  setAddImage,
  qusUnsavedChanges,
}) => {
  const { t } = useTranslation();
  const [isDisable, setsDisable] = useState<boolean>(false);
  const { comments, handleCommentClick, scrollToRef, selectedElementId } =
    useComment();
  const handleChange = (event) => {
    setAddImage(event.target.checked);
  };
  const classes = useCustomStyle();
  return (
    <Box className={classes.mainStyleWrapper}>
      <CommentWrapper elementId='4' scrollRef={scrollToRef} comments={comments}>
        <CommonBoxWithNumber
          number='04'
          title={t('answer_content')}
          titleVarient='p3semibold'
          subTitleVarient='p4regular'
          subTitle={t('subhead')}
        >
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
          <Grid container>
            <Grid item xs={12} md={5} className='leftFiledLast'>
              <TitleSubTitle
                title={t('answers')}
                subTitle={t('enter_answer')}
                titleVarient='h6medium'
                subTitleVarient='h7regular'
                toolTipIcon={
                  <InfoOutlinedIcon
                    sx={{ height: '18px', width: '18px', paddingLeft: '2px' }}
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
              />
            </Grid>
          </Grid>
        </CommonBoxWithNumber>
      </CommentWrapper>
    </Box>
  );
};
export default AnswerContent;
