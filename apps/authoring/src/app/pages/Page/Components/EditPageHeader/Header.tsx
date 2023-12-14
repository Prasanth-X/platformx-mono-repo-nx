import { ArrowBack } from '@mui/icons-material';
import { Box, Button } from '@mui/material';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DefaultStateCommentIcon from '../../../../assets/svg/DefaultStateCommentIcon.svg';
import Timer from '../../../../Common/Timer/Timer';
import saveAnimation from '../../../../assets/saveAnimation.gif';
import { ErrorTooltip } from '../../../../components/Common/ErrorTooltip';
import { MiniHeader } from '../../../../components/Header/MiniHeader';
import Submit from '../../../../components/Submit/Submit';
import { enableReferBack } from '../../../../components/Submit/helper';
import WorkflowHistoryIcon from '../../../../components/WorkflowHistory/WorkflowHistoryIcon/WorkflowHistoryIcon';
import { useCommentContext } from '../../../../context/CommentsContext/CommentsContext';
import useAccess from '../../../../hooks/usePermissions/useAccess';
import { CATEGORY_PAGE } from '../../../../utils/constants';
// import PreviewTabsButton from '..  /PreviewTabsButton/PreviewTabsButton';
import { useStyles } from './Header.styles';

const Header = ({
  lastmodifiedDate,
  handleChange,
  value,
  handleBack,
  isSaveButtonEnabled,
  isPublishButtonEnabled,
  previewStatus,
  handleSaveClick,
  handlePublishClick,
  workflow,
  timerState,
  prelemEditState,
  gifPlaying,
  createComment,
  setEnableWorkflowHistory,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { canAccessAction } = useAccess();
  const {
    setIsReviewEnabled,
    setIsCommentPanelOpen,
    isReviewEnabled,
    comments,
  } = useCommentContext();
  const handleReview = () => {
    setIsReviewEnabled(!isReviewEnabled);
    setIsCommentPanelOpen(true);
  };
  useEffect(() => {
    if (enableReferBack(workflow) || comments?.length > 0) {
      setIsReviewEnabled(true);
    } else {
      setIsReviewEnabled(false);
    }
  }, [isReviewEnabled, workflow, comments]);

  return (
    <Box className={classes.headerwp}>
      <Box className={classes.leftwp}>
        <Button onClick={handleBack}>
          <ArrowBack />
        </Button>
      </Box>
      {/* <PreviewTabsButton
        handleChange={handleChange}
        value={value}
        previewStatus={previewStatus}
      /> */}

      <Box className={classes.rightwp}>
        {comments?.length > 0 ? (
          <Box sx={{ position: 'relative' }} className={classes.buttonWrapper}>
            <span
              color="error"
              style={{
                display: 'inline-block',
                marginLeft: ' 5px',
                marginRight: '14px',
                marginBottom: '-2px',
                borderRadius: '50%',
                position: 'absolute',
                top: '7px',
                right: '3px',
                zIndex: 9,
                height: '8px',
                width: '8px',
                backgroundColor: '#D32F2F',
              }}
            ></span>
            <Button
              className="iconBtn"
              onClick={handleReview}
              startIcon={<img src={DefaultStateCommentIcon} width="20px" />}
            ></Button>
          </Box>
        ) : (
          enableReferBack(workflow) && (
            <Box className={classes.buttonWrapper}>
              <Button
                className="iconBtn"
                onClick={handleReview}
                startIcon={<img src={DefaultStateCommentIcon} width="20px" />}
              ></Button>
            </Box>
          )
        )}
        {timerState && <Timer lastmodifiedDate={lastmodifiedDate} />}
        <WorkflowHistoryIcon
          enableWorkflowHistory={setEnableWorkflowHistory}
          workflow_status={workflow.workflow_status}
        />
        <ErrorTooltip
          component={
            <Button
              variant="secondaryButton"
              className="sm"
              sx={{ marginRight: '12px', marginLeft: '12px' }}
              disabled={
                !canAccessAction(CATEGORY_PAGE, '', 'Update') || prelemEditState
              }
              onClick={() => handleSaveClick(false, false)}
            >
              {gifPlaying && <img src={saveAnimation} />}
              {gifPlaying ? t('Saving') : t('save_as_draft')}
            </Button>
          }
          doAccess={!canAccessAction(CATEGORY_PAGE, '', 'Update')}
        />
        {/* <ErrorTooltip
          component={
            <Button
              variant='contained'
              disabled={!isPublishButtonEnabled}
              onClick={handlePublishClick}
            >
              Publish
            </Button>
          }
          doAccess={!canAccessAction(CATEGORY_PAGE, '', 'publish')}
        /> */}
        <Submit
          category={CATEGORY_PAGE}
          subCategory={''}
          handlePublish={handlePublishClick}
          handleSave={handleSaveClick}
          workflow={workflow}
          prelemEditState={prelemEditState}
          createComment={createComment}
        />
        <Box sx={{ marginLeft: '12px' }}>
          <MiniHeader showUserDetails={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Header);
