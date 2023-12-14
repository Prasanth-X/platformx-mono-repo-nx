import TaskTopHeader from './TaskTopHeader';
import Tasks from './ListView';
import ListView from './ListView';
import { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';

// import userManagementAPI from '../../../services/userManagement/UserManagement.api';
import workflowApi from '../../services/workflow/workflow.api';
import NoResultsFound from '../../Common/NoResultsFound';
export default function TaskList() {
  const [isLazyLoad, setIsLazyLoad] = useState<boolean>(true);
  const [isloading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const getList = async () => {
    try {
      const response: any = await workflowApi.getUserAssignedTaskList();
      console.log('my response is', response);
      if (
        response?.authoring_getUserAssignedTaskList &&
        response?.authoring_getUserAssignedTaskList?.length > 0
      ) {
        // const getUserAssignedTaskList = [
        //  response?.authoring_getUserAssignedTaskList || [],
        // ];
        //  console.log("my getUserTaskList is", getUserTaskList)
        // console.log('list', getUserAssignedTaskList);
        setList([
          ...((response && response.authoring_getUserAssignedTaskList) || []),
        ]);
      }
      console.log('task list is ', list);
      setIsLazyLoad(false);
      setLoading(false);
    } catch (err: any) {
      setIsLazyLoad(false);
      setLoading(false);
      console.log('error', err);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Box>
        {list?.length > 0 ? (
          <>
            <Box sx={{ padding: { xs: '10px', md: '20px 20px 0 20px' } }}>
              <TaskTopHeader />
            </Box>
            {/* {list?.length > 0 && ( */}
            <Box
              sx={{
                padding: '20px 20px 0px 15px',
                height: 'calc(100vh - 140px)',
                overflowY: 'auto',
              }}
              id='scrollableDiv'
            >
              {list?.map((item) => (
                <ListView
                  approval_status={item.approval_status}
                  created_by={item.created_by}
                  creation_date={item.creation_date}
                  description={item.description}
                  document_path={item.document_path}
                  document_title={item.document_title}
                  document_type={item.document_type}
                  due_date={item.due_date}
                  last_modification_date={item.last_modification_date}
                  last_modified_by={item.last_modified_by}
                  stage={item.stage}
                  task_status={item.task_status}
                  title={item.title}
                  user_id={item.user_id}
                  user_name={item.user_name}
                  workflow_id={item.workflow_id}
                  workflow_name={item.workflow_name}
                  __typename={item.__typename}
                  handleReload={getList}
                />
              ))}
            </Box>
          </>
        ) : (
          list?.length == 0 && <NoResultsFound />
        )}
      </Box>
    </>
  );
}
