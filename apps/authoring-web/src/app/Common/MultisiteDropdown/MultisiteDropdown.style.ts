import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(() => ({
    dropdownmenu: {
        '& div:nth-child(3)': {
            overflow: "visible"
        },
        '& ul:after': {
            content: "''",
            position: 'absolute',
            top: '-7px',
            left: '14px',
            width: 0,
            height: 0,
            borderStyle: 'solid',
            borderRight: '8px solid transparent',
            borderLeft: '8px solid transparent',
            borderBottom: '8px solid #ffffff',
            borderTop: 0
        }
    }

}));
