import { makeStyles } from '@material-ui/core';
import { Button, Dialog, Menu, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';

export const VodSideBar = styled(Box)((props) => ({
  [props.theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [props.theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

export const VodSearchContainer = styled(Box)((props) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  [props.theme.breakpoints.up('xs')]: {
    padding: '15px 10px',
  },
  [props.theme.breakpoints.up('md')]: {
    padding: '15px 10px',
  },
  [props.theme.breakpoints.up('xl')]: {
    padding: '21px',
  },
}));

export const VodText = styled(Typography)((props) => ({
  textTransform: 'uppercase',
}));

export const SearchBox = styled(Box)((props) => ({
  justifyContent: 'space-between',
  [props.theme.breakpoints.up('xs')]: {
    display: 'flex',
    width: '60%',
    justifyContent: 'end',
  },
  [props.theme.breakpoints.up('sm')]: {
    width: '50%',
  },
  [props.theme.breakpoints.up('md')]: {
    width: '40%',
  },
}));

export const CreateNewButton = styled(Button)((props) => ({
  marginLeft: '20px',
  textTransform: 'capitalize',
  justifyContent: 'space-between',
  [props.theme.breakpoints.up('xs')]: {
    display: 'none',
  },
  [props.theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));
export const FilterContainer = styled(Box)((props) => ({
  margin: '0 0 20px 0',
  '.form_Control': {
    width: '100%',
    '.form_Control_radio': {
      display: 'none',
      '& + span': {
        fontSize: '16px',
      },
    },
    label: {
      margin: '0 !important',
      padding: '5px 20px',
      '&:has(> span.Mui-checked)': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        fontWeight: '500',
      },
    },
  },
}));
export const DialogContainer = styled(Dialog)((props) => ({
  [props.theme.breakpoints.up('sm')]: {
    display: 'none',
  },
  '.Platform-x-Dialog-paper': {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: '10px 10px 0 0',
    margin: 0,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
}));
export const FilterMenu = styled(Menu)((props) => ({
  '.Platform-x-Menu-paper': {
    boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
    borderRadius: '7px',
    marginTop: '5px',
  },
  '.Platform-x-Menu-list': {
    borderRadius: '4px',
    boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
    border: 'solid 1px rgba(112, 112, 112, 0.1)',
    padding: '0 18px',
  },
  '.form_Control': {
    margin: '0 -18px !important',
    '.form_Control_radio': {
      display: 'none',
      '& + span': {
        fontSize: '12px',
      },
    },
    label: {
      margin: '0 !important',
      padding: '5px 12px',
      '&:has(> span.Mui-checked)': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
        fontWeight: '500',
      },
    },
  },
}));

export const useStyles = makeStyles((theme) => ({
  filterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.up('xs')]: {
      alignItems: 'flex-start',
    },
    [theme.breakpoints.up('md')]: {
      alignItems: 'center',
    },
    background: '#f7f7f7',
    padding: '15px 15px 0 15px',
  },
  folderIcon: {
    color: '#fdbf00',
    marginRight: '5px',
    width: '16px',
    fontSize: '1.25rem',
  },
  iconsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  contentText: {
    color: '#2d2d39',
  },
  vodText: {
    textTransform: 'uppercase',
  },
  filterInnerContainer: {
    marginRight: '10px',
    borderRadius: '3px',
    border: '1px solid #ced3d9',
    cursor: 'pointer',
    fontSize: '12px',
    alignItems: 'center',
    backgroundColor: '#fff',
    textTransform: 'capitalize',
    [theme.breakpoints.up('xs')]: {
      padding: '4px',
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      padding: '7px 15px',
      display: 'flex',
    },
  },
  menuIconContainer: {
    marginRight: '5px',
    cursor: 'pointer',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  filterIcon: {
    fontSize: '14px',
    marginRight: '4px',
  },
  listGridContainer: {
    backgroundColor: '#fff',
    borderRadius: '3px',
    border: '1px solid #ced3d9',
    cursor: 'pointer',
    padding: '4px 7px',
  },
  listIcon: {
    verticalAlign: 'middle',
    fontSize: '18px',
  },
  navigationIcon: {
    color: 'gray',
    margin: '0 5px',
    fontSize: '1.25rem',
  },
  mobileFilterContainer: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    position: 'fixed',
    bottom: 0,
    right: 0,
    margin: '0 15px 14px 0',
  },
  filterAltContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: '56px',
    width: '56px',
    border: '1px solid #2e2e3a',
    borderRadius: '50%',
    marginBottom: '15px',
  },
  filterAltIcon: {
    verticalAlign: 'middle',
    color: '#2d2d39',
    fontSize: '1.5rem',
  },
}));
