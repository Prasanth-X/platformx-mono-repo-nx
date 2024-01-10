import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Typography } from '@mui/material';
// import { Logo } from '@platformx/utilities';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import './TopBackHeader.css';
import { useStyles } from './TopBackHeader.styles';
type TopBackHeaderProps = {
  returnBack: () => void;
};
const TopBackHeader = ({ returnBack }: TopBackHeaderProps) => {
  const navigate = useNavigate();
  const classes = useStyles();

  return (
    <Box className="workflowtophead">
      <Box className="d-flex">
        <Box className="backarrow" onClick={returnBack}>
          <ArrowBackIcon />
        </Box>
        <Box
          className={classes.logoDispaly}
          onClick={() => navigate('/dashboard')}
        >
          {/* <img src={Logo} height="30" /> */}
        </Box>
        <Typography className={classes.headerTextDispaly} variant="h3medium">
          {t('workflow_info')}
        </Typography>
      </Box>
    </Box>
  );
};

export default TopBackHeader;
