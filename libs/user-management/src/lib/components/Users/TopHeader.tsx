import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Menu,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import { FilterIcon } from '@platformx/utilities';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import SearchBox from '../Users/SearchBox';
import '../Users/User.css';
import { USERTYPES } from './Utils/constant';

const TopHeader = ({ handleSearch, filterValue, setFilterValue }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [filterMenu, setFilterMenu] = useState<null | HTMLElement>(null);
  const openFilterMenu = Boolean(filterMenu);

  const handleFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setFilterMenu(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterMenu(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = () => (event.target as HTMLInputElement).value;
    setFilterValue(selectedValue());
    handleFilterClose();
  };

  return (
    <Box className="userlisttophead">
      <Box>
        <Box
          className="d-flex align-items-center"
          sx={{ mb: { xs: '15px', md: 0 } }}
        >
          <Typography variant="h3bold" sx={{ textTransform: 'capitalize' }}>
            {t('users')}
          </Typography>
        </Box>
      </Box>

      <Box
        className="d-flex align-items-center mobalignment"
        sx={{
          position: 'relative',
        }}
      >
        <Box>
          <SearchBox handleSearch={handleSearch} />
        </Box>
        <Box className="d-flex">
          <Box
            onClick={handleFilterClick}
            sx={{
              margin: '0px 12px',
              backgroundColor: openFilterMenu ? '#2d2d39' : 'white',
              padding: '10px',
              borderRadius: '4px',
              border: '1px solid #14142B',
              display: 'flex',
              height: '46px',
              width: '42px',
              alignItem: 'center',
              cursor: 'pointer',
              justifyContent: 'center',
              '&.openClass img': {
                filter:
                  'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(6197%) hue-rotate(110deg) brightness(97%) contrast(99%);',
              },
            }}
            className={openFilterMenu ? 'openClass' : ''}
          >
            <img src={FilterIcon} alt="Filter Icon" width="17" height="24" />
          </Box>
          <Menu
            elevation={0}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            anchorEl={filterMenu}
            open={openFilterMenu}
            onClose={handleFilterClose}
            sx={{
              '.Platform-x-Menu-paper': {
                boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)',
                borderRadius: '7px',
                marginTop: '5px',
              },
              '.Platform-x-Menu-list': {
                borderRadius: '4px',
                boxShadow: '0 0 2px 0 rgba(115, 114, 114, 0.14)',
                border: 'solid 1px rgba(112, 112, 112, 0.1)',
                padding: '10px 18px',
              },
            }}
          >
            <FormControl>
              <RadioGroup
                value={filterValue}
                onChange={handleChange}
                sx={{ textTransform: 'capitalize' }}
              >
                <FormControlLabel
                  className="listViewradionone"
                  value={USERTYPES.AUTHORINGUSER}
                  control={<Radio />}
                  label={t('authoring_user')}
                />
                <FormControlLabel
                  className="listViewradionone"
                  value={USERTYPES.ENDUSER}
                  control={<Radio />}
                  label={t('end_user')}
                />
                <FormControlLabel
                  className="listViewradionone"
                  value={USERTYPES.COMMUNITYUSER}
                  control={<Radio />}
                  label={t('community_user')}
                />
              </RadioGroup>
            </FormControl>
          </Menu>
          <Button
            variant="primaryButton"
            onClick={() => navigate('/user-management/user-create')}
          >
            {t('add_new')}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TopHeader;
