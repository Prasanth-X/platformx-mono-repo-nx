import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import CellWrapper from '../CellWrapper/CellWrapper';
import { useStyles } from './WorkflowHistoryDetails.styles';
import { HistoryList, HistoryProps } from './WorkflowHistoryDetails.types';

export default function WorkflowHistoryDetails({ history }: HistoryList) {
  const { t } = useTranslation();
  const classes = useStyles();
  const theme = useTheme();
  const ifTab = useMediaQuery(theme.breakpoints.up('md'));

  const getBreakPoint = () => {
    return ifTab;
  };

  const historySummary = ({ action, user, owner }: HistoryProps) => {
    switch (action.toLowerCase()) {
      case 'pending':
        return `${user} ${t('pending_text')}`;
      case 'accepted':
        return `${owner} ${t('accepted_text')}`;
      case 'completed':
        return `${owner} ${t('completed_text')}`;
      case 'referred':
        return `${owner} ${t('referred_text')}`;
    }
  };

  return (
    <Box className={classes.container}>
      <TableContainer
        component={Paper}
        className={classes.tableContainer}
        sx={{ boxShadow: 'none' }}
      >
        {getBreakPoint() ? (
          <Table aria-label='simple table'>
            <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '20%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '30%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <CellWrapper
                  text={t('workflow_history')}
                  type='h5bold'
                  colSpan={5}
                  className={classes.TableHead}
                />
              </TableRow>
              <TableRow>
                <CellWrapper text={t('date_table')} type='h5bold' />
                <CellWrapper text={t('owner_table')} type='h5bold' />
                <CellWrapper text={t('user_table')} type='h5bold' />
                <CellWrapper text={t('action_table')} type='h5bold' />
                <CellWrapper text={t('summary_table')} type='h5bold' />
              </TableRow>
            </TableHead>
            <TableBody>
              {history.length > 0 &&
                history.map((row) => (
                  <TableRow key={String(row.date)}>
                    <CellWrapper
                      text={format(new Date(row.date), 'MMM d, yyyy')}
                      type='h6regular'
                    />
                    <CellWrapper
                      text={row.user}
                      type='h6regular'
                      role='author'
                    />
                    <CellWrapper
                      text={row.owner}
                      type='h6regular'
                      role={row.role}
                    />
                    <CellWrapper text={row.action} type='h6regular' />
                    <CellWrapper text={historySummary(row)} type='h6regular' />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        ) : (
          <Table>
            <colgroup>
              <col style={{ width: '50%' }} />
              <col style={{ width: '50%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <CellWrapper
                  text={t('workflow_history')}
                  type='h5bold'
                  colSpan={5}
                  className={classes.TableHead}
                />
              </TableRow>
            </TableHead>
            <TableBody>
              {history.length > 0 &&
                history.map((row) => (
                  <>
                    <TableRow key={String(row.date)}>
                      <CellWrapper
                        text={row.action}
                        type='h6bold'
                        className='none'
                        colSpan={2}
                      />
                    </TableRow>
                    <TableRow key={String(row.date)}>
                      <CellWrapper
                        text={format(new Date(row.date), 'MMM d, yyyy')}
                        type='h6regular'
                        colSpan={2}
                        className='none'
                        role={t('date_table')}
                      />
                    </TableRow>
                    <TableRow key={String(row.date)}>
                      <CellWrapper
                        text={row.user}
                        type='h6regular'
                        role={t('author')}
                        className='none'
                        colSpan={1}
                      />
                      <CellWrapper
                        text={row.owner}
                        type='h6regular'
                        role={row.role}
                        colSpan={1}
                        className='none'
                      />
                    </TableRow>
                    <TableRow key={String(row.date)}>
                      <CellWrapper
                        text={historySummary(row)}
                        type='h6regular'
                        colSpan={2}
                        role={t('summary_table')}
                        className='last'
                      />
                    </TableRow>
                  </>
                ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
