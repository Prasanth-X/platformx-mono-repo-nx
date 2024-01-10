import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Box, Grid, Tooltip, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import Loader from '../../../../Common/Loader';
// import { FilterIcon } from '@platformx/utilities';
import { useMutation } from '@apollo/client';
import { WorkflowQueries } from '@platformx/authoring-apis';
import { handleDialog } from '@platformx/authoring-state';
import {
  BasicSwitch,
  ShowToastError,
  ShowToastSuccess,
  ThemeConstants,
  WarningIcon,
  WorkflowIcon,
} from '@platformx/utilities';
import { useDispatch } from 'react-redux';
import MoreDialog from '../WorkFlowListing/MoreDialog';
import { useStyles } from '../WorkFlowListing/WorkFlowListing.styles';
import { ListViewProps } from '../WorkFlowListing/Workflow.Types';
const ListView = ({
  name,
  id,
  creation_date,
  steps,
  status,
  content_type,
  title,
  handleReload,
}: ListViewProps) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [checked, setChecked] = useState(status);
  const [contentType, setContentType] = useState('');
  const DateTime = format(new Date(creation_date), 'LLL dd, yyyy | H:mm');
  const classes = useStyles();
  const [workflowMutate] = useMutation(WorkflowQueries.UPDATE_WORKFLOW_STATUS);
  const dispatch = useDispatch();

  const handleConfirm = async () => {
    setIsLoading(true);
    setChecked(!checked);
    try {
      const response = await workflowMutate({
        variables: {
          input: { title: title, status: !checked },
        },
        onCompleted: (res) => {
          handleReload();
        },
      });
      setIsLoading(false);
      checked
        ? ShowToastSuccess(t('disable_workflow_message'))
        : ShowToastSuccess(t('enable_workflow_message'));
    } catch (err: any) {
      ShowToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast')
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let tempStr = '';
    content_type.forEach((val: any) => {
      tempStr = `${tempStr}${val}, `;
    });
    let str =
      tempStr.slice(0, tempStr.lastIndexOf(',')) +
      ' ' +
      tempStr.slice(tempStr.lastIndexOf(',') + ' '.length);
    setContentType(str);
  }, [content_type]);
  const handleChange = (checked: boolean) => {
    const dialogContent = {
      imageIcon: WarningIcon,
      isOpen: true,
      title: checked ? t('disable_workflow_title') : t('enable_workflow_title'),
      subTitle: checked
        ? `${t('disable_workflow_subtitle')}`
        : `${t('enable_workflow_subtitle')}`,
      leftButtonText: t('no'),
      rightButtonText: t('yes'),
      handleCallback: handleConfirm,
    };
    // dialog.show(dialogContent, handleConfirm, handleDialogClose);
    dispatch(handleDialog(dialogContent));
  };
  const navigate = useNavigate();

  const handleViewWorkflow = (userId: string) => {
    console.log('userId', userId);
    navigate(`/workflow/workflow-details?path=${userId}`);
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
          <Grid xs={11} em={8}>
            <Box className="d-flex align-items-center">
              <Box
                className={classes.workflowIconStyle}
                sx={{
                  display: { xs: 'none', em: 'flex' },
                }}
              >
                <img src={WorkflowIcon} alt="" />
              </Box>
              <Box>
                <Box
                  className={classes.dFlexAlignItemCenter}
                  onClick={() => handleViewWorkflow(id)}
                >
                  <Typography
                    variant="h5semibold"
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
                    {/* <Box sx={{ display: { xs: 'inline-block', em: 'none' } }}>
                      <Box
                        sx={{
                          content: '"."',
                          // position: 'absolute',
                          // left: '0px',
                          // top: 0,
                          // bottom: 0,

                          margin: '-6px 5px 0px 10px',
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          background: ' #2d2d39',
                        }}
                      ></Box>
                    </Box> */}
                    {/* <Box> */}
                    {steps.map((step: any, index: number) => {
                      return (
                        <Box
                          sx={{
                            display: 'inline-block',
                            alignItems: 'center',
                          }}
                        >
                          <Typography variant="h7regular">
                            {step.state}
                            {index < steps.length - 1 && (
                              <span style={{ padding: '3px' }}>{'>'}</span>
                            )}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>
                  <Box>
                    <Typography
                      variant="h7regular"
                      sx={{ display: { xs: 'flex', em: 'none' } }}
                    >
                      {DateTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={1} em={4}>
            <Box className="d-flex align-items-center justify-content-end">
              <Box
                className={classes.contentTypeBox}
                sx={{
                  display: { em: 'inline-flex', xs: 'none' },
                }}
              >
                <Box>
                  <Typography variant="h7regular" sx={{ color: '#6E7191' }}>
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
                      variant="h7regular"
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
                    onClick={() => handleViewWorkflow(id)}
                  >
                    <RemoveRedEyeOutlinedIcon />
                  </MenuItem>

                  <MenuItem className="icons">
                    <BasicSwitch
                      checked={checked}
                      onChange={() => handleChange(checked)}
                      color={checked ? ThemeConstants.GREEN_COLOR : 'red'}
                    />
                  </MenuItem>
                </Box>
                <Box sx={{ display: { xs: 'flex', em: 'none' } }}>
                  <MoreDialog
                    id={id}
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                    handleViewWorkflow={handleViewWorkflow}
                  />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ListView;
