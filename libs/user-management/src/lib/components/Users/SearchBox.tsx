import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputBase,
} from '@mui/material';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { SearchIcon } from '@platformx/utilities';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Search.css';

export default function SearchBox({ handleSearch }: any) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleOnChange = (event: any) => {
    setSearchQuery(event.target.value);
  };
  const resetSearch = () => {
    handleSearch('');
    setSearchQuery('');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(searchQuery.toLowerCase());
    }, 1000);

    return () => clearTimeout(timer);
  }, [handleSearch, searchQuery]);

  return (
    <>
      <FormControl className="userSearchBox">
        <InputBase
          id="search-users"
          type="text"
          size="small"
          value={searchQuery}
          onChange={handleOnChange}
          sx={{
            border: '1px solid #D9DBE9',
            borderRadius: '5px',
            height: '46px',
          }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                aria-label="search users"
                edge="start"
                sx={{ padding: 0, margin: 0 }}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end">
              {searchQuery && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <CloseRoundedIcon
                    sx={{
                      width: '.75em',
                      height: '.75em',
                      cursor: 'pointer',
                      marginRight: '5px',
                    }}
                    onClick={resetSearch}
                  />
                </Box>
              )}
            </InputAdornment>
          }
          placeholder="Search..."
        />
      </FormControl>
    </>
  );
}
