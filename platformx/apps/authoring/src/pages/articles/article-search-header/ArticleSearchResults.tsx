import { Box, Typography } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

export default function ArticelSearchResults({
  searchResults,
  handlePageSearch,
}) {
  const onSearch = (name) => {
    handlePageSearch(name);
  };

  return (
    <>
      {searchResults &&
        <Box
          sx={{
            backgroundColor: 'white',
            boxShadow: '0 4px 23px 0 rgb(0 0 0 / 16%)',
            borderRadius: '7px',
            padding: '10px 15px',
            maxHeight: '400px',
            overflowY: 'scroll',
          }}
        >
          {searchResults.map((results, index) =>
            results == 'no records' ?
              <Box>
                <Typography variant='h4medium'>No results found</Typography>
              </Box>
             :
              <Box
                key={index}
                onClick={() => onSearch(results?.Title)}
                sx={{
                  padding: '15px 0',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <SearchIcon sx={{ marginRight: '10px' }} />
                <Typography variant='h4medium'>{results?.Title}</Typography>
              </Box>

          )}
        </Box>}
    </>
  );
}
