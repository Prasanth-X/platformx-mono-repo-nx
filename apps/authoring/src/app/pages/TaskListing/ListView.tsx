import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useStyles } from './TaskRow.Styles';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { iconsList } from '../../Common/Listing/Utils/Constants';
import workflowApi from '../../services/workflow/workflow.api';
import { ListViewProps } from './TaskList.Type';
import { dateFormat } from '../../utils/helperFunctions';
import { DialogBoxContentProps } from '../../context/actionContext/ActionContext.types';
import warningIcon from '../../assets/svg/warningIcon.svg';
import {
  showToastError,
  showToastSuccess,
} from '../../components/toastNotification/toastNotificationReactTostify';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/client';
import { WorkflowQueries } from '../../graphql/workflow/workflowQueries';
import { useDialog } from '../../hooks/useDialog/useDialog';


const ListView = ({
  approval_status,
  created_by,
  creation_date,
  description,
  document_path,
  document_title,
  document_type,
  due_date,
  last_modification_date,
  last_modified_by,
  stage,
  task_status,
  title,
  user_id,
  user_name,
  workflow_id,
  workflow_name,
  __typename,
  handleReload,
}: 
ListViewProps) => {
  const classes = useStyles();

  const [taskMutate] = useMutation(WorkflowQueries.UPDATE_TASK_ACCEPT_REJECT);
  const { t } = useTranslation();
  const dialog = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleconfirmAccept = async () => {
    setIsLoading(true);

    try {
      const responseAccept = await taskMutate({
        variables: {
          input: {
            last_modified_by: last_modified_by,
            task_status: 'Accepted',
            title: title,
          },
        },
        onCompleted: (res) => {
          handleReload();
        },
      });
      setIsLoading(false);

      showToastSuccess(responseAccept.data.authoring_updateTask.message);
    } catch (err: any) {
      showToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast')
      );
      setIsLoading(false);
      // setShowIcon(true);
    }
  };


  const handleconfirmReject = async () => {
    setIsLoading(true);

    try {
      const responseAccept = await taskMutate({
        variables: {
          input: {
            last_modified_by: last_modified_by,
            task_status: 'Rejected',
            title: title,
          },
        },
        onCompleted: (res) => {
          handleReload();
        },
      });
      setIsLoading(false);
      showToastSuccess(responseAccept.data.authoring_updateTask.message);
    } catch (err: any) {
      showToastError(
        err.graphQLErrors.length > 0
          ? err.graphQLErrors[0].message
          : t('api_error_toast')
      );
      setIsLoading(false);
    }
  };

  const handleReject = () => {
    const dialogContent: DialogBoxContentProps = {
      Image: warningIcon,
      Title: t('Reject_Task'),
      Subtitle: `${t('reject_subtitle')}
   ${'  '}${t('')}`,

      LeftButtonText: t('No'),
      RightButtonText: t('Yes'),
    };
    dialog.show(dialogContent, handleconfirmReject, handleDialogClose);
  };

  return (
    <>
      <Box className={classes.Tasklistbox}>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: { xs: 'flex-start', em: 'center' },
          }}
        >
          <Grid xs={12} md={12} lg={6}>
            <Box
              sx={{
                cursor:'pointer',
                display: { xs: 'flex', em: 'none' },
                padding: ' 19px 0px',
                minWidth: { xs: 'auto', em: '170px' },
                minHeight: { xs: '20px', em: '40px' },
              }}
            >
              <Box className={classes.BoxReview}>
                <Typography
                  variant='h7medium'
                  sx={{ padding: '3px 4px', whiteSpace: 'nowrap' }}
                >
                  Ready for review
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                margin: '0px 10px',

                justifyContent: 'space-between',
                paddingBottom: { md: '20px', em: '0px' },
              }}
            >
              <Box sx={{  display: 'flex',alignItems:'center' }}>
                <Box
                  className={classes.BoxImage}
                  sx={{
                    marginRight: { xs: '10px', md: '20px' },
                    display: { xs: 'flex' },
                  }}
                >
                  <img
                   src={iconsList[document_type]}
                    style={{ width: '100%', objectFit: 'cover' }}
                  />
                </Box>
                <Box
                  sx={{ maxWidth: { md: '575px', em: '376px', lg: '396px' },display:'flex',justifyItems:'center',flexDirection:'column' }}
                >
                  <Typography
                    className={classes.Title}
                    variant='h5bold'
                    sx={{
                      marginBottom: '2px',
                    }}
                  >
                    {document_title}
                  </Typography>
                  <Box
                    sx={{
                      display: { xs: 'none', lg: 'inline-block' },
                      flexWrap: { xs: 'wrap', em: 'inherit' },
                      alignItems: { xs: 'flex-start', em: 'center' },
                      flexDirection: { xs: 'row', em: 'row' },
                    }}
                  >
                    <Typography
                      className={classes.Description}
                      variant='h6regular'
                      sx={{
                        order: { xs: 2, em: 1 },
                      }}
                    >
                      {description}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: {
                        em: 'flex',
                        lg: 'none',
                      },
                      padding: {
                        xs: '0 10px 0 0',
                        md: '0 15px 0 0',
                      },
                      minWidth: { xs: 'auto', em: '170px' },
                      minHeight: { xs: '20px', em: '40px' },
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant='h7regular'>{created_by}</Typography>
                    <Box className={classes.Blackdot}></Box>
                    <Typography
                      variant='h7regular'
                      sx={{ paddingLeft: '10px' }}
                    >
                      {dateFormat(creation_date)}
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  display: { xs: 'none', md: 'flex', em: 'none' },
                  justifyContent: 'flex-end',
                  color: '#89909A',
                }}
              >
                {task_status === 'Accepted' ? (
                  <Box
                    sx={{
                      justifyContent: 'center',
                      display: { xs: 'none', md: 'flex', em: 'none' },
                      width: ' 135px',
                      marginRight: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    <VisibilityIcon />
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: { xs: 'none', md: 'flex', em: 'none' },
                        alignItems: 'center',
                        paddingLeft: '10px',
                      }}
                    >
                      <Button
                        variant='contained'
                        onClick={() => handleconfirmAccept()}
                        sx={{
                          maxHeight: '40px',
                          minWidth: '79px !important',
                          borderRadius: '5px',
                        }}
                      >
                        Accept
                      </Button>
                    </Box>
                    <Box
                        onClick={() => handleReject()}
                      className={classes.CrossIcon}
                      sx={{
                        display: { xs: 'none', md: 'flex', em: 'none' },
                      }}
                    >
                      <CloseIcon fontSize='small' />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} md={12} lg={6}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'flex-end', em: 'flex-end' },
              }}
            >
              <Box
                className='d-flex align-items-center justify-content-end'
                sx={{
                  display: { xs: 'none', em: 'flex' },
                  padding: {
                    xs: '0 10px',
                    em: '0 20px',
                  },
                  minWidth: { xs: 'auto', em: '150px' },
                  borderLeft: {
                    xs: '1px solid #CED3D9',
                    em: '1px solid #CED3D9',
                  },
                  borderRight: {
                    xs: '1px solid #CED3D9',
                    em: '1px solid #CED3D9',
                  },
                  minHeight: { xs: '20px', em: '40px' },
                }}
              >
                <Box className={classes.BoxReview}>
                  <Typography
                    variant='h7regular'
                    sx={{ padding: '3px 4px', whiteSpace: 'nowrap' }}
                  >
                    Ready for review
                  </Typography>
                </Box>
              </Box>
              <Box
                className='webdatetime'
                sx={{
                  display: {
                    xs: 'none',
                    lg: 'flex',
                  },
                  flexDirection: 'column',
                  padding: {
                    xs: '0 10px 0 0',
                    md: '0 15px 0 0',
                    em: '0 30px',
                  },
                  minWidth: { xs: 'auto', em: '170px' },
                  marginRight: { xs: '15px' },
                  minHeight: { xs: '20px', em: '40px' },
                  borderLeft: { xs: '0', em: '1px solid #CED3D9' },
                  borderRight: '1px solid #CED3D9;',
                }}
              >
                <Box>
                  {' '}
                  <Typography variant='h7regular' component='div'>
                    {created_by}
                  </Typography>
                </Box>
                <Box>
                  {' '}
                  <Typography variant='h7regular' component='div'>
                    {dateFormat(creation_date)}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  color: '#89909A',
                }}
              >
                {task_status === 'Accepted' ? (
                  <Box
                    sx={{
                      justifyContent: 'center',
                      display: { xs: 'none', em: 'flex' },
                      width: ' 135px',
                      marginRight: '15px',
                      cursor: 'pointer',
                    }}
                  >
                    <VisibilityIcon />
                  </Box>
                ) : (
                  <>
                    <Box
                      sx={{
                        display: { xs: 'none', em: 'flex' },
                        alignItems: 'center',
                        paddingLeft: '10px',
                      }}
                    >
                      <Button
                        variant='contained'
                        onClick={() => handleconfirmAccept()}
                        sx={{
                          maxHeight: '40px',
                          minWidth: '79px !important',
                          borderRadius: '5px',
                        }}
                      >
                        Accept
                      </Button>
                    </Box>
                    <Box
                        onClick={() => handleReject()}
                      className={classes.CrossIcon}
                      sx={{
                        display: {
                          xs: 'none',
                          em: 'flex',
                          marginRight: '10px',
                        },
                      }}
                    >
                      <CloseIcon fontSize='small' />
                    </Box>
                  </>
                )}
              </Box>
            </Box>
            <Box
              className={classes.Button}
              sx={{
                display: { xs: 'flex', md: 'none' },
                paddingRight: { md: '250px' },
              }}
            >
              {task_status === 'Accepted' ? (
                <VisibilityIcon />
              ) : (
                <>
                  <Button
                    variant='contained'
                    onClick={() => handleconfirmAccept()}
                    sx={{
                      maxHeight: '40px',
                      minWidth: '79px !important',
                      borderRadius: '5px',
                    }}
                  >
                    Accept
                  </Button>
                  <Button
                    variant='outlined'
                    sx={{
                      maxHeight: '40px',
                      minWidth: '79px !important',
                      borderRadius: '5px',
                    }}
                  >
                    Reject
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ListView;
