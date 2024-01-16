import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
//import  LongLeftArrow  from '../../../assets/svg/LongLeftArrow.svg';
//import Logo from '../../../assets/svg/PlatX-logo.svg';
import { useSiteTopBarStyle } from './SiteTopBar.style';

const SiteTopBar = ({
  returnBack,
  siteLabel,
  onPreviewClick,
  onBreadscumClick,
  iconList = [],
  isShowPreview = false,
  activeForm = '',
  buttonStyle = {},
  onSaveClick,
} : any) => {
  const navigate = useNavigate();
  const classes = useSiteTopBarStyle({ isShowPreview, buttonStyle })();
  return (
    <>
      <style>{`#scrollbar::-webkit-scrollbar {display: none;}`}</style>
      <Box className={classes.firstHeader}>
        <Box className={classes.firstHeaderLeft}>
          {/* <Box className={classes.firstHeaderBackArrow} onClick={returnBack}>
          <img src={LongLeftArrow} />
          </Box> */}
          {/* <Box
            className={classes.logoContainer}
            onClick={() => navigate('/dashboard')}
          >
            <img src={Logo} height='30' />
          </Box> */}
        </Box>
        <Box className={classes.firstHeaderRight}>
        {onPreviewClick && (
          <Box
            className={classes.errorOutlineIcon}
            onClick={() => onPreviewClick((prevState) => !prevState)}
          >
            <ErrorOutlineIcon />
          </Box>
          )}
          <Tooltip title={''} placement='left' enterTouchDelay={0}>
            <span style={{ cursor: 'pointer' }}>
              <Button
                variant='contained'
                type='submit'
                onClick={() => onSaveClick()}
                className={classes.saveButton}
              >
                {t('done')}
              </Button>
            </span>
          </Tooltip>
        </Box>
      </Box>
      <Box className={classes.secondHeader}>
        <Box className={classes.secondHeaderLeft}>
          {/* <Box className={classes.secondHeaderBackArrow} onClick={returnBack}>
            <LongLeftArrow />
          </Box> */}
          <Typography variant='h3medium'>{siteLabel}</Typography>
        </Box>
        <Box className={classes.secondHeaderRight}>
          <Box id='scrollbar' className={classes.iconContainer}>
            {iconList.map((icon: any, index) => (
              <Box className={classes.iconList} key={`icon${index + 1}`}>
                {index > 0 && (
                  <Box className={classes.dividerContainer}>
                    <Box className={classes.divider}></Box>
                  </Box>
                )}
                <Box
                  onClick={() => onBreadscumClick(icon)}
                  className={classes.iconBox}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        activeForm === icon.section ? '#D7ECFD' : '',
                      color: activeForm === icon.section ? '#4B9EF9' : '',
                    }}
                    className={classes.icon}
                  >
                    {icon.iconComponent}
                  </Box>
                  <Box
                    className={
                      activeForm === icon.section
                        ? classes.empty
                        : classes.hidden
                    }
                  >
                    {icon?.title}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SiteTopBar;
