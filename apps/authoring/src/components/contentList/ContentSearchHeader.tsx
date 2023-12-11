import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../theme/variable';

interface PageHeaderList {
  // handleClose: () => void;
  handlePageSearch: (pageSearchName?: string) => void;
  handleResetInputFilter: () => void;
  searchTerm?: string;
  setIsSearchHeaderOpen: (val: boolean) => void;
  suggestiveSearchList: [];
  setSearchTerm;
  handleSearchChange;
}
interface ContentSearchHeaderProps {
  handleVODSearch?: any;
  handleResetInputFilter?: any;
  searchTerm?: any;
  setSearchTerm?: any;
  setInputValue?: any;
  inputValue?: any;
  suggestiveSearchList?: any;
}
export default function ContentSearchHeader({
  // handleClose,
  handleVODSearch,
  handleResetInputFilter,
  searchTerm,
  //categoryList,
  setSearchTerm,
  //setValue,
  setInputValue,
  inputValue,
  suggestiveSearchList,
}: // handleCategoryFilter,
// handleResetInputFilter,
// setIsSearchHeaderOpen,
// setSearchTerm,
// handleSearchChange,
ContentSearchHeaderProps) {
  //const [inputValue, setInputValue] = useState();
  const { t }= useTranslation();
  const url = new URL(window.location.href);
  const handleKeyPress = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      //handleClose();
      const button = e.target as HTMLButtonElement;
      //setInputValue(button.value);
      inputValue = button.value;
      await handleVODSearch(button.value);
    }
  };

  return (
    <>
      <Box
          sx={{
            display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: { xs: 'wrap', xl: 'nowrap' },
            width: '100%'
          }}
        >
        <Autocomplete
            freeSolo
            getOptionLabel={(searchResult:any) => `${searchResult?.Title}`}
            onChange={async (event: object, newValue: any) => {
              if (newValue !== null) {
                await url.searchParams.set('searchTerm', newValue?.Title);
                await window.history.pushState({}, '', url);
                await setSearchTerm(url.searchParams.get('searchTerm') as string);
              }
            }}
            isOptionEqualToValue={(option, value) => option?.Title == value?.Title}
            inputValue={inputValue}
            disableClearable
            noOptionsText="No matching VODs found!"
            onInputChange={async (event, newInputValue) => {
              await url.searchParams.set('inputValue', newInputValue);
              await window.history.pushState({}, '', url);
              await setInputValue(url.searchParams.get('inputValue') as string);
              // const pageDataObj = {
              //   eventType: 'Prelem Search',
              //   prelemSearchText: newInputValue,
              // };
              //handleImpression(pageDataObj.eventType, pageDataObj);
            }}
            clearIcon=""
            clearText="clear"
            id="search"
            sx={{
              width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
              padding: { xs: '0px', md: '0px 10px' },
              // '.Platform-x-OutlinedInput-notchedOutline': {
              //   border: 'none',
              // },
            }}
            options={suggestiveSearchList}
            popupIcon=""
            renderOption={(props, suggestiveSearchListItem) =>
              suggestiveSearchListItem?.Title?<Box component='li' {...props} sx={{
                padding: '5px',
                '&:hover': {
                backgroundColor: '#f7f7f7',
                cursor: 'pointer',
              }, }} >
                {suggestiveSearchListItem?.Title}
              </Box>:null}
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  variant="outlined"
                  placeholder={t("search")}
                  onKeyDown={handleKeyPress}
                  // inputProps={{ maxLength: 200 }}
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                    startAdornment:
  <InputAdornment position="start">
    {' '}
    <SearchIcon />
  </InputAdornment>
                    ,
                    endAdornment:
  <InputAdornment position="start">
    {inputValue &&
    <CloseRoundedIcon
                            sx={{
                              cursor: 'pointer',
                              position: 'absolute',
                              right: '18px',
                              // backgroundColor: '#fff',
                            }}
                            onClick={() => handleResetInputFilter()}
                          />}
  </InputAdornment>
                    ,
                  }}
                  // InputProps={{
                  //   startAdornment: (
                  //     <InputAdornment position="start">
                  //       <SearchIcon />
                  //     </InputAdornment>
                  //   ),
                  //   endAdornment: (
                  //     <InputAdornment position="start">
                  //       {searchTerm && (
                  //         <CloseRoundedIcon
                  //           sx={{
                  //             cursor: 'pointer',
                  //             position: 'absolute',
                  //             right: '18px',
                  //             backgroundColor: '#fff',
                  //           }}
                  //           onClick={() => handleResetInputFilter()} />
                  //       )}
                  //     </InputAdornment>
                  //   ),
                  // }}
                  sx={{
                    backgroundColor: '#f5f6f8',
                    width: { xs: '95%', sm: '95%', md: '100%', lg: '100%' },
                    '.Platform-x-InputBase-root': {
                      height: { xs: '25px', md: '40px' },
                      minHeight: '40px',
                      fontSize: ThemeConstants.FONTSIZE_MD,
                    },
                    '.Platform-x-Input-root:before': {
                      borderBottom: '2px solid #2d2d39',
                    },
                    '.Platform-x-Input-root:after': {
                      borderBottom: '2px solid #000000',
                    },
                    '.Platform-x-Input-root.Mui-disabled:before': {
                      borderBottom: '2px solid #c3c3cb',
                    },
                    'input#search': {
                      fontSize: '12px'
                    },
                    '.Platform-x-InputBase-input': {
                      textTransform: "capitalize"
                    }
                  }} />
              );
            }}
          />
      </Box>
    </>
  );
}
