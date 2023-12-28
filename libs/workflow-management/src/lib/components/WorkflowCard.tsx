import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
// import Loader from '../../../../Common/Loader';
// import warningIcon from '../../../../assets/svg/warningIcon.svg';
// import { ReactComponent as WorkflowIcon } from '../../../../assets/svg/workflowIcon.svg';

// import {
//   showToastError,
//   showToastSuccess,
// } from '../../../../components/toastNotification/toastNotificationReactTostify';
// import { DialogBoxContentProps } from '../../../../context/actionContext/ActionContext.types';
// import { WorkflowQueries } from '../../../../graphql/workflow/workflowQueries';
// import { useDialog } from '../../../../hooks/useDialog/useDialog';
// import ThemeConstants from '../../../../theme/variable';
// import BasicSwitch from '../../../editPage/Switch';
// import { ListViewProps } from '../../Workflow.Types';
// import MoreDialog from './MoreDialog';
import { useStyles } from './Workflow.styles';
import { WorkflowCardTypes } from './Workflow.types';
export const WorkflowCard = ({
  name,
  id,
  creation_date,
  steps,
  status,
  content_type,
  title,
  handleReload,
}: WorkflowCardTypes) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  //   const dialog = useDialog();
  const [checked, setChecked] = useState(status);
  const [contentType, setContentType] = useState('');
  //   const DateTime = format(new Date(creation_date), 'LLL dd, yyyy | H:mm');
  const classes = useStyles();
  //   const [workflowMutate] = useMutation(WorkflowQueries.UPDATE_WORKFLOW_STATUS);

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setChecked(!checked);
    // try {
    //   const response = await workflowMutate({
    //     variables: {
    //       input: { title: title, status: !checked },
    //     },
    //     onCompleted: (res) => {
    //       handleReload();
    //     },
    //   });
    //   setIsLoading(false);
    //   {
    //     checked
    //       ? showToastSuccess(t('disable_workflow_message'))
    //       : showToastSuccess(t('enable_workflow_message'));
    //   }
    // } catch (err: any) {
    //   showToastError(
    //     err.graphQLErrors.length > 0
    //       ? err.graphQLErrors[0].message
    //       : t('api_error_toast')
    //   );
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    // let tempStr = '';
    // content_type.forEach((val) => {
    //   tempStr = `${tempStr}${val}, `;
    // });
    // let str =
    //   tempStr.slice(0, tempStr.lastIndexOf(',')) +
    //   ' ' +
    //   tempStr.slice(tempStr.lastIndexOf(',') + ' '.length);
    // setContentType(str);
  }, [content_type]);
  const handleChange = (checked: boolean) => {
    // console.log('check', checked);
    // const dialogContent: DialogBoxContentProps = {
    //   Image: warningIcon,
    //   Title: checked ? t('disable_workflow_title') : t('enable_workflow_title'),
    //   Subtitle: checked
    //     ? `${t('disable_workflow_subtitle')}`
    //     : `${t('enable_workflow_subtitle')}`,
    //   LeftButtonText: t('no'),
    //   RightButtonText: t('yes'),
    // };
    // dialog.show(dialogContent, handleConfirm, handleDialogClose);
  };

  //   const navigate = useNavigate();

  const handleViewWorkflow = (userId: unknown) => {
    // navigate(`/workflow/workflow-details?path=${userId}`);
  };
  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Box
        className="userlistbox"
        sx={{
          '&:hover': {
            border: '1px solid #14142B',
          },
        }}
      >
        <Grid container className="d-flex align-items-center">
          <Grid xs={11} md={8}>
            <Box className="d-flex align-items-center">
              <Box
                className={classes.workflowIconStyle}
                sx={{
                  display: { xs: 'none', em: 'flex' },
                }}
              >
                {/* <WorkflowIcon /> */}
              </Box>
              <Box>
                <Box
                  className={classes.dFlexAlignItemCenter}
                  onClick={(e) => handleViewWorkflow(e, id)}
                >
                  <Typography
                    // variant='h5semibold'
                    className={classes.onHoverHighlight}
                  >
                    {name}
                  </Typography>
                </Box>

                <Box
                  className="d-flex"
                  sx={{
                    flexWrap: { xs: 'wrap', em: 'inherit' },
                    flexDirection: 'column',
                  }}
                >
                  <Box className={classes.stepsEllipsis}>
                    <Box
                      sx={{
                        display: { xs: 'inline-block', em: 'none' },
                        alignItems: 'center',
                      }}
                    ></Box>

                    {/* {steps.map((step, index) => {
                      return (
                        <Box
                          sx={{
                            display: 'inline-block',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant='h7regular'>
                            {step.state}
                            {index < steps.length - 1 && (
                              <span style={{ padding: '3px' }}>{'>'}</span>
                            )}
                          </Typography>
                        </Box>
                      );
                    })} */}
                  </Box>
                  <Box>
                    <Typography
                      //   variant='h7regular'
                      sx={{ display: { xs: 'flex', em: 'none' } }}
                    >
                      {/* {DateTime} */}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={1} md={4}>
            <Box className="d-flex align-items-center justify-content-end">
              <Box
                className={classes.contentTypeBox}
                sx={{
                  display: { em: 'inline-flex', xs: 'none' },
                }}
              >
                <Box>
                  <Typography
                    //variant=''
                    sx={{ color: '#6E7191' }}
                  >
                    {t('applying_on')}
                  </Typography>
                </Box>
                <Box
                  className={classes.contentTypeEllipsis}
                  sx={{
                    display: { xs: 'none', em: 'flex' },
                  }}
                >
                  <Tooltip placement="top-start" title={contentType}>
                    <Typography
                      //variant='h7regular'
                      className={classes.contentTypeTextStyle}
                      component="div"
                    >
                      {contentType}
                    </Typography>
                  </Tooltip>
                </Box>
              </Box>

              <Box color="#89909A" className="d-inline-flex align-items-center">
                <Box className="d-flex align-items-center">
                  <MenuItem
                    className="icons"
                    onClick={(e) => handleViewWorkflow(id)}
                  >
                    <RemoveRedEyeOutlinedIcon />
                  </MenuItem>

                  <MenuItem className="icons">
                    {/* <BasicSwitch
                      checked={checked}
                      onChange={() => handleChange(checked)}
                      color={checked ? ThemeConstants.GREEN_COLOR : 'red'}
                    /> */}
                  </MenuItem>
                </Box>
                <Box sx={{ display: { xs: 'flex', em: 'none' } }}>
                  {/* <MoreDialog
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                    handleViewWorkflow={handleViewWorkflow}
                  /> */}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
