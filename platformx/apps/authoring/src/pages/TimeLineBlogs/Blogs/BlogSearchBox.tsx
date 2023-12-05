import { makeStyles } from '@material-ui/core/styles';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '../../../assets/SearchIcon.svg';
import '../../../components/Common/Search.css';
import { showToastError } from '../../../components/toastNotification/toastNotificationReactTostify';
import { commonPostApiCall } from '../../../services/config/request';
import { debounce } from '../../../utils/helperFunctions';

interface Content {
  description: any;
  title: string;
}
const useStyles = makeStyles(() => ({
  autoComplete: {
    wordBreak: 'break-word',
  },
}));

export default function BlogSearchBox({ onSearch, style }) {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [showSearch, setShowSearch] = React.useState(false);
  const [options, setOptions] = React.useState<Content[]>([]);
  const loading = open && options?.length === 0;
  const [inputValue, setInputValue] = React.useState('');
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const eventPath = urlParams.get('path');
  const apiUrl = `${process.env.REACT_APP_BLOG_API_URI}blogging/fetch`;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        try {
          const data = {
            event_path: eventPath,
            is_published: true,
            is_soft_delete: false,
            start: 0,
            rows: 20,
            sortOrder: 'desc',
            isSuggestive: false,
            pageSearch: inputValue,
          };
          const response = await commonPostApiCall(apiUrl, data);
          if (
            response?.data?.data?.length > 0 &&
            response?.data?.data != 'No data found!'
          ) {
            setOptions([...(response?.data?.data || [])]);
          } else {
            setOptions([]);
            setOpen(false);
          }
        } catch (error) {
          setOptions([]);
          setOpen(false);
          showToastError(t('api_error_toast'));
        }
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

  const onSelect = (e: any, value: any) => {
    if (value && value !== null) {
      setInputValue(value);
      onSearch(value);
    } else {
      onSearch('');
      setInputValue('');
    }
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
          src={SearchIcon}
          style={{ verticalAlign: 'middle', cursor: 'pointer' }}
          onClick={() => setShowSearch(true)}
        />
      </Box>
      <Autocomplete
        id="asynchronousSearch"
        classes={{
          input: classes.autoComplete,
          option: classes.autoComplete,
        }}
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
        inputValue={inputValue}
        value={inputValue}
        onInputChange={onInputChange}
        onChange={onSelect}
        onKeyDown={onEnter}
        filterOptions={(x) => x}
        options={options?.map((option) => (option?.title ? option?.title : ''))}
        // options={options}
        // renderOption={(option) => (
        //     <Typography className={classes.comboOptions}>{option?.title ? option?.title : ''}</Typography>
        // )}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={`${t('Search Blog')}`}
            sx={{
              '.Platform-x-InputBase-root': {
                height: '40px',
                fontSize: '14px',
                padding: '12px 14px 12px 8px !important',
                minHeight: 'inherit',
                marginLeft: '0px',
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
                fieldset: {
                  borderColor: 'transparent',
                },
                '.Platform-x-InputBase-input': {
                  textTransform: 'capitalize',
                },
              },
              position: 'relative',
              border: '1px solid #ced3d9',
              borderRadius: '4px',
              backgroundColor: '#f5f6f8',
              marginLeft: '0',
              width: '100%',
            }}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <img src={SearchIcon} style={{ marginRight: '10px' }} />
              ),
              // <SearchIcon style={{ marginRight: '10px' }} />,
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
