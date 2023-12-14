import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Loader from '../../Common/Loader';
import workflowApi from '../../services/workflow/workflow.api';
import { historyListMapper } from './Utils/Mapper';
import { useStyles } from './WorkflowHistory.styles';
import WorkflowHistoryDetails from './WorkflowHistoryDetails/WorkflowHistoryDetails';
import { HistoryProps } from './WorkflowHistoryDetails/WorkflowHistoryDetails.types';
import WorkflowStages from './WorkflowStages/WorkflowStages';

function WorkflowHistory({ workflow, setEnableWorkflowHistory }) {
  const classes = useStyles();
  const [historyList, setHistoryList] = useState<HistoryProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const getHistory = async (path) => {
    try {
      const response: any = await workflowApi.getWorkflowHistory({
        document_path: path,
      });
      if (
        response?.authoring_getDocumentHistory &&
        response?.authoring_getDocumentHistory?.length > 0
      ) {
        setHistoryList(
          historyListMapper(response?.authoring_getDocumentHistory) || []
        );
      }
      setIsLoading(false);
    } catch (err: any) {
      setIsLoading(false);
      console.log('error', err);
    }
  };

  useEffect(() => {
    const { path = '' } = workflow;
    if (path !== '') {
      getHistory(path);
    } else {
      setIsLoading(false);
    }
  }, [workflow]);

  return (
    <Grid container>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid item xs={12} md={1}>
            <Box className={classes.backIconContainer}>
              <ArrowBackIcon
                className={classes.icon}
                onClick={() => setEnableWorkflowHistory(false)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={11} em={10}>
            <WorkflowStages stages={workflow?.stages} />
            {historyList.length > 0 && (
              <WorkflowHistoryDetails history={historyList} />
            )}
          </Grid>
        </>
      )}
    </Grid>
  );
}

export default WorkflowHistory;
