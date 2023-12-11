import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchIcon from '@mui/icons-material/Search';
import { Box, InputAdornment, Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';
import usePlatformAnalytics from 'platform-x-utils/dist/analytics';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Icons from '../../../components/Icons';
import ThemeConstants from '../../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { FilterProps } from '../utils/prelemTypes';
export const PrelemSearchHeader = ({
  categoryList,
  setValue,
  setInputValue,
  inputValue,
  suggestiveSearchList,
  handleCategoryFilter,
  handleResetInputFilter,
}: FilterProps) => {
  const url = new URL(window.location.href);
  const navigate = useNavigate();
  const path = localStorage.getItem('path');
  const routeTo = '/edit-page';
  const [handleImpression] = usePlatformAnalytics();
  return (
    <Box data-testid="prelem-search-header-wrap">
      <Box sx={{ padding: { xs: '15px 20px 0', lg: '10px 50px' } }}>
        <Box
          sx={{
            display: { xs: 'flex', sm: 'flex', md: 'block', lg: 'block' },
            position: 'relative',
            alignItems: 'center',
          }}
        >
          <Icons
            nameIcon="back"
            enable
            styleObject={{
              color: '',
              border: {
                xs: 'none',
                md: `1px solid ${ThemeConstants.PRIMARY_MAIN_COLOR}`,
              },
              borderRadius: '8px',
              float: 'left',
              padding: { xs: '2px', md: '8px' },
              marginRight: { xs: 0, md: '10px' },
              marginTop: { xs: '4px', md: '10px' },
            }}
            listIndx="back"
            handleClick={() => {
              if (path) {
                navigate({
                  pathname: routeTo,
                  search: `?${createSearchParams({
                    page: path.toString(),
                  })}`,
                });
              } else navigate(routeTo);
            }}
          />{' '}
          <Typography
            variant="h5"
            sx={{
              display: { xs: 'block', sm: 'block', md: 'none', lg: 'none' },
              marginTop: '4px',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%,-50%)',
              fontWeight: {
                xs: ThemeConstants.FONTWEIGHT_SEMIBOLD,
              },
              fontSize: {
                xs: ThemeConstants.FONTSIZE_MD,
                md: ThemeConstants.FONTSIZE_LG,
                lg: ThemeConstants.FONTSIZE_LG,
              },
            }}
          >
            Search prelem
          </Typography>
        </Box>
        <Box
          sx={{
            display: { xs: 'block', sm: 'block', md: 'flex', lg: 'flex' },
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: { xs: 'wrap', xl: 'nowrap' },
          }}
        >
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
            clearIcon=""
            clearText="clear"
            id="search"
            sx={{
              width: { xs: '100%', sm: '100%', md: '35%', lg: '35%' },
              padding: { xs: '0px', md: '0px 10px' },
              '.Platform-x-OutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            options={suggestiveSearchList}
            popupIcon=""
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                  startAdornment: (
                    <InputAdornment position="start">
                      {' '}
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="start">
                      {inputValue && (
                        <CloseRoundedIcon
                          sx={{
                            cursor: 'pointer',
                            position: 'absolute',
                            right: '18px',
                            backgroundColor: ThemeConstants.WHITE_COLOR,
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
                    fontSize: ThemeConstants.FONTSIZE_MD,
                  },
                  '.Mui-focused': {
                    border: 'none !important',
                    borderBottom:
                      '2px solid ' +
                      ThemeConstants.PRIMARY_MAIN_COLOR +
                      ' !important',
                  },
                  '.Platform-x-OutlinedInput-root': {
                    borderBottom:
                      '2px solid ' + ThemeConstants.PRIMARY_MAIN_COLOR,
                    borderRadius: '0',
                    '&:focus-visible': {
                      outline: 'none !important',
                    },
                  },
                }}
              />
            )}
          />
          <List
            sx={{
              width: { xs: 'calc(100vw - 20px)', lg: '63%' },
              textAlign: { xs: 'left', lg: 'left' },
              overflowX: { xs: 'scroll', md: 'inherit' },
              whiteSpace: { xs: 'nowrap', md: 'inherit' },
            }}
          >
            {categoryList?.map((data, index) => {
              return (
                <ListItem
                  disablePadding
                  key={index}
                  sx={{
                    display: 'inline-block',
                    width: 'auto',
                    margin: '0 5px',
                  }}
                  onClick={() => handleCategoryFilter(data?.tag, index)}
                >
                  <ListItemButton
                    sx={{
                      padding: { xs: '2px 15px', md: '6px 15px' },
                      borderRadius: '35px',
                      backgroundColor: ThemeConstants.WHITE_COLOR,
                      border: `1px solid ${ThemeConstants.PRIMARY_MAIN_COLOR}`,
                      color: ThemeConstants.PRIMARY_MAIN_COLOR,
                      '.Platform-x-Typography-root': {
                        fontSize: {
                          xs: ThemeConstants.FONTSIZE_XS,
                          xl: ThemeConstants.FONTSIZE_SM,
                        },
                      },
                      '&:hover': {
                        backgroundColor: {
                          xs: 'transparent',
                          md: ThemeConstants.PRIMARY_MAIN_COLOR,
                        },
                        color: {
                          xs: ThemeConstants.PRIMARY_MAIN_COLOR,
                          md: ThemeConstants.WHITE_COLOR,
                        },
                      },
                      '&.Mui-selected': {
                        backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                        color: ThemeConstants.WHITE_COLOR,
                        '&:hover': {
                          backgroundColor: ThemeConstants.PRIMARY_MAIN_COLOR,
                        },
                      },
                    }}
                    selected={data?.selectedValue}
                  >
                    <ListItemText primary={data?.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Box>
  );
};
