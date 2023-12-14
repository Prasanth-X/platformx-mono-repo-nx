import { ArrowBack } from '@mui/icons-material';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import PreviewNewIcon from '../../../assets/svg/PreviewNewIcon.svg';
import SaveNewIcon from '../../../assets/svg/SaveNewIcon.svg';
import SettingNewIcon from '../../../assets/svg/SettingNewIcon.svg';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Timer from '../../../Common/Timer/Timer';
import Logo from '../../../assets/images/platform-x-logo.png';
import DefaultStateCommentIcon from '../../../assets/svg/DefaultStateCommentIcon.svg';
import { ErrorTooltip } from '../../../components/Common/ErrorTooltip';
import { ToolTip } from '../../../components/Common/ToolTip';
import { workflowKeys } from '../../../components/Submit/Utils/contstants';
import { enableReferBack } from '../../../components/Submit/helper';
import WorkflowAssignee from '../../../components/WorkflowAssignee/Index';
import WorkflowHistoryIcon from '../../../components/WorkflowHistory/WorkflowHistoryIcon/WorkflowHistoryIcon';
import { useCommentContext } from '../../../context/CommentsContext/CommentsContext';
import useAccess from '../../../hooks/usePermissions/useAccess';
import useUserSession from '../../../hooks/useUserSession/useUserSession';
import '../CreateArticle/CreateArticle.css';
import { useStyles } from '../CreateArticle/CreateArticle.styles';
import PublishSocialShare from './PublishSocialShare/PublishSocialShare';

