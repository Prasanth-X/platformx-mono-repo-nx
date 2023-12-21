import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {LanguageDropDown} from '@platformx/utilities'; 
import {PlatXLogo, MenuIcon } from "@platformx/utilities"
import '../SearchBox/SearchBox.css';
import SearchModel from '../SearchBox/SearchModel';
import './Header.css';
import NotificationBox from './NotificationBox';

const MobileHeader = ({ handleSearchKeyword }) => {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const handleSearchOpen = () => {
    setSearchOpen(true);
  };
  const handleSearchClose = () => {
    setSearchOpen(false);
  };
  return (
    <>
      <Box className='mobileHeader'>
        <Grid container>
          <Grid item xs={9} md={8} className='d-flex alignitemscenter'>
            <Box className='menuIcon'>
             <MenuIcon/>
            </Box>
            <Box
              className='logo'
              onClick={() => navigate('/dashboard')}
              sx={{ cursor: 'pointer', display: 'flex' }}
            >
              <PlatXLogo/>
            </Box>
          </Grid>
          <Grid
            item
            xs={3}
            md={4}
            className='d-flex alignitemscenter justify-content-end'
          >
            <Box className='d-flex alignitemscenter justify-content-end'>
              <IconButton type='button' sx={{ p: '5px', mr: '10px' }}>
                <SearchIcon onClick={handleSearchOpen} />
              </IconButton>
              <LanguageDropDown />
              <NotificationBox />
            </Box>
          </Grid>
        </Grid>
      </Box>
      <SearchModel
        searchOpen={searchOpen}
        handleSearchClose={handleSearchClose}
      />
    </>
  );
};

export default MobileHeader;
