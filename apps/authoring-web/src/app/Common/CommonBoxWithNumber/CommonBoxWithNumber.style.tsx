import { makeStyles } from '@material-ui/core';

import useTheme from '@mui/material/styles/useTheme';
import { ThemeConstants } from '@platformx/utilities';

export const useCustomStyle = makeStyles(() => {
  const theme = useTheme();
  return {
    commonBoxWithNumber: {
      '&.commonBoxWithNumber': {
        background: ThemeConstants.PRIMARY_MAIN_COLOR,
        borderRadius: '5px',
        border: '1px solid #D9DBE9',
        margin: '30px auto',
        maxWidth: '820px',
        [theme?.breakpoints?.down('lg')]: {
          margin: '15px',
        },
        '& .headerWrapper': {
          padding: '12px 20px',
          borderBottom: '1px solid #D9DBE9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          '& .numberBox': {
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
        },
        '& .contentWrapper': {
          padding: '30px 20px',
        },
      },
    },
  };
});
