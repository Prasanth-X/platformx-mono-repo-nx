import { ArrowBack } from "@mui/icons-material";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import TelegramIcon from "@mui/icons-material/Telegram";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import { Box, Button, Grid, Tooltip, Typography, useMediaQuery, useTheme } from "@mui/material";
import { DefaultStateCommentIcon, ErrorTooltip, MarkedFeatured, PreviewNewIcon, SubmitButton, Timer, XToolTip, enableReferBack, useAccess } from "@platformx/utilities";
import { useEffect } from "react";
import { RootState } from "@platformx/authoring-state";
import { useStyles } from "./CreateHeader.style";
import { useSelector } from "react-redux";
import { HeaderProps } from "./Header.types";

export const CreateHeader = ({
  id,
  hasPreviewButton,
  handleReturn,
  handlePublish,
  handleSaveOrPublish,
  handelPreview,
  editText,
  createText,
  toolTipText,
  isQuiz,
  hasPublishButton = false,
  hasSaveButton = false,
  publishText,
  saveText,
  showPreview = true,
  category,
  subCategory,
  workflow,
  hasTimerState,
  lastModifiedDate,
  createComment,
  setIsFeatured,
  isFeatured,
}: HeaderProps) => {

  const { canAccessAction } = useAccess();
  const theme = useTheme();
  const { setIsReviewEnabled, setIsCommentPanelOpen, isReviewEnabled, comments } =
  useSelector((state: RootState) => state.comment.commentInfo);
  const handleReview = () => {
    setIsReviewEnabled(!isReviewEnabled);
    if (comments?.length > 0) {
    setIsCommentPanelOpen(true);
    }
  };
  useEffect(() => {
    if (enableReferBack(workflow) || comments?.length > 0) {
      setIsReviewEnabled(true);
    } else {
      setIsReviewEnabled(false);
    }
  }, [isReviewEnabled, workflow, comments]);
  const noWeb = useMediaQuery(theme.breakpoints.down("sm"));
  const classes = useStyles();
  return (
    <Grid
      container //spacing={2}
      // className={className}
      sx={
        isQuiz
          ? {
            backgroundColor: "#ffffff",
            padding: "10px",
            margin: "0px",
            display: "flex",
            alignItems: "center",
            minHeight: "62px",
          }
          : {
            padding: "10px",
            margin: "0px",
            display: "flex",
            alignItems: "center",
            minHeight: "62px",
          }
      }>
      <Grid item xs={2} md={5} em={4} sm={12} sx={{ display: "flex", alignItems: "center" }}>
        <Button
          variant='text'
          disableRipple
          disableFocusRipple
          startIcon={<ArrowBack />}
          sx={{
            minWidth: "0px",
            textTransform: "capitalize",
            "&:hover": { backgroundColor: "transparent" },
          }}
          onClick={handleReturn}>
          {!noWeb && <Typography variant='h4bold'>{id ? editText : createText}</Typography>}
        </Button>
      </Grid>
      <Grid
        item
        xs={6}
        md={7}
        em={8}
        sm={12}
        sx={{ display: { xs: "none", em: "flex" }, alignItems: "center" }}
        direction='row-reverse'
        container
        alignItems='flex-end'>

        {publishText && (
          <SubmitButton
            category={category}
            subCategory={subCategory}
            workflow={workflow}
            handlePublish={handlePublish}
            handleSave={handleSaveOrPublish}
            createComment={createComment}
          />
        )}
        <ErrorTooltip
          component={
            <Button
              type='submit'
              variant='secondaryButton'
              disabled={!canAccessAction(category, subCategory, "Create") || hasSaveButton}
              className='sm'
              sx={{ marginRight: "12px", marginLeft: "12px" }}
              onClick={() => handleSaveOrPublish(false)}>
              {saveText}
            </Button>
          }
          doAccess={!canAccessAction(category, subCategory, "Create")}
        />
        {showPreview && (
          <XToolTip
            className={classes.buttonWrapper}
            Title={hasPreviewButton ? toolTipText : ""}
            position='bottom'
            component={
              <Button
                disabled={hasPreviewButton}
                startIcon={<img src={PreviewNewIcon} alt="" />}
                onClick={handelPreview}
                className='iconBtn'></Button>
            }
          />
        )}
        {
          // enableReferBack(workflow) ||
          comments?.length > 0 ? (
            // <Badge badgeContent={comments?.length} color='info'>
            <Box sx={{ position: "relative" }} className={classes.buttonWrapper}>
              <span
                color='error'
                style={{
                  display: "inline-block",
                  marginLeft: " 5px",
                  marginRight: "5px",
                  marginBottom: "-2px",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "7px",
                  right: "3px",
                  zIndex: 9,
                  height: "8px",
                  width: "8px",
                  backgroundColor: "#D32F2F",
                }}>
                {" "}
              </span>
              <Button
                aria-label='chat'
                onClick={handleReview}
                className='iconBtn'
                startIcon={<img src={DefaultStateCommentIcon} alt="comments" width='20px' />}>
                {/* <ReviewsOutlinedIcon color={'info'}></ReviewsOutlinedIcon> */}

                {/* <DefaultStateCommentIcon height='24px' width='24px' /> */}
              </Button>
            </Box>
          ) : (
            // </Badge>
            enableReferBack(workflow) && (
              <Box className={classes.buttonWrapper}>
                <Button
                  aria-label='chat'
                  onClick={handleReview}
                  className='iconBtn'
                  startIcon={<img src={DefaultStateCommentIcon} alt="comments" width='20px' />}>
                  {/* <ReviewsOutlinedIcon color={'info'}></ReviewsOutlinedIcon> */}
                  {/* <DefaultStateCommentIcon height='24px' width='24px' /> */}
                </Button>
              </Box>
            )
          )
        }
        {hasTimerState && <Timer lastmodifiedDate={lastModifiedDate} />}
        {showPreview && (
          // <WorkflowHistoryIcon TODO enable workflow history
          //   enableWorkflowHistory={setEnableWorkflowHistory}
          //   workflow_status={workflow?.workflow_status}
          // />
          <>WorkflowHistoryIcon</>
        )}
        <MarkedFeatured setIsFeatured={setIsFeatured} isFeatured={isFeatured} />
      </Grid>
      <Grid
        item
        xs={10}
        md={7}
        em={8}
        sm={7}
        sx={{ display: { xs: "flex", em: "none" } }}
        direction='row-reverse'
        container
        alignItems='flex-end'>
        {publishText && (
          <ErrorTooltip
            component={
              <Button
                startIcon={<TelegramIcon />}
                type='submit'
                sx={{ minWidth: "0px" }}
                onClick={() => {
                  if (handlePublish) {
                    handlePublish();
                  }
                }}
                disabled={
                  !canAccessAction(category, subCategory, "Publish") || hasPublishButton
                }></Button>
            }
            doAccess={!canAccessAction(category, subCategory, "Publish")}
          />
        )}

        <ErrorTooltip
          component={
            <Button
              type='submit'
              startIcon={<SaveAsRoundedIcon />}
              sx={{ minWidth: "0px" }}
              onClick={() => handleSaveOrPublish()}
              disabled={!canAccessAction(category, subCategory, "Create") || hasSaveButton}></Button>
          }
          doAccess={!canAccessAction(category, subCategory, "Create")}
        />
        <Tooltip title={hasPreviewButton ? toolTipText ?? "" : ""} placement='left'>
          <span style={{ cursor: "pointer" }}>
            <Button
              disabled={hasPreviewButton}
              startIcon={<VisibilityRoundedIcon />}
              sx={{ minWidth: "0px" }}
              onClick={handelPreview}></Button>
          </span>
        </Tooltip>
        {hasTimerState && <Timer lastmodifiedDate={lastModifiedDate} />}
        {showPreview && (
          // <WorkflowHistoryIcon TODO enable workflow history
          //   enableWorkflowHistory={setEnableWorkflowHistory}
          //   workflow_status={workflow?.workflow_status}
          // />
          <>WorkflowHistoryIcon</>
        )}
        <MarkedFeatured setIsFeatured={setIsFeatured} isFeatured={isFeatured} />
      </Grid>
    </Grid>
  );
};