const TopBar = ({
  returnBack,
  createText,
  handleClickOpen,
  onSave,
  handelPreview,
  state,
  setState,
  socialOgTags,
  setSocialOgTags,
  showGallery,
  setOperationType,
  show,
  setShow,
  updateStructureDataArticle,
  previewButton,
  toolTipText,
  category,
  subCategory,
  createComment,
  workflow,
  timerState,
  lastmodifiedDate,
  setEnableWorkflowHistory,
}) => {
  const [getSession] = useUserSession();
  const { role } = getSession();
  const navigate = useNavigate();
  const classes = useStyles();
  const [listMenu, setListMenu] = useState<null | HTMLElement>(null);
  const { t, i18n } = useTranslation();
  const { canAccessAction } = useAccess();
  const {
    setIsReviewEnabled,
    setIsCommentPanelOpen,
    isReviewEnabled,
    comments,
  } = useCommentContext();
  const [approvalStatus, setApprovalStatus] = useState(false);
  const openListMenu = Boolean(listMenu);
  const handleListClose = () => {
    setListMenu(null);
  };
  const handlePublishList = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setListMenu(event.currentTarget);
  };

  const handleReview = () => {
    setIsReviewEnabled(!isReviewEnabled);
    // if (comments?.length > 0) {
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
  const theme = useTheme();
  const noWeb = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Box className='createarticletophead'>
        <Box className='d-flex'>
          <Box className='backarrow' onClick={returnBack}>
            <ArrowBack sx={{ marginRight: '10px' }} />{' '}
            {!noWeb && (
              <Typography variant='h3medium'>{t('article')}</Typography>
            )}
          </Box>
          <Box
            className={classes.logoDispaly}
            onClick={() => navigate('/dashboard')}
          >
            <img src={Logo} height='30' />
          </Box>
        </Box>
        <Box className='d-flex align-items-center justify-content-space-between'>
          <Grid
            item
            xs={12}
            md={12}
            sm={12}
            container
            alignItems='flex-end'
            direction='row'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {role === 'Admin FIFA' && (
              <Button
                onClick={() => setApprovalStatus(true)}
                sx={{
                  textTransform: 'none',
                }}
              >
                {t('Assign Workflow')}
              </Button>
            )}
            <WorkflowHistoryIcon
              enableWorkflowHistory={setEnableWorkflowHistory}
              workflow_status={workflow.workflow_status}
            />

            {
              //enableReferBack(workflow) ||
              comments?.length > 0 ? (
                // <Badge badgeContent={comments?.length} color='info'>
                <Box
                  sx={{ position: 'relative' }}
                  className={classes.buttonWrapper}
                >
                  <span
                    color='error'
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
                  ></span>
                  <Button
                    className='iconBtn'
                    onClick={handleReview}
                    startIcon={
                      <img src={DefaultStateCommentIcon} width='20px' />
                    }
                  ></Button>
                </Box>
              ) : (
                // </Badge>
                enableReferBack(workflow) && (
                  <Box className={classes.buttonWrapper}>
                    <Button
                      className='iconBtn'
                      onClick={handleReview}
                      startIcon={
                        <img src={DefaultStateCommentIcon} width='20px' />
                      }
                    ></Button>
                  </Box>
                )
              )
            }
            {timerState && <Timer lastmodifiedDate={lastmodifiedDate} />}

            {/* <ToolTip
              component={
                <Button
                  onClick={() => setApprovalStatus(true)}
                  startIcon={<ApprovalStatusIcon />}
                  // disabled={true}
                  sx={{
                    minWidth: '0px',
                    display: 'flex',
                    justifyContent: 'center',
                    '&:disabled': {
                      color: '#A0A3BD',
                    },
                  }}
                ></Button>
              }
              Title={t('approval_status')}
            /> */}
            <ToolTip
              className={classes.buttonWrapper}
              component={
                <Button
                  onClick={() => setShow(true)}
                  startIcon={<img src={SettingNewIcon} />}
                  // disabled={true}
                  className='iconBtn'
                ></Button>
              }
              Title='Social Share, SEO and Analytics are here'
              position='bottom'
            />
            <ToolTip
              className={classes.buttonWrapper}
              Title={previewButton ? toolTipText : ''}
              position='bottom'
              component={
                <Button
                  onClick={handelPreview}
                  disabled={previewButton}
                  startIcon={<img src={PreviewNewIcon} />}
                  className='iconBtn'
                ></Button>
              }
            />
            <ErrorTooltip
              component={
                <Button
                  onClick={() => onSave(false)}
                  disabled={!canAccessAction(category, subCategory, 'Create')}
                  variant='secondaryButton'
                  sx={{ marginRight: '12px', marginLeft: '12px' }}
                  className='sm'
                >
                  {t('save_as_draft')}
                </Button>
              }
              doAccess={!canAccessAction(category, subCategory, 'Create')}
            />
            <ErrorTooltip
              component={
                <Button
                  variant='primaryButton'
                  className='sm'
                  onClick={handleClickOpen}
                  disabled={
                    workflow?.enable &&
                    workflow?.workflow_status?.toLowerCase() ===
                      workflowKeys.published
                  }
                >
                  {t('continue')}
                </Button>
              }
              doAccess={
                workflow?.enable &&
                workflow?.workflow_status?.toLowerCase() ===
                  workflowKeys.published
              }
            />
          </Grid>
        </Box>
      </Box>

      <Menu
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        anchorEl={listMenu}
        open={openListMenu}
        onClose={handleListClose}
        // className={classes.logoDispaly}
        sx={{
          '.Platform-x-Menu-paper': {
            boxShadow: ' 0px 6px 18px 7px rgba(0, 0, 0, 0.05)',
            borderRadius: '5px',
            marginTop: '5px',
            width: '230px',
            height: 'auto',
          },
          '.Platform-x-Menu-list': {
            borderRadius: '4px',
            boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
            border: '0px 6px 18px 7px rgba(0, 0, 0, 0.05);',
          },
          '.Platform-x-MenuItem-root': {
            '.Platform-x-SvgIcon-root': {
              fontSize: 20,
              marginRight: '10px',
            },
            paddingLeft: '15px',
            fontSize: '14px',
            zIndex: 999,
            fontWeight: 500,
            height: 'auto',
          },
          textTransform: 'capitalize',
        }}
      >
        <ErrorTooltip
          component={
            <MenuItem
              disableRipple
              disabled={!canAccessAction(category, subCategory, 'Publish')}
              onClick={() => {
                handleClickOpen();
                handleListClose();
              }}
            >
              {t('publish')}
            </MenuItem>
          }
          doAccess={!canAccessAction(category, subCategory, 'Publish')}
        />
        <ErrorTooltip
          component={
            <MenuItem
              disabled={!canAccessAction(category, subCategory, 'Create')}
              disableRipple
              onClick={() => {
                () => onSave(false);
                handleListClose();
              }}
            >
              {t('save_as_draft')}
            </MenuItem>
          }
          doAccess={!canAccessAction(category, subCategory, 'Create')}
        />
        <ErrorTooltip
          component={
            <MenuItem
              disabled={false}
              disableRipple
              onClick={() => {
                createComment();
                handleListClose();
              }}
            >
              Submit Review Comments
            </MenuItem>
          }
          doAccess={false}
        />
        {/* <MenuItem disableRipple>Schedule Publish</MenuItem> */}
      </Menu>
      <PublishSocialShare
        open={show}
        handleClose={() => setShow(false)}
        state={state}
        setState={setState}
        socialOgTags={socialOgTags}
        setSocialOgTags={setSocialOgTags}
        showGallery={showGallery}
        setOperationType={setOperationType}
        setShow={setShow}
        updateStructureDataArticle={updateStructureDataArticle}
      />
      {approvalStatus && (
        <WorkflowAssignee
          open={approvalStatus}
          setOpen={setApprovalStatus}
          path={workflow.page}
          contentType={workflow?.tag_name}
        />
      )}
    </>
  );
};

export default TopBar;
