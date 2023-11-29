import { useLazyQuery } from '@apollo/client';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';
import { MiniHeader } from '../../../../components/Header/MiniHeader';
import {
  fetchPrelemContent,
  fetchPrelemValidation,
} from '../../../../services/prelems/prelems.api';
import { addPrelem } from '../../../../store/Actions';
import { Store } from '../../../../store/ContextStore';
import { SearchCardObjecType } from '../../utils/editTypes';
// import PreviewTabsButton from '../PreviewTabsButton/PreviewTabsButton';
import { useStyles } from './Header.styles';

const Header = ({ handleChange, value }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { t } = useTranslation();
  const { state, dispatch } = useContext(Store);
  const { page } = state;
  const location = useLocation();
  const [runFetchContentQuery] = useLazyQuery(fetchPrelemContent);
  const [runFetchValidationQuery] = useLazyQuery(fetchPrelemValidation);
  const prelemMetaInfo = location.state as SearchCardObjecType;

  const theme = useTheme();
  const noWeb = useMediaQuery(theme.breakpoints.down('sm'));
  const ifTab = useMediaQuery(theme.breakpoints.up('sm'));
  const getBreakPoint = () => {
    return ifTab;
  };

  return (
    <Box className={classes.prelemPreviewHeader}>
      <Box className={classes.backbtn}>
        <Button
          startIcon={<KeyboardBackspaceIcon />}
          onClick={() => history.go(-1)}
        >
          {' '}
          {ifTab && t('back')}
        </Button>
      </Box>
      {/* <PreviewTabsButton
        handleChange={handleChange}
        value={value}
        previewStatus={true}
      /> */}
      {getBreakPoint() && (
        <Box className={classes.rightBox}>
          <Button
            variant='contained'
            sx={{ whiteSpace: 'nowrap' }}
            onClick={() => {
              addPrelem(
                dispatch,
                prelemMetaInfo,
                runFetchContentQuery,
                runFetchValidationQuery,
                navigate,
                page?.insertPrelemAt
              );
            }}
          >
            {t('add_prelem')}
          </Button>
          <Box className='headerAvatarIcon'>
            <MiniHeader showUserDetails={false} />
          </Box>
        </Box>
      )}
      {noWeb && (
        <Box className={classes.mobButtonsAdd}>
          <Button
            variant='contained'
            sx={{ whiteSpace: 'nowrap' }}
            onClick={() => {
              addPrelem(
                dispatch,
                prelemMetaInfo,
                runFetchContentQuery,
                runFetchValidationQuery,
                navigate,
                page?.insertPrelemAt
              );
            }}
          >
            {t('add_prelem')}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Header;
