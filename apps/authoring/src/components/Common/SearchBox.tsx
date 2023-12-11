import * as React from 'react';
import './Search.css';
import { makeStyles } from '@material-ui/core';

import { useLazyQuery } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import ThemeConstants from '../../../../../libs/utilities/src/lib/themes/authoring/variable';
import { debounce } from '../../utils/helperFunctions';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import SearchBlackSvg from '../../assets/svg/SearchBlack.svg';
import SearchGraySvg from '../../assets/svg/searchGray.svg';
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material';
import { fetchContentTypeList } from '../../services/contentTypes/contentTypes.api';
import { showToastError } from '../toastNotification/toastNotificationReactTostify';

const useStyles = makeStyles({
  option: {
    '&:hover': {
      backgroundColor: `${ThemeConstants.OFF_WHITE_COLOR} !important`,
    },
  },
});

interface Content {
  Title: string;
}

export default function SearchBox({ contentType, onSearch, style }) {
  const styles = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [options, setOptions] = React.useState<Content[]>([]);
  const loading = open && options.length === 0;
  const [inputValue, setInputValue] = React.useState('');
  const [runFetchVodList] = useLazyQuery(fetchContentTypeList);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        runFetchVodList({
          variables: {
            contentType: contentType,
            pageFilter: 'ALL',
            pagination: { start: 0, rows: 100 },
            sort: 'DESC',
            searchTerm: inputValue,
            isSuggestive: true,
          },
        })
          .then((res) => {
            if (res?.data?.authoring_getContentTypeItems?.length > 0) {
              setOptions([...(res?.data?.authoring_getContentTypeItems || [])]);
            } else {
              setOptions([]);
              setOpen(false);
            }
          })
          .catch(() => {
            setOptions([]);
            setOpen(false);
            showToastError(t('api_error_toast'));
          });
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const emptyOptions = () => {
    setOptions([]);
  };

  const debouncedCall = React.useCallback(debounce(emptyOptions, 500), []);

  function onInputChange(e, value) {
    setInputValue(value);
    debouncedCall();
  }

  const onEnter = (e) => {
    if (e.keyCode === 13) {
      onSearch(inputValue);
      setOpen(false); //Do we need this ?? On enter should it remain open/closed??
    }
  };

  const onSelect = (e, value) => {
    // setInputValue(value)
    if (value) onSearch(value);
  };

  const resetSearch = () => {
    onSearch('');
    setInputValue('');
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: showSearch ? 'none' : 'block', md: 'none' },
          marginRight: '13px',
        }}
      >
        <img
          src={SearchBlackSvg}
          style={{ verticalAlign: 'middle', cursor: 'pointer' }}
          onClick={() => setShowSearch(true)}
        />
      </Box>
      <Autocomplete
        id="asynchronousSearch"
        freeSolo
        forcePopupIcon={false}
        sx={{ display: { xs: showSearch ? 'block' : 'none', md: 'block' } }}
        style={style}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        classes={{
          option: styles.option,
        }}
        inputValue={inputValue}
        value={inputValue}
        onInputChange={onInputChange}
        onChange={onSelect}
        onKeyDown={onEnter}
        filterOptions={(x) => x}
        options={options.map((option) => option.Title)}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={`${t('Search here')}...`}
            sx={{
              '.Platform-x-InputBase-root': {
                height: '40px',
                minHeight: 'inherit',
                marginLeft: '0px',
                paddingTop: '10px',
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                fieldset: {
                  borderColor: 'transparent',
                },
                '.Platform-x-InputBase-input': {
                  textTransform: 'capitalize',
                },
                '& #asynchronousSearch::placeholder': {
                  fontSize: ThemeConstants.FONTSIZE_DEFAULT,
                  textTransform: 'none',
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <img src={SearchGraySvg} style={{ marginRight: '10px' }} />
              ),
              endAdornment: (
                // <React.Fragment>
                //     {loading ? <CircularProgress color="inherit" size={15} /> : null}
                //     {params.InputProps.endAdornment}
                // </React.Fragment>
                <InputAdornment position="end">
                  {inputValue && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <CloseRoundedIcon
                        onClick={resetSearch}
                        sx={{
                          cursor: 'pointer',
                          // position: 'absolute',
                          // right: '18px',
                        }}
                      />
                    </Box>
                  )}
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </>
  );
}
