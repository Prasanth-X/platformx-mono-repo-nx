import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid, Typography } from '@mui/material';
import { WorkflowDetails } from '@platformx/utilities';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { useStyles } from './Workflow.styles';
type WorkflowProps = {
  returnBack: () => void;
  workflowDetails: any;
};
const Workflow = ({ returnBack, workflowDetails }: WorkflowProps) => {
  const classes = useStyles();
  const [contentType, setContentType] = useState('');

  useEffect(() => {
    let tempStr = '';
    workflowDetails?.content_type.forEach((val: any) => {
      tempStr = `${tempStr}${val}, `;
    });
    let str =
      tempStr.slice(0, tempStr.lastIndexOf(',')) +
      ' ' +
      tempStr.slice(tempStr.lastIndexOf(',') + ' '.length);
    setContentType(str);
  }, [workflowDetails]);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: {
          sm: 'calc(100vh - 73px)',
          xs: 'calc(100vh - 107px)',
        },
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Box
        className="createarticlebottomhead"
        sx={{ marginTop: '15px', display: { xs: 'none', md: 'flex' } }}
      >
        <Box className="d-flex align-items-center justify-content-space-between">
          <Box className="backarrow" onClick={returnBack}>
            <ArrowBackIcon />
          </Box>
        </Box>
      </Box>
      <Grid
        container
        className={classes.dFlexItemCenter}
        sx={{
          padding: {
            xs: '0 10px 30px 10px',
            em: '0 20px 30px 20px',
          },
        }}
      >
        <Grid
          item
          xs={12}
          md={7}
          lg={7}
          sx={{
            flexDirection: 'column',
          }}
        >
          <Box className={classes.contentStyle}>
            <img
              src={WorkflowDetails}
              alt="Workflow"
              style={{
                borderRadius: '10px',
                maxWidth: '100%',
                width: ' -webkit-fill-available',
              }}
            />
          </Box>
          <Box
            sx={{
              padding: { em: '30px 25px 10px 25px', xs: '30px 10px 10px 10px' },
            }}
          >
            <Typography
              sx={{ fontSize: '20px', fontWeight: 600, fontFamily: 'Inter' }}
            >
              {workflowDetails?.name}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: { em: '0px 0px 10px 25px', xs: '0px 0px 10px 10px' },
            }}
          >
            <Typography variant="h5regular" sx={{ fontFamily: 'Inter' }}>
              {workflowDetails?.description}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: { em: '0px 0px 0px 25px', xs: '0px 0px 0px 10px' },
              width: 'fit-content',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '5px 9px 5px 0px',
              }}
            >
              <Typography
                variant="h7regular"
                sx={{ color: '#6E7191' }}
                component="div"
              >
                {t('using_for')}
              </Typography>
            </Box>
          </Box>
          <Box
            className="datetimeweb"
            sx={{ padding: { em: '0px 0px 0px 25px', xs: '0px 0px 0px 10px' } }}
          >
            <Typography variant="h7regular" component="div">
              {contentType}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default Workflow;
