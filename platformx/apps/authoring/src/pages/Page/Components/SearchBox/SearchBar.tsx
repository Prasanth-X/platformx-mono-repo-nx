import SearchIcon from '@mui/icons-material/Search';
import {
  Autocomplete,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from '@mui/material';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
// import { FilterProps } from '../utils/prelemTypes';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ThemeConstants from '../../../../theme/variable';
import { FilterProps } from '../../utils/prelemTypes';
import { useState } from 'react';

const SearchBar = ({
  categoryList,
  setValue,
  setInputValue,
  inputValue,
  suggestiveSearchList,
  handleCategoryFilter,
  handleResetInputFilter,
}: FilterProps) => {
  const url = new URL(window.location.href);
  const [handleImpression] = usePlatformAnalytics();

  const handleKeyDown = async (e) => {
    if (e.target.value !== null) {
      await url.searchParams.set('searchText', e.target.value);
      await window.history.pushState({}, '', url);
      await setValue(url.searchParams.get('searchText') as string);
    }
  };
  const stylenw = `
  .Platform-x-Autocomplete-popper{
    margin-left: -34px !important;
  }
  .Platform-x-Autocomplete-popper .Platform-x-Paper-root {
    border-radius: 5px !important;
    width: calc(100% + 34px);
  }
  .Platform-x-Autocomplete-popper .Platform-x-Autocomplete-listbox {
    padding: 10px;
  }
  `;
  return (
    <>
      <style>{stylenw}</style>
      <Paper
        data-testid='prelem-search-header-wrap'
        component='form'
        sx={{
          display: 'flex',
          alignItems: 'center',
          boxShadow: 'none',
          border: '1px solid #D9DBE9',
          height: '50px',
        }}
      >
        <IconButton type='button'>
          <SearchIcon />
        </IconButton>
        <Autocomplete
          freeSolo
          onChange={async (event: object, newValue: string | null) => {
            if (newValue !== null) {
              await url.searchParams.set('searchText', newValue);
              await window.history.pushState({}, '', url);
              await setValue(url.searchParams.get('searchText') as string);
            }
          }}
          inputValue={inputValue}
          onInputChange={async (event, newInputValue) => {
            await url.searchParams.set('inputValue', newInputValue);
            await window.history.pushState({}, '', url);
            await setInputValue(url.searchParams.get('inputValue') as string);
            const pageDataObj = {
              eventType: 'Prelem Search',
              prelemSearchText: newInputValue,
            };
            handleImpression(pageDataObj.eventType, pageDataObj);
          }}
          disableClearable
          clearIcon=''
          clearText='clear'
          id='search'
          sx={{
            width: '100%',
            padding: '0px',
            '.Platform-x-OutlinedInput-notchedOutline': {
              border: 'none',
            },
          }}
          options={suggestiveSearchList}
          popupIcon=''
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder='Search'
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleKeyDown(e);
                }
              }}
              InputProps={{
                ...params.InputProps,
                type: 'search',
                endAdornment: (
                  <InputAdornment position='start'>
                    {inputValue && (
                      <CloseRoundedIcon
                        sx={{
                          cursor: 'pointer',
                          position: 'absolute',
                          right: '10px',
                        }}
                        onClick={() => handleResetInputFilter()}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
              sx={{
                '.Platform-x-InputBase-root': {
                  height: '50px',
                  '& input': {
                    padding: '13px 14px 13px 2px',
                  },
                },
              }}
            />
          )}
        />
      </Paper>
    </>
  );
};

export default SearchBar;
