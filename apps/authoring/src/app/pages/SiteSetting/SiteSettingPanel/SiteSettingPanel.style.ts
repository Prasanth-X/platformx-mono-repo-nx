import { makeStyles } from '@material-ui/core';

export const useSiteSetiingPanelStyle = ({ panelStyle, counterStyle }) =>
  makeStyles((theme) => ({
    panelContainer: {
      border: '1px solid #D9DBE9',
      borderRadius: '5px',
      ...panelStyle,
    },

    panelContent: {
      padding: '12px 20px',
      borderBottom: '1px solid #D9DBE9',
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
      ...counterStyle,
    },
  }));
