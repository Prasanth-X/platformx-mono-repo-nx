import { makeStyles } from '@material-ui/core';

const usePopupStyle = makeStyles((theme) => ({

    container: {
        height: '68px',
        textAlign: 'center',
        borderRadius: '5px',
        border: '1px solid #D9DBE9',
        marginTop: '16px',
        cursor: 'pointer'
          
    },
    innercontainer: {
        display: 'flex',
        marginTop: '8px',
        marginLeft: '8px'
    },
    sitedropdownicon:{
        width: '10%'
    },
    sitescontent:{
        display: 'flex', 
        width: '90%', 
        justifyContent: 'space-between',
        marginLeft: '30px',
         marginTop: '5px'
    },
    sitecontenttypo:{
        marginLeft: '30px', 
        marginTop: '5px' 

    },
    keyrighticon:{
        paddingRight:"6px", 
        marginTop: '5px'
    },
    settingicon:{
        marginRight: '15px'   
    },
    borderbottomtype:{
        borderBottom: '1px solid #D9DBE9',
         marginTop: '5px', 
         height: '56px'
    },
    sitesearchform:{
        marginTop: '5px'
    },
  
   
    boxsize: {
        height: '420px',
        padding: ' 0px 30px',
        borderRadius: '5px',
    },
    viewtypography: {
        display: 'flex',
        textDecoration: 'underline',
         marginTop: '15px',
         marginLeft: '25px',
        borderBottom: "1px solid #D9DBE9"
    },
    typographyadmin: {
        display: 'flex',
        marginTop: '83px',
        textDecoration: 'underline',
        marginLeft: '20px',
        cursor: 'pointer'
    },
    toptypography: {
        display: 'flex',
        marginTop: '15px',
        justifyContent: 'space-between'
    },
    inputbox: {
        width: '350px',
        height: '68px',
        borderRadius: '5px',
        marginTop: '10px',
        marginLeft: '25px',
        border: '1px solid #D9DBE9',
        cursor: 'pointer',
    },
    avatarbox:{
        width: '38px !important',
        height: '38px !important',
        textTransform: 'uppercase',
        backgroundColor: '#4B9EF9 !important'

    
    },
}))
export default usePopupStyle