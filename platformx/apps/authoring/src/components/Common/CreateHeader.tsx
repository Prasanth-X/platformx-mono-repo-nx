import { ArrowBack } from '@mui/icons-material';
import SaveAsRoundedIcon from '@mui/icons-material/SaveAsRounded';
import TelegramIcon from '@mui/icons-material/Telegram';
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded';
import {
  Box,
  Button,
  Grid,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect } from 'react';
import DefaultStateCommentIcon from '../../../src/assets/svg/DefaultStateCommentIcon.svg';
import Timer from '../../Common/Timer/Timer';
import PreviewNewIcon from '../../assets/svg/PreviewNewIcon.svg';
import { useCommentContext } from '../../context/CommentsContext/CommentsContext';
import useAccess from '../../hooks/usePermissions/useAccess';
import Submit from '../Submit/Submit';
import { enableReferBack } from '../Submit/helper';
import WorkflowHistoryIcon from '../WorkflowHistory/WorkflowHistoryIcon/WorkflowHistoryIcon';
import { useStyles } from './CreateHeader.style';
import { ErrorTooltip } from './ErrorTooltip';
import { ToolTip } from './ToolTip';
import { HeaderProps } from './utils/commonTypes';

export const CreateHeader = ({
  className,
  id,
  previewButton,
  returnBack,
  publish,
  saveorPublish,
  handelPreview,
  editText,
  createText,
  toolTipText,
  isQuiz,
  publishButton = false,
  saveButton = false,
  publishText,
  saveText,
  previewText,
  saveVariant,
  showPreview = true,
  category,
  subCategory,
  workflow,
  timerState,
  lastmodifiedDate,
  setEnableWorkflowHistory,
  createComment,
}: HeaderProps) => {
  const { canAccessAction } = useAccess();
  const theme = useTheme();
  const {
    setIsReviewEnabled,
    setIsCommentPanelOpen,
    isReviewEnabled,
    comments,
  } = useCommentContext();
  const handleReview = () => {
    setIsReviewEnabled(!isReviewEnabled);
    // if (comments.length > 0) {
    setIsCommentPanelOpen(true);
    //}
  };
  useEffect(() => {
    if (enableReferBack(workflow) || comments?.length > 0) {
      setIsReviewEnabled(true);
    } else {
      setIsReviewEnabled(false);
    }
  }, [isReviewEnabled, workflow, comments]);
  const noWeb = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();
  return (
    <Grid
      container //spacing={2}
      className={className}
      sx={
        isQuiz
          ? {
              backgroundColor: '#ffffff',
              padding: '10px',
              margin: '0px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '62px',
            }
          : {
              padding: '10px',
              margin: '0px',
              display: 'flex',
              alignItems: 'center',
              minHeight: '62px',
            }
      }
    >
      <Grid
        item
        xs={2}
        md={5}
        em={4}
        sm={12}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <Button
          variant="text"
          disableRipple
          disableFocusRipple
          startIcon={<ArrowBack />}
          sx={{
            minWidth: '0px',
            textTransform: 'capitalize',
            '&:hover': { backgroundColor: 'transparent' },
          }}
          onClick={returnBack}
        >
          {!noWeb && (
            <Typography variant="h4bold">
              {id ? editText : createText}
            </Typography>
          )}
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        md={7}
        em={8}
        sm={12}
        sx={{ display: { xs: 'none', em: 'flex' }, alignItems: 'center' }}
        direction="row-reverse"
        container
        alignItems="flex-end"
      >
        {/* {publishText && (
          <ErrorTooltip
            component={
              <Button
                variant='contained'
                disabled={
                  !canAccessAction(category, subCategory, 'Publish') ||
                  publishButton
                }
                startIcon={<TelegramIcon />}
                size='small'
                sx={{
                  marginRight: '10px',
                  height: isQuiz ? '40px' : 'none',
                  textTransform: 'capitalize',
                  '&:disabled': {
                    fontSize: ThemeConstants.FONTSIZE_SM,
                    color: '#89909a',
                  },
                }}
                onClick={() => publish()}
              >
                {publishText}
              </Button>
            }
            doAccess={!canAccessAction(category, subCategory, 'Publish')}
          />
        )} */}
        {publishText && (
          <Submit
            category={category}
            subCategory={subCategory}
            workflow={workflow}
            handlePublish={publish}
            handleSave={saveorPublish}
            createComment={createComment}
          />
        )}
        <ErrorTooltip
          component={
            <Button
              variant="secondaryButton"
              disabled={
                !canAccessAction(category, subCategory, 'Create') || saveButton
              }
              className="sm"
              sx={{ marginRight: '12px', marginLeft: '12px' }}
              onClick={() => saveorPublish(false)}
            >
              {saveText}
            </Button>
          }
          doAccess={!canAccessAction(category, subCategory, 'Create')}
        />
        {showPreview && (
          <ToolTip
            className={classes.buttonWrapper}
            Title={previewButton ? toolTipText : ''}
            position="bottom"
            component={
              <Button
                disabled={previewButton}
                startIcon={<img src={PreviewNewIcon} />}
                onClick={handelPreview}
                className="iconBtn"
              ></Button>
            }
          />
        )}
        {
          // enableReferBack(workflow) ||
          comments?.length > 0 ? (
            // <Badge badgeContent={comments?.length} color='info'>
            <Box
              sx={{ position: 'relative' }}
              className={classes.buttonWrapper}
            >
              <span
                color="error"
                style={{
                  display: 'inline-block',
                  marginLeft: ' 5px',
                  marginRight: '5px',
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
              >
                {' '}
              </span>
              <Button
                aria-label="chat"
                onClick={handleReview}
                className="iconBtn"
                startIcon={<img src={DefaultStateCommentIcon} width="20px" />}
              >
                {/* <ReviewsOutlinedIcon color={'info'}></ReviewsOutlinedIcon> */}

                {/* <DefaultStateCommentIcon height='24px' width='24px' /> */}
              </Button>
            </Box>
          ) : (
            // </Badge>
            enableReferBack(workflow) && (
              <Box className={classes.buttonWrapper}>
                <Button
                  aria-label="chat"
                  onClick={handleReview}
                  className="iconBtn"
                  startIcon={<DefaultStateCommentIcon width="20px" />}
                >
                  {/* <ReviewsOutlinedIcon color={'info'}></ReviewsOutlinedIcon> */}
                  {/* <DefaultStateCommentIcon height='24px' width='24px' /> */}
                </Button>
              </Box>
            )
          )
        }
        {timerState && <Timer lastmodifiedDate={lastmodifiedDate} />}
        {showPreview && (
          <WorkflowHistoryIcon
            enableWorkflowHistory={setEnableWorkflowHistory}
            workflow_status={workflow?.workflow_status}
          />
        )}
      </Grid>
      <Grid
        item
        xs={10}
        md={7}
        em={8}
        sm={7}
        sx={{ display: { xs: 'flex', em: 'none' } }}
        direction="row-reverse"
        container
        alignItems="flex-end"
      >
        {publishText && (
          <ErrorTooltip
            component={
              <Button
                startIcon={<TelegramIcon />}
                sx={{ minWidth: '0px' }}
                onClick={() => publish()}
                disabled={
                  !canAccessAction(category, subCategory, 'Publish') ||
                  publishButton
                }
              ></Button>
            }
            doAccess={!canAccessAction(category, subCategory, 'Publish')}
          />
        )}

        <ErrorTooltip
          component={
            <Button
              startIcon={<SaveAsRoundedIcon />}
              sx={{ minWidth: '0px' }}
              onClick={() => saveorPublish()}
              disabled={
                !canAccessAction(category, subCategory, 'Create') || saveButton
              }
            ></Button>
          }
          doAccess={!canAccessAction(category, subCategory, 'Create')}
        />
        <Tooltip title={previewButton ? toolTipText : ''} placement="left">
          <span style={{ cursor: 'pointer' }}>
            <Button
              disabled={previewButton}
              startIcon={<VisibilityRoundedIcon />}
              sx={{ minWidth: '0px' }}
              onClick={handelPreview}
            ></Button>
          </span>
        </Tooltip>
        {timerState && <Timer lastmodifiedDate={lastmodifiedDate} />}
        {showPreview && (
          <WorkflowHistoryIcon
            enableWorkflowHistory={setEnableWorkflowHistory}
            workflow_status={workflow?.workflow_status}
          />
        )}
      </Grid>
    </Grid>
  );
};
