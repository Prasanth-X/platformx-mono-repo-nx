import { makeStyles } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';;
export const useGlobalSettingStyle = ({ isShowPreview }) =>
  makeStyles((theme) => ({
    pageContainer: {
      [theme.breakpoints.up('xs')]: {
        padding: '15px',
      },
      [theme.breakpoints.up('sm')]: {
        padding: '15px',
      },
    },

    contentContainer: {
      maxWidth: '820px',
      margin: 'auto',
      paddingBottom: '70px'
    },

    leftForm: {
      [theme.breakpoints.up('xs')]: {
        paddingRight: '0',
        borderRight: '0',
      },
      [theme.breakpoints.up('sm')]: {
        paddingRight: '32px',
        borderRight: '1px solid #D9DBE9',
      },
    },

    rightForm: {
      [theme.breakpoints.up('xs')]: {
        padding: '24px 0 0 0',
        borderTop: '1px solid #D9DBE9',
        marginTop: '24px',
        display: isShowPreview ? 'block' : 'none',
      },
      [theme.breakpoints.up('sm')]: {
        padding: '0 0 15px 32px',
        borderTop: '0',
        marginTop: '0',
        display: 'block',
      },
    },

    pictureIconContainer: {
      height: '57px',
      width: '57px',
      backgroundColor: '#EFF0F7',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px',
    },
    globalContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      minHeight: '75px',
      borderRadius: '5px',
      border: "1px solid #D9DBE9",
      borderColor: '#D9DBE9',
      backgroundColor: '#FCFCFC',
      overflow: 'hidden'

    },
    globalimg: {
      width: '45px',
      height: '45px',
      borderRadius: '5px',
      backgroundColor: '#EFF0F6',
      padding: '10px',
      marginLeft: '12px',
      marginTop: '12px'
    },

    addNewBtnBox: {
      fontFamily: 'Inter',
      fontStyle: 'normal',
      fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
      fontSize: ThemeConstants.FONTSIZE_H7,
      lineHeight: '25px',
      marginLeft: '13px',
    },
    globalbread: {
      marginLeft: '10px',
      display: 'flex',
      alignItems: 'center'
      // [theme.breakpoints.up('xs')]: {
      // marginTop: '4px'
      // },
      // [theme.breakpoints.up('md')]: {
      //   marginTop: '11px'
      //   },
    },
    marginTop5px: {
      marginTop: '5px'
    }

  }));
