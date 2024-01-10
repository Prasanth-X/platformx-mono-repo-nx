import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => {
  return {
    commonBoxWithNumber: {
      borderRadius: '5px',
      border: '1px solid #D9DBE9',
      margin: '30px auto',
      maxWidth: '820px',
      // minHeight: '280px',
      // paddingLeft: '10px',
    },
    headerWrapper: {
      padding: '12px 20px',
      borderBottom: '1px solid #D9DBE9',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    numberBox: {
      width: '56px',
      height: '48px',
      color: '#8CC8FA',
      fontWeight: '700',
      fontSize: '30px',
      lineHeight: '48px',
      borderRight: '1px solid #8CC8FA',
      paddingRight: '20px',
      marginRight: '20px',
    },

    contentWrapper: {
      padding: '50px 40px',
      wordBreak: 'break-all',
      paddingRight: '0px',
    },
  };
});
