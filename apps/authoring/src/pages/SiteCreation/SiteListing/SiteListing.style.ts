import { Grid, Link, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { styled } from '@mui/system';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';

export const useSiteListingStyle = makeStyles((theme) => ({
  container: {
    maxWidth: '1031px',
    padding: '0 20px',
    margin: 'auto',
    [theme.breakpoints.up('xs')]: {
      marginTop: '12px',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '26px',
    },
  },

  contentHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  cardListingDialog: {
    paddingLeft: '20px',
    marginTop: '8px',
    position: 'absolute',
    right: '-10px',
    [theme.breakpoints.up('xs')]: {
      marginLeft: 'initial',
    },
    [theme.breakpoints.up('md')]: {
      marginLeft: 'auto',
    },
  },
  headerBox: {
    display: 'flex',
    lineHeight: '40px',
  },

  iconBox: {
    display: 'flex',
    height: '40px',
    width: '40px',
    padding: '0px 8px',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    border: '1px solid #D9DBE9',
    background: '#FFF',
    marginRight: '15px',
  },

  addNewBtn: {
    padding: ' 9px 16px',
    fontFamily: 'HCLTech Roobert',
    fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
    fontSize: '14px',
    lineHeight: '20px',
    color: '#FFFFFF',
    textTransform: 'capitalize',
    bottom: '5px',
    right: '5px',
    border: '0',
    [theme.breakpoints.up('xs')]: {
      height: '56px',
      width: '56px',
      borderRadius: '50%',
      position: 'fixed',
      backgroundColor: '#A0A3BD',
      minWidth: 'unset',
    },
    [theme.breakpoints.up('sm')]: {
      height: '38px',
      width: 'fit-content',
      borderRadius: '5px',
      position: 'static',
      backgroundColor: '#14142B',
      minWidth: 'inherit',
    },
  },

  createNewTypo: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  plusIcon: {
    paddingTop: '5px',
    [theme.breakpoints.up('xs')]: {
      display: 'block',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  imgBox: {
    padding: '20px',
    border: '1px solid #D9DBE9',
    borderRadius: '5px',
    background: '#FFFFFF',
  },
  itemBox: {
    padding: '20px',
    border: '1px solid #D9DBE9',
    borderRadius: '5px',
    background: '#FFFFFF',
    transition: 'border-color 0.3s ease-in-out',
    cursor: 'pointer',
  },
  siteImg: {
    marginTop: '5px',
    borderRadius: '5px',
    objectFit: 'cover',
    cursor: 'pointer',
    width: "100%",
    height: "100%",
    [theme.breakpoints.up('xs')]: {
      width: "100%",
      height: "85%",
    },
  },

  imgContainer: {
    width: '100%',
    borderRadius: '5px',
    [theme.breakpoints.up('xs')]: {
      height: '223px',
    },
    [theme.breakpoints.up('sm')]: {
      height: '146px',
    },
  },

  siteDesSmUp: {
    [theme.breakpoints.up('xs')]: {
      display: 'none',
      wordwrap: 'break-word',

    },
    [theme.breakpoints.up('sm')]: {
      //display: 'inline',
      display: '-webkit-box',
      WebkitBoxOrient: 'vertical',
      WebkitLineClamp: '2',
      overflow: 'hidden',
      wordwrap: 'break-word',
    },
  },

  siteDesSx: {
    [theme.breakpoints.up('xs')]: {
      display: 'inline',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  settingIconBox: {
    [theme.breakpoints.up('xs')]: {
      marginTop: '16px !important',
      borderTop: '2px solid #D9DBE9 !important',
      paddingTop: '16px !important',
      alignItems: 'flex-end !important',
    },
    [theme.breakpoints.up('sm')]: {
      marginTop: '0 !important',
      borderTop: '0 !important',
      paddingTop: '0 !important',
      alignItems: 'flex-start !important',
    },
  },
  statusPublish: {
    border: '1px solid #5cb85b',
    fontSize: '12px',
    color: '#5cb85b',
    padding: '5px 10px',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '3px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '8px',
    },
  },
  statusDraft: {
    border: '1px solid #f0ad4e',
    fontSize: '12px',
    color: '#f0ad4e',
    padding: '5px 10px',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '3px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '8px',
    },
  },
  sitenameTypo: {
    alignItems: 'center',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      display: 'inline'
    },
  },
  siteLinkType: {
    wordBreak: 'break-all'
  },

  statusUnpublish: {
    border: '1px solid #ced3d9',
    fontSize: '12px',
    color: '#ced3d9',
    padding: '5px 10px',
    textAlign: 'center',
    display: 'inline-block',
    borderRadius: '3px',
    [theme.breakpoints.down('xs')]: {
      marginTop: '8px',
    },
  },
  scrollBox: {
    height: 'calc(100vh - 176px)',
    overflowY: 'auto',
    marginBottom: '20px'
  },
  SiteShareScrollBox: {
    height: 'calc(100vh - 270px)',
    overflowY: 'auto',
    marginBottom: '20px'
  },
  itemBoxWrap: {
    width: '99%',
  },
  cancelBtn: {
    padding: '12px 24px',
    cursor: 'pointer',
    border: '1px solid',
    borderRadius: '5px',
    color: '#000',
    marginRight: '20px'
  },
  doneBtn: {
    padding: '12px 24px',
    cursor: 'pointer',
    border: '1px solid',
    borderRadius: '5px',
    background: "#000",
    color: '#fff'
  },
  siteSearchBox: {
    width: '98.52%',
    marginBottom: '25px'
  },
  opacity: {
    opacity: 0.5
  }
}));

export const SettingIconBox = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    marginTop: '16px !important',
    borderTop: '2px solid #D9DBE9 !important',
    paddingTop: '16px !important',
    alignItems: 'flex-end !important',
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: '0 !important',
    borderTop: '0 !important',
    paddingTop: '0 !important',
    alignItems: 'flex-start !important',
  },
}));

