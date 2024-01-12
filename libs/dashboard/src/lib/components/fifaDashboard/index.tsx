import { Box } from '@mui/material'
import { useDashboardData } from '@platformx/authoring-apis'
import { useUserSession } from '@platformx/utilities'
import { useTranslation } from 'react-i18next'
import { useStyles } from '../../dashboards.styles'
import Title from '../common/Title'
import TaskCard from '../tasks/taskContent/TaskCard'
import TaskPages from '../tasks/taskPages/TasksPages'
import Dashboard from './Dashboard'

const Index = () => {
  const classes = useStyles()
  const { t } = useTranslation()
  const [getSession] = useUserSession()
  const { userInfo } = getSession()
  const { dashBoard, edit, fetchDashBoardData, changeStatus } =
    useDashboardData()

  return (
    <Box className={classes.container}>
      <Box sx={{ display: {xs: 'block', em: 'flex' }}}>
        <Title
          titleVarient="h2bold"
          titleColor="#4B9EF9"
          padding="0 5px 0 0"
          title={t('greets_x')}
        />
        <Title titleVarient="h2bold" title={userInfo?.name} />
      </Box>
      <Box mt="15px">
        <TaskCard
          title={t('tasks')}
          titleVariant="h5bold"
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
  )
}

export default Index
