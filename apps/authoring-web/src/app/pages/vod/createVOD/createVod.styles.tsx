import { makeStyles } from '@material-ui/core';

import useTheme from '@mui/material/styles/useTheme';

export const useStyles = makeStyles(() => {
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
    createHeader: {
      padding: '10px',
      margin: '0px',
      display: 'flex',
      alignItems: 'center',
      minHeight: '62px',
    },

    outerContainer: {
      overflowY: 'auto',
      maxHeight: 'calc(100vh - 76px)',

      [theme.breakpoints.up('xs')]: {
        padding: '7.5px 0px 0px 0px ',
      },
      [theme.breakpoints.up('sm')]: {
        padding: '10px',
      },
    },
    innerContainer: {
      backgroundColor: '#ffffff',
      marginBottom: '12px',

      [theme.breakpoints.up('xs')]: {
        padding: '15px 30px 13px 30px',
      },
      [theme.breakpoints.up('sm')]: {
        padding: '40px 98px 40px 40px',
      },
    },
    addImageContainer: {
      [theme.breakpoints.up('xs')]: {
        width: '100%',
      },
      [theme.breakpoints.up('lg')]: {
        width: '80%',
      },
    },
  };
});
