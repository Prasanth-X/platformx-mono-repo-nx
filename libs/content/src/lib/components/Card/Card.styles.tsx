import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  BoxWorkflowStatus: {
    justifyContent: 'center',
    minWidth: '160px',
    height: '38px',
    borderLeft: ' 1px solid #ced3d9',
    padding: '0px 15px',
    marginLeft: '12px',
  },
  TypoWorkFlowStatus: {
    padding: '3px 4px',
    whiteSpace: 'nowrap',
    display: 'flex',
    border: 'solid 1px #0FA069',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: '3px',
    cursor: 'pointer',
    color: '#0FA069',
  },
}));
