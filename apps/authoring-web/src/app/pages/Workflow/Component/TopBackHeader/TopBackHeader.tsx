import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import Logo from '../../../../assets/images/platform-x-logo.png';
import './TopBackHeader.css';
import { useStyles } from './TopBackHeader.styles';

const TopBackHeader = ({ returnBack }) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <>
      <Box className='workflowtophead'>
        <Box className='d-flex'>
          <Box className='backarrow' onClick={returnBack}>
            <ArrowBackIcon />
          </Box>
          <Box
            className={classes.logoDispaly}
            onClick={() => navigate('/dashboard')}
          >
            <img src={Logo} height='30' />
          </Box>
          <Typography className={classes.headerTextDispaly} variant='h3medium'>
            {t('workflow_info')}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default TopBackHeader;
