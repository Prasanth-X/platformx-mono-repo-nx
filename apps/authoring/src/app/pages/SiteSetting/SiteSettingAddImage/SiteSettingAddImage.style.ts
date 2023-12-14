import { makeStyles } from '@material-ui/core';
import { ThemeConstants } from '@platformx/utilities';;

export const useSiteSettingAddImageStyle = makeStyles((theme) => ({
  container: {
    position: 'relative',
    borderRadius: '4px',
  },

  replaceBox: {
    position: 'absolute',
    top: '0',
    width: '100%',
    height: '97%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7470708a',
    borderRadius: '4px',
  },

  cachedBox: {
    borderRadius: '50%',
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    color: '#626060',
  },

  replaceTypo: {
    fontSize: ThemeConstants.FONTSIZE_XS,
    color: ThemeConstants.WHITE_COLOR,
    textTransform: 'capitalize',
  },

  uploadBox: {
    cursor: 'pointer',
    height: '205px',
    backgroundColor: '#EFF0F7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
  },

  uploadIconBox: {
    borderRadius: '50%',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#4B9EF9',
  },

  img: {
    width: '100%',
    height: '206px',
    objectFit: 'cover',
    borderRadius: '4px',
  },

  uploadTypo: {
    color: '#000000',
    textTransform: 'capitalize',
  },
}));
