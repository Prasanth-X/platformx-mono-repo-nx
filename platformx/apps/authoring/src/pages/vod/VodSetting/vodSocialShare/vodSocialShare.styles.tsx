import { makeStyles } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import ThemeConstants from '../../../../theme/variable';

export const AutoText = styled(TextField)(() => ({
  '.Platform-x-OutlinedInput-root ': {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '10px',
  },
  '.Platform-x-Autocomplete-tag': {
    height: '40px',
    margin: '0 5px 5px 0',
  },
  '.Platform-x-Chip-label': {
    padding: '0 5px',
  },
  '.Platform-x-InputBase-input': {
    padding: 0,
  },
}));

export const Accordions = styled(Accordion)(() => ({
  boxShadow: 'none',
  borderRadius: '0px',
  '&.Mui-expanded': {
    margin: '0px',
  },
}));
export const useStyles = makeStyles((theme) => ({
  socialShareContainer: {
    paddingLeft: '20px',
    paddingRight: '20px',
  },
  socialOgImageContainer: {
    border: '2px solid #e2e2e2',
    borderRadius: '5px',
  },
  noImage: {
    borderRadius: '5px',
    border: 'dashed 2px #707070',
    padding: '20px',
    cursor: 'pointer',
    height: '147px',
    backgroundColor: '#f5f6f8',
    display: 'flex',
    justifyContent: 'center',
  },
  noImageText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: ThemeConstants.PRIMARY_MAIN_COLOR,
  },
  arrowUpContainer: {
    borderRadius: '50%',
    backgroundColor: '#000',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowUpIcon: {
    color: ThemeConstants.WHITE_COLOR,
  },
  hasImage: {
    position: 'relative',
  },
  imageReplaceContainer: {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7470708a',
  },
  cashedIconContainer: {
    borderRadius: '50%',
    backgroundColor: '#fff',
    width: '40px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    color: '#626060',
  },
  replaceText: {
    marginTop: '8px',
    color: ThemeConstants.WHITE_COLOR,
  },
  titleLabel: {
    display: 'flex',
    margin: '20px 0 10px 0',
  },
  iconHover: {
    marginLeft: '10px',
    '&:hover': {
      color: ThemeConstants.NOTIFICATION_ERROR,
    },
  },
}));
