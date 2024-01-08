import SearchIcon from '@mui/icons-material/Search';
import { Box, Grid, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import { contentTypeAPIs } from '@platformx/authoring-apis';
import { SORT_ORDER, debounce } from '@platformx/utilities';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { iconMap } from '../../../../../utils/constant';

const TextFieldBox = styled('div')({
  position: 'relative',
  width: '100%',
  '& input': {
    paddingLeft: '40px',
  },
});

const ListContainer = styled('div')({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '5px 10px',
});
export default function AutoCompleteSearch({
  selectedCategory,
  handleSearchKeyword,
  handleSearch,
  filters,
}) {
  const { t } = useTranslation();
  const [autoCompleteData, setAutoCompleteData] = useState<any>([]);
  const [keyword, setKeyword] = useState('');
  const renderGroup = (params: any) => {
    const { key, children, group } = params;
    return (
      <Grid container alignItems="center" paddingLeft={2}>
        <Grid item>
          <Typography variant="subtitle1">{group}</Typography>
        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    );
  };

  const getSuggestions = async (keyword) => {
    const response: any = await contentTypeAPIs.fetchContentAll({
      contentType: selectedCategory.category,
      pageFilter: 'ALL',
      sort: SORT_ORDER,
      searchTerm: keyword,
      isSuggestive: true,
      pagination: { start: 0, rows: 100 },
      tags: filters.tags,
      author: filters.author,
      fromDate: filters.fromDate,
      toDate: filters.toDate,
    });
    const { authoring_getContentTypeItems: itemsList } = response.data;
    setAutoCompleteData([...(itemsList || [])]);
  };

  const handleSuggestions = (e) => {
    debounce(getSuggestions(e.target.value));
  };

  const handleKeyDown = (e) => {
    handleSearchKeyword(e.target.value);
    setKeyword(e.target.value);
    handleSearch({
      tags: [],
      title: '',
      author: '',
      fromDate: '',
      toDate: '',
    });
  };

  return (
    <Autocomplete
      fullWidth
      freeSolo
      sx={{
        '& .Platform-x-OutlinedInput-notchedOutline': {
          border: 'none',
        },
      }}
      options={autoCompleteData || []}
      groupBy={(option: any) => option.ContentType || ''}
      getOptionLabel={(option) => option?.Title || ''}
      isOptionEqualToValue={(option, value) => option?.Title == value?.Title}
      onInputChange={async (event, newInputValue) => {
        handleSearchKeyword(newInputValue);
      }}
      renderInput={(params) => (
        <TextFieldBox>
          <Box className="searchIconPos">
            <SearchIcon />
          </Box>
          <TextField
            {...params}
            placeholder={
              t('search_for') +
              '“' +
              t('pages') +
              '” / “' +
              t('articles') +
              '” / “' +
              t('quiz') +
              '“ / “' +
              t('polls') +
              '“ / “' +
              t('events') +
              '“'
            }
            onChange={(e) => {
              handleSearchKeyword(e.target.value);
              handleSuggestions(e);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleKeyDown(e);
              }
            }}
          />
        </TextFieldBox>
      )}
      renderGroup={renderGroup}
      renderOption={(props, option: any) => {
        return (
          <div>
            <li {...props}>
              <ListContainer>
                {iconMap[option.ContentType]}
                <Typography variant="h5regular" sx={{ marginLeft: '8px' }}>
                  {option.Title}
                </Typography>
              </ListContainer>
            </li>
          </div>
        );
      }}
    />
  );
}
