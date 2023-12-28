import { makeStyles } from '@mui/styles';

const usePopupStyle = makeStyles((theme) => ({
  container: {
    height: '68px',
    width: '100%',
    textAlign: 'center',
    borderRadius: '5px',
    border: '1px solid #D9DBE9',
    marginBottom: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px',
    position: 'relative',
  },
  innercontainer: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  sitedropdownicon: {
    width: '10%',
  },
  sitescontent: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',
    marginLeft: '10px',
    wordBreak: 'break-all',
    lineHeight: '22px',
    alignItems: 'center',
    textAlign: 'left',
  },
  contentcontrol: {
    width: '97.5%',
    wordBreak: 'break-all',
  },
  sitecontenttypo: {
    marginLeft: '30px',
    marginTop: '5px',
    marginBottom: '10px',
    lineHeight: '20px',
  },
  closeicon: {
    marginRight: '5px',
  },
  keyrighticon: {
    margin: 'auto',
    position: 'absolute',
    top: 0,
    right: '7px',
    bottom: 0,
  },
  settingicon: {
    marginRight: '10px',
  },
  borderbottomtype: {
    borderBottom: '1px solid #D9DBE9',
    marginTop: '5px',
  },
  sitesearchform: {
    marginTop: '5px',
  },
  boxsize: {
    width: '100%',
    padding: ' 20px',
    borderRadius: '5px',
  },
  searchwrapper: {
    marginTop: '16px',
  },
  containerboxsize: {
    height: '335px',
    overflowY: 'auto',
    marginTop: '20px',
    paddingRight: '5px',
  },
  popupCloseButton: {
    cursor: 'pointer',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    position: 'relative',
    right: '-5px',
  },
  viewtypography: {
    display: 'flex',
    textDecoration: 'underline',
    marginTop: '15px',
    marginLeft: '25px',
    borderBottom: '1px solid #D9DBE9',
  },
  typographyadmin: {
    display: 'flex',
    marginTop: '20px',
    textDecoration: 'underline',
    marginLeft: '1px',
    cursor: 'pointer',
  },
  toptypography: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  noResult: {
    marginTop: '20px',
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
  avatarbox: {
    width: '40px !important',
    height: '40px !important',
    textTransform: 'uppercase',
    backgroundColor: '#4B9EF9 !important',
  },
  dialogPaper: {
    width: '100%',
  },
  siteTitle: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    wordBreak: 'break-all',
    paddingRight: '20px',
  },
}));
export default usePopupStyle;
