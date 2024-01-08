import { Box, Skeleton } from '@mui/material';
import TasksPageRow from '../taskPageRow/TasksPageRow';
import { TaskPagesProps } from './TaskPages.type';
const TaskPages = ({ taskPages, fetchDashBoardData, changeStatus, edit }: TaskPagesProps) => {
  if (!taskPages || taskPages.length === 0) {
    <Skeleton animation='wave' height={10} width='80%' />;
  }
  return (
    <Box>
      {taskPages?.length > 0 &&
        taskPages.map((item: any, index: number) => (
          <TasksPageRow
            fetchDashBoardData={fetchDashBoardData}
            key={index}
            {...item}
            edit={edit}
            objData={item}
            changeStatus={changeStatus}
          />
        ))}
    </Box>
  );
};

export default TaskPages;
