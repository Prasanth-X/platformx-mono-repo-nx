import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Title from '../common/Title';
import { useStyles } from '../../Dashboard.styles';
import TaskCard from '../tasks/taskContent/TaskCard';
import TaskPages from '../tasks/taskPages/TasksPages';
import Dashboard from './Dashboard';
import { useDashboardData } from "@platformx/authoring-apis";
import { useUserSession } from "@platformx/utilities";

const Index = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const { dashBoard, edit, fetchDashBoardData, changeStatus } = useDashboardData();

  return (
      <Box className={classes.container}>
        <Box>
          <Title
            titleVarient='h1bold'
            titleColor='#4B9EF9'
            padding='0'
            title={t('greets_x')}
          />
        </Box>
        <Box>
          <Title titleVarient='h1bold' padding='0' title={userInfo?.name} />
        </Box>
        <Box mt='15px'>
          <TaskCard
            title={t('tasks')}
            titleVariant='h5bold'
            linkText={t('actions')}
          >
            {(dashBoard?.taskPages?.length || 0) > 0 && (
              <TaskPages
                taskPages={dashBoard?.taskPages}
                fetchDashBoardData={fetchDashBoardData}
                changeStatus={changeStatus}
                edit={edit}
              />
            )}
          </TaskCard>
        </Box>
        <Dashboard />
      </Box>
  );
};

export default Index;
