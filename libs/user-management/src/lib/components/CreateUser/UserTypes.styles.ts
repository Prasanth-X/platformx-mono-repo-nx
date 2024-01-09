import useTheme from '@mui/material/styles/useTheme';
import { makeStyles } from '@mui/styles';

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    chooseTagsWp: {
      '& .noSpacWp': {
        padding: '10px 0',
        '& .noSpace': {
          padding: 0,
        },
      },
    },
    mainStyleWrapper: {
      position: 'relative',
      maxWidth: '820px',
      margin: 'auto',
      '& .leftFiled': {
        marginBottom: '40px',
        paddingRight: '55px',
        [theme.breakpoints.down('md')]: {
          marginBottom: '30px',
          paddingRight: '10px',
        },
        [theme.breakpoints.down('sm')]: {
          marginBottom: '10px',
          paddingRight: '0px',
        },
      },
      '& .textFiled': {
        marginBottom: '40px',
        [theme.breakpoints.down('md')]: {
          marginBottom: '30px',
        },
      },

      '& .leftFiledLast': {
        paddingRight: '55px',
        [theme.breakpoints.down('md')]: {
          paddingRight: '10px',
        },
        [theme.breakpoints.down('sm')]: {
          marginBottom: '10px',
          paddingRight: '0px',
        },
      },
      '& .textFiledLast': {
        marginBottom: '0px',
      },
      '& .quotesTable': {
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
      '& .bottomLinksWp': {
        display: 'flex',
        alignItems: 'center',
        marginTop: '10px',
      },
      '& .blueLink': {
        color: '#4B9EF9',
        cursor: 'pointer',
        textTransform: 'capitalize',
      },
      '& .seoLinkDevider': {
        width: '1px',
        height: '21px',
        flexGrow: 0,
        transform: 'rotate(-180deg)',
        backgroundColor: '#89909a',
        marginRight: '30px',
        marginLeft: '30px',
        [theme.breakpoints.down('md')]: {
          marginRight: '5px',
          marginLeft: '5px',
        },
      },
    },
  };
});
