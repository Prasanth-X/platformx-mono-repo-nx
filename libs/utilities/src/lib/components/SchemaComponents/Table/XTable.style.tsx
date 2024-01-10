import useTheme from '@mui/material/styles/useTheme';
import { makeStyles } from '@mui/styles';

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    quotesTable: {
      '& table': {
        border: '1px solid #ced3d9',
        borderSpacing: '0px',
        width: '100%',
        '& tr': {
          fontSize: '12px',
          fontWeight: 'normal',
          color: '#5c6574',
          height: '30px',
          '& th': {
            height: '100%',
            gap: '10px',
            padding: '6px 10px',
            fontSize: '14px',
            color: '#89909a',
            fontWeight: 'normal',
          },
          '& td': {
            textAlign: 'center',
            borderRight: '1px solid #ced3d9',
            borderSpacing: '0px',
            height: 'inherit',
          },
        },
      },
    },
  };
});