export const AddNewButton = styled('button')(({ theme }) => ({
  padding: ' 9px 16px',
  fontFamily: 'HCLTech Roobert',
  fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#FFFFFF',
  textTransform: 'capitalize',
  bottom: '5px',
  right: '5px',
  border: '0',
  cursor: 'pointer',
  [theme.breakpoints.up('xs')]: {
    height: '56px',
    width: '56px',
    borderRadius: '50%',
    position: 'fixed',
    backgroundColor: '#A0A3BD',
    minWidth: 'unset',
  },
  [theme.breakpoints.up('sm')]: {
    height: '38px',
    width: 'fit-content',
    borderRadius: '5px',
    position: 'static',
    backgroundColor: '#14142B',
    minWidth: 'inherit',
  },
}));

export const SiteTypo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
  fontSize: ThemeConstants.FONTSIZE_H3,
  lineHeight: '40px',
}));

export const SiteNameTypo = styled(Typography)(({ theme }) => ({
  fontFamily: 'HCLTechRoobert',
  fontStyle: 'normal',
  fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
  fontSize: ThemeConstants.FONTSIZE_H2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '1',
  WebkitBoxOrient: 'vertical',
  wordBreak: 'break-all',
}));

export const SiteDomainTypo = styled(Typography)(({ theme }) => ({
  fontFamily: 'HCLTechRoobert',
  fontStyle: 'normal',
  fontWeight: ThemeConstants.FONTWEIGHT_SEMIBOLD,
  fontSize: ThemeConstants.FONTSIZE_H5,
  lineHeight: '26px',
  color: '#14142B',
  [theme.breakpoints.up('xs')]: {
    marginTop: '16px',
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: '4px',
    display: 'inline-block',
    marginLeft: '10px',
    paddingLeft: '10px',
    borderLeft: '1px solid #D9DBE9',
  },
}));

export const SiteDesTypo = styled(Typography)(({ theme }) => ({
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: ThemeConstants.FONTWEIGHT_REGULAR,
  fontSize: ThemeConstants.FONTSIZE_H5,
  lineHeight: '24px',
  color: '#4E4B66',
  [theme.breakpoints.up('xs')]: {
    marginTop: '16px',
  },
  [theme.breakpoints.up('sm')]: {
    marginTop: '4px',
  },
}));

export const SiteLink = styled(Link)(({ theme }) => ({
  marginRight: '13px',
  color: '#4B9EF9',
  wordBreak: 'break-word'
}));

export const SiteNameBox = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    paddingLeft: '0',
    marginTop: '20px',
  },
  [theme.breakpoints.up('sm')]: {
    paddingLeft: '20px',
    marginTop: '0',
  },
}));
