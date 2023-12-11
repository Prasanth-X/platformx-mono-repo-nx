import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LanguageDropDown from '../../Common/LanguageDropDown';
import Logo from '../../assets/images/platform-x-logo.png';
import MenuTwoDash from '../../assets/svg/MenuTwoDash.svg';
import { MiniHeader } from '../../components/Header/MiniHeader';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';

type SiteCreationHeaderProp = {
  handleResetInputFilter?: () => void;
  handleChange?: () => void;
  searchTerm?: string;
};

const SiteCreationHeader = ({
  handleResetInputFilter,
  handleChange,
  searchTerm,
}: SiteCreationHeaderProp) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useTheme();
  const ifTab = useMediaQuery(theme.breakpoints.up('sm'));
  const getBreakPoint = () => {
    return ifTab;
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'white',
          height: '70px',
          borderBottom: '1px solid #D9DBE9',
          padding: '17px 18px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: { xs: '15px', md: '0' },
            width: { xs: '85%', sm: '90%', md: '90%', lg: '90%' },
          }}
        >
          <Box
            sx={{
              minHeight: '24px',
              minWidth: '24px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img src={MenuTwoDash} width={18} height={12} />
          </Box>
          <Box
            onClick={() => navigate('/dashboard')}
            sx={{
              cursor: 'pointer',
              display: { xs: 'flex', lg: 'none', md: 'none', sm: 'none' },
              marginLeft: { xs: '15px' },
            }}
          >
            <img src={Logo} height="30" />
          </Box>
          <TextField
            variant="standard"
            placeholder={window.innerWidth <= 390 ? '' : t('search_for_sites')}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  {!searchTerm && (
                    <SearchIcon
                      sx={{
                        position: {
                          xs: 'absolute',
                          sm: 'relative',
                          md: 'relative',
                          lg: 'relative',
                        },
                        right: {
                          xs: '5px',
                          sm: 'unset',
                          md: 'unset',
                          lg: 'unset',
                        },
                      }}
                    />
                  )}
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment
                  position={window.innerWidth <= 400 ? 'end' : 'start'}
                >
                  {searchTerm && (
                    <CloseRoundedIcon
                      sx={{
                        cursor: 'pointer',
                        position: {
                          xs: 'absolute',
                          sm: 'relative',
                          md: 'relative',
                          lg: 'relative',
                        },
                        left: {
                          xs: '-18px',
                          sm: 'unset',
                          md: 'unset',
                          lg: 'unset',
                        },
                      }}
                      onClick={() => handleResetInputFilter()}
                    />
                  )}
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
            value={searchTerm}
            onChange={handleChange}
            sx={{
              marginLeft: '23px',
              backgroundColor: 'white',
              width: '100%',
              '.Platform-x-InputBase-root': {
                height: '21px',
                fontSize: ThemeConstants.FONTSIZE_MD,
              },
            }}
          />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: { xs: '15px', md: '0' },
          }}
        >
          <LanguageDropDown />
          {/* <Box
            sx={{
              position: 'relative',
              marginLeft: { xs: '10px', md: '20px', sm: '20px', lg: '20px' },
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <NotificationsNoneIcon />
            <Box
              sx={{
                width: '17px',
                height: '17px',
                background: '#5256B8',
                position: 'absolute',
                top: '-6px',
                right: '-3px',
                display: 'flex',
                fontSize: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                borderRadius: '50%',
              }}
            >
              4
            </Box>
          </Box> */}
          <Box
            sx={{
              marginLeft: { xs: '10px', md: '20px', sm: '20px', lg: '20px' },
              display: { xs: 'none', md: 'block', sm: 'block', lg: 'block' },
            }}
          >
            {getBreakPoint() && <MiniHeader showUserDetails={false} />}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default SiteCreationHeader;
