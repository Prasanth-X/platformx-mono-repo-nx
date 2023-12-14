import { makeStyles } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';
import { border } from '@mui/system';;
export const useCookieSkeletonStyle = makeStyles((theme) => ({

    InformativeCookieSkeleton: {
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: 1000,
    },

    ConsetCookieSkeleton: {
        backgroundColor: '#F3FAFF',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        height: '194px',
        padding: '0 4px 0 15px',
        marginTop: '16px',
    },
    ConsetCookieSkeletonbox: {
        width: '100%'
    },
    ConsetCookieSkeletonboxtype: {

    },
    cookieTextfield: {
        background: '#EFF0F7',
        borderRadius: '5px',
        fontFamily: 'Inter !important',
        fontStyle: 'normal',
        padding: '5px 20px',
        height: '57px',
    },
    cookieTypo: {
        color: 'rgb(211,47,47)',
        marginTop: '10px',
        fontSize: '14px',
        marginLeft: '14px',

    },
    InputLabelProps: {
        top: '4px',
        left: '9px',
        fontFamily: 'Inter',
        fontSize: '14px',
        color: '#6E7191',
    },
    cookietextboxtypo: {
        color: '#5c6574',
        marginTop: '10px'
    },
    cookieTextAreaTypo: {
        color: '#5c6574',
        marginTop: '10px'
    },

    textAreAuto: {
        width: '100%',
        resize: 'none',
        padding: '20px',
        borderRadius: '5px',
        backgroundColor: '#EFF0F6',
        border: '0',
        fontFamily: 'inter'
    },
}));
