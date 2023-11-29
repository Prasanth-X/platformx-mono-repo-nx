import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import '../SearchBox/SearchBox.css';
import SearchModel from '../SearchBox/SearchModel';

export default function HeaderSearch({
  handleSearchOpen,
  handleSearchClose,
  searchOpen,
}) {
  const [searchKeyword, setSearchKeyword] = useState(
    'Search for “Pages” / “VODs“ / “Articles”'
  );
  const handleSearchKeyword = (keyword) => {
    setSearchKeyword(keyword);
  };
  return (
    <>
      <Box
        onClick={handleSearchOpen}
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <IconButton type='button' sx={{ p: '10px' }}>
          <SearchIcon />
        </IconButton>
        <Typography variant='h6regular' color='#4E4B66'>
          {searchKeyword}
        </Typography>
      </Box>
      <SearchModel
        searchOpen={searchOpen}
        handleSearchClose={handleSearchClose}
      />
    </>
  );
}
