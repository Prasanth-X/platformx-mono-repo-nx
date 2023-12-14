import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';

export default function GalleryItemSearchResults({
  searchResults,
  handlePageSearch,
}) {
  const onSearch = (name) => {
    handlePageSearch(name);
  };

  return (
    <>
      {true &&
        <Box
          sx={{
            backgroundColor: 'white',
            boxShadow: '0 4px 23px 0 rgb(0 0 0 / 16%)',
            borderRadius: '7px',
            padding: '10px 15px',
            maxHeight: '400px',
            overflowY: 'scroll',
          }}
          className='suggestionitems'
        >
          {searchResults.length == 0 ?
            <Box>
              <Typography variant='h6regular'>No suggestions found</Typography>
            </Box>
           :
            ''}
          {searchResults.map((results, index) =>
            results.length < 0 ?
              <Box>
                <Typography variant='h6regular'>No results found</Typography>
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
                className='suggestionitems'
              >
                <SearchIcon sx={{ marginRight: '10px' }} />
                <Typography variant='h6regular'>{results?.Title}</Typography>
              </Box>

          )}
        </Box>}
    </>
  );
}
