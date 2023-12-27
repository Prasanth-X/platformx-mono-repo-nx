import { makeStyles } from '@material-ui/core';

const useMenuStyle = makeStyles((theme) => ({
    box: {
        display: 'flex',
        marginTop: '10px',
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center'
        },
        [theme.breakpoints.up('xs')]: {
            flexDirection: 'row-reverse'
        },
    },
   
    dropdowncontain: {
        display: 'flex',
       width: '220px',
        height: '50px',
        borderRadius: '5px',
        background: '#F3FAFF',
        padding: '10px 6px 10px 6px',
        marginLeft: '15px',
        cursor: 'pointer'

    },
    dropdowntypo:{
        marginLeft: '20px !important',
        marginTop: '2px'
    },
    dropdownimg:{
        marginLeft: '76px',
         width: '11px'
    },

    UserAvatar:{
        backgroundColor: '#4B9EF9 !important', 
        width: '38px !important', 
        height: '38px !important', 
        marginTop: '-5px', 
        textTransform: 'uppercase' 
    }
   
}))

export default useMenuStyle