import { makeStyles } from '@material-ui/core';
import {ThemeConstants} from '@platformx/utilities'
import { SiteTopBarStyleProp } from './SiteTopBar.type';

export const useSiteTopBarStyle = ({
  isShowPreview,
  buttonStyle,
}: SiteTopBarStyleProp) =>
  makeStyles((theme) => ({
    errorOutlineIcon: {
      flexWrap: 'wrap',
      borderRight: '1px solid #D9DBE9',
      marginRight: '10px',
      paddingRight: '12px',
      alignContent: 'center',
      justifyContent: 'center',
      height: '38px',
      // color: isShowPreview ? '#4B9EF9' : '#14142B',
      color: isShowPreview ? ThemeConstants.BLUE_COLOR : '#14142B',
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
      },
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },

    saveButton: {
      '&:disabled': {
        fontSize: ThemeConstants.FONTSIZE_SM,
        backgroundColor: ThemeConstants.LIGHT_GRAY_VARIENT1,
        color: ThemeConstants.LIGHT_GRAY_VARIENT2,
      },
      height: '42px',
      backgroundColor: '#14142B',
      borderRadius: '5px',
      ...buttonStyle,
    },

    firstHeader: {
      display: 'flex',
      position: 'sticky',
      top: 0,
      zIndex: 2,
      backgroundColor: ThemeConstants.WHITE_COLOR,
      borderBottom: 'solid 1px #ced3d9',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      [theme.breakpoints.up('xs')]: {
        height: '70px',
        padding: '16px 14px',
      },
      [theme.breakpoints.up('sm')]: {
        height: '58px',
        padding: '10px 20px',
      },
    },

    firstHeaderBackArrow: {
      color: ThemeConstants.PRIMARY_MAIN_COLOR,
      cursor: 'pointer',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '15px',
      [theme.breakpoints.up('xs')]: {
        display: 'flex',
      },
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },

    firstHeaderLeft: {
      display: 'flex',
    },

    firstHeaderRight: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    secondHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      width: ' 100%',
      position: 'sticky',
      background: ThemeConstants.WHITE_COLOR,
      zIndex: 2,
      [theme.breakpoints.up('xs')]: {
        borderBottom: 0,
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '15px',
      //  height: '100px',
        marginBottom: 0,
        top: '70px',
      },
      [theme.breakpoints.up('sm')]: {
        borderBottom: 'solid 1px #ced3d9',
        marginBottom: '32px',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '68px',
        padding: '13px 20px',
        top: '58px',
      },
    },

    secondHeaderLeft: {
      display: 'flex',
      alignItems: 'center',
      [theme.breakpoints.up('xs')]: {
        width: '100%',
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: '36%',
      },
    },

    secondHeaderBackArrow: {
      color: ThemeConstants.PRIMARY_MAIN_COLOR,
      cursor: 'pointer',
      width: '40px',
      height: '40px',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: '20px',
      padding: '0px 8px',
      backgroundColor: ThemeConstants.WHITE_COLOR,
      border: '1px solid #d9dbe9',
      borderRadius: '4px',
      [theme.breakpoints.up('xs')]: {
        display: 'none',
      },
      [theme.breakpoints.up('sm')]: {
        display: 'flex',
      },
    },

    secondHeaderRight: {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      [theme.breakpoints.up('xs')]: {
        maxWidth: '100%',
        marginTop: '14px',
      },
      [theme.breakpoints.up('sm')]: {
        maxWidth: '77%',
        marginTop: 0,
      },
    },

    iconContainer: {
      display: 'flex',
      alignItems: 'center',
      overflow: 'auto',
      // flexWrap: 'nowrap',
      justifyContent: 'flex-start',
      [theme.breakpoints.up('xs')]: {
        // justifyContent: 'flex-start',
      },
      [theme.breakpoints.up('sm')]: {
        // justifyContent: 'flex-end',
      },
      ['::-webkit-scrollbar']: {
        display: 'none',
      },
    },

    iconList: {
      display: 'flex',
      cursor: 'pointer',
    },

    iconBox: {
      paddingLeft: 0,
      fontSize: ThemeConstants.FONTSIZE_H7,
      fontFamily: 'Inter',
      fontWeight: ThemeConstants.FONTWEIGHT_MEDIUM,
      width: 'fit-content',
      alignItems: 'center',
      display: 'flex',
      '&:hover $hidden': {
        display: 'block',
      },
    },

    empty: {},
    hidden: { display: 'none' },

    dividerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 10px',
    },

    divider: {
      width: '20px',
      height: '0px',
      border: '1px solid #D9DBE9',
    },

    icon: {
      borderRadius: '5px',
      marginRight: '10px',
      width: '28px',
      height: '28px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    logoContainer: {
      display: 'flex',
    },
  }));
