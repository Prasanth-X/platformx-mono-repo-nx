import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Title from '../common/Title';
import { useUserSession } from '@platformx/utilities';
import { useStyles } from '../../lib/dashboard.styles';
import TaskCard from '../Tasks/TaskContent/TaskCard';
import TaskPages from '../Tasks/TaskPages/TasksPages';
import Dashboard from './Dashboard';

const Index = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [getSession] = useUserSession();
  const { userInfo } = getSession();
  const { dashBoard, edit, fetchDashBoardData } = useDashboardData();

  return (
    <>
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
            {dashBoard?.taskPages?.length > 0 && (
              <TaskPages
                taskPages={dashBoard?.taskPages}
                fetchDashBoardData={fetchDashBoardData}
                edit={edit}
              />
            )}
          </TaskCard>
        </Box>
        <Dashboard />
      </Box>
    </>
  );
};

export default Index;
